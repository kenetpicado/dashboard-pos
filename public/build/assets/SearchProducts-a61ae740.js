import{_ as h}from"./InputForm-e5ffaa2b.js";import{l as p,m,o as s,a as l,d as i,b as e,F as g,i as y,e as _,t as n,u as f,O as v}from"./app-577b6edb.js";import{c as b}from"./createVueComponent-08306c2b.js";var k=b("shopping-cart-filled","IconShoppingCartFilled",[["path",{d:"M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z","stroke-width":"0",fill:"currentColor",key:"svg-0"}]]);const w={class:"w-full border-collapse bg-white text-left text-sm text-gray-600 rounded-lg"},x=e("thead",{class:"bg-gray-50"},[e("tr",null,[e("th",null,"#"),e("th",null,"Producto"),e("th",null,"Agregar")])],-1),C={class:"divide-y divide-gray-100 border-t border-gray-100"},S={class:"text-gray-400 flex items-center gap-1"},V=["onClick"],P={key:0,class:"text-center"},z=e("td",{colspan:"3"},"No se han encontrado productos",-1),B=[z],q={__name:"SearchProducts",props:{products:{type:Object,required:!1}},setup(c){const t=p({search:"",type:null}),r=new URLSearchParams(window.location.search);return r.get("search")&&(t.search=r.get("search")),r.get("type")&&(t.type=r.get("type")),m(()=>t.search,o=>{o||delete t.search,v.get(route("dashboard.transactions.create"),t,{preserveState:!0,preserveScroll:!0,only:["products"]})}),(o,d)=>(s(),l("div",null,[i(h,{placeholder:"Buscar",modelValue:t.search,"onUpdate:modelValue":d[0]||(d[0]=a=>t.search=a),type:"search"},null,8,["modelValue"]),e("table",w,[x,e("tbody",C,[(s(!0),l(g,null,y(c.products,(a,u)=>(s(),l("tr",null,[e("td",null,n(u+1),1),e("td",null,[e("div",null,n(a.name),1),e("div",S,n(a.sku),1)]),e("td",null,[e("button",{class:"primary-button",type:"button",onClick:F=>o.$emit("setProduct",a)},[i(f(k),{size:"20"})],8,V)])]))),256)),c.products.length==0?(s(),l("tr",P,B)):_("",!0)])])]))}};export{q as default};
