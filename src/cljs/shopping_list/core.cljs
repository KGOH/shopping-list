(ns ^:figwheel-hooks shopping-list.core
  (:require [ajax.core :refer [GET]]
            [com.rpl.specter :as sp]
            [goog.object :as gobject]
            [clojure.string :as str]))


(defn my-js->clj
  "Recursively transforms (Java/Type)Script arrays into ClojureScript
  vectors, and (Java/Type)Script objects into ClojureScript maps.  With
  option ':keywordize-keys true' will convert object fields from
  strings to keywords."
  ([x] (my-js->clj x :keywordize-keys false))
  ([x & opts]
    (let [{:keys [keywordize-keys]} opts
          keyfn (if keywordize-keys keyword str)
          f (fn thisfn [x]
              (cond
                (satisfies? IEncodeClojure x)
                (-js->clj x (apply array-map opts))

                (seq? x)
                (doall (map thisfn x))

                (map-entry? x)
                (MapEntry. (thisfn (key x)) (thisfn (val x)) nil)

                (coll? x)
                (into (empty x) (map thisfn) x)

                (array? x)
                (persistent!
                 (reduce #(conj! %1 (thisfn %2))
                         (transient []) x))

                (or (identical? (type x) js/Object)
                    (and (= "object" (goog/typeOf x))
                         (not (= (type x) (type #inst"2020")))))
                (persistent!
                 (reduce (fn [r k] (assoc! r (keyfn k) (thisfn (gobject/get x k))))
                         (transient {}) (js-keys x)))
                :else x))]
      (f x))))


(defmulti esklp-endpoint (fn [endpoint _] endpoint))


(defmethod esklp-endpoint "smnn" [_ args]
  (GET "https://esklp.egisz.rosminzdrav.ru/restsearch_smnn" args))


(defmethod esklp-endpoint "resttrade-name" [_ args]
  (GET "https://esklp.egisz.rosminzdrav.ru/resttrade_name" args))


(defmethod esklp-endpoint "restsearch-klp" [_ args]
  (GET "https://esklp.egisz.rosminzdrav.ru/restsearch_klp" args))


(defn search* [endpoint args]
  (esklp-endpoint endpoint args))


(defn ^:export search [endpoint args]
  (search* endpoint (-> (my-js->clj args :keywordize-keys true)
                        (update :handler comp clj->js))))


(defn ^:export search-resttrade-name [search-str callback]
  (search "resttrade-name" (clj->js {:params {:name search-str} :handler callback})))


(defn ^:export find-drugs [drug callback]
  (let [trade-name-id (get (my-js->clj drug) "id")]
    (letfn [(handle-smnn-resp [smnn-resp]
              (->> (get smnn-resp "results")
                   (filter #(get % "smnn_is_active"))
                   (mapv resp-row->drug-package)))

            (resp-row->drug-package [row]
              {:drug      drug
               :shortName (get row "smnn_pe_note")
               :fullName  (get row "std_lf_name")
               :dosage    (get row "std_dosage")})

            #_(search-klp [smnn-resp]
              (search* "restsearch-klp"
                       {:params {:trade_name_id trade-name-id
                                 :smnn_gid      (get (handle-smnn-resp smnn-resp) "smnn_gid")}
                        :handler handle-search-klp}))

            #_(handle-search-klp [restsearch-klp-resp]
              (->> (get restsearch-klp-resp "results")
                   #_(filter #(get % "klp_is_active"))
                   clj->js
                   callback))]
      (search* "smnn"
               {:params {:trade_name_id trade-name-id}
                :handler (comp callback clj->js handle-smnn-resp)}))))


(defn parse-int [s]
  (js/parseInt s 10))


(defn get-dosage [package]
  (-> (get package :dosage "")
      (str/split #" " 2)
      first
      parse-int))


(defn ^:export reeval-schedule [schedule* new-package*]
  (let [old-schedule (my-js->clj schedule* :keywordize-keys true)
        new-package  (my-js->clj new-package* :keywordize-keys true)

        new-dosage (get-dosage new-package)
        old-dosage (get-dosage (:package old-schedule))

        new-schedule (->> (assoc old-schedule :package new-package)
                          (sp/transform [:events sp/MAP-VALS :dosage]
                                        #(* % (/ old-dosage new-dosage))))]
    (clj->js new-schedule)))


(defn enum [enum-table hmap]
  (sp/transform [sp/MAP-KEYS] enum-table hmap))


(def schedule-event-type-enum
  {:breakfast 0
   :lunch     1
   :dinner    2
   :supper    3})


(defn enum-schedule-event-type [hmap]
  (enum schedule-event-type-enum hmap))


(def schedule-event-type-time-of-day
  (enum-schedule-event-type
   {:breakfast 8
    :lunch     12
    :dinner    18
    :supper    21}))


(def schedule-event-type-display
  (enum-schedule-event-type
   {:breakfast "завтрак"
    :lunch     "полдник"
    :dinner    "обед"
    :supper    "ужин"}))


(defn collect-events [recipies]
  (for [recipe   recipies
        course   (:courses recipe)
        schedule (:schedules course)
        event    (:events schedule)]
    {:event       event
     :time-of-day (+ (or (:timeOfDay event)
                         (when-let [t (:type event)]
                           (schedule-event-type-time-of-day t)))
                     (/ (:timeOffset event 0) 60))
     :start-date  (:startDate course)
     :end-date    (:endDate course)
     :package     (:package schedule)}))


(defn ^:export schedule-for-a-day [date recipies*]
  (->> (my-js->clj recipies* :keywordize-keys true)
       collect-events
       (filterv #(and (<= date (or (:end-date %) date))
                      (>= date (or (:start-date %) date))
                      (if (and (contains? % :start-date)
                               (contains? (:event %) :repeatInterval))
                        (zero? (rem (- date (:start-date %))
                                    (get-in % [:event :repeatInterval])))
                        true)))
       (sort-by :time-of-day)
       (mapv #(select-keys % [:package :event]))
       clj->js))


(defn get-num-ending [number {:keys [nom gen plu]}]
  (let [num (rem (Math/abs number) 100)]
    (cond
      (str/includes? (str number) ".") gen
      (<= 11 num 19)                   plu
      :else
      (case (rem num 10)
        1       nom
        (2 3 4) gen
        plu))))


(def dose-forms {:nom "доза", :gen "дозы", :plu "доз"})

(def minute-forms {:nom "минута", :gen "минуты", :plu "минут"})

(def hour-forms {:nom "час", :gen "часа", :plu "часов"})


(defn format-event-package [{:keys [drug] :as package} event]
  (->> [(:name drug)
        (:dosage package)
        (str (or (:shortName package)
                 (:fullName package))
             ",")
        (:dosage event)
        (get-num-ending (:dosage event) dose-forms)]
       (remove nil?)
       (str/join \space)
       str/capitalize))


(defn format-event-time [event]
  (let [time-offset (:timeOffset event 0)
        preposition (cond (neg? time-offset)  :before
                          (zero? time-offset) :at
                          (pos? time-offset)  :after)
        offset      (when-not (zero? time-offset)
                      (Math/abs time-offset))
        time        (or (:timeOfDay event)
                        (schedule-event-type-display (:type event)))
        word?       (contains? event :type)
        num?        (contains? event :timeOfDay)
        skip-offset? (= 1 offset)]
    (->> [(when-not skip-offset?
            (case preposition
              :before "за"
              :at     (if word? "во время" "в")
              :after  "через"
              nil))
          (when (and offset (not skip-offset?))
            [offset
             (get-num-ending offset minute-forms)])
          (case preposition
            :before "до"
            :at     nil
            :after  "после"
            nil)
          (cond-> time word? (str "а"))

          (when-let [t (and num? (:timeOfDay event))]
            (get-num-ending t hour-forms))]
         flatten
         (remove nil?)
         (str/join \space)
         str/capitalize)))


(defn ^:export formatted-schedule-for-a-day [date recipies*]
  (->> (my-js->clj (schedule-for-a-day date recipies*) :keywordize-keys true)
       (mapv #(-> %
                  (update :event format-event-time)
                  (update :package format-event-package (:event %))))
       (partition-by :event)
       (mapv #(-> {:event (-> % first :event)
                   :drugs (mapv :package %)}))
       clj->js))
