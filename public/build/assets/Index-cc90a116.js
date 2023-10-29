import{_ as C}from"./AddButton-21f9cad0.js";import{_ as x}from"./InputForm-7e10ab10.js";import{_ as $}from"./FormModal-2794491e.js";import{T as y}from"./TableSection-53862e82.js";import{_ as N}from"./ThePaginator-917b3db3.js";import{_ as V}from"./AppLayout-48c7ce5f.js";import{c as I}from"./helpers-912a314d.js";import{t as f}from"./toast-432570cc.js";import{i as _,T as M,o as i,g as O,h as r,d as o,a as p,r as w,b as e,t as h,u,F as B,e as T,O as j}from"./app-abfa699b.js";import{I as q}from"./IconPencil-0ddf130c.js";import{I as A}from"./IconTrash-e0b11acb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./createVueComponent-41fcc9fd.js";const F=e("span",{class:"title"}," Categorias ",-1),U=e("th",null,"#",-1),z=e("th",null,"Nombre",-1),D=e("th",null,"Acciones",-1),E={class:"hover:bg-gray-50"},L={class:"font-semibold"},P={class:"flex gap-4"},G={key:0},H=e("td",{colspan:"3",class:"text-center"},"No hay datos que mostrar",-1),J=[H],le={__name:"Index",props:{measures:{type:Object,required:!0}},setup(d){const v=[{name:"Inicio",route:route("dashboard.index")},{name:"Medidas",route:route("dashboard.measures.index")}],m=_(!0),n=_(!1),t=M({id:"",name:""});function b(l){Object.assign(t,l),n.value=!0,m.value=!1}function g(){t.name=t.name.toUpperCase(),m.value?t.post(route("dashboard.measures.store"),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{f.success("Medida agregada"),c()}}):t.put(route("dashboard.measures.update",t.id),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{f.success("Medida actualizada"),c()}})}function c(){n.value=!1,m.value=!0,t.reset()}function S(l){I({onConfirm:()=>{j.delete(route("dashboard.measures.destroy",l),{preserveScroll:!0,preserveState:!0,onSuccess:()=>{f.success("Medida eliminada")}})}})}return(l,a)=>(i(),O(V,{title:"Categorias",breads:v},{header:r(()=>[F,o(C,{onClick:a[0]||(a[0]=s=>n.value=!0)})]),default:r(()=>[o(y,null,{header:r(()=>[U,z,D]),body:r(()=>[(i(!0),p(B,null,w(d.measures.data,(s,K)=>(i(),p("tr",E,[e("td",null,h(s.id),1),e("td",null,[e("span",L,h(s.name),1)]),e("td",null,[e("div",P,[o(u(q),{role:"button",onClick:k=>b(s)},null,8,["onClick"]),o(u(A),{role:"button",onClick:k=>S(s.id)},null,8,["onClick"])])])]))),256)),d.measures.data.length==0?(i(),p("tr",G,J)):T("",!0)]),paginator:r(()=>[o(N,{links:d.measures.links},null,8,["links"])]),_:1}),o($,{show:n.value,title:"Medida",onOnCancel:a[2]||(a[2]=s=>c()),onOnSubmit:a[3]||(a[3]=s=>g())},{default:r(()=>[o(x,{text:"Name",modelValue:u(t).name,"onUpdate:modelValue":a[1]||(a[1]=s=>u(t).name=s)},null,8,["modelValue"])]),_:1},8,["show"])]),_:1}))}};export{le as default};
