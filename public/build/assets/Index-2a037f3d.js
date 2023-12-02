import{_ as b}from"./AddButton-3d9081ee.js";import{_ as y}from"./InputForm-11bcbe42.js";import{T as x}from"./TableSection-5df01af2.js";import{_ as k}from"./ThePaginator-3a14a0a5.js";import{_ as v}from"./AppLayout-2e606c34.js";import{j as w,O as I,k as P,o as r,g as N,h as a,d as t,b as e,a as d,r as S,e as u,t as c,u as l,l as p,F as V}from"./app-78f66bf4.js";import{l as B}from"./lodash-fa9ca509.js";import{I as $}from"./IconEye-f9801b5c.js";import{I as j}from"./IconPencil-dbaf51ad.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./createVueComponent-240f5cff.js";const C=e("span",{class:"title"}," Productos ",-1),E={class:"mb-3"},O={class:"grid grid-cols-5 gap-4"},q=e("th",null,"Imagen",-1),z=e("th",null,"Nombre",-1),D=e("th",null,"Categoria",-1),F=e("th",null,"Acciones",-1),L={class:"hover:bg-gray-50"},T={key:0,class:"h-36 w-36 flex items-center justify-center"},U=["src"],A={class:"uppercase me-3"},R={key:0,class:"badge-red"},G={class:"mt-2 text-indigo-600"},H={class:"uppercase"},J={class:"flex gap-4"},K={key:0},M=e("td",{colspan:"3",class:"text-center"},"No hay datos que mostrar",-1),Q=[M],ce={__name:"Index",props:{products:{type:Object,required:!0}},setup(i){const f=[{name:"Inicio",route:route("dashboard.index")},{name:"Productos",route:route("dashboard.products.index")}],o=w({search:null}),h=new URLSearchParams(window.location.search);h.get("search")&&(o.search=h.get("search"));const g=B.debounce(n=>{n||delete o.search,I.get(route("dashboard.products.index"),o,{preserveState:!0,preserveScroll:!0,only:["products"]})},500);return P(()=>o.search,g),(n,m)=>(r(),N(v,{title:"Products",breads:f},{header:a(()=>[C,t(b,{href:n.route("dashboard.products.create")},null,8,["href"])]),default:a(()=>[e("div",E,[e("div",O,[t(y,{text:"Buscar",type:"search",modelValue:o.search,"onUpdate:modelValue":m[0]||(m[0]=s=>o.search=s)},null,8,["modelValue"])])]),t(x,null,{header:a(()=>[q,z,D,F]),body:a(()=>[(r(!0),d(V,null,S(i.products.data,(s,W)=>{var _;return r(),d("tr",L,[e("td",null,[s.image?(r(),d("div",T,[e("img",{src:s.image,onerror:"this.src='/not-found.jpg'",alt:"Imagen",class:"max-h-full max-w-full rounded-lg"},null,8,U)])):u("",!0)]),e("td",null,[e("span",A,c(s.name),1),s.discount?(r(),d("span",R," C$"+c(s.discount)+" Off ",1)):u("",!0),e("div",G,c(s.sku),1)]),e("td",null,[e("span",H,c(((_=s.category)==null?void 0:_.name)??"Ninguna"),1)]),e("td",null,[e("div",J,[t(l(p),{href:n.route("dashboard.products.show",s.id),tooltip:"Detalles"},{default:a(()=>[t(l($),{size:"22",role:"button"})]),_:2},1032,["href"]),t(l(p),{href:n.route("dashboard.products.edit",s.id),tooltip:"Editar"},{default:a(()=>[t(l(j),{size:"22",role:"button"})]),_:2},1032,["href"])])])])}),256)),i.products.data.length==0?(r(),d("tr",K,Q)):u("",!0)]),paginator:a(()=>[t(k,{links:i.products.links},null,8,["links"])]),_:1})]),_:1}))}};export{ce as default};
