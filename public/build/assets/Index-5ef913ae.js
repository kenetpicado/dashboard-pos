import{_ as V}from"./DateColumn-f45ad586.js";import{_ as w}from"./EditInventoryForm-355442be.js";import{_ as N}from"./InputForm-7e10ab10.js";import{_ as O}from"./SelectForm-baa1cd97.js";import{_ as P}from"./StatCard-06e46789.js";import{T}from"./TableSection-53862e82.js";import{_ as j}from"./ThePaginator-917b3db3.js";import{_ as B,I as E}from"./AppLayout-48c7ce5f.js";import{c as L}from"./helpers-912a314d.js";import{t as M}from"./toast-432570cc.js";import{i as F,j as v,c as U,O as y,k as z,o as a,g,h as d,b as e,d as l,a as c,r as p,t as i,F as h,u as b,e as A}from"./app-abfa699b.js";import{l as D}from"./lodash-26f65637.js";import{I as R}from"./IconCurrencyDollar-0aaa8b04.js";import{I as G}from"./IconPencil-0ddf130c.js";import{I as H}from"./IconTrash-e0b11acb.js";import"./Carbon-053ffa43.js";import"./FormModal-2794491e.js";import"./createVueComponent-41fcc9fd.js";import"./_plugin-vue_export-helper-c27b6911.js";const J=e("span",{class:"title"}," Inventario ",-1),K={class:"mb-1"},Q={class:"grid grid-cols-5 gap-4"},W=e("option",{selected:"",value:""},"Todos",-1),X=["value"],Y={class:"mb-4"},Z={class:"grid grid-cols-5 gap-4"},ee=e("th",null,"Fecha",-1),te=e("th",null,"Producto",-1),oe=e("th",null,"Medida",-1),se=e("th",null,"Cantidad",-1),ne=e("th",null,"Costo (ud.)",-1),re=e("th",null,"Todal",-1),ae=e("th",null,"Actions",-1),le={class:"hover:bg-gray-50"},ie={class:"uppercase"},ue={class:"text-gray-400 mt-2"},de={class:"font-bold"},ce={class:"flex justify-between gap-4"},me={tooltip:"Editar"},_e={tooltip:"Eliminar"},pe={key:0},he=e("td",{colspan:"6",class:"text-center"},"No hay datos que mostrar",-1),fe=[he],Le={__name:"Index",props:{inventory:{type:Object,required:!0},total:{type:Number,required:!0},total_quantity:{type:[Number,String],required:!0},users:{type:Object,required:!0},measures:{type:Object,required:!0}},setup(u){const f=u,q=[{name:"Inicio",route:route("dashboard.index")},{name:"Inventario",route:route("dashboard.inventory.index")}],_=F(!1),s=v({id:null,measure:null,quantity:null,unit_price:null}),x=U(()=>[{title:"Inventario",value:"C$"+f.total.toLocaleString(),icon:R},{title:"Productos",value:f.total_quantity.toLocaleString(),icon:E}]),k=n=>{L({onConfirm:()=>{y.delete(route("dashboard.inventory.destroy",n),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{M.success("Eliminado correctamente")}})}})};function C(n){s.id=n.id,s.measure=n.measure,s.quantity=n.quantity,s.unit_price=n.unit_price,_.value=!0}function I(){s.id=null,s.measure=null,s.quantity=null,s.unit_price=null,_.value=!1}const o=v({search:null,user_id:null}),m=new URLSearchParams(window.location.search);m.get("search")&&(o.search=m.get("search")),m.get("user_id")&&(o.user_id=m.get("user_id"));const S=D.debounce(([n,r])=>{n||delete o.search,r||delete o.user_id,y.get(route("dashboard.inventory.index"),o,{preserveState:!0,preserveScroll:!0,only:["inventory"]})},500);return z(()=>[o.search,o.user_id],S),(n,r)=>(a(),g(B,{title:"Inventario",breads:q},{header:d(()=>[J]),default:d(()=>[e("div",K,[e("div",Q,[l(N,{text:"Buscar",modelValue:o.search,"onUpdate:modelValue":r[0]||(r[0]=t=>o.search=t)},null,8,["modelValue"]),l(O,{text:"Responsable",modelValue:o.user_id,"onUpdate:modelValue":r[1]||(r[1]=t=>o.user_id=t)},{default:d(()=>[W,(a(!0),c(h,null,p(u.users,t=>(a(),c("option",{value:t.id},i(t.name),9,X))),256))]),_:1},8,["modelValue"])])]),e("div",Y,[e("div",Z,[(a(!0),c(h,null,p(x.value,t=>(a(),g(P,{stat:t,key:t.title},null,8,["stat"]))),128))])]),l(T,null,{header:d(()=>[ee,te,oe,se,ne,re,ae]),body:d(()=>[(a(!0),c(h,null,p(u.inventory.data,(t,ve)=>(a(),c("tr",le,[e("td",null,[l(V,{date:t.created_at},null,8,["date"])]),e("td",null,[e("div",ie,i(t.product.name),1),e("div",ue,i(t.product.sku),1)]),e("td",null,i(t.measure),1),e("td",null,i(t.quantity),1),e("td",null," C$"+i(t.unit_cost),1),e("td",null,[e("span",de,"C$"+i((t.quantity*t.unit_cost).toLocaleString()),1)]),e("td",null,[e("div",ce,[e("span",me,[l(b(G),{size:"22",role:"button",onClick:$=>C(t)},null,8,["onClick"])]),e("span",_e,[l(b(H),{size:"22",class:"text-red-200",role:"button",onClick:$=>k(t.id)},null,8,["onClick"])])])])]))),256)),u.inventory.data.length==0?(a(),c("tr",pe,fe)):A("",!0)]),paginator:d(()=>[l(j,{links:u.inventory.links},null,8,["links"])]),_:1}),l(w,{onOnCancel:r[2]||(r[2]=t=>I()),openModal:_.value,form:s,measures:u.measures},null,8,["openModal","form","measures"])]),_:1}))}};export{Le as default};
