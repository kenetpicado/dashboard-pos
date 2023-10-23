import{_ as g}from"./InputForm-0fe48dbd.js";import{_ as S}from"./SelectForm-0ac61ccf.js";import{_ as w}from"./FormModal-9558cbb6.js";import{_ as B}from"./AppLayout-1b580628.js";import{t as v}from"./toast-e2691252.js";import D from"./SearchProducts-9be016ba.js";import N from"./SelectedProducts-97fa055a.js";import{r as p,k as T,l as F,c as I,o as c,g as z,h as _,b as u,t as m,d as n,a as y,F as V,i as U,e as h}from"./app-6f785d1a.js";import"./createVueComponent-08b477b0.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./IconTrash-e7dee912.js";const A={class:"title mt-1"},Q={class:"grid grid-cols-2 gap-4"},R={class:"grid grid-cols-2 gap-4"},W=u("option",{selected:"",disabled:"",value:""},"Seleccionar medida",-1),G=["value"],H={class:"flex justify-end col-span-2"},J={class:"text-xl font-bold"},K=u("option",{selected:"",disabled:"",value:""},"Seleccionar medida",-1),X=["value"],Y={class:"flex justify-end col-span-2"},Z={class:"text-xl font-bold text-end"},ee={class:"mb-2"},me={__name:"Create",props:{products:{type:Object,required:!1},type:{type:String,required:!0},measures:{type:Object,required:!1}},setup(s){const r=s,q={buy:"Comprar",sell:"Vender"},j=[{name:"Inicio",route:route("dashboard.index")},{name:q[r.type],route:route("dashboard.transactions.create",r.type)}],o=p([]),b=p(!1),f=p(!1),i=p([]),d=p(null),C=p(null),P={id:null,name:null,image:null,quantity:1,cost:null,price:null,measure:null,inventory_id:null,discount:0},e=T({...P});function k(t){e.id=t.id,e.name=t.name,e.image=t.image,e.quantity=1,r.type=="sell"&&(i.value=t.inventory,d.value=i.value[0].id,e.inventory_id=i.value[0].id,e.discount=t.discount),b.value=!0}function O(){if(r.type=="sell"&&E()&&!f.value){v.error("Este producto con esta medida ya ha sido agregado");return}if(r.type=="buy"&&o.value.find(t=>t.id==e.id&&t.measure==e.measure)&&!f.value){v.error("Este producto con esta medida ya ha sido agregado");return}if(r.type=="sell"&&e.quantity>x.value){v.error("La cantidad no puede ser mayor a la disponible");return}e.discount==null&&(e.discount=0),f.value?(o.value[C.value]={...e},v.success("Producto actualizado")):(o.value.push({...e}),v.success("Producto agregado")),$()}function E(){return o.value.find(t=>t.id==e.id&&t.inventory_id==e.inventory_id)}function $(){Object.assign(e,P),f.value=!1,i.value=[],d.value=null,C.value=null,b.value=!1}function L(t){e.id=o.value[t].id,e.name=o.value[t].name,e.image=o.value[t].image,e.quantity=o.value[t].quantity,e.price=o.value[t].price,r.type=="sell"?(i.value=r.products.find(a=>a.id==e.id).inventory,e.inventory_id=o.value[t].inventory_id,d.value=o.value[t].inventory_id,e.discount=o.value[t].discount):(e.cost=o.value[t].cost,e.measure=o.value[t].measure),f.value=!0,C.value=t,b.value=!0}function M(t){o.value.splice(t,1),v.success("Producto eliminado")}F(()=>d.value,t=>{if(!t)return;const a=i.value.find(l=>l.id==t);e.measure=a.measure,e.price=a.unit_price,e.inventory_id=a.id});const x=I(()=>i.value.length==0||!d.value?0:i.value.find(t=>t.id==d.value).quantity);return(t,a)=>(c(),z(B,{title:q[s.type],breads:j},{header:_(()=>[u("span",A,m(q[s.type]),1)]),default:_(()=>[u("div",Q,[n(D,{products:s.products,onSetProduct:k},null,8,["products"]),n(N,{products:o.value,type:s.type,onEdit:L,onRemove:M},null,8,["products","type"])]),n(w,{show:b.value,title:e.name,onOnCancel:a[7]||(a[7]=l=>$()),onOnSubmit:a[8]||(a[8]=l=>O())},{default:_(()=>[u("div",R,[s.type=="buy"?(c(),y(V,{key:0},[n(S,{text:"Medida",modelValue:e.measure,"onUpdate:modelValue":a[0]||(a[0]=l=>e.measure=l),required:""},{default:_(()=>[W,(c(!0),y(V,null,U(s.measures,l=>(c(),y("option",{value:l},m(l),9,G))),256))]),_:1},8,["modelValue"]),n(g,{text:"Cantidad",modelValue:e.quantity,"onUpdate:modelValue":a[1]||(a[1]=l=>e.quantity=l),type:"number",required:"",min:1},null,8,["modelValue"]),n(g,{text:"Costo (Unidad)",modelValue:e.cost,"onUpdate:modelValue":a[2]||(a[2]=l=>e.cost=l),type:"number",required:"",min:1},null,8,["modelValue"]),n(g,{text:"Precio (Unidad)",modelValue:e.price,"onUpdate:modelValue":a[3]||(a[3]=l=>e.price=l),type:"number",required:"",min:1},null,8,["modelValue"]),u("div",H,[u("div",J," Total: "+m((e.quantity*e.cost).toLocaleString()),1)])],64)):h("",!0),s.type=="sell"?(c(),y(V,{key:1},[n(S,{text:"Medida",modelValue:d.value,"onUpdate:modelValue":a[4]||(a[4]=l=>d.value=l),required:""},{default:_(()=>[K,(c(!0),y(V,null,U(i.value,l=>(c(),y("option",{value:l.id},m(l.measure)+" - C$"+m(l.unit_price),9,X))),256))]),_:1},8,["modelValue"]),n(g,{text:"Cantidad",modelValue:e.quantity,"onUpdate:modelValue":a[5]||(a[5]=l=>e.quantity=l),type:"number",required:"",min:1,description:`Disponible: ${x.value}`},null,8,["modelValue","description"]),n(g,{text:"Descuento",modelValue:e.discount,"onUpdate:modelValue":a[6]||(a[6]=l=>e.discount=l),type:"number"},null,8,["modelValue"]),u("div",Y,[u("div",Z,[u("div",ee,"Precio: C$"+m(e.price.toLocaleString()),1),u("div",null,"Total: C$"+m((e.quantity*e.price-e.discount).toLocaleString()),1)])])],64)):h("",!0)])]),_:1},8,["show","title"])]),_:1},8,["title"]))}};export{me as default};