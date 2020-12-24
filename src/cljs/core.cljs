(ns ^:figwheel-hooks shopping-list.core
  (:require [reagent.core :as r]
            [reagent.dom :as rd]))

(def app-state (atom {}))

(defn resource-path [name]
  (str (:resources-path @app-state) name))

(defn page []
  [:div "Hello!"])

(defn ^:export mount [resources-path]
  (when resources-path
    (swap! app-state assoc :resources-path resources-path))
  (rd/render [page] (.getElementById js/document "app")))

(defn ^:after-load re-render []
  (mount (:resources-path @app-state)))
