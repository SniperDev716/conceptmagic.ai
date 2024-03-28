"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[609],{9211:(e,t,a)=>{a.r(t),a.d(t,{default:()=>w});var n=a(2791),r=(a(9434),a(7689)),i=a(9389),l=a(3655),o=a(6106),c=a(914),s=a(2242),d=a(7309),u=a(4622),h=(a(8868),a(5169)),g=a(2752),m=a(3781);const p=a.p+"static/media/loading.ea020ef38ccfc2c36148.gif";const x=function(e){const t=(0,n.useRef)();return(0,n.useEffect)((()=>{t.current=e})),t.current};var f=a(184);const{TextArea:v}=i.default,{Title:b,Text:j}=l.default;const w=function(){var e,t,a;const i=(0,m.sV)(),{id:l}=(0,r.UO)(),[j,w]=(0,n.useState)([]),[y,I]=(0,n.useState)({}),[N,S]=(0,n.useState)(-1),[E,z]=(0,n.useState)([]),[k,G]=(0,n.useState)({}),[O,A]=(0,n.useState)([]),[C,Z]=(0,n.useState)([]),[T,_]=(0,n.useState)([]),M=x(y);return(0,n.useEffect)((()=>{const e=()=>{(0,g.Jo)(l).then((e=>{I(e.data.concept),e.data.concept&&(Z(e.data.concept.resultImages.map((e=>e.prompt))),w(e.data.concept.resultImages.map((()=>!1))))})).catch((e=>{console.log(e)}))};return e(),i&&i.on("IMAGE_GENERATED",(t=>{console.log("IMAGE_GENERATED"),e()})),()=>{i&&i.off("IMAGE_GENERATED")}}),[]),(0,n.useEffect)((()=>{var e,t;(null===y||void 0===y||null===(e=y.resultImages)||void 0===e?void 0:e.length)-(null===M||void 0===M||null===(t=M.resultImages)||void 0===t?void 0:t.length)==1&&window.scrollTo(0,document.body.scrollHeight)}),[null===y||void 0===y||null===(e=y.resultImages)||void 0===e?void 0:e.length]),(0,f.jsx)("div",{className:"text-center max-w-5xl w-screen mx-auto p-4",children:(0,f.jsxs)(o.Z,{gutter:[32,32],className:"mt-6",children:[(0,f.jsx)(c.Z,{span:24,children:(null===(t=y.resultImages)||void 0===t?void 0:t.filter((e=>"completed"==e.status)).length)>0?(0,f.jsxs)(b,{level:4,className:"bg-purple-500 rounded-full p-3 !text-white",children:["These images are ",(0,f.jsx)("span",{className:"text-black font-bold",children:"AI Generated"}),". Use words to change them however you want."]}):(0,f.jsx)(b,{level:4,children:"Please wait 30 seconds while our AI Generates your starting image."})}),(0,f.jsxs)("div",{className:"bg-white p-4 rounded shadow-none mb-4 w-full",children:[!y.resultImages&&(0,f.jsxs)("div",{className:"w-full h-44 bg-center bg-no-repeat bg-[length:400px_300px]",style:{backgroundImage:"url(".concat(p,")"),backgroundColor:"#E9E9EB"},children:[(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),"Loading..."]}),null===(a=y.resultImages)||void 0===a?void 0:a.map(((e,t)=>{var a,n;return(0,f.jsxs)(o.Z,{gutter:[24,24],children:[(null===(a=e.urls)||void 0===a?void 0:a.length)>0&&(0,f.jsx)(s.Z.PreviewGroup,{children:null===(n=e.urls)||void 0===n?void 0:n.map(((e,a)=>(0,f.jsx)(c.Z,{span:6,children:(0,f.jsx)(s.Z,{src:"".concat(e),width:"100%"})},"".concat(t,"_").concat(a))))}),"completed"!==e.status&&"failed"!==e.status&&(y.resultImages.length>1?y.resultImages[0].urls.map(((e,a)=>(0,f.jsx)(c.Z,{span:6,children:(0,f.jsxs)("div",{className:"relative flex justify-center items-center flex-col bg-gray-200",children:[(0,f.jsx)("img",{src:"".concat(e),className:"w-full blur",alt:"product"}),(0,f.jsxs)("div",{className:"absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col",children:[(0,f.jsx)("div",{className:"loader"}),(0,f.jsx)("p",{className:"mb-0 text-white mt-2",children:"Generating..."})]})]})},"".concat(t,"_").concat(a)))):new Array(4).fill(0).map(((e,a)=>(0,f.jsx)(c.Z,{span:6,children:(0,f.jsxs)("div",{className:"flex justify-center items-center flex-col bg-gray-200 relative",children:[(0,f.jsx)("img",{src:y.inputImages[0].path.includes("https://")?"".concat(y.inputImages[0].path):"".concat(h.Z.SOCKET_URL).concat(y.inputImages[0].path),className:"w-full blur",alt:"product"}),(0,f.jsxs)("div",{className:"absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col",children:[(0,f.jsx)("div",{className:"loader"}),(0,f.jsx)("p",{className:"mb-0 text-white mt-2",children:"Generating..."})]})]})},"".concat(t,"_").concat(a))))),"failed"==e.status&&new Array(4).fill(0).map(((e,a)=>(0,f.jsx)(c.Z,{span:6,children:(0,f.jsx)("div",{className:"flex justify-center items-center flex-col bg-gray-200  p-5",children:(0,f.jsx)("p",{className:"mb-0",children:"Failed"})})},"".concat(t,"_").concat(a)))),(0,f.jsxs)(c.Z,{span:24,children:[(0,f.jsx)(v,{placeholder:j[t]?"":"Describe what you want to add, change, or remove from your initial renderings",autoSize:{maxRows:5},value:j[t]?C[t]:T[t],onChange:e=>{if(j[t]){let a=[...C];a[t]=e.target.value,Z(a)}else{let a=[...T];a[t]=e.target.value,_(a)}},disabled:"completed"!=e.status&&"failed"!=e.status}),(0,f.jsx)("div",{className:"mt-1 text-right",children:(0,f.jsx)(d.ZP,{type:"text",disabled:"completed"!=e.status&&"failed"!=e.status,onClick:()=>{w((e=>{let a=[...e];return a[t]=!a[t],[...a]}))},children:j[t]?"Basic Mode":"Advanced"})})]}),(0,f.jsxs)(c.Z,{span:24,children:[(0,f.jsx)("div",{className:"text-center mb-4",children:(0,f.jsx)(d.ZP,{type:"primary",size:"large",onClick:()=>(async(e,t)=>{S(t);try{let a=await(0,g.ON)(l,{keywords:j[t]?C[t]:T[t],imageId:e,isAdvanced:j[t]});I(a.data.concept)}catch(a){console.log(a)}S(-1)})(e.imageId,t),loading:N==t,children:"Generate"})}),(0,f.jsx)(u.Z,{})]})]},t)}))]})]})})}},2752:(e,t,a)=>{a.d(t,{DN:()=>s,Jo:()=>l,ON:()=>o,_I:()=>i,aR:()=>r,mW:()=>c});var n=a(3352);const r=e=>(0,n.j0)("v1/getImageDescription",e),i=e=>(0,n.j0)("v1/deleteFile",e),l=(e,t)=>(0,n.A_)("v1/getConceptById/".concat(e),t),o=(e,t)=>(0,n.j0)("v1/generateImage/".concat(e),t),c=e=>(0,n.A_)("v1/getProjects",e),s=e=>(0,n.j0)("v1/getImagesfromPin",e)},4622:(e,t,a)=>{a.d(t,{Z:()=>g});var n=a(1694),r=a.n(n),i=a(2791),l=a(1929),o=a(7521),c=a(5564),s=a(9922);const d=e=>{const{componentCls:t,sizePaddingEdgeHorizontal:a,colorSplit:n,lineWidth:r}=e;return{[t]:Object.assign(Object.assign({},(0,o.Wf)(e)),{borderBlockStart:"".concat(r,"px solid ").concat(n),"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",margin:"0 ".concat(e.dividerVerticalGutterMargin,"px"),verticalAlign:"middle",borderTop:0,borderInlineStart:"".concat(r,"px solid ").concat(n)},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:"".concat(e.dividerHorizontalGutterMargin,"px 0")},["&-horizontal".concat(t,"-with-text")]:{display:"flex",alignItems:"center",margin:"".concat(e.dividerHorizontalWithTextGutterMargin,"px 0"),color:e.colorTextHeading,fontWeight:500,fontSize:e.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:"0 ".concat(n),"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:"".concat(r,"px solid transparent"),borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},["&-horizontal".concat(t,"-with-text-left")]:{"&::before":{width:"5%"},"&::after":{width:"95%"}},["&-horizontal".concat(t,"-with-text-right")]:{"&::before":{width:"95%"},"&::after":{width:"5%"}},["".concat(t,"-inner-text")]:{display:"inline-block",padding:"0 1em"},"&-dashed":{background:"none",borderColor:n,borderStyle:"dashed",borderWidth:"".concat(r,"px 0 0")},["&-horizontal".concat(t,"-with-text").concat(t,"-dashed")]:{"&::before, &::after":{borderStyle:"dashed none none"}},["&-vertical".concat(t,"-dashed")]:{borderInlineStartWidth:r,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},["&-plain".concat(t,"-with-text")]:{color:e.colorText,fontWeight:"normal",fontSize:e.fontSize},["&-horizontal".concat(t,"-with-text-left").concat(t,"-no-default-orientation-margin-left")]:{"&::before":{width:0},"&::after":{width:"100%"},["".concat(t,"-inner-text")]:{paddingInlineStart:a}},["&-horizontal".concat(t,"-with-text-right").concat(t,"-no-default-orientation-margin-right")]:{"&::before":{width:"100%"},"&::after":{width:0},["".concat(t,"-inner-text")]:{paddingInlineEnd:a}}})}},u=(0,c.Z)("Divider",(e=>{const t=(0,s.TS)(e,{dividerVerticalGutterMargin:e.marginXS,dividerHorizontalWithTextGutterMargin:e.margin,dividerHorizontalGutterMargin:e.marginLG});return[d(t)]}),{sizePaddingEdgeHorizontal:0});var h=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a};const g=e=>{const{getPrefixCls:t,direction:a}=i.useContext(l.E_),{prefixCls:n,type:o="horizontal",orientation:c="center",orientationMargin:s,className:d,rootClassName:g,children:m,dashed:p,plain:x}=e,f=h(e,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","plain"]),v=t("divider",n),[b,j]=u(v),w=c.length>0?"-".concat(c):c,y=!!m,I="left"===c&&null!=s,N="right"===c&&null!=s,S=r()(v,j,"".concat(v,"-").concat(o),{["".concat(v,"-with-text")]:y,["".concat(v,"-with-text").concat(w)]:y,["".concat(v,"-dashed")]:!!p,["".concat(v,"-plain")]:!!x,["".concat(v,"-rtl")]:"rtl"===a,["".concat(v,"-no-default-orientation-margin-left")]:I,["".concat(v,"-no-default-orientation-margin-right")]:N},d,g),E=Object.assign(Object.assign({},I&&{marginLeft:s}),N&&{marginRight:s});return b(i.createElement("div",Object.assign({className:S},f,{role:"separator"}),m&&"vertical"!==o&&i.createElement("span",{className:"".concat(v,"-inner-text"),style:E},m)))}}}]);
//# sourceMappingURL=609.fce149ed.chunk.js.map