import{_ as V}from"./ColorList-8846eb65.js";import{_ as w}from"./DateColumn-6c995be3.js";import{_ as N}from"./EditInventoryForm-fd3e2f4b.js";import{_ as O}from"./InputForm-fa43bd3b.js";import{_ as P}from"./SelectForm-3a92e7d4.js";import{_ as T}from"./StatCard-be18b32d.js";import{T as j}from"./TableSection-d9bd335d.js";import{_ as B}from"./ThePaginator-b3fcd5d9.js";import{_ as E,I as L}from"./AppLayout-88958e68.js";import{c as M}from"./helpers-776bcd81.js";import{t as F}from"./toast-d7c944f6.js";import{i as U,j as v,c as z,O as y,k as A,o as l,g,h as d,b as e,d as n,a as c,r as p,t as i,F as h,u as b,e as D}from"./app-8e3d211d.js";import{l as R}from"./lodash-aab87c8d.js";import{I as G}from"./IconCurrencyDollar-7604b8f7.js";import{I as H}from"./IconPencil-ce82e939.js";import{I as J}from"./IconTrash-d6278411.js";import"./Carbon-053ffa43.js";import"./FormModal-48207fa3.js";import"./createVueComponent-60bf177b.js";import"./_plugin-vue_export-helper-c27b6911.js";const K=e("span",{class:"title"}," Inventario ",-1),Q={class:"mb-1"},W={class:"grid grid-cols-5 gap-4"},X=e("option",{selected:"",value:""},"Todos",-1),Y=["value"],Z={class:"mb-4"},ee={class:"grid grid-cols-5 gap-4"},te=e("th",null,"Fecha",-1),oe=e("th",null,"Producto",-1),se=e("th",null,"Colors",-1),re=e("th",null,"Medida",-1),ne=e("th",null,"Cantidad",-1),ae=e("th",null,"Costo (ud.)",-1),le=e("th",null,"Todal",-1),ie=e("th",null,"Actions",-1),ue={class:"hover:bg-gray-50"},de={class:"uppercase"},ce={class:"text-gray-400 mt-2"},me={class:"font-bold"},_e={class:"flex justify-between gap-4"},pe={tooltip:"Editar"},he={tooltip:"Eliminar"},fe={key:0},ve=e("td",{colspan:"6",class:"text-center"},"No hay datos que mostrar",-1),ye=[ve],Ue={__name:"Index",props:{inventory:{type:Object,required:!0},total:{type:Number,required:!0},total_quantity:{type:[Number,String],required:!0},users:{type:Object,required:!0},measures:{type:Object,required:!0}},setup(u){const f=u,q=[{name:"Inicio",route:route("dashboard.index")},{name:"Inventario",route:route("dashboard.inventory.index")}],_=U(!1),o=v({id:null,measure:null,quantity:null,unit_price:null,colors:[]}),x=z(()=>[{title:"Inventario",value:"C$"+f.total.toLocaleString(),icon:G},{title:"Productos",value:f.total_quantity.toLocaleString(),icon:L}]),C=r=>{M({onConfirm:()=>{y.delete(route("dashboard.inventory.destroy",r),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{F.success("Eliminado correctamente")}})}})};function k(r){o.id=r.id,o.measure=r.measure,o.quantity=r.quantity,o.unit_price=r.unit_price,o.colors=r.colors,_.value=!0}function I(){o.id=null,o.measure=null,o.quantity=null,o.unit_price=null,o.colors=[],_.value=!1}const s=v({search:null,user_id:null}),m=new URLSearchParams(window.location.search);m.get("search")&&(s.search=m.get("search")),m.get("user_id")&&(s.user_id=m.get("user_id"));const $=R.debounce(([r,a])=>{r||delete s.search,a||delete s.user_id,y.get(route("dashboard.inventory.index"),s,{preserveState:!0,preserveScroll:!0,only:["inventory"]})},500);return A(()=>[s.search,s.user_id],$),(r,a)=>(l(),g(E,{title:"Inventario",breads:q},{header:d(()=>[K]),default:d(()=>[e("div",Q,[e("div",W,[n(O,{text:"Buscar",modelValue:s.search,"onUpdate:modelValue":a[0]||(a[0]=t=>s.search=t)},null,8,["modelValue"]),n(P,{text:"Responsable",modelValue:s.user_id,"onUpdate:modelValue":a[1]||(a[1]=t=>s.user_id=t)},{default:d(()=>[X,(l(!0),c(h,null,p(u.users,t=>(l(),c("option",{value:t.id},i(t.name),9,Y))),256))]),_:1},8,["modelValue"])])]),e("div",Z,[e("div",ee,[(l(!0),c(h,null,p(x.value,t=>(l(),g(T,{stat:t,key:t.title},null,8,["stat"]))),128))])]),n(j,null,{header:d(()=>[te,oe,se,re,ne,ae,le,ie]),body:d(()=>[(l(!0),c(h,null,p(u.inventory.data,(t,ge)=>(l(),c("tr",ue,[e("td",null,[n(w,{date:t.created_at},null,8,["date"])]),e("td",null,[e("div",de,i(t.product.name),1),e("div",ce,i(t.product.sku),1)]),e("td",null,[n(V,{colors:t.colors},null,8,["colors"])]),e("td",null,i(t.measure),1),e("td",null,i(t.quantity),1),e("td",null," C$"+i(t.unit_cost),1),e("td",null,[e("span",me,"C$"+i((t.quantity*t.unit_cost).toLocaleString()),1)]),e("td",null,[e("div",_e,[e("span",pe,[n(b(H),{size:"22",role:"button",onClick:S=>k(t)},null,8,["onClick"])]),e("span",he,[n(b(J),{size:"22",class:"text-red-200",role:"button",onClick:S=>C(t.id)},null,8,["onClick"])])])])]))),256)),u.inventory.data.length==0?(l(),c("tr",fe,ye)):D("",!0)]),paginator:d(()=>[n(B,{links:u.inventory.links},null,8,["links"])]),_:1}),n(N,{onOnCancel:a[2]||(a[2]=t=>I()),openModal:_.value,form:o,measures:u.measures},null,8,["openModal","form","measures"])]),_:1}))}};export{Ue as default};