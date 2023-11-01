import{_ as f}from"./ColorList-1d11085e.js";import{_ as b,a as v}from"./ProductCard-ac162364.js";import{c as g}from"./createVueComponent-70685d68.js";import{i as x,c as y,o as s,g as u,h as k,b as e,t as a,a as r,e as m,r as h,n as C,F as p,d as _,u as j,I as w}from"./app-09192f7b.js";var B=g("brand-whatsapp","IconBrandWhatsapp",[["path",{d:"M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9",key:"svg-0"}],["path",{d:"M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1",key:"svg-1"}]]);const I={class:"container mx-auto p-4"},$={class:"grid grid-cols-1 sm:grid-cols-2 gap-4"},V={class:"flex justify-center"},N=["src"],q={class:"bg-white p-4 rounded-xl h-full flex justify-center flex-col"},O={class:"text-roseh-blue font-semibold text-normal uppercase"},D={class:"text-roseh-pink mt-1 mb-2 text-md"},E={class:"flex items-center gap-2 mt-3 text-roseh-blue"},F={class:"text-xl font-bold"},M={key:0,class:"badge-pink"},S={class:"flex gap-3 overflow-x-auto hide-scrollbar mt-6 mb-4 text-xs"},T=["onClick"],W={key:0},z=e("h1",{class:"text-roseh-blue font-bold mb-2"},"Colores disponibles",-1),L={type:"button",class:"mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg font-medium text-sm text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 transition ease-in-out duration-150",style:{"background-color":"#075E54"}},A=e("h1",{class:"my-4 text-roseh-blue font-bold"},"Te puede interesar",-1),G={class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"},U={__name:"Show",props:{product:{type:Object,required:!0},inventory:{type:Object,required:!0},related:{type:Object,required:!0}},setup(t){const l=t,n=x(l.inventory[0].id),c=y(()=>l.inventory.find(d=>d.id==n.value));return(d,H)=>(s(),u(b,{head:"Detalles"},{default:k(()=>{var i;return[e("div",I,[e("div",$,[e("div",V,[e("img",{src:t.product.image??"/not-found.jpg",onerror:"this.src='/not-found.jpg'",class:"rounded-xl m:max-h-96"},null,8,N)]),e("div",q,[e("div",O,a(t.product.name),1),e("p",D,a(t.product.sku),1),e("div",E,[e("span",F," C$"+a(c.value.unit_price),1),t.product.discount?(s(),r("span",M," C$"+a(t.product.discount)+" off ",1)):m("",!0)]),e("div",S,[(s(!0),r(p,null,h(t.inventory,o=>(s(),r("button",{type:"button",class:C(n.value==o.id?"active-tab":"inactive-tab"),onClick:J=>n.value=o.id},a(o.measure),11,T))),256))]),((i=c.value.colors)==null?void 0:i.length)>0?(s(),r("div",W,[z,_(f,{colors:c.value.colors},null,8,["colors"])])):m("",!0),e("div",null,[e("button",L,[_(j(B),{class:"mr-1"}),w(" Comprar ")])])])]),A,e("div",G,[(s(!0),r(p,null,h(t.related,o=>(s(),u(v,{key:o.id,product:o},null,8,["product"]))),128))])])]}),_:1}))}};export{U as default};
