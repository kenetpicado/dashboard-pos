import{_ as h}from"./InputForm-1eae37c8.js";import{k as m,l as p,o as a,a as r,d,b as e,F as g,r as _,e as i,t as u,u as y,O as f}from"./app-1585a32c.js";import{c as b}from"./createVueComponent-298bc17c.js";var v=b("shopping-cart-filled","IconShoppingCartFilled",[["path",{d:"M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z","stroke-width":"0",fill:"currentColor",key:"svg-0"}]]);const k={class:"w-full border-collapse bg-white text-left text-sm text-gray-600 rounded-lg"},x=e("thead",{class:"bg-gray-50"},[e("tr",null,[e("th",null,"#"),e("th",null,"Producto"),e("th",null,"Agregar")])],-1),w={class:"divide-y divide-gray-100 border-t border-gray-100"},S={key:0,class:"h-36 w-36 flex items-center justify-center"},C=["src"],V={class:"uppercase"},P={class:"text-gray-400 flex items-center gap-1"},z=["onClick"],B={key:0,class:"text-center"},F={colspan:"3"},N={key:0},j={key:1},E={__name:"SearchProducts",props:{products:{type:Object,required:!1}},setup(o){const t=m({search:"",type:null}),l=new URLSearchParams(window.location.search);return l.get("search")&&(t.search=l.get("search")),l.get("type")&&(t.type=l.get("type")),p(()=>t.search,n=>{n||delete t.search,f.get(route("dashboard.transactions.create"),t,{preserveState:!0,preserveScroll:!0,only:["products"]})}),(n,c)=>(a(),r("div",null,[d(h,{placeholder:"Buscar",modelValue:t.search,"onUpdate:modelValue":c[0]||(c[0]=s=>t.search=s)},null,8,["modelValue"]),e("table",k,[x,e("tbody",w,[(a(!0),r(g,null,_(o.products,(s,q)=>(a(),r("tr",null,[e("td",null,[s.image?(a(),r("div",S,[e("img",{src:s.image,onerror:"this.src='/not-found.jpg'",alt:"Imagen",class:"max-h-full max-w-full rounded-lg"},null,8,C)])):i("",!0)]),e("td",null,[e("div",V,u(s.name),1),e("div",P,u(s.sku),1)]),e("td",null,[e("button",{class:"primary-button",type:"button",onClick:I=>n.$emit("setProduct",s)},[d(y(v),{size:"20"})],8,z)])]))),256)),o.products.length==0?(a(),r("tr",B,[e("td",F,[!t.search&&o.products.length==0?(a(),r("span",N," Escriba el nombreo SKU del producto que desea buscar ")):(a(),r("span",j," No se han encontrado productos "))])])):i("",!0)])])]))}};export{E as default};
