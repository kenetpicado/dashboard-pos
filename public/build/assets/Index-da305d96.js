import{_ as V}from"./ColorList-125ecdf6.js";import{_ as w}from"./DateColumn-04c152e8.js";import{_ as N}from"./EditInventoryForm-b0812a09.js";import{_ as O}from"./InputForm-e80a44c7.js";import{_ as P}from"./SelectForm-4c87cb50.js";import{_ as T}from"./StatCard-c140a137.js";import{T as j}from"./TableSection-4a1f2b26.js";import{_ as B}from"./ThePaginator-0d695f63.js";import{_ as E,I as L}from"./AppLayout-b225eee9.js";import{c as M}from"./helpers-f4191763.js";import{t as F}from"./toast-0681aef9.js";import{i as U,j as v,c as z,O as y,k as A,o as l,g,h as d,b as t,d as n,a as c,r as p,t as i,F as h,u as b,e as D}from"./app-7e01fa35.js";import{l as R}from"./lodash-a141f88d.js";import{I as G}from"./IconCurrencyDollar-5301ae90.js";import{I as H}from"./IconPencil-03d21267.js";import{I as J}from"./IconTrash-ddfd38c1.js";import"./Carbon-053ffa43.js";import"./FormModal-739694c4.js";import"./createVueComponent-d4cf1915.js";import"./_plugin-vue_export-helper-c27b6911.js";const K=t("span",{class:"title"}," Inventario ",-1),Q={class:"mb-1"},W={class:"grid grid-cols-5 gap-4"},X=t("option",{selected:"",value:""},"Todos",-1),Y=["value"],Z={class:"mb-4"},tt={class:"grid grid-cols-5 gap-4"},et=t("th",null,"Fecha",-1),ot=t("th",null,"Producto",-1),st=t("th",null,"Colors",-1),rt=t("th",null,"Medida",-1),nt=t("th",null,"Cantidad",-1),at=t("th",null,"Costo (ud.)",-1),lt=t("th",null,"Todal",-1),it=t("th",null,"Actions",-1),ut={class:"hover:bg-gray-50"},dt={class:"uppercase"},ct={class:"text-gray-400 mt-2"},mt={class:"font-bold text-indigo-600"},_t={class:"flex justify-between gap-4"},pt={tooltip:"Editar"},ht={tooltip:"Eliminar"},ft={key:0},vt=t("td",{colspan:"6",class:"text-center"},"No hay datos que mostrar",-1),yt=[vt],Ut={__name:"Index",props:{inventory:{type:Object,required:!0},total:{type:Number,required:!0},total_quantity:{type:[Number,String],required:!0},users:{type:Object,required:!0},measures:{type:Object,required:!0}},setup(u){const f=u,q=[{name:"Inicio",route:route("dashboard.index")},{name:"Inventario",route:route("dashboard.inventory.index")}],_=U(!1),o=v({id:null,measure:null,quantity:null,unit_price:null,colors:[]}),x=z(()=>[{title:"Inventario",value:"C$"+f.total.toLocaleString(),icon:G},{title:"Productos",value:f.total_quantity.toLocaleString(),icon:L}]),C=r=>{M({onConfirm:()=>{y.delete(route("dashboard.inventory.destroy",r),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{F.success("Eliminado correctamente")}})}})};function k(r){o.id=r.id,o.measure=r.measure,o.quantity=r.quantity,o.unit_price=r.unit_price,o.colors=r.colors,_.value=!0}function I(){o.id=null,o.measure=null,o.quantity=null,o.unit_price=null,o.colors=[],_.value=!1}const s=v({search:null,user_id:null}),m=new URLSearchParams(window.location.search);m.get("search")&&(s.search=m.get("search")),m.get("user_id")&&(s.user_id=m.get("user_id"));const $=R.debounce(([r,a])=>{r||delete s.search,a||delete s.user_id,y.get(route("dashboard.inventory.index"),s,{preserveState:!0,preserveScroll:!0,only:["inventory","total","total_quantity"]})},500);return A(()=>[s.search,s.user_id],$),(r,a)=>(l(),g(E,{title:"Inventario",breads:q},{header:d(()=>[K]),default:d(()=>[t("div",Q,[t("div",W,[n(O,{text:"Buscar",modelValue:s.search,"onUpdate:modelValue":a[0]||(a[0]=e=>s.search=e)},null,8,["modelValue"]),n(P,{text:"Responsable",modelValue:s.user_id,"onUpdate:modelValue":a[1]||(a[1]=e=>s.user_id=e)},{default:d(()=>[X,(l(!0),c(h,null,p(u.users,e=>(l(),c("option",{value:e.id},i(e.name),9,Y))),256))]),_:1},8,["modelValue"])])]),t("div",Z,[t("div",tt,[(l(!0),c(h,null,p(x.value,e=>(l(),g(T,{stat:e,key:e.title},null,8,["stat"]))),128))])]),n(j,null,{header:d(()=>[et,ot,st,rt,nt,at,lt,it]),body:d(()=>[(l(!0),c(h,null,p(u.inventory.data,(e,gt)=>(l(),c("tr",ut,[t("td",null,[n(w,{date:e.created_at},null,8,["date"])]),t("td",null,[t("div",dt,i(e.product.name),1),t("div",ct,i(e.product.sku),1)]),t("td",null,[n(V,{colors:e.colors},null,8,["colors"])]),t("td",null,i(e.measure),1),t("td",null,i(e.quantity),1),t("td",null," C$"+i(e.unit_cost),1),t("td",null,[t("span",mt,"C$"+i((e.quantity*e.unit_cost).toLocaleString()),1)]),t("td",null,[t("div",_t,[t("span",pt,[n(b(H),{size:"22",role:"button",onClick:S=>k(e)},null,8,["onClick"])]),t("span",ht,[n(b(J),{size:"22",class:"text-red-200",role:"button",onClick:S=>C(e.id)},null,8,["onClick"])])])])]))),256)),u.inventory.data.length==0?(l(),c("tr",ft,yt)):D("",!0)]),paginator:d(()=>[n(B,{links:u.inventory.links},null,8,["links"])]),_:1}),n(N,{onOnCancel:a[2]||(a[2]=e=>I()),openModal:_.value,form:o,measures:u.measures},null,8,["openModal","form","measures"])]),_:1}))}};export{Ut as default};
