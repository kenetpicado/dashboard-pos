import{_ as I,I as k}from"./AppLayout-48c7ce5f.js";import{T as q}from"./TableSection-53862e82.js";import{_ as $}from"./ThePaginator-917b3db3.js";import{t as S}from"./toast-432570cc.js";import{_ as j}from"./StatCard-06e46789.js";import{_ as O}from"./DateColumn-f45ad586.js";import{_ as T}from"./EditInventoryForm-355442be.js";import{I as w}from"./IconCurrencyDollar-0aaa8b04.js";import{I as B}from"./IconPencil-0ddf130c.js";import{I as E}from"./IconTrash-e0b11acb.js";import{i as M,j as N,c as P,o as r,g as _,h as i,b as t,t as a,a as u,r as p,F as h,d as l,u as f,e as V}from"./app-abfa699b.js";import"./createVueComponent-41fcc9fd.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./Carbon-053ffa43.js";import"./FormModal-2794491e.js";import"./InputForm-7e10ab10.js";const F=t("div",{class:"text-2xl font-extrabold text-gray-600"}," Inventario ",-1),L={class:"mt-2 text-sm text-gray-500 uppercase"},z={class:"mb-4"},D={class:"grid grid-cols-5 gap-4"},A=t("th",null,"Fecha",-1),R=t("th",null,"Medida",-1),G=t("th",null,"Cantidad",-1),H=t("th",null,"Costo (ud.)",-1),J=t("th",null,"Total",-1),K=t("th",null,"Precio (ud.)",-1),Q=t("th",null,"Acciones",-1),U={class:"hover:bg-gray-50"},W={class:"font-bold"},X={class:"flex justify-between gap-4"},Y={tooltip:"Editar"},Z={tooltip:"Eliminar"},tt={key:0},et=t("td",{colspan:"7",class:"text-center"},"No hay datos que mostrar",-1),ot=[et],gt={__name:"Show",props:{product:{type:Object,required:!0},inventory:{type:Object,required:!0},inventoryStatus:{type:Object,required:!0},measures:{type:Object,required:!0}},setup(s){const c=s,d=M(!1),o=N({id:null,measure:null,quantity:null,unit_price:null}),v=[{name:"Inicio",route:route("dashboard.index")},{name:"Productos",route:route("dashboard.products.index")},{name:"Inventario",route:route("dashboard.products.show",c.product.id)}],y=n=>{o.id=n.id,o.measure=n.measure,o.quantity=n.quantity,o.unit_price=n.unit_price,d.value=!0},b=()=>{d.value=!1,o.id=null,o.measure=null,o.quantity=null,o.unit_price=null},g=n=>{confirm("¿Estas seguro de eliminar este registro?")&&o.delete(route("dashboard.inventory.destroy",n),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{S.success("Registro eliminado correctamente")}})},x=P(()=>[{title:"Inventario",value:"C$"+c.inventoryStatus.total.toLocaleString(),icon:w},{title:"Productos",value:c.inventoryStatus.quantity,icon:k}]);return(n,m)=>(r(),_(I,{title:"Inventario",breads:v},{header:i(()=>[t("div",null,[F,t("div",L,a(s.product.name),1)])]),default:i(()=>[t("div",z,[t("div",D,[(r(!0),u(h,null,p(x.value,e=>(r(),_(j,{stat:e,key:e.title},null,8,["stat"]))),128))])]),l(q,null,{header:i(()=>[A,R,G,H,J,K,Q]),body:i(()=>[(r(!0),u(h,null,p(s.inventory.data,(e,nt)=>(r(),u("tr",U,[t("td",null,[l(O,{date:e.created_at},null,8,["date"])]),t("td",null,a(e.measure),1),t("td",null,a(e.quantity),1),t("td",null," C$"+a(e.unit_cost),1),t("td",null,[t("span",W,"C$"+a((e.quantity*e.unit_cost).toLocaleString()),1)]),t("td",null," C$"+a(e.unit_price),1),t("td",null,[t("div",X,[t("span",Y,[l(f(B),{size:"22",role:"button",onClick:C=>y(e)},null,8,["onClick"])]),t("span",Z,[l(f(E),{size:"22",class:"text-red-200",role:"button",onClick:C=>g(e)},null,8,["onClick"])])])])]))),256)),s.inventory.data.length==0?(r(),u("tr",tt,ot)):V("",!0)]),paginator:i(()=>[l($,{links:s.inventory.links},null,8,["links"])]),_:1}),l(T,{onOnCancel:m[0]||(m[0]=e=>b()),openModal:d.value,form:o,measures:s.measures},null,8,["openModal","form","measures"])]),_:1}))}};export{gt as default};
