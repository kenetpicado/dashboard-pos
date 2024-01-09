import{_ as T}from"./DateColumn-45ef59bf.js";import{_ as f}from"./InputForm-b75227be.js";import{_ as y}from"./SelectForm-7c21409b.js";import{_ as $}from"./StatCard-f8e4eec2.js";import{T as I}from"./TableSection-bf34236f.js";import{_ as w}from"./ThePaginator-536f1e87.js";import{_ as D}from"./AppLayout-7f5e14d0.js";import{c as N}from"./helpers-7c76aa95.js";import{t as q}from"./toast-5832cfeb.js";import{j as E,c as L,O as b,k as O,o as s,g,h as r,b as e,d as a,a as l,r as m,t as d,F as _,n as P,u as p,l as U,e as j}from"./app-b76a9bfc.js";import{l as A}from"./lodash-b34d7fc5.js";import{I as B}from"./IconCurrencyDollarOff-3d56bb6c.js";import{I as F}from"./IconCurrencyDollar-41846dd3.js";import{I as R}from"./IconEye-17397c65.js";import{I as z}from"./IconTrash-1e5269db.js";import"./Carbon-053ffa43.js";import"./createVueComponent-19caef2b.js";import"./_plugin-vue_export-helper-c27b6911.js";const H=e("span",{class:"title"}," Transacciones ",-1),M={class:"mb-3"},G={class:"grid grid-cols-5 gap-4"},J=e("option",{selected:"",value:""},"Todos",-1),K=["value"],Q=e("option",{selected:"",value:""},"Todos",-1),W=e("option",{value:"buy"},"Compra",-1),X=e("option",{value:"sell"},"Venta",-1),Y={class:"mb-4"},Z={class:"grid grid-cols-5 gap-4"},ee=e("th",null,"Fecha",-1),te=e("th",null,"Factura #",-1),oe=e("th",null,"Tipo",-1),se=e("th",null,"Responsable",-1),ae=e("td",null,"Productos",-1),ne=e("th",null,"Descuento",-1),re=e("th",null,"Total",-1),le=e("th",null,"Acciones",-1),de={class:"hover:bg-gray-50"},ie={key:0,class:"font-bold"},ue={key:1,class:"font-bold"},ce={class:"flex justify-between gap-4"},me=["onClick"],_e={key:0},pe=e("td",{colspan:"8",class:"text-center"},"No hay datos que mostrar",-1),he=[pe],Pe={__name:"Index",props:{transactions:{type:Object,required:!0},sell_month:{type:Number,required:!0},buy_month:{type:Number,required:!0},users:{type:Object,required:!0}},setup(u){const h=u,v={buy:"COMPRA",sell:"VENTA"},V=[{name:"Inicio",route:route("dashboard.index")},{name:"Transacciones",route:route("dashboard.transactions.index")}],C={buy:"badge-red",sell:"badge-indigo"},c=new URLSearchParams(window.location.search),o=E({user_id:c.get("user_id")??"",from:c.get("from")??"",to:c.get("to")??"",type:c.get("type")??""}),x=L(()=>[{title:o.from||o.to?"Compras":"Compras del mes",value:"C$"+h.buy_month.toLocaleString(),icon:B},{title:o.from||o.to?"Ventas":"Ventas del mes",value:"C$"+h.sell_month.toLocaleString(),icon:F}]),k=A.debounce(()=>{for(const i in o)o[i]||delete o[i];b.get(route("dashboard.transactions.index"),o,{preserveState:!0,preserveScroll:!0,only:["transactions","buy_month","sell_month"]})},500);O(()=>o,k,{deep:!0});function S(i){N({onConfirm:()=>{b.delete(route("dashboard.transactions.destroy",i),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{q.success("Eliminado correctamente")}})}})}return(i,n)=>(s(),g(D,{title:"Transacciones",breads:V},{header:r(()=>[H]),default:r(()=>[e("div",M,[e("div",G,[a(y,{text:"Responsable",modelValue:o.user_id,"onUpdate:modelValue":n[0]||(n[0]=t=>o.user_id=t)},{default:r(()=>[J,(s(!0),l(_,null,m(u.users,t=>(s(),l("option",{value:t.id},d(t.name),9,K))),256))]),_:1},8,["modelValue"]),a(y,{text:"Tipo",modelValue:o.type,"onUpdate:modelValue":n[1]||(n[1]=t=>o.type=t)},{default:r(()=>[Q,W,X]),_:1},8,["modelValue"]),a(f,{text:"Desde",type:"date",modelValue:o.from,"onUpdate:modelValue":n[2]||(n[2]=t=>o.from=t)},null,8,["modelValue"]),a(f,{text:"Hasta",type:"date",modelValue:o.to,"onUpdate:modelValue":n[3]||(n[3]=t=>o.to=t)},null,8,["modelValue"])])]),e("div",Y,[e("div",Z,[(s(!0),l(_,null,m(x.value,t=>(s(),g($,{stat:t,key:t.title},null,8,["stat"]))),128))])]),a(I,null,{header:r(()=>[ee,te,oe,se,ae,ne,re,le]),body:r(()=>[(s(!0),l(_,null,m(u.transactions.data,(t,fe)=>(s(),l("tr",de,[e("td",null,[a(T,{date:t.created_at},null,8,["date"])]),e("td",null," #"+d(t.id),1),e("td",null,[e("span",{class:P(C[t.type])},d(v[t.type]),3)]),e("td",null,d(t.user.name),1),e("td",null,d(t.products_count),1),e("td",null," C$"+d(t.discount),1),e("td",null,[t.payments_total?(s(),l("span",ie," C$"+d(t.payments_total.toLocaleString()),1)):(s(),l("span",ue," C$"+d(t.total.toLocaleString()),1))]),e("td",null,[e("div",ce,[a(p(U),{href:i.route("dashboard.transactions.show",t.id),tooltip:"Detalles"},{default:r(()=>[a(p(R),{size:"22",role:"button"})]),_:2},1032,["href"]),e("span",{onClick:ye=>S(t.id),tooltip:"Eliminar"},[a(p(z),{size:"22",role:"button",class:"text-red-200"})],8,me)])])]))),256)),u.transactions.data.length==0?(s(),l("tr",_e,he)):j("",!0)]),paginator:r(()=>[a(w,{links:u.transactions.links},null,8,["links"])]),_:1})]),_:1}))}};export{Pe as default};
