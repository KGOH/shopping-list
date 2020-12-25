(ns ^:figwheel-hooks shopping-list.core
  (:require [ajax.core :refer [GET]]))


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
                   (filter #(get % "smnn_is_active"))))

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
