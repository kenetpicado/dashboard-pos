import{_ as f}from"./AppLayout-ebf66ccd.js";import{_ as c}from"./FormSection-447bb743.js";import{_ as r}from"./InputForm-f7786dbc.js";import{T as w,o as _,g as x,h as l,d as s,u as a,b as i,O as V}from"./app-dafdfc05.js";import{t as b}from"./toast-2eb44df3.js";import"./createVueComponent-a1973eaa.js";import"./_plugin-vue_export-helper-c27b6911.js";const y=i("span",{class:"title mt-1"}," Profile ",-1),v=i("div",{class:"col-span-2 mb-2 text-end"},[i("span",{class:"text-sm text-gray-600"},"Leave password blank if you don't want to change it")],-1),k={__name:"Index",props:{profile:{type:Object,required:!0}},setup(n){const d=n,m=[{name:"Inicio",route:route("dashboard.users.index")},{name:"Perfil",route:route("dashboard.profile.index")}],e=w({id:d.profile.id,name:d.profile.name,email:d.profile.email,password:"",password_confirmation:""});function p(){e.password===""&&(delete e.password,delete e.password_confirmation),e.put(route("dashboard.profile.update",e.id),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{b.success("Perfil actualizado")}})}function u(){V.visit(route("dashboard.dashboard.index"))}return(C,o)=>(_(),x(f,{title:"Create",breads:m},{header:l(()=>[y]),default:l(()=>[s(c,{title:"Create",onOnSubmit:p,onOnCancel:u,isNew:!1},{default:l(()=>[s(r,{text:"Name",modelValue:a(e).name,"onUpdate:modelValue":o[0]||(o[0]=t=>a(e).name=t),required:""},null,8,["modelValue"]),s(r,{text:"Email",modelValue:a(e).email,"onUpdate:modelValue":o[1]||(o[1]=t=>a(e).email=t),type:"email",required:""},null,8,["modelValue"]),s(r,{text:"Password",modelValue:a(e).password,"onUpdate:modelValue":o[2]||(o[2]=t=>a(e).password=t),type:"password"},null,8,["modelValue"]),s(r,{text:"Password confirmation",modelValue:a(e).password_confirmation,"onUpdate:modelValue":o[3]||(o[3]=t=>a(e).password_confirmation=t),type:"password"},null,8,["modelValue"]),v]),_:1})]),_:1}))}};export{k as default};