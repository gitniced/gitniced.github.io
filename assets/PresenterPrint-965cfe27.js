import{f as d,h as _,j as p,ag as h,c as m,ah as u,l as n,ai as t,aj as a,y as s,F as f,ak as g,al as v,am as x,n as r,an as y,ao as b,m as N,ap as k,aq as w,_ as P}from"./nav-a14846d1.js";import{N as V}from"./NoteViewer-759cc20b.js";import{u as j}from"./index-5230abf1.js";const S={class:"m-4"},L={class:"mb-10"},T={class:"text-4xl font-bold mt-2"},B={class:"opacity-50"},C={class:"text-lg"},H={class:"font-bold flex gap-2"},z={class:"opacity-50"},D=t("div",{class:"flex-auto"},null,-1),E={key:0,class:"border-gray-400/50 mb-8"},F=d({__name:"PresenterPrint",setup(M){_(p),h(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),j({title:`Notes - ${m.title}`});const l=u(()=>x.slice(0,-1).map(o=>{var i;return(i=o.meta)==null?void 0:i.slide}).filter(o=>o!==void 0&&o.notesHTML!==""));return(o,i)=>(r(),n("div",{id:"page-root",style:v(s(w))},[t("div",S,[t("div",L,[t("h1",T,a(s(m).title),1),t("div",B,a(new Date().toLocaleString()),1)]),(r(!0),n(f,null,g(s(l),(e,c)=>(r(),n("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",C,[t("div",H,[t("div",z,a(e==null?void 0:e.no)+"/"+a(s(y)),1),b(" "+a(e==null?void 0:e.title)+" ",1),D])]),N(V,{"note-html":e.notesHTML,class:"max-w-full"},null,8,["note-html"])]),c<s(l).length-1?(r(),n("hr",E)):k("v-if",!0)]))),128))])],4))}}),W=P(F,[["__file","E:/space/slidev/monorepo/node_modules/.pnpm/registry.npmmirror.com+@slidev+client@0.38.7_vite@4.0.4/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{W as default};
