import{_}from"./AppLayout-48c7ce5f.js";import{C as h}from"./Carbon-053ffa43.js";import{o as t,g as f,h as d,b as e,a,F as p,r as x,t as r,d as b,u as l,O as i}from"./app-abfa699b.js";import{I as g}from"./IconTrash-e0b11acb.js";import"./createVueComponent-41fcc9fd.js";const y=e("span",{class:"title"}," Alertas ",-1),k={key:0,class:"grid grid-cols-2 gap-4"},v={class:"p-4 rounded-xl bg-white flex justify-between flex-col",role:"alert"},C={class:"flex items-center gap-2 justify-between mb-4"},w={class:"text-lg font-xl font-bold text-gray-600"},A={class:"mb-4 text-normal text-gray-600"},B={class:"text-sm text-gray-400"},I={key:1},q={__name:"Index",props:{alerts:{type:Object,required:!0}},setup(o){const c=[{name:"Inicio",route:route("dashboard.index")},{name:"Alertas",route:route("dashboard.alerts.index")}];function m(n){i.delete(route("dashboard.alerts.destroy",n),{preserveState:!0})}function u(){i.put(route("dashboard.alerts.mark-as-read"),{preserveState:!0})}return(n,j)=>(t(),f(_,{title:"Alertas",breads:c},{header:d(()=>[y]),default:d(()=>[e("div",{class:"mb-6 text-end"},[e("span",{class:"text-sm",role:"button",onClick:u},"Marcar todas como leidas")]),o.alerts.length>0?(t(),a("div",k,[(t(!0),a(p,null,x(o.alerts,s=>(t(),a("div",v,[e("div",C,[e("h3",w,r(s.name),1),b(l(g),{role:"button",onClick:N=>m(s.id)},null,8,["onClick"])]),e("div",A,r(s.description),1),e("div",B,r(l(h).create(s.created_at).format("m/d/Y H:i")),1)]))),256))])):(t(),a("div",I," No hay alertas "))]),_:1}))}};export{q as default};
