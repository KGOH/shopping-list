// Compiled by ClojureScript 1.10.773 {:static-fns true, :optimize-constants true}
goog.provide('reagent.debug');
goog.require('cljs.core');
goog.require('cljs.core.constants');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
(o.warn = (function() { 
var G__3467__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$warn], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__3467 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__3468__i = 0, G__3468__a = new Array(arguments.length -  0);
while (G__3468__i < G__3468__a.length) {G__3468__a[G__3468__i] = arguments[G__3468__i + 0]; ++G__3468__i;}
  args = new cljs.core.IndexedSeq(G__3468__a,0,null);
} 
return G__3467__delegate.call(this,args);};
G__3467.cljs$lang$maxFixedArity = 0;
G__3467.cljs$lang$applyTo = (function (arglist__3469){
var args = cljs.core.seq(arglist__3469);
return G__3467__delegate(args);
});
G__3467.cljs$core$IFn$_invoke$arity$variadic = G__3467__delegate;
return G__3467;
})()
);

(o.error = (function() { 
var G__3470__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$error], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__3470 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__3471__i = 0, G__3471__a = new Array(arguments.length -  0);
while (G__3471__i < G__3471__a.length) {G__3471__a[G__3471__i] = arguments[G__3471__i + 0]; ++G__3471__i;}
  args = new cljs.core.IndexedSeq(G__3471__a,0,null);
} 
return G__3470__delegate.call(this,args);};
G__3470.cljs$lang$maxFixedArity = 0;
G__3470.cljs$lang$applyTo = (function (arglist__3472){
var args = cljs.core.seq(arglist__3472);
return G__3470__delegate(args);
});
G__3470.cljs$core$IFn$_invoke$arity$variadic = G__3470__delegate;
return G__3470;
})()
);

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
(reagent.debug.tracking = true);

cljs.core.reset_BANG_(reagent.debug.warnings,null);

(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));

var warns = cljs.core.deref(reagent.debug.warnings);
cljs.core.reset_BANG_(reagent.debug.warnings,null);

(reagent.debug.tracking = false);

return warns;
});
