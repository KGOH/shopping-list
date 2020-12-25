(ns ^:figwheel-hooks shopping-list.core
  (:require [ajax.core :refer [GET]]
            [com.rpl.specter :as sp]
            [clojure.string :as str]))


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
  (search* endpoint (-> (js->clj args :keywordize-keys true)
                        (update :handler comp clj->js))))


(defn ^:export search-resttrade-name [search-str callback]
  (search "resttrade-name" (clj->js {:params {:name search-str} :handler callback})))


(defn ^:export find-drugs [drug callback]
  (let [trade-name-id (get (js->clj drug) "id")]
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
  (let [old-schedule (js->clj schedule* :keywordize-keys true)
        new-package  (js->clj new-package* :keywordize-keys true)

        new-dosage (get-dosage new-package)
        old-dosage (get-dosage (:package old-schedule))

        new-schedule (->> (assoc old-schedule :package new-package)
                          (sp/transform [:events sp/MAP-VALS :dosage]
                                        #(* % (/ old-dosage new-dosage))))]
    (clj->js new-schedule)))


(def schedule-event-type-enum
  {:breakfast 0
   :lunch     1
   :dinner    2
   :supper    3})


(def schedule-event-type-time-of-day
  (sp/transform
   [sp/MAP-KEYS]
   schedule-event-type-enum
   {:breakfast 8
    :lunch     12
    :dinner    18
    :supper    21}))


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
  (->> (js->clj recipies* :keywordize-keys true)
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
