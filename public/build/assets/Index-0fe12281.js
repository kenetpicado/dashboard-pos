import{_ as g}from"./AddButton-21f9cad0.js";import{_ as b}from"./InputForm-7e10ab10.js";import{T as y}from"./TableSection-53862e82.js";import{_ as x}from"./ThePaginator-917b3db3.js";import{_ as k}from"./AppLayout-48c7ce5f.js";import{j as v,O as w,k as I,o as r,g as P,h as o,d as t,b as e,a as d,r as S,e as i,t as u,u as l,l as _,F as V}from"./app-abfa699b.js";import{l as B}from"./lodash-26f65637.js";import{I as N}from"./IconEye-bbd730bd.js";import{I as $}from"./IconPencil-0ddf130c.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./createVueComponent-41fcc9fd.js";const j=e("span",{class:"title"}," Productos ",-1),E={class:"mb-3"},O={class:"grid grid-cols-5 gap-4"},q=e("th",null,"Imagen",-1),C=e("th",null,"SKU",-1),U=e("th",null,"Nombre",-1),z=e("th",null,"Acciones",-1),D={class:"hover:bg-gray-50"},F={key:0,class:"h-36 w-36 flex items-center justify-center"},L=["src"],T={class:"uppercase me-3"},A={key:0,class:"badge-red"},K={class:"flex gap-4"},R={key:0},G=e("td",{colspan:"3",class:"text-center"},"No hay datos que mostrar",-1),H=[G],re={__name:"Index",props:{products:{type:Object,required:!0}},setup(c){const f=[{name:"Inicio",route:route("dashboard.index")},{name:"Productos",route:route("dashboard.products.index")}],a=v({search:null}),h=new URLSearchParams(window.location.search);h.get("search")&&(a.search=h.get("search"));const p=B.debounce(n=>{n||delete a.search,w.get(route("dashboard.products.index"),a,{preserveState:!0,preserveScroll:!0,only:["products"]})},500);return I(()=>a.search,p),(n,m)=>(r(),P(k,{title:"Products",breads:f},{header:o(()=>[j,t(g,{href:n.route("dashboard.products.create")},null,8,["href"])]),default:o(()=>[e("div",E,[e("div",O,[t(b,{text:"Buscar",type:"search",modelValue:a.search,"onUpdate:modelValue":m[0]||(m[0]=s=>a.search=s)},null,8,["modelValue"])])]),t(y,null,{header:o(()=>[q,C,U,z]),body:o(()=>[(r(!0),d(V,null,S(c.products.data,(s,J)=>(r(),d("tr",D,[e("td",null,[s.image?(r(),d("div",F,[e("img",{src:s.image,onerror:"this.src='/not-found.jpg'",alt:"Imagen",class:"max-h-full max-w-full rounded-lg"},null,8,L)])):i("",!0)]),e("td",null,u(s.sku),1),e("td",null,[e("span",T,u(s.name),1),s.discount?(r(),d("span",A," C$"+u(s.discount)+" Off ",1)):i("",!0)]),e("td",null,[e("div",K,[t(l(_),{href:n.route("dashboard.products.show",s.id),tooltip:"Detalles"},{default:o(()=>[t(l(N),{size:"22",role:"button"})]),_:2},1032,["href"]),t(l(_),{href:n.route("dashboard.products.edit",s.id),tooltip:"Editar"},{default:o(()=>[t(l($),{size:"22",role:"button"})]),_:2},1032,["href"])])])]))),256)),c.products.data.length==0?(r(),d("tr",R,H)):i("",!0)]),paginator:o(()=>[t(x,{links:c.products.links},null,8,["links"])]),_:1})]),_:1}))}};export{re as default};
