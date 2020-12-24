(ns ^:figwheel-hooks shopping-list.core
  (:require [ajax.core :refer [GET]]))


(defmulti esklp-endpoint (fn [endpoint _] endpoint))


(defmethod esklp-endpoint "smnn" [_ args]
  (GET "https://esklp.egisz.rosminzdrav.ru/restsearch_smnn" args))


(defn search* [endpoint args]
  (esklp-endpoint endpoint args))


(defn ^:export search [endpoint args]
  (search* endpoint (-> (js->clj args :keywordize-keys true)
                        (update :handler comp clj->js))))


(defn ^:export search-smnn [args]
  (search "smnn" args))
