import{_ as m}from"./InputForm-79ad393b.js";import{_ as M}from"./SelectForm-2eaeb228.js";import{_ as w}from"./FormModal-a20b1695.js";import{_ as D}from"./AppLayout-baf42c63.js";import{t as p}from"./toast-d5910732.js";import N from"./SearchProducts-855a30ec.js";import T from"./SelectedProducts-e736b245.js";import{i as v,j as F,k as I,c as z,o as c,g as S,h as g,b as o,t as y,d as i,a as f,F as b,r as j,e as C}from"./app-18ae9441.js";import"./createVueComponent-01011238.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./lodash-257a8144.js";import"./helpers-f2fcf906.js";import"./Carbon-053ffa43.js";import"./IconTrash-1208ea66.js";const A={class:"title mt-1"},Q={class:"grid grid-cols-2 gap-4"},R={class:"grid grid-cols-2 gap-4"},W={id:"measures"},G=["value"],H={class:"flex justify-end col-span-2"},J={class:"text-xl font-bold"},K=o("option",{selected:"",disabled:"",value:""},"Seleccionar medida",-1),X=["value"],Y={class:"flex justify-end col-span-2"},Z={class:"text-xl font-bold text-end"},ee={class:"mb-2"},ye={__name:"Create",props:{products:{type:Object,required:!1},type:{type:String,required:!0},measures:{type:Object,required:!1},is_caducable:{type:Boolean,default:!1}},setup(n){const r=n,q={buy:"Comprar",sell:"Vender"},k=[{name:"Inicio",route:route("dashboard.index")},{name:q[r.type],route:route("dashboard.transactions.create",r.type)}],u=v([]),V=v(!1),_=v(!1),s=v([]),d=v(null),x=v(null),$={id:null,name:null,image:null,quantity:1,cost:null,price:null,measure:null,inventory_id:null,discount:0,expired_at:null},e=F({...$});function h(t){e.id=t.id,e.name=t.name,e.image=t.image,e.quantity=1,r.type=="sell"?(s.value=t.inventory,d.value=s.value[0].id,e.inventory_id=s.value[0].id,e.discount=t.discount):e.expired_at=t.expired_at,V.value=!0}function O(){if(r.type=="sell"&&B()&&!_.value){p.error("Este producto con esta medida ya ha sido agregado");return}if(r.type=="buy"&&u.value.find(t=>t.id==e.id&&t.measure==e.measure)&&!_.value){p.error("Este producto con esta medida ya ha sido agregado");return}if(r.type=="sell"&&e.quantity>U.value){p.error("La cantidad no puede ser mayor a la disponible");return}e.discount==null&&(e.discount=0),_.value?(u.value[x.value]={...e},p.success("Producto actualizado")):(u.value.push({...e}),p.success("Producto agregado")),P()}function B(){return u.value.find(t=>t.id==e.id&&t.inventory_id==e.inventory_id)}function P(){Object.assign(e,$),_.value=!1,s.value=[],d.value=null,x.value=null,V.value=!1}function E(t){e.id=u.value[t].id,e.name=u.value[t].name,e.image=u.value[t].image,e.quantity=u.value[t].quantity,e.price=u.value[t].price,r.type=="sell"?(s.value=r.products.find(a=>a.id==e.id).inventory,e.inventory_id=u.value[t].inventory_id,d.value=u.value[t].inventory_id,e.discount=u.value[t].discount):(e.cost=u.value[t].cost,e.measure=u.value[t].measure,e.expired_at=u.value[t].expired_at),_.value=!0,x.value=t,V.value=!0}function L(t){u.value.splice(t,1),p.success("Producto eliminado")}I(()=>d.value,t=>{if(!t)return;const a=s.value.find(l=>l.id==t);e.measure=a.measure,e.price=a.unit_price,e.inventory_id=a.id});const U=z(()=>s.value.length==0||!d.value?0:s.value.find(t=>t.id==d.value).quantity);return(t,a)=>(c(),S(D,{title:q[n.type],breads:k},{header:g(()=>[o("span",A,y(q[n.type]),1)]),default:g(()=>[o("div",Q,[i(N,{products:n.products,onSetProduct:h},null,8,["products"]),i(T,{products:u.value,type:n.type,onEdit:E,onRemove:L},null,8,["products","type"])]),i(w,{show:V.value,title:e.name,onOnCancel:a[8]||(a[8]=l=>P()),onOnSubmit:a[9]||(a[9]=l=>O())},{default:g(()=>[o("div",R,[n.type=="buy"?(c(),f(b,{key:0},[o("datalist",W,[(c(!0),f(b,null,j(n.measures,l=>(c(),f("option",{value:l},null,8,G))),256))]),i(m,{text:"Medida",modelValue:e.measure,"onUpdate:modelValue":a[0]||(a[0]=l=>e.measure=l),required:"",min:1,list:"measures"},null,8,["modelValue"]),i(m,{text:"Cantidad",modelValue:e.quantity,"onUpdate:modelValue":a[1]||(a[1]=l=>e.quantity=l),type:"number",required:"",min:1},null,8,["modelValue"]),i(m,{text:"Costo (Unidad)",modelValue:e.cost,"onUpdate:modelValue":a[2]||(a[2]=l=>e.cost=l),type:"number",required:"",min:1},null,8,["modelValue"]),i(m,{text:"Precio (Unidad)",modelValue:e.price,"onUpdate:modelValue":a[3]||(a[3]=l=>e.price=l),type:"number",required:"",min:1},null,8,["modelValue"]),n.is_caducable?(c(),S(m,{key:0,text:"Vence",modelValue:e.expired_at,"onUpdate:modelValue":a[4]||(a[4]=l=>e.expired_at=l),type:"date"},null,8,["modelValue"])):C("",!0),o("div",H,[o("div",J," Total: C$"+y((e.quantity*e.cost).toLocaleString()),1)])],64)):C("",!0),n.type=="sell"?(c(),f(b,{key:1},[i(M,{text:"Medida",modelValue:d.value,"onUpdate:modelValue":a[5]||(a[5]=l=>d.value=l),required:""},{default:g(()=>[K,(c(!0),f(b,null,j(s.value,l=>(c(),f("option",{value:l.id},y(l.measure)+" - C$"+y(l.unit_price),9,X))),256))]),_:1},8,["modelValue"]),i(m,{text:"Cantidad",modelValue:e.quantity,"onUpdate:modelValue":a[6]||(a[6]=l=>e.quantity=l),type:"number",required:"",min:1,description:`Disponible: ${U.value}`},null,8,["modelValue","description"]),i(m,{text:"Descuento",modelValue:e.discount,"onUpdate:modelValue":a[7]||(a[7]=l=>e.discount=l),type:"number"},null,8,["modelValue"]),o("div",Y,[o("div",Z,[o("div",ee,"Precio: C$"+y(e.price.toLocaleString()),1),o("div",null,"Total: C$"+y((e.quantity*e.price-e.discount).toLocaleString()),1)])])],64)):C("",!0)])]),_:1},8,["show","title"])]),_:1},8,["title"]))}};export{ye as default};