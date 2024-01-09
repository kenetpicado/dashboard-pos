import{_ as g}from"./AppLayout-7f5e14d0.js";import{_ as y}from"./FormSection-eb1f6eda.js";import{_ as i}from"./InputForm-b75227be.js";import{T as w,o as v,g as U,h as d,d as l,u as t,b as n,O as P}from"./app-b76a9bfc.js";import{t as k}from"./toast-5832cfeb.js";import{_ as f}from"./SelectForm-7c21409b.js";import"./createVueComponent-19caef2b.js";import"./_plugin-vue_export-helper-c27b6911.js";const C=n("span",{class:"title mt-1"}," Perfil ",-1),N=n("h1",{class:"text-2xl font-extrabold text-gray-600 col-span-2 mb-4"}," Datos personales ",-1),O=n("div",{class:"col-span-2 mb-2 text-end"},[n("span",{class:"text-sm text-gray-600"},"Dejar la contraseña en blanco si no la desea actualizar.")],-1),S=n("h1",{class:"text-2xl font-extrabold text-gray-600 col-span-2 mb-4"}," Configuraciones ",-1),q=n("option",{value:"not_manage"},"No administrar",-1),$=n("option",{value:"manage"},"Administrar",-1),j=n("option",{value:"no_caducable"},"No perecederos",-1),B=n("option",{value:"caducable"},"Perecederos",-1),G={__name:"Index",props:{profile:{type:Object,required:!0},settings:{type:Object,required:!0}},setup(_){var m,u,p,c;const r=_,b=[{name:"Inicio",route:route("dashboard.index")},{name:"Perfil",route:route("dashboard.profile.index")}],e=w({id:r.profile.id,name:r.profile.name,email:r.profile.email,password:"",password_confirmation:"",settings:{product_min:((m=r.settings.find(s=>s.key==="product_min"))==null?void 0:m.value)??null,product_type:((u=r.settings.find(s=>s.key==="product_type"))==null?void 0:u.value)??"no_caducable",colors:((p=r.settings.find(s=>s.key==="colors"))==null?void 0:p.value)??"not_manage",mobile:((c=r.settings.find(s=>s.key==="mobile"))==null?void 0:c.value)??null}});function x(){e.password===""&&(delete e.password,delete e.password_confirmation),e.put(route("dashboard.profile.update",e.id),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{k.success("Perfil actualizado")},onError:s=>{console.log(s)}})}function V(){P.visit(route("dashboard.index"))}return(s,o)=>(v(),U(g,{title:"Perfil",breads:b},{header:d(()=>[C]),default:d(()=>[l(y,{title:"Create",onOnSubmit:x,onOnCancel:V,isNew:!1},{default:d(()=>[N,l(i,{text:"Name",modelValue:t(e).name,"onUpdate:modelValue":o[0]||(o[0]=a=>t(e).name=a),required:""},null,8,["modelValue"]),l(i,{text:"Email",modelValue:t(e).email,"onUpdate:modelValue":o[1]||(o[1]=a=>t(e).email=a),type:"email",required:""},null,8,["modelValue"]),l(i,{text:"Password",modelValue:t(e).password,"onUpdate:modelValue":o[2]||(o[2]=a=>t(e).password=a),type:"password"},null,8,["modelValue"]),l(i,{text:"Password confirmation",modelValue:t(e).password_confirmation,"onUpdate:modelValue":o[3]||(o[3]=a=>t(e).password_confirmation=a),type:"password"},null,8,["modelValue"]),O,S,l(i,{text:"Telefono empresarial",modelValue:t(e).settings.mobile,"onUpdate:modelValue":o[4]||(o[4]=a=>t(e).settings.mobile=a),type:"number",min:8},null,8,["modelValue"]),l(i,{text:"Alerta minimo de productos",modelValue:t(e).settings.product_min,"onUpdate:modelValue":o[5]||(o[5]=a=>t(e).settings.product_min=a),type:"number",min:1},null,8,["modelValue"]),l(f,{modelValue:t(e).settings.colors,"onUpdate:modelValue":o[6]||(o[6]=a=>t(e).settings.colors=a),text:"Colores"},{default:d(()=>[q,$]),_:1},8,["modelValue"]),l(f,{modelValue:t(e).settings.product_type,"onUpdate:modelValue":o[7]||(o[7]=a=>t(e).settings.product_type=a),text:"Tipo de productos"},{default:d(()=>[j,B]),_:1},8,["modelValue"])]),_:1})]),_:1}))}};export{G as default};
