(ns ^:figwheel-hooks shopping-list.core
  (:require [ajax.core :refer [GET]]))


(defmulti esklp-endpoint (fn [endpoint _] endpoint))


(defmethod esklp-endpoint "smnn" [_ args]
  (GET "https://esklp.egisz.rosminzdrav.ru/restsearch_smnn" args))


(defmethod esklp-endpoint "resttrade-name" [_ args]
  (GET "https://esklp.egisz.rosminzdrav.ru/resttrade_name" args))


(defn search* [endpoint args]
  (esklp-endpoint endpoint args))


(defn ^:export search [endpoint args]
  (search* endpoint (-> (js->clj args :keywordize-keys true)
                        (update :handler comp clj->js))))


(defn ^:export search-smnn [search-str callback]
  (search "smnn" (clj->js {:params {:trade_name_id search-str} :handler callback})))


(defn ^:export search-resttrade-name [search-str callback]
  (search "resttrade-name" (clj->js {:params {:name search-str} :handler callback})))
