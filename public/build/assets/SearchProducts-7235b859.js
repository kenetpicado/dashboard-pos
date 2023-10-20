import{_ as h}from"./InputForm-f7786dbc.js";import{j as m,k as p,o as s,a as r,d,b as e,F as g,i as y,e as i,t as u,u as _,O as f}from"./app-dafdfc05.js";import{c as b}from"./createVueComponent-a1973eaa.js";var v=b("shopping-cart-filled","IconShoppingCartFilled",[["path",{d:"M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z","stroke-width":"0",fill:"currentColor",key:"svg-0"}]]);const k={class:"w-full border-collapse bg-white text-left text-sm text-gray-600 rounded-lg"},x=e("thead",{class:"bg-gray-50"},[e("tr",null,[e("th",null,"#"),e("th",null,"Producto"),e("th",null,"Agregar")])],-1),w={class:"divide-y divide-gray-100 border-t border-gray-100"},S={key:0,class:"h-36 w-36 flex items-center justify-center"},C=["src"],V={class:"text-gray-400 flex items-center gap-1"},P=["onClick"],j={key:0,class:"text-center"},z={colspan:"3"},B={key:0},F={key:1},$={__name:"SearchProducts",props:{products:{type:Object,required:!1}},setup(o){const t=m({search:"",type:null}),l=new URLSearchParams(window.location.search);return l.get("search")&&(t.search=l.get("search")),l.get("type")&&(t.type=l.get("type")),p(()=>t.search,n=>{n||delete t.search,f.get(route("dashboard.transactions.create"),t,{preserveState:!0,preserveScroll:!0,only:["products"]})}),(n,c)=>(s(),r("div",null,[d(h,{placeholder:"Buscar",modelValue:t.search,"onUpdate:modelValue":c[0]||(c[0]=a=>t.search=a),type:"search"},null,8,["modelValue"]),e("table",k,[x,e("tbody",w,[(s(!0),r(g,null,y(o.products,(a,N)=>(s(),r("tr",null,[e("td",null,[a.image?(s(),r("div",S,[e("img",{src:a.image,onerror:"this.src='/not-found.jpg'",alt:"Imagen",class:"max-h-full max-w-full rounded-lg"},null,8,C)])):i("",!0)]),e("td",null,[e("div",null,u(a.name),1),e("div",V,u(a.sku),1)]),e("td",null,[e("button",{class:"primary-button",type:"button",onClick:q=>n.$emit("setProduct",a)},[d(_(v),{size:"20"})],8,P)])]))),256)),o.products.length==0?(s(),r("tr",j,[e("td",z,[!t.search&&o.products.length==0?(s(),r("span",B," Escriba el nombreo SKU del producto que desea buscar ")):(s(),r("span",F," No se han encontrado productos "))])])):i("",!0)])])]))}};export{$ as default};
