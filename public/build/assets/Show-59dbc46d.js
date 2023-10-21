import{_ as $,I}from"./AppLayout-5aa0f841.js";import{T as k}from"./TableSection-f0b02097.js";import{_ as T}from"./ThePaginator-1fa1098c.js";import{r as O,T as U,c as j,o as l,g as f,h as i,b as t,t as a,a as c,i as h,F as y,d as r,u as s,e as w}from"./app-77d04b12.js";import{_ as P}from"./FormModal-928e02de.js";import{_ as m}from"./InputForm-82f0cd28.js";import{t as b}from"./toast-668cb0b1.js";import{_ as B}from"./StatCard-c02c6edf.js";import{_ as L}from"./DateColumn-a6cf15d8.js";import{I as N}from"./IconCurrencyDollar-c7c31d68.js";import{I as z}from"./IconPencil-8a892b49.js";import{I as E}from"./IconTrash-d4e9fefd.js";import"./createVueComponent-2e1f8794.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./Carbon-053ffa43.js";const F=t("div",{class:"text-2xl font-extrabold text-gray-600"}," Inventario ",-1),M={class:"mt-2 text-sm text-gray-500 uppercase"},D={class:"mb-4"},R={class:"grid grid-cols-5 gap-4"},A=t("th",null,"Fecha",-1),G=t("th",null,"Medida",-1),H=t("th",null,"Cantidad",-1),J=t("th",null,"Costo (ud.)",-1),K=t("th",null,"Total",-1),Q=t("th",null,"Precio (ud.)",-1),W=t("th",null,"Acciones",-1),X={class:"hover:bg-gray-50"},Y={class:"font-bold"},Z={class:"flex gap-4"},tt={key:0},et=t("td",{colspan:"6",class:"text-center"},"No hay datos que mostrar",-1),ot=[et],nt={class:"grid grid-cols-2 gap-4"},st={class:"flex justify-end col-span-2"},rt={class:"text-xl font-bold"},Ct={__name:"Show",props:{product:{type:Object,required:!0},inventory:{type:Object,required:!0},inventoryStatus:{type:Object,required:!0}},setup(u){const _=u,p=O(!1),o=U({id:null,measure:null,quantity:null,unit_cost:null,unit_price:null}),g=[{name:"Inicio",route:route("dashboard.users.index")},{name:"Productos",route:route("dashboard.products.index")},{name:"Inventario",route:route("dashboard.products.show",_.product.id)}],x=d=>{Object.assign(o,d),p.value=!0},v=()=>{p.value=!1,o.reset()},C=()=>{o.put(route("dashboard.inventory.update",o.id),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{b.success("Registro actualizado correctamente"),v()}})},S=d=>{confirm("¿Estas seguro de eliminar este registro?")&&o.delete(route("dashboard.inventory.destroy",d),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{b.success("Registro eliminado correctamente")}})},V=j(()=>[{title:"Inventario",value:"C$"+_.inventoryStatus.unit_cost.toLocaleString(),icon:N},{title:"Productos",value:_.inventoryStatus.quantity,icon:I}]);return(d,n)=>(l(),f($,{title:"Inventario",breads:g},{header:i(()=>[t("div",null,[F,t("div",M,a(u.product.name),1)])]),default:i(()=>[t("div",D,[t("div",R,[(l(!0),c(y,null,h(V.value,e=>(l(),f(B,{stat:e,key:e.title},null,8,["stat"]))),128))])]),r(k,null,{header:i(()=>[A,G,H,J,K,Q,W]),body:i(()=>[(l(!0),c(y,null,h(u.inventory.data,(e,at)=>(l(),c("tr",X,[t("td",null,[r(L,{date:e.created_at},null,8,["date"])]),t("td",null,a(e.measure),1),t("td",null,a(e.quantity),1),t("td",null," C$"+a(e.unit_cost),1),t("td",null,[t("span",Y,"C$"+a((e.quantity*e.unit_cost).toLocaleString()),1)]),t("td",null," C$"+a(e.unit_price),1),t("td",null,[t("div",Z,[r(s(z),{size:"22",role:"button",onClick:q=>x(e)},null,8,["onClick"]),r(s(E),{size:"22",role:"button",onClick:q=>S(e)},null,8,["onClick"])])])]))),256)),u.inventory.data.length==0?(l(),c("tr",tt,ot)):w("",!0)]),paginator:i(()=>[r(T,{links:u.inventory.links},null,8,["links"])]),_:1}),r(P,{show:p.value,title:"Editar",onOnCancel:n[4]||(n[4]=e=>v()),onOnSubmit:n[5]||(n[5]=e=>C())},{default:i(()=>[t("div",nt,[r(m,{text:"Medida",modelValue:s(o).measure,"onUpdate:modelValue":n[0]||(n[0]=e=>s(o).measure=e),required:""},null,8,["modelValue"]),r(m,{text:"Cantidad",modelValue:s(o).quantity,"onUpdate:modelValue":n[1]||(n[1]=e=>s(o).quantity=e),type:"number",required:"",min:1},null,8,["modelValue"]),r(m,{text:"Costo (Unidad)",modelValue:s(o).unit_cost,"onUpdate:modelValue":n[2]||(n[2]=e=>s(o).unit_cost=e),type:"number",required:"",min:1},null,8,["modelValue"]),r(m,{text:"Precio (Unidad)",modelValue:s(o).unit_price,"onUpdate:modelValue":n[3]||(n[3]=e=>s(o).unit_price=e),type:"number",required:"",min:1},null,8,["modelValue"]),t("div",st,[t("div",rt," Total: "+a((s(o).quantity*s(o).unit_cost).toLocaleString()),1)])])]),_:1},8,["show"])]),_:1}))}};export{Ct as default};