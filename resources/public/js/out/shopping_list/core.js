// Compiled by ClojureScript 1.10.773 {:static-fns true, :optimize-constants true}
goog.provide('shopping_list.core');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('reagent.core');
goog.require('reagent.dom');
shopping_list.core.app_state = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
shopping_list.core.resource_path = (function shopping_list$core$resource_path(name){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$resources_DASH_path.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(shopping_list.core.app_state))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join('');
});
shopping_list.core.page = (function shopping_list$core$page(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,"Hello!"], null);
});
shopping_list.core.mount = (function shopping_list$core$mount(resources_path){
if(cljs.core.truth_(resources_path)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(shopping_list.core.app_state,cljs.core.assoc,cljs.core.cst$kw$resources_DASH_path,resources_path);
} else {
}

return reagent.dom.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [shopping_list.core.page], null),document.getElementById("app"));
});
goog.exportSymbol('shopping_list.core.mount', shopping_list.core.mount);
shopping_list.core.re_render = (function shopping_list$core$re_render(){
return shopping_list.core.mount(cljs.core.cst$kw$resources_DASH_path.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(shopping_list.core.app_state)));
});
