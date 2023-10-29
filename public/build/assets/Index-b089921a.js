import{_ as C}from"./AddButton-1b0ea8ed.js";import{_ as x}from"./InputForm-79ad393b.js";import{_ as $}from"./FormModal-a20b1695.js";import{T as y}from"./TableSection-37563e4b.js";import{_ as N}from"./ThePaginator-8a2c0b89.js";import{_ as V}from"./AppLayout-baf42c63.js";import{c as I}from"./helpers-f2fcf906.js";import{t as f}from"./toast-d5910732.js";import{i as _,T as M,o as i,g as O,h as r,d as o,a as p,r as w,b as e,t as h,u,F as B,e as T,O as j}from"./app-18ae9441.js";import{I as q}from"./IconPencil-502bda91.js";import{I as A}from"./IconTrash-1208ea66.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./createVueComponent-01011238.js";const F=e("span",{class:"title"}," Categorias ",-1),z=e("th",null,"#",-1),D=e("th",null,"Nombre",-1),E=e("th",null,"Acciones",-1),L={class:"hover:bg-gray-50"},P={class:"font-semibold"},U={class:"flex gap-4"},G={key:0},H=e("td",{colspan:"3",class:"text-center"},"No hay datos que mostrar",-1),J=[H],le={__name:"Index",props:{measures:{type:Object,required:!0}},setup(d){const v=[{name:"Inicio",route:route("dashboard.index")},{name:"Medidas",route:route("dashboard.measures.index")}],c=_(!0),n=_(!1),a=M({id:"",name:""});function b(l){Object.assign(a,l),n.value=!0,c.value=!1}function g(){c.value?a.post(route("dashboard.measures.store"),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{f.success("Medida agregada"),m()}}):a.put(route("dashboard.measures.update",a.id),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{f.success("Medida actualizada"),m()}})}function m(){n.value=!1,c.value=!0,a.reset()}function S(l){I({onConfirm:()=>{j.delete(route("dashboard.measures.destroy",l),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{f.success("Medida eliminada")}})}})}return(l,s)=>(i(),O(V,{title:"Categorias",breads:v},{header:r(()=>[F,o(C,{onClick:s[0]||(s[0]=t=>n.value=!0)})]),default:r(()=>[o(y,null,{header:r(()=>[z,D,E]),body:r(()=>[(i(!0),p(B,null,w(d.measures.data,(t,K)=>(i(),p("tr",L,[e("td",null,h(t.id),1),e("td",null,[e("span",P,h(t.name),1)]),e("td",null,[e("div",U,[o(u(q),{role:"button",onClick:k=>b(t)},null,8,["onClick"]),o(u(A),{role:"button",onClick:k=>S(t.id)},null,8,["onClick"])])])]))),256)),d.measures.data.length==0?(i(),p("tr",G,J)):T("",!0)]),paginator:r(()=>[o(N,{links:d.measures.links},null,8,["links"])]),_:1}),o($,{show:n.value,title:"Medida",onOnCancel:s[2]||(s[2]=t=>m()),onOnSubmit:s[3]||(s[3]=t=>g())},{default:r(()=>[o(x,{text:"Name",modelValue:u(a).name,"onUpdate:modelValue":s[1]||(s[1]=t=>u(a).name=t)},null,8,["modelValue"])]),_:1},8,["show"])]),_:1}))}};export{le as default};
