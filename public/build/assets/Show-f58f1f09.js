import{_ as $}from"./AddButton-fc44ffcc.js";import{_ as x}from"./DateColumn-8db4aa16.js";import{_ as k}from"./InputForm-94f64246.js";import{_ as V}from"./FormModal-d6df503e.js";import{_ as P}from"./StatCard-68a041a6.js";import{T}from"./TableSection-4d6a101f.js";import{_ as w}from"./AppLayout-ff8d25b6.js";import{c as I}from"./helpers-11977012.js";import{t as f}from"./toast-c8752f0b.js";import{i as L,T as q,c as B,o as n,g as h,h as i,d as r,b as t,a as c,r as g,F as v,t as F,u as m,e as N}from"./app-eb5825c1.js";import{I as _}from"./IconCurrencyDollar-b6af8f6e.js";import{I as O}from"./IconTrash-2b6e5d65.js";import"./Carbon-053ffa43.js";import"./createVueComponent-da84b992.js";import"./_plugin-vue_export-helper-c27b6911.js";const E=t("span",{class:"title"}," Pagos ",-1),j={class:"mb-4"},A={class:"grid grid-cols-5 gap-4"},D=t("th",null,"Fecha",-1),z=t("th",null,"Valor",-1),M=t("th",null,"Acciones",-1),U={class:"hover:bg-gray-50"},G={class:"font-bbold"},H={class:"flex gap-2"},J={tooltip:"Eliminar"},K={key:0},Q=t("td",{colspan:"3",class:"text-center"},"No hay datos que mostrar",-1),R=[Q],_t={__name:"Show",props:{transaction:{type:Object,required:!0},payments:{type:Object,required:!0}},setup(d){const a=d,b=[{name:"Inicio",route:route("dashboard.index")},{name:"Pendientes",route:route("dashboard.pending.index")},{name:"Pagos",route:route("dashboard.pending.show",a.transaction.id)}],u=L(!1),l=q({id:null,value:null,transaction_id:a.transaction.id});function p(){l.reset(),u.value=!1}function y(){l.post(route("dashboard.payments.store"),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{f.success("Pago creado con éxito"),p()}})}function S(s){I({message:"¿Estás seguro de eliminar este pago?",onConfirm:()=>{l.delete(route("dashboard.payments.destroy",s),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{f.success("Pago eliminado con éxito")}})}})}const C=B(()=>[{title:"Total a pagar",value:"C$"+a.transaction.goal.toLocaleString(),icon:_},{title:"Total abonado",value:"C$"+a.transaction.payments.reduce((s,o)=>s+o.value,0).toLocaleString(),icon:_},{title:"Faltante",value:"C$"+(a.transaction.goal-a.transaction.payments.reduce((s,o)=>s+o.value,0).toLocaleString()).toLocaleString(),icon:_}]);return(s,o)=>(n(),h(w,{title:"Pagos",breads:b},{header:i(()=>[E,r($,{onClick:o[0]||(o[0]=e=>u.value=!0)})]),default:i(()=>[t("div",j,[t("div",A,[(n(!0),c(v,null,g(C.value,e=>(n(),h(P,{stat:e,key:e.title},null,8,["stat"]))),128))])]),r(T,null,{header:i(()=>[D,z,M]),body:i(()=>[(n(!0),c(v,null,g(d.payments,(e,W)=>(n(),c("tr",U,[t("td",null,[r(x,{date:e.created_at},null,8,["date"])]),t("td",null,[t("span",G,"C$"+F(e.value),1)]),t("td",null,[t("div",H,[t("label",J,[r(m(O),{size:"22",role:"button",onClick:X=>S(e.id)},null,8,["onClick"])])])])]))),256)),d.payments.length==0?(n(),c("tr",K,R)):N("",!0)]),_:1}),r(V,{show:u.value,title:"Product",onOnCancel:p,onOnSubmit:y},{default:i(()=>[r(k,{text:"Cantidad C$",modelValue:m(l).value,"onUpdate:modelValue":o[1]||(o[1]=e=>m(l).value=e),type:"number",min:1,required:""},null,8,["modelValue"])]),_:1},8,["show"])]),_:1}))}};export{_t as default};
