import{_ as y}from"./InputForm-e5ffaa2b.js";import{T as h,c as b,o as l,a as i,e as r,F as x,i as k,b as s,d as f,u,g as C,t as c,q as V}from"./app-577b6edb.js";import{t as S}from"./toast-43701210.js";import{I as $}from"./IconTrash-b0192d5f.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./createVueComponent-08306c2b.js";const q={key:0,class:"h-full text-center text-gray-400 flex items-center justify-center"},j={class:"w-full rounded-lg p-4 bg-white mb-2 border-2"},w={class:"flex gap-2"},N={class:"h-36 w-36 flex items-center justify-center"},T=["src"],U={class:"w-full flex flex-col justify-between"},B=["onClick"],I={class:"text-gray-400"},L={key:0},O={class:"flex items-center justify-between"},D={key:0,class:"flex flex-col text-end text-xl font-bold"},F={key:1,class:"flex flex-col text-end text-xl font-bold"},P={key:1,class:"mt-4"},z={class:"grid grid-cols-2 gap-4"},E={class:"flex justify-end my-8"},G={class:"text-xl font-bold"},A=s("button",{class:"secondary-button"},"Cancelar",-1),W={__name:"SelectedProducts",props:{products:{type:Object,required:!1},type:{type:String,required:!0}},setup(a){const d=a,n=h({type:d.type,discount:0,note:"",client:"",total:0,products:null});function v(e){return e||"https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/shoes_special/custom_dress_shoes.jpg"}const m=b(()=>d.type=="buy"?d.products.reduce((e,o)=>e+o.quantity*o.cost,0)-(n.discount??0):d.products.reduce((e,o)=>e+o.quantity*o.price,0)-(n.discount??0));function g(){n.products=d.products.map(function(e){return{product_id:e.id,quantity:e.quantity,measure:e.measure,cost:e.cost,price:e.price,inventory_id:e.inventory_id}}),n.total=m.value,n.post(route("dashboard.transactions.store"),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{S.success("Transaccion relizada correctamente")}})}return(e,o)=>(l(),i("div",null,[a.products.length==0?(l(),i("div",q," No hay productos seleccionados ")):r("",!0),(l(!0),i(x,null,k(a.products,(t,p)=>(l(),i("div",j,[s("div",w,[s("div",N,[s("img",{src:v(t.image),alt:"Imagen",class:"max-h-full max-w-full rounded-lg"},null,8,T)]),s("div",U,[s("div",null,[s("div",{class:"text-lg font-semibold mb-2",onClick:_=>e.$emit("edit",p),role:"button"},c(t.name)+" - "+c(t.measure)+" ("+c(t.quantity)+") ",9,B),s("div",I,[a.type=="buy"?(l(),i("span",L,"Costo: C$"+c(t.cost)+", ",1)):r("",!0),V("Precio: C$"+c(t.price),1)])]),s("div",O,[s("div",null,[f(u($),{role:"button",onClick:_=>e.$emit("remove",p)},null,8,["onClick"])]),a.type=="buy"?(l(),i("div",D," C$"+c((t.quantity*t.cost).toLocaleString("en-US")),1)):r("",!0),a.type=="sell"?(l(),i("div",F," C$"+c((t.quantity*t.price).toLocaleString("en-US")),1)):r("",!0)])])])]))),256)),m.value>0?(l(),i("div",P,[s("div",z,[f(y,{text:"Notas (Opcional)",modelValue:u(n).note,"onUpdate:modelValue":o[0]||(o[0]=t=>u(n).note=t)},null,8,["modelValue"]),a.type=="sell"?(l(),i(x,{key:0},[f(y,{text:"Cliente (Opcional)",modelValue:u(n).client,"onUpdate:modelValue":o[1]||(o[1]=t=>u(n).client=t)},null,8,["modelValue"]),a.type=="sell"?(l(),C(y,{key:0,text:"Descuento C$",modelValue:u(n).discount,"onUpdate:modelValue":o[2]||(o[2]=t=>u(n).discount=t)},null,8,["modelValue"])):r("",!0)],64)):r("",!0)]),s("div",E,[s("div",G," Total: C$"+c(m.value.toLocaleString("en-US")),1)]),s("div",{class:"flex items-center justify-end gap-4"},[A,s("button",{class:"primary-button",type:"button",onClick:g}," Guardar ")])])):r("",!0)]))}};export{W as default};