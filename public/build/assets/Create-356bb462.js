import{_ as c}from"./InputForm-4cafefdf.js";import{_ as M}from"./SelectForm-cdc0790d.js";import{_ as O}from"./FormModal-b98706ae.js";import{_ as w}from"./AppLayout-e609c35e.js";import{t as m}from"./toast-af43fcaa.js";import B from"./SearchProducts-a5864bfa.js";import D from"./SelectedProducts-f860b4a6.js";import{r as v,k as N,l as T,c as F,o as f,g as I,h as V,b as n,t as p,d as u,a as _,F as C,e as U,i as z}from"./app-ec9b2b19.js";import"./createVueComponent-3ab2bfc7.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./IconTrash-c1fa2c12.js";const A={class:"title mt-1"},Q={class:"grid grid-cols-2 gap-4"},R={class:"grid grid-cols-2 gap-4"},W={class:"flex justify-end col-span-2"},G={class:"text-xl font-bold"},H=n("option",{selected:"",disabled:"",value:""},"Seleccionar medida",-1),J=["value"],K={class:"flex justify-end col-span-2"},X={class:"text-xl font-bold text-end"},Y={class:"mb-2"},de={__name:"Create",props:{products:{type:Object,required:!1},type:{type:String,required:!0}},setup(d){const r=d,b={buy:"Comprar",sell:"Vender"},S=[{name:"Inicio",route:route("dashboard.users.index")},{name:b[r.type],route:route("dashboard.transactions.create",r.type)}],o=v([]),g=v(!1),y=v(!1),i=v([]),s=v(null),q=v(null),P={id:null,name:null,image:null,quantity:1,cost:null,price:null,measure:null,inventory_id:null,discount:0},e=N({...P});function h(t){e.id=t.id,e.name=t.name,e.image=t.image,e.quantity=1,r.type=="sell"&&(i.value=t.inventory,s.value=i.value[0].id,e.inventory_id=i.value[0].id),g.value=!0}function k(){if(r.type=="sell"&&j()&&!y.value){m.error("Este producto con esta medida ya ha sido agregado");return}if(r.type=="buy"&&o.value.find(t=>t.id==e.id&&t.measure==e.measure)&&!y.value){m.error("Este producto con esta medida ya ha sido agregado");return}if(r.type=="sell"&&e.quantity>x.value){m.error("La cantidad no puede ser mayor a la disponible");return}e.discount==null&&(e.discount=0),y.value?(o.value[q.value]={...e},m.success("Producto actualizado")):(o.value.push({...e}),m.success("Producto agregado")),$()}function j(){return o.value.find(t=>t.id==e.id&&t.inventory_id==e.inventory_id)}function $(){Object.assign(e,P),y.value=!1,i.value=[],s.value=null,q.value=null,g.value=!1}function E(t){e.id=o.value[t].id,e.name=o.value[t].name,e.image=o.value[t].image,e.quantity=o.value[t].quantity,e.price=o.value[t].price,r.type=="sell"?(i.value=r.products.find(a=>a.id==e.id).inventory,e.inventory_id=o.value[t].inventory_id,s.value=o.value[t].inventory_id,e.discount=o.value[t].discount):(e.cost=o.value[t].cost,e.measure=o.value[t].measure),y.value=!0,q.value=t,g.value=!0}function L(t){o.value.splice(t,1),m.success("Producto eliminado")}T(()=>s.value,t=>{if(!t)return;const a=i.value.find(l=>l.id==t);e.measure=a.measure,e.price=a.unit_price,e.inventory_id=a.id});const x=F(()=>i.value.length==0||!s.value?0:i.value.find(t=>t.id==s.value).quantity);return(t,a)=>(f(),I(w,{title:b[d.type],breads:S},{header:V(()=>[n("span",A,p(b[d.type]),1)]),default:V(()=>[n("div",Q,[u(B,{products:d.products,onSetProduct:h},null,8,["products"]),u(D,{products:o.value,type:d.type,onEdit:E,onRemove:L},null,8,["products","type"])]),u(O,{show:g.value,title:e.name,onOnCancel:a[7]||(a[7]=l=>$()),onOnSubmit:a[8]||(a[8]=l=>k())},{default:V(()=>[n("div",R,[d.type=="buy"?(f(),_(C,{key:0},[u(c,{text:"Medida",modelValue:e.measure,"onUpdate:modelValue":a[0]||(a[0]=l=>e.measure=l),required:""},null,8,["modelValue"]),u(c,{text:"Cantidad",modelValue:e.quantity,"onUpdate:modelValue":a[1]||(a[1]=l=>e.quantity=l),type:"number",required:"",min:1},null,8,["modelValue"]),u(c,{text:"Costo (Unidad)",modelValue:e.cost,"onUpdate:modelValue":a[2]||(a[2]=l=>e.cost=l),type:"number",required:"",min:1},null,8,["modelValue"]),u(c,{text:"Precio (Unidad)",modelValue:e.price,"onUpdate:modelValue":a[3]||(a[3]=l=>e.price=l),type:"number",required:"",min:1},null,8,["modelValue"]),n("div",W,[n("div",G," Total: "+p((e.quantity*e.cost).toLocaleString()),1)])],64)):U("",!0),d.type=="sell"?(f(),_(C,{key:1},[u(M,{text:"Medida",modelValue:s.value,"onUpdate:modelValue":a[4]||(a[4]=l=>s.value=l),required:""},{default:V(()=>[H,(f(!0),_(C,null,z(i.value,l=>(f(),_("option",{value:l.id},p(l.measure)+" - C$"+p(l.unit_price),9,J))),256))]),_:1},8,["modelValue"]),u(c,{text:"Cantidad",modelValue:e.quantity,"onUpdate:modelValue":a[5]||(a[5]=l=>e.quantity=l),type:"number",required:"",min:1,description:`Disponible: ${x.value}`},null,8,["modelValue","description"]),u(c,{text:"Descuento",modelValue:e.discount,"onUpdate:modelValue":a[6]||(a[6]=l=>e.discount=l),type:"number"},null,8,["modelValue"]),n("div",K,[n("div",X,[n("div",Y,"Precio: C$"+p(e.price.toLocaleString()),1),n("div",null,"Total: C$"+p((e.quantity*e.price-e.discount).toLocaleString()),1)])])],64)):U("",!0)])]),_:1},8,["show","title"])]),_:1},8,["title"]))}};export{de as default};
