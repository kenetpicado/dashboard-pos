import{J as de,K as pe,L as me,M as fe,F as w,N as he,R as ge,S as _e,P as be,C as ve,Q as ye,A as we,U as Se,V as Ce,W as ke,X as xe,Y as $e,_ as Ne,$ as Pe,a0 as Me,a1 as Ee,c as j,a2 as Be,g as B,e as V,a as d,b,a3 as Te,a4 as Re,a5 as Le,a6 as je,a7 as Ve,a8 as Fe,I as Ae,d as y,a9 as De,aa as Oe,ab as ze,ac as He,ad as qe,ae as Ie,af as Ue,ag as Xe,ah as Ke,ai as Ge,aj as We,ak as Je,al as Qe,am as Ye,an as Ze,ao as et,ap as tt,aq as at,G as st,ar as nt,as as ot,at as rt,au as it,av as lt,aw as ct,ax as ut,ay as dt,az as pt,aA as mt,aB as ft,aC as ht,aD as gt,aE as _t,aF as bt,aG as vt,aH as yt,aI as wt,aJ as St,n as v,aK as Ct,q as kt,aL as xt,aM as $t,aN as Nt,aO as Pt,aP as Mt,aQ as Et,y as Bt,aR as Tt,aS as Rt,aT as Lt,aU as jt,z as Vt,aV as Ft,o as l,aW as At,aX as Dt,aY as Ot,aZ as zt,a_ as Ht,j as F,a$ as qt,i as A,b0 as It,H as Ut,r as S,p as D,b1 as Xt,b2 as Kt,s as Gt,b3 as Wt,b4 as Jt,b5 as Qt,b6 as Yt,b7 as Zt,b8 as ea,b9 as ta,ba as aa,bb as sa,bc as na,bd as oa,t as C,be as ra,bf as ia,bg as la,bh as ca,bi as ua,bj as da,bk as pa,bl as ma,u as O,bm as fa,bn as ha,bo as ga,bp as _a,bq as ba,br as va,bs as ya,v as wa,bt as Sa,bu as Ca,bv as ka,m as xa,B as $a,bw as Na,bx as Pa,k as z,by as Ma,bz as Ea,bA as Ba,bB as Ta,h as $,bC as Ra,w as La,bD as ja,bE as Va,f as Fa,bF as Aa,O as H,bG as Da,D as Oa,E as za}from"./app-5a7a6f29.js";import{_ as Ha,a as qa}from"./ProductCard-eeca94c2.js";import{l as Ia}from"./lodash-6e1a769a.js";const Ua=()=>{},Xa=Object.freeze(Object.defineProperty({__proto__:null,BaseTransition:de,BaseTransitionPropsValidators:pe,Comment:me,EffectScope:fe,Fragment:w,KeepAlive:he,ReactiveEffect:ge,Static:_e,Suspense:be,Teleport:ve,Text:ye,Transition:we,TransitionGroup:Se,VueElement:Ce,assertNumber:ke,callWithAsyncErrorHandling:xe,callWithErrorHandling:$e,camelize:Ne,capitalize:Pe,cloneVNode:Me,compatUtils:Ee,compile:Ua,computed:j,createApp:Be,createBlock:B,createCommentVNode:V,createElementBlock:d,createElementVNode:b,createHydrationRenderer:Te,createPropsRestProxy:Re,createRenderer:Le,createSSRApp:je,createSlots:Ve,createStaticVNode:Fe,createTextVNode:Ae,createVNode:y,customRef:De,defineAsyncComponent:Oe,defineComponent:ze,defineCustomElement:He,defineEmits:qe,defineExpose:Ie,defineModel:Ue,defineOptions:Xe,defineProps:Ke,defineSSRCustomElement:Ge,defineSlots:We,get devtools(){return Je},effect:Qe,effectScope:Ye,getCurrentInstance:Ze,getCurrentScope:et,getTransitionRawChildren:tt,guardReactiveProps:at,h:st,handleError:nt,hasInjectionContext:ot,hydrate:rt,initCustomFormatter:it,initDirectivesForSSR:lt,inject:ct,isMemoSame:ut,isProxy:dt,isReactive:pt,isReadonly:mt,isRef:ft,isRuntimeOnly:ht,isShallow:gt,isVNode:_t,markRaw:bt,mergeDefaults:vt,mergeModels:yt,mergeProps:wt,nextTick:St,normalizeClass:v,normalizeProps:Ct,normalizeStyle:kt,onActivated:xt,onBeforeMount:$t,onBeforeUnmount:Nt,onBeforeUpdate:Pt,onDeactivated:Mt,onErrorCaptured:Et,onMounted:Bt,onRenderTracked:Tt,onRenderTriggered:Rt,onScopeDispose:Lt,onServerPrefetch:jt,onUnmounted:Vt,onUpdated:Ft,openBlock:l,popScopeId:At,provide:Dt,proxyRefs:Ot,pushScopeId:zt,queuePostFlushCb:Ht,reactive:F,readonly:qt,ref:A,registerRuntimeCompiler:It,render:Ut,renderList:S,renderSlot:D,resolveComponent:Xt,resolveDirective:Kt,resolveDynamicComponent:Gt,resolveFilter:Wt,resolveTransitionHooks:Jt,setBlockTracking:Qt,setDevtoolsHook:Yt,setTransitionHooks:Zt,shallowReactive:ea,shallowReadonly:ta,shallowRef:aa,ssrContextKey:sa,ssrUtils:na,stop:oa,toDisplayString:C,toHandlerKey:ra,toHandlers:ia,toRaw:la,toRef:ca,toRefs:ua,toValue:da,transformVNodeArgs:pa,triggerRef:ma,unref:O,useAttrs:fa,useCssModule:ha,useCssVars:ga,useModel:_a,useSSRContext:ba,useSlots:va,useTransitionState:ya,vModelCheckbox:wa,vModelDynamic:Sa,vModelRadio:Ca,vModelSelect:ka,vModelText:xa,vShow:$a,version:Na,warn:Pa,watch:z,watchEffect:Ma,watchPostEffect:Ea,watchSyncEffect:Ba,withAsyncContext:Ta,withCtx:$,withDefaults:Ra,withDirectives:La,withKeys:ja,withMemo:Va,withModifiers:Fa,withScopeId:Aa},Symbol.toStringTag,{value:"Module"})),Ka={key:0,class:"mb-4"},Ga={class:"flex justify-between items-center gap-1"},Wa=["onClick"],Ja={__name:"CatalogPaginator",props:{links:{type:Object,required:!1}},setup(c){const a=c,p=j(()=>a.links.slice(1,a.links.length-1));function f(h){const o=new URLSearchParams(window.location.search),s={};["category_id","measure"].forEach(n=>{const i=o.get(n);i!==null?s[n]=i:delete s[n]}),H.get(h,s,{preserveState:!0,preserveScroll:!0})}return(h,o)=>c.links&&p.value.length>1?(l(),d("div",Ka,[b("div",Ga,[(l(!0),d(w,null,S(p.value,s=>(l(),d("button",{type:"button",onClick:e=>f(s.url),class:v(["rounded-md select-none",{"bg-roseh-pink text-white px-3 py-1":s.active}])},C(s.label),11,Wa))),256))])])):V("",!0)}},Qa={class:"container mx-auto p-4"},Ya={class:"mb-2 text-roseh-blue font-bold"},Za={class:"flex gap-3 overflow-x-auto hide-scrollbar text-xs"},L={__name:"HorizontalItems",props:{title:{type:String,required:!0}},setup(c){return(a,p)=>(l(),d("div",Qa,[b("h1",Ya,C(c.title),1),b("div",Za,[D(a.$slots,"default")])]))}};var q={exports:{}};const es=Da(Xa);(function(c,a){(function(f,h){c.exports=h(es)})(Oa,p=>(()=>{var f={657:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.default=(i,N)=>{const k=i.__vccOpts||i;for(const[P,M]of N)k[P]=M;return k}},976:e=>{e.exports=p}},h={};function o(e){var n=h[e];if(n!==void 0)return n.exports;var i=h[e]={exports:{}};return f[e](i,i.exports,o),i.exports}o.d=(e,n)=>{for(var i in n)o.o(n,i)&&!o.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),o.r=e=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s={};return(()=>{o.r(s),o.d(s,{Component:()=>E,LoadingPlugin:()=>le,default:()=>ce,useLoading:()=>T});var e=o(976);function n(t){var r;typeof t.remove<"u"?t.remove():(r=t.parentNode)==null||r.removeChild(t)}function i(t,r,g){let m=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const _=(0,e.h)(t,r,m),u=document.createElement("div");return u.classList.add("vld-container"),g.appendChild(u),(0,e.render)(_,u),_.component}function N(){return typeof window<"u"}const k=N()?window.HTMLElement:Object,P=["aria-busy"],M={class:"vl-icon"};function I(t,r,g,m,_,u){return(0,e.openBlock)(),(0,e.createBlock)(e.Transition,{name:t.transition},{default:(0,e.withCtx)(()=>[(0,e.withDirectives)((0,e.createElementVNode)("div",{tabindex:"0",class:(0,e.normalizeClass)(["vl-overlay vl-active",{"vl-full-page":t.isFullPage}]),"aria-busy":t.isActive,"aria-label":"Loading",style:(0,e.normalizeStyle)({zIndex:t.zIndex})},[(0,e.createElementVNode)("div",{class:"vl-background",onClick:r[0]||(r[0]=(0,e.withModifiers)(function(){return t.cancel&&t.cancel(...arguments)},["prevent"])),style:(0,e.normalizeStyle)(t.bgStyle)},null,4),(0,e.createElementVNode)("div",M,[(0,e.renderSlot)(t.$slots,"before"),(0,e.renderSlot)(t.$slots,"default",{},()=>[((0,e.openBlock)(),(0,e.createBlock)((0,e.resolveDynamicComponent)(t.loader),{color:t.color,width:t.width,height:t.height},null,8,["color","width","height"]))]),(0,e.renderSlot)(t.$slots,"after")])],14,P),[[e.vShow,t.isActive]])]),_:3},8,["name"])}const U={mounted(){this.enforceFocus&&document.addEventListener("focusin",this.focusIn)},methods:{focusIn(t){if(!this.isActive||t.target===this.$el||this.$el.contains(t.target))return;let r=this.container?this.container:this.isFullPage?null:this.$el.parentElement;(this.isFullPage||r&&r.contains(t.target))&&(t.preventDefault(),this.$el.focus())}},beforeUnmount(){document.removeEventListener("focusin",this.focusIn)}},X=["width","height","stroke"],K=[(0,e.createStaticVNode)('<g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".25" cx="18" cy="18" r="18"></circle><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.8s" repeatCount="indefinite"></animateTransform></path></g></g>',1)];function G(t,r,g,m,_,u){return(0,e.openBlock)(),(0,e.createElementBlock)("svg",{viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",width:t.width,height:t.height,stroke:t.color},K,8,X)}const W=(0,e.defineComponent)({name:"spinner",props:{color:{type:String,default:"#000"},height:{type:Number,default:64},width:{type:Number,default:64}}});var x=o(657);const J=(0,x.default)(W,[["render",G]]),Q=["fill","width","height"],Y=[(0,e.createStaticVNode)('<circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" fill-opacity="0.3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle>',3)];function Z(t,r,g,m,_,u){return(0,e.openBlock)(),(0,e.createElementBlock)("svg",{viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg",fill:t.color,width:t.width,height:t.height},Y,8,Q)}const ee=(0,e.defineComponent)({name:"dots",props:{color:{type:String,default:"#000"},height:{type:Number,default:240},width:{type:Number,default:60}}}),te=(0,x.default)(ee,[["render",Z]]),ae=["height","width","fill"],se=[(0,e.createStaticVNode)('<rect x="0" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="10" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="20" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect>',3)];function ne(t,r,g,m,_,u){return(0,e.openBlock)(),(0,e.createElementBlock)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30",height:t.height,width:t.width,fill:t.color},se,8,ae)}const oe=(0,e.defineComponent)({name:"bars",props:{color:{type:String,default:"#000"},height:{type:Number,default:40},width:{type:Number,default:40}}}),re={Spinner:J,Dots:te,Bars:(0,x.default)(oe,[["render",ne]])},ie=(0,e.defineComponent)({name:"VueLoading",mixins:[U],props:{active:Boolean,programmatic:Boolean,container:[Object,Function,k],isFullPage:{type:Boolean,default:!0},enforceFocus:{type:Boolean,default:!0},lockScroll:Boolean,transition:{type:String,default:"fade"},canCancel:Boolean,onCancel:{type:Function,default:()=>{}},color:String,backgroundColor:String,opacity:Number,width:Number,height:Number,zIndex:Number,loader:{type:String,default:"spinner"}},components:re,emits:["hide","update:active"],data(){return{isActive:this.active}},mounted(){document.addEventListener("keyup",this.keyPress)},methods:{cancel(){!this.canCancel||!this.isActive||(this.hide(),this.onCancel.apply(null,arguments))},hide(){this.$emit("hide"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout(()=>{const t=this.$el.parentElement;(0,e.render)(null,t),n(t)},150))},disableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.add("vl-shown")},enableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.remove("vl-shown")},keyPress(t){t.keyCode===27&&this.cancel()}},watch:{active(t){this.isActive=t},isActive(t){t?this.disableScroll():this.enableScroll()}},computed:{bgStyle(){return{background:this.backgroundColor,opacity:this.opacity}}},beforeUnmount(){document.removeEventListener("keyup",this.keyPress)}}),E=(0,x.default)(ie,[["render",I]]);function T(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return{show(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:t,m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:r;const u={...t,...g,...{programmatic:!0,lockScroll:!0,isFullPage:!1,active:!0}};let R=u.container;u.container||(R=document.body,u.isFullPage=!0);const ue={...r,...m};return{hide:i(E,u,R,ue).ctx.hide}}}}const le=function(t){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},g=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const m=T(r,g);t.config.globalProperties.$loading=m,t.provide("$loading",m)},ce=E})(),s})())})(q);var ts=q.exports;const as=za(ts);const ss=["onClick"],ns=["onClick"],os={class:"p-4 container mx-auto"},rs={key:0,class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"},is={key:1,class:"text-center text-gray-500"},ys={__name:"Index",props:{products:{type:Object,required:!0},categories:{type:Object,required:!0},measures:{type:Object,required:!0}},setup(c){const a=F({category_id:null,measure:null}),p=A(!1),f=new URLSearchParams(window.location.search);f.get("category_id")&&(a.category_id=f.get("category_id")),f.get("measure")&&(a.measure=f.get("measure"));const h=Ia.debounce(([o,s])=>{o||delete a.category_id,s||delete a.measure,H.get(route("catalogue.index"),a,{preserveState:!0,preserveScroll:!0,only:["products"],onSuccess:()=>{p.value=!1}})},500);return z(()=>[a.category_id,a.measure],([o,s])=>{p.value=!0,h([o,s])}),(o,s)=>(l(),B(Ha,{head:"Catalogo"},{default:$(()=>[y(L,{title:"Categorias"},{default:$(()=>[b("button",{type:"button",class:v(a.category_id==null?"active-tab":"inactive-tab"),onClick:s[0]||(s[0]=e=>a.category_id=null)}," Todas ",2),(l(!0),d(w,null,S(c.categories,e=>(l(),d("button",{type:"button",class:v(a.category_id==e.id?"active-tab":"inactive-tab"),onClick:n=>a.category_id=e.id},C(e.name),11,ss))),256))]),_:1}),y(L,{title:"Medidas"},{default:$(()=>[b("button",{type:"button",class:v(a.measure==null?"active-tab":"inactive-tab"),onClick:s[1]||(s[1]=e=>a.measure=null)}," Todas ",2),(l(!0),d(w,null,S(c.measures,e=>(l(),d("button",{type:"button",class:v(a.measure==e.name?"active-tab":"inactive-tab"),onClick:n=>a.measure=e.name},C(e.name),11,ns))),256))]),_:1}),b("div",os,[y(O(as),{active:p.value,"is-full-page":!0},null,8,["active"]),c.products.data.length>0?(l(),d("div",rs,[(l(!0),d(w,null,S(c.products.data,e=>(l(),B(qa,{key:e.id,product:e},null,8,["product"]))),128))])):(l(),d("div",is," No hay productos disponibles ")),y(Ja,{links:c.products.links},null,8,["links"])])]),_:1}))}};export{ys as default};
