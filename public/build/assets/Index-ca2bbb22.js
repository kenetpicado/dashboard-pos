import{_}from"./DateColumn-a6cf15d8.js";import{_ as h}from"./InputForm-82f0cd28.js";import{T as p}from"./TableSection-f0b02097.js";import{_ as f}from"./ThePaginator-1fa1098c.js";import{_ as b}from"./AppLayout-5aa0f841.js";import{s as g,w as x,q as d}from"./Search-698eceee.js";import{o,g as y,h as s,b as e,d as a,u as r,a as i,i as k,t as c,j as C,F as N,e as V}from"./app-77d04b12.js";import{I as B}from"./IconEye-8df41140.js";import"./Carbon-053ffa43.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./createVueComponent-2e1f8794.js";const q=e("span",{class:"title"}," Clientes ",-1),v={class:"mb-3"},w={class:"grid grid-cols-5 gap-4"},I=e("th",null,"Registro",-1),$=e("th",null,"Nombre",-1),P=e("th",null,"Contacto",-1),S=e("th",null,"Acciones",-1),j={class:"hover:bg-gray-50"},A={class:"flex gap-2"},E={key:0},F=e("td",{colspan:"4",class:"text-center"},"No hay datos que mostrar",-1),T=[F],W={__name:"Index",props:{clients:{type:Object,required:!0}},setup(n){const m=[{name:"Inicio",route:route("dashboard.users.index")},{name:"Clientes",route:route("dashboard.clients.index")}];return g(),x(route("dashboard.clients.index"),["clients"]),(u,l)=>(o(),y(b,{title:"Clientes",breads:m},{header:s(()=>[q]),default:s(()=>[e("div",v,[e("div",w,[a(h,{text:"Buscar",type:"search",modelValue:r(d).search,"onUpdate:modelValue":l[0]||(l[0]=t=>r(d).search=t)},null,8,["modelValue"])])]),a(p,null,{header:s(()=>[I,$,P,S]),body:s(()=>[(o(!0),i(N,null,k(n.clients.data,(t,z)=>(o(),i("tr",j,[e("td",null,[a(_,{date:t.created_at},null,8,["date"])]),e("td",null,c(t.name),1),e("td",null,c(t.contact??"N/A"),1),e("td",null,[e("div",A,[a(r(C),{href:u.route("dashboard.clients.show",t.id),tooltip:"Pagos"},{default:s(()=>[a(r(B),{size:"22",role:"button"})]),_:2},1032,["href"])])])]))),256)),n.clients.data.length==0?(o(),i("tr",E,T)):V("",!0)]),paginator:s(()=>[a(f,{links:n.clients.links},null,8,["links"])]),_:1})]),_:1}))}};export{W as default};