import{c as m,o as s,a as l,b as u,t as n,m as c,e as p}from"./app-abfa699b.js";const f={class:"w-full mb-4"},g={class:"block font-medium text-sm text-gray-700"},y=["required","value"],b={key:0,class:"text-sm text-red-600 mt-1"},q={__name:"SelectForm",props:{text:{type:String,required:!0},modelValue:{type:[String,Number],required:!1},name:{type:String,required:!1},required:{type:Boolean,default:!1}},setup(t){const r=t,o=m(()=>r.name??d(r.text));function d(e){return e.toLowerCase().replace(/ /g,"_")}return(e,a)=>(s(),l("div",f,[u("label",g,n(t.text),1),u("select",{required:t.required,class:"border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full transition duration-300 ease-in-out",value:t.modelValue,onInput:a[0]||(a[0]=i=>e.$emit("update:modelValue",i.target.value))},[c(e.$slots,"default")],40,y),e.$page.props.errors[o.value]?(s(),l("p",b,n(e.$page.props.errors[o.value]),1)):p("",!0)]))}};export{q as _};
