import{_ as m}from"./AppLayout-e609c35e.js";import{T as p}from"./TableSection-ac211b9d.js";import{C as b}from"./Carbon-053ffa43.js";import{_ as v}from"./StatCard-ed26ddaf.js";import{o as l,g as f,h as s,b as t,a as i,i as r,d as c,F as d,t as e}from"./app-ec9b2b19.js";import"./createVueComponent-3ab2bfc7.js";import"./_plugin-vue_export-helper-c27b6911.js";const g=t("span",{class:"title"}," Detalles ",-1),S={class:"mb-4"},y={class:"grid grid-cols-5 gap-4"},x=t("th",null,"Item",-1),T=t("th",null,"Medida",-1),C=t("th",null,"Cantidad",-1),D=t("th",null,"Importe",-1),L=t("th",null,"Descuento",-1),k=t("th",null,"Total",-1),B={class:"hover:bg-gray-50"},F={class:"font-bold mb-2"},$=t("th",{colspan:"5",class:"text-end"}," Descuento ",-1),w=t("th",{colspan:"5",class:"text-end"}," Total ",-1),E={class:"font-bold"},R={__name:"Show",props:{transaction:{type:Object,required:!0}},setup(n){const o=n,u={buy:"COMPRA",sell:"VENTA"},_=[{name:"Inicio",route:route("dashboard.users.index")},{name:"Transacciones",route:route("dashboard.transactions.index")},{name:"Detalles",route:route("dashboard.transactions.show",o.transaction.id)}],h=[{title:"Factura",value:o.transaction.id.toString().padStart(5,"0")},{title:"Tipo",value:u[o.transaction.type]},{title:"Estado",value:o.transaction.status},{title:"Fecha",value:b.create(o.transaction.created_at).format("d/m/Y H:i")}];return(I,N)=>(l(),f(m,{title:"Detalles",breads:_},{header:s(()=>[g]),default:s(()=>[t("div",S,[t("div",y,[(l(),i(d,null,r(h,a=>c(v,{stat:a,key:a.title},null,8,["stat"])),64))])]),c(p,null,{header:s(()=>[x,T,C,D,L,k]),body:s(()=>[(l(!0),i(d,null,r(n.transaction.products,(a,V)=>(l(),i("tr",B,[t("td",null,[t("div",null,[t("div",F,e(a.name),1),t("div",null,e(a.sku),1)])]),t("td",null,e(a.pivot.measure),1),t("td",null,e(a.pivot.quantity),1),t("td",null,e(a.pivot.value.toLocaleString()),1),t("td",null,e(a.pivot.discount.toLocaleString()),1),t("td",null,e(a.pivot.total.toLocaleString()),1)]))),256))]),footer:s(()=>[t("tfoot",null,[t("tr",null,[$,t("td",null," C$"+e(n.transaction.discount.toLocaleString()),1)]),t("tr",null,[w,t("td",null,[t("span",E," C$"+e(n.transaction.total.toLocaleString()),1)])])])]),_:1})]),_:1}))}};export{R as default};