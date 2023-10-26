import{_ as p}from"./InputForm-1eae37c8.js";import{T as k,c as $,o as a,a as l,e as r,F as b,r as V,b as s,d as f,u as i,t as c,s as w}from"./app-1585a32c.js";import{t as x}from"./toast-13ef7ed8.js";import{c as S}from"./helpers-ffa2c253.js";import{C as q}from"./Carbon-053ffa43.js";import{I as j}from"./IconTrash-73c6da6d.js";import"./index-31bee5ed.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./sweetalert2.all-1bf5477c.js";import"./createVueComponent-298bc17c.js";const T={key:0,class:"h-full text-center text-gray-400 flex items-center justify-center"},U={class:"w-full rounded-lg p-4 bg-white mb-2 border-2"},D={class:"flex gap-2"},L={key:0,class:"h-36 w-36 flex items-center justify-center"},N=["src"],P={class:"w-full flex flex-col justify-between"},E={class:"mb-3"},I=["onClick"],O={class:"text-gray-400"},B={key:0},A={class:"flex items-center justify-between"},F={key:0,class:"flex flex-col text-end text-xl font-bold"},R={key:1},z={key:0,class:"text-red-300 text-sm"},G={class:"text-xl font-bold"},H={key:1,class:"mt-4"},Y={class:"grid grid-cols-2 gap-4"},J={key:0,class:"text-gray-400"},K={key:1},M={class:"flex justify-end my-8"},Q={class:"text-xl font-bold"},W=s("button",{class:"secondary-button"},"Cancelar",-1),ie={__name:"SelectedProducts",props:{products:{type:Object,required:!1},type:{type:String,required:!0}},setup(d){const m=d,n=k({type:m.type,discount:0,note:"",client:"",total:0,products:null,payment:null}),y=$(()=>m.type=="buy"?m.products.reduce((t,o)=>t+o.quantity*o.cost,0)-(n.discount??0):m.products.reduce((t,o)=>t+(o.quantity*o.price-o.discount),0)-(n.discount??0));function v(){S({onConfirm:()=>{h()}})}function h(){_(),n.post(route("dashboard.transactions.store"),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{x.success("Transaccion relizada correctamente")}})}function _(){n.products=m.products.map(function(t){return{product_id:t.id,quantity:t.quantity,measure:t.measure,cost:t.cost,price:t.price,inventory_id:t.inventory_id,discount:t.discount??0,name:t.name,expired_at:t.expired_at}}),n.total=y.value}function g(t){t.preventDefault(),_(),w.post(route("dashboard.download.proforma"),n,{responseType:"blob"}).then(o=>{const e=window.URL.createObjectURL(new Blob([o.data])),u=document.createElement("a");u.href=e,u.setAttribute("download",`Proforma_${q.create().format("m_d_Y_H_i")}.xlsx`),document.body.appendChild(u),u.click()}).catch(()=>{x.error("Ocurrio un error al descargar la proforma")})}return(t,o)=>(a(),l("div",null,[d.products.length==0?(a(),l("div",T," No hay productos seleccionados ")):r("",!0),(a(!0),l(b,null,V(d.products,(e,u)=>(a(),l("div",U,[s("div",D,[e.image?(a(),l("div",L,[s("img",{src:e.image,onerror:"this.src='/not-found.jpg'",alt:"Imagen",class:"max-h-full max-w-full rounded-lg"},null,8,N)])):r("",!0),s("div",P,[s("div",E,[s("div",{class:"text-lg font-semibold mb-2 uppercase",onClick:C=>t.$emit("edit",u),role:"button"},c(e.name)+" - "+c(e.measure)+" ("+c(e.quantity)+") ",9,I),s("div",O,[d.type=="buy"?(a(),l("span",B," Costo: C$"+c(e.cost)+", ",1)):r("",!0),s("span",null," Precio: C$"+c(e.price),1)])]),s("div",A,[s("div",null,[f(i(j),{role:"button",onClick:C=>t.$emit("remove",u),class:"text-red-300"},null,8,["onClick"])]),d.type=="buy"?(a(),l("div",F," C$"+c((e.quantity*e.cost).toLocaleString("en-US")),1)):r("",!0),d.type=="sell"?(a(),l("div",R,[e.discount>0?(a(),l("span",z," -C$"+c(e.discount),1)):r("",!0),s("span",G," C$"+c((e.quantity*e.price).toLocaleString("en-US")),1)])):r("",!0)])])])]))),256)),y.value>0?(a(),l("div",H,[s("div",Y,[f(p,{text:"Notas (Opcional)",modelValue:i(n).note,"onUpdate:modelValue":o[0]||(o[0]=e=>i(n).note=e)},null,8,["modelValue"]),d.type=="sell"?(a(),l(b,{key:0},[f(p,{text:"Cliente (Opcional)",modelValue:i(n).client,"onUpdate:modelValue":o[1]||(o[1]=e=>i(n).client=e)},null,8,["modelValue"]),f(p,{text:"Descuento C$",modelValue:i(n).discount,"onUpdate:modelValue":o[2]||(o[2]=e=>i(n).discount=e)},null,8,["modelValue"]),f(p,{text:"Pago C$",placeholder:`Todo: C$${y.value}`,modelValue:i(n).payment,"onUpdate:modelValue":o[3]||(o[3]=e=>i(n).payment=e)},null,8,["placeholder","modelValue"])],64)):r("",!0)]),i(n).payment?(a(),l("div",J," Dejar el campo vacio si desea pagar todo el monto. De lo contrario especifique la cantidad que desea abonar. La transaccion se guardara como PENDIENTE. ")):r("",!0),d.type=="sell"?(a(),l("div",K,[s("button",{type:"button",onClick:g},"Descargar Proforma")])):r("",!0),s("div",M,[s("div",Q," Total: C$"+c(y.value.toLocaleString("en-US")),1)]),s("div",{class:"flex items-center justify-end gap-4"},[W,s("button",{class:"primary-button",type:"button",onClick:v}," Guardar ")])])):r("",!0)]))}};export{ie as default};
