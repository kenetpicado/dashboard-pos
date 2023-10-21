import{_ as k}from"./AppLayout-e609c35e.js";import{T as g}from"./TableSection-ac211b9d.js";import{_ as C,c as $}from"./helpers-87fcb8ef.js";import{_ as I}from"./FormModal-b98706ae.js";import{_ as m}from"./InputForm-4cafefdf.js";import{T as N,r as h,o as n,g as q,h as u,d as a,a as c,i as B,b as s,t as f,u as r,F as b,e as V}from"./app-ec9b2b19.js";import{t as _}from"./toast-af43fcaa.js";import{I as T}from"./IconPencil-6622efe6.js";import{I as E}from"./IconTrash-c1fa2c12.js";import"./createVueComponent-3ab2bfc7.js";import"./_plugin-vue_export-helper-c27b6911.js";const O=s("span",{class:"title"}," Usuarios ",-1),P=s("th",null,"ID",-1),A=s("th",null,"Nombre",-1),D=s("th",null,"Email",-1),F=s("th",null,"Acciones",-1),j={class:"hover:bg-gray-50"},z={class:"flex gap-2"},L={key:0},M=s("td",{colspan:"4",class:"text-center"},"No hay datos que mostrar",-1),G=[M],se={__name:"Index",props:{users:{type:Object,required:!0}},setup(v){const w=[{name:"Inicio",route:route("dashboard.users.index")},{name:"Usuarios",route:route("dashboard.users.index")}],e=N({id:null,name:"",email:"",password:"",password_confirmation:""}),i=h(!1),d=h(!0);function x(l){e.id=l.id,e.name=l.name,e.email=l.email,i.value=!0,d.value=!1}function S(){d.value?e.post(route("dashboard.users.store"),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{_.success("Usuario agregado"),p()}}):e.put(route("dashboard.users.update",e.id),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{_.success("Usuario actualizado"),p()}})}function y(l){$({onConfirm:()=>{e.delete(route("dashboard.users.destroy",l),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{_.success("Usuario eliminado")}})}})}const p=()=>{i.value=!1,d.value=!0,e.reset()};return(l,o)=>(n(),q(k,{title:"Usuarios",breads:w},{header:u(()=>[O,a(C,{onClick:o[0]||(o[0]=t=>i.value=!0)})]),default:u(()=>[a(g,null,{header:u(()=>[P,A,D,F]),body:u(()=>[(n(!0),c(b,null,B(v.users,(t,H)=>(n(),c("tr",j,[s("td",null,f(t.id),1),s("td",null,f(t.name),1),s("td",null,f(t.email),1),s("td",null,[s("div",z,[a(r(T),{role:"button",onClick:U=>x(t)},null,8,["onClick"]),a(r(E),{role:"button",onClick:U=>y(t.id)},null,8,["onClick"])])])]))),256)),v.users.length==0?(n(),c("tr",L,G)):V("",!0)]),_:1}),a(I,{show:i.value,title:"Usuario",onOnCancel:o[5]||(o[5]=t=>p()),onOnSubmit:S},{default:u(()=>[a(m,{text:"Name",modelValue:r(e).name,"onUpdate:modelValue":o[1]||(o[1]=t=>r(e).name=t),required:""},null,8,["modelValue"]),a(m,{text:"Email",modelValue:r(e).email,"onUpdate:modelValue":o[2]||(o[2]=t=>r(e).email=t),type:"email",required:""},null,8,["modelValue"]),d.value?(n(),c(b,{key:0},[a(m,{text:"Password",modelValue:r(e).password,"onUpdate:modelValue":o[3]||(o[3]=t=>r(e).password=t),type:"password",required:""},null,8,["modelValue"]),a(m,{text:"Password confirmation",modelValue:r(e).password_confirmation,"onUpdate:modelValue":o[4]||(o[4]=t=>r(e).password_confirmation=t),type:"password",required:""},null,8,["modelValue"])],64)):V("",!0)]),_:1},8,["show"])]),_:1}))}};export{se as default};