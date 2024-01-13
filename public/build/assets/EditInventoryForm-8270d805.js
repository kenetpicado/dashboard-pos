import{T as $,i as B,k as U,o as a,g as h,h as M,b as l,a as u,F as c,r as O,d,u as s,w as S,m as E,e as q}from"./app-ae7c6072.js";import{t as F}from"./toast-96892570.js";import{_ as N}from"./FormModal-cb8f0504.js";import{_ as p}from"./InputForm-8d66ad14.js";import{_ as j}from"./ColorList-b8040169.js";const I={class:"grid grid-cols-2 gap-4"},R={id:"measures"},T=["value"],z={class:"flex items-center mb-4"},A=l("div",{class:"mb-2"}," Colores disponibles ",-1),J={__name:"EditInventoryForm",props:{measures:{type:Object,required:!0},openModal:{type:Boolean,default:!1},form:{type:Object,required:!0}},emits:["onCancel"],setup(m,{emit:C}){var y,_,V,b,g;const n=m,o=$({id:((y=n.form)==null?void 0:y.id)??null,measure:((_=n.form)==null?void 0:_.measure)??null,quantity:((V=n.form)==null?void 0:V.quantity)??null,unit_price:((b=n.form)==null?void 0:b.unit_price)??null,colors:((g=n.form)==null?void 0:g.colors)??[]}),i=B("#000000"),k=()=>{o.put(route("dashboard.inventory.update",o.id),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{F.success("Registro actualizado correctamente"),f()}})},f=()=>{o.reset(),C("onCancel")};U(()=>n.form,e=>{o.id=(e==null?void 0:e.id)??null,o.measure=(e==null?void 0:e.measure)??null,o.quantity=(e==null?void 0:e.quantity)??null,o.unit_price=(e==null?void 0:e.unit_price)??null,o.colors=(e==null?void 0:e.colors)??[]},{deep:!0});function x(e){o.colors=o.colors.filter(t=>t!=e)}function w(){i.value&&(o.colors.find(e=>e==i.value)||o.colors.push(i.value))}return(e,t)=>(a(),h(N,{show:m.openModal,title:"Editar",onOnCancel:t[4]||(t[4]=r=>f()),onOnSubmit:t[5]||(t[5]=r=>k())},{default:M(()=>[l("div",I,[l("datalist",R,[(a(!0),u(c,null,O(m.measures,r=>(a(),u("option",{value:r},null,8,T))),256))]),d(p,{text:"Medida",modelValue:s(o).measure,"onUpdate:modelValue":t[0]||(t[0]=r=>s(o).measure=r),required:"",list:"measures"},null,8,["modelValue"]),d(p,{text:"Cantidad",modelValue:s(o).quantity,"onUpdate:modelValue":t[1]||(t[1]=r=>s(o).quantity=r),type:"number",required:"",min:1},null,8,["modelValue"]),d(p,{text:"Precio (Unidad)",modelValue:s(o).unit_price,"onUpdate:modelValue":t[2]||(t[2]=r=>s(o).unit_price=r),type:"number",required:"",min:1},null,8,["modelValue"])]),e.$page.props.manage_colors?(a(),u(c,{key:0},[l("div",z,[l("button",{type:"button",class:"primary-button mr-4",onClick:w}," Agregar color "),S(l("input",{type:"color","onUpdate:modelValue":t[3]||(t[3]=r=>i.value=r),class:"h-8"},null,512),[[E,i.value]])]),s(o).colors.length>0?(a(),u(c,{key:0},[A,d(j,{colors:s(o).colors,onRemoveColor:x},null,8,["colors"])],64)):q("",!0)],64)):q("",!0)]),_:1},8,["show"]))}};export{J as _};