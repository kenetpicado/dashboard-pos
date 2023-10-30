import{_ as g}from"./AppLayout-de799de5.js";import{_ as x}from"./FormSection-9c4a84c7.js";import{_ as d}from"./InputForm-b6808342.js";import{T as w,o as y,g as v,h as i,d as r,u as t,b as l,O as U}from"./app-447a874b.js";import{t as C}from"./toast-76316636.js";import{_ as c}from"./SelectForm-0911f801.js";import"./createVueComponent-9f714232.js";import"./_plugin-vue_export-helper-c27b6911.js";const N=l("span",{class:"title mt-1"}," Profile ",-1),O=l("option",{value:"not_manage"},"No administrar",-1),P=l("option",{value:"manage"},"Administrar",-1),k=l("option",{value:"no_caducable"},"No perecederos",-1),S=l("option",{value:"caducable"},"Perecederos",-1),q=l("div",{class:"col-span-2 mb-2 text-end"},[l("span",{class:"text-sm text-gray-600"},"Dejar la contraseña en blanco si no la desea actualizar.")],-1),D={__name:"Index",props:{profile:{type:Object,required:!0},settings:{type:Object,required:!0}},setup(f){var u,m,p;const n=f,_=[{name:"Inicio",route:route("dashboard.index")},{name:"Perfil",route:route("dashboard.profile.index")}],e=w({id:n.profile.id,name:n.profile.name,email:n.profile.email,password:"",password_confirmation:"",settings:{product_min:((u=n.settings.find(s=>s.key==="product_min"))==null?void 0:u.value)??null,product_type:((m=n.settings.find(s=>s.key==="product_type"))==null?void 0:m.value)??"no_caducable",colors:((p=n.settings.find(s=>s.key==="colors"))==null?void 0:p.value)??"not_manage"}});function V(){e.password===""&&(delete e.password,delete e.password_confirmation),e.put(route("dashboard.profile.update",e.id),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{C.success("Perfil actualizado")},onError:s=>{console.log(s)}})}function b(){U.visit(route("dashboard.index"))}return(s,o)=>(y(),v(g,{title:"Create",breads:_},{header:i(()=>[N]),default:i(()=>[r(x,{title:"Create",onOnSubmit:V,onOnCancel:b,isNew:!1},{default:i(()=>[r(d,{text:"Name",modelValue:t(e).name,"onUpdate:modelValue":o[0]||(o[0]=a=>t(e).name=a),required:""},null,8,["modelValue"]),r(d,{text:"Email",modelValue:t(e).email,"onUpdate:modelValue":o[1]||(o[1]=a=>t(e).email=a),type:"email",required:""},null,8,["modelValue"]),r(d,{text:"Alerta minimo de productos",modelValue:t(e).settings.product_min,"onUpdate:modelValue":o[2]||(o[2]=a=>t(e).settings.product_min=a),type:"number",min:1},null,8,["modelValue"]),r(c,{modelValue:t(e).settings.colors,"onUpdate:modelValue":o[3]||(o[3]=a=>t(e).settings.colors=a),text:"Colores"},{default:i(()=>[O,P]),_:1},8,["modelValue"]),r(c,{modelValue:t(e).settings.product_type,"onUpdate:modelValue":o[4]||(o[4]=a=>t(e).settings.product_type=a),text:"Tipo de productos"},{default:i(()=>[k,S]),_:1},8,["modelValue"]),r(d,{text:"Password",modelValue:t(e).password,"onUpdate:modelValue":o[5]||(o[5]=a=>t(e).password=a),type:"password"},null,8,["modelValue"]),r(d,{text:"Password confirmation",modelValue:t(e).password_confirmation,"onUpdate:modelValue":o[6]||(o[6]=a=>t(e).password_confirmation=a),type:"password"},null,8,["modelValue"]),q]),_:1})]),_:1}))}};export{D as default};
