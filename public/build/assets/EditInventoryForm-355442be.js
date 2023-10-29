import{t as b}from"./toast-432570cc.js";import{_ as g}from"./FormModal-2794491e.js";import{T as x,k as B,o as a,g as C,h as k,b as y,a as V,F as w,r as O,d as u,u as o}from"./app-abfa699b.js";import{_ as d}from"./InputForm-7e10ab10.js";const S={class:"grid grid-cols-2 gap-4"},U={id:"measures"},$=["value"],N={__name:"EditInventoryForm",props:{measures:{type:Object,required:!0},openModal:{type:Boolean,default:!1},form:{type:Object,required:!0}},emits:["onCancel"],setup(i,{emit:_}){var m,p,c,f;const s=i,e=x({id:((m=s.form)==null?void 0:m.id)??null,measure:((p=s.form)==null?void 0:p.measure)??null,quantity:((c=s.form)==null?void 0:c.quantity)??null,unit_price:((f=s.form)==null?void 0:f.unit_price)??null}),q=()=>{e.put(route("dashboard.inventory.update",e.id),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{b.success("Registro actualizado correctamente"),l()}})},l=()=>{e.reset(),_("onCancel")};return B(()=>s.form,t=>{e.id=(t==null?void 0:t.id)??null,e.measure=(t==null?void 0:t.measure)??null,e.quantity=(t==null?void 0:t.quantity)??null,e.unit_price=(t==null?void 0:t.unit_price)??null},{deep:!0}),(t,r)=>(a(),C(g,{show:i.openModal,title:"Editar",onOnCancel:r[3]||(r[3]=n=>l()),onOnSubmit:r[4]||(r[4]=n=>q())},{default:k(()=>[y("div",S,[y("datalist",U,[(a(!0),V(w,null,O(i.measures,n=>(a(),V("option",{value:n},null,8,$))),256))]),u(d,{text:"Medida",modelValue:o(e).measure,"onUpdate:modelValue":r[0]||(r[0]=n=>o(e).measure=n),required:"",list:"measures"},null,8,["modelValue"]),u(d,{text:"Cantidad",modelValue:o(e).quantity,"onUpdate:modelValue":r[1]||(r[1]=n=>o(e).quantity=n),type:"number",required:"",min:1},null,8,["modelValue"]),u(d,{text:"Precio (Unidad)",modelValue:o(e).unit_price,"onUpdate:modelValue":r[2]||(r[2]=n=>o(e).unit_price=n),type:"number",required:"",min:1},null,8,["modelValue"])])]),_:1},8,["show"]))}};export{N as _};
