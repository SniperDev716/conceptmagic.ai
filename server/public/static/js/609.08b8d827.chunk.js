"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[609],{9211:(e,t,a)=>{a.r(t),a.d(t,{default:()=>I});var n=a(2791),l=(a(9434),a(7689)),c=a(9389),i=a(3655),r=a(6106),s=a(914),o=a(2242),d=a(7309),u=a(7128),m=(a(8868),a(5169)),g=a(2752),h=a(3781);const p=a.p+"static/media/loading.ea020ef38ccfc2c36148.gif";const x=function(e){const t=(0,n.useRef)();return(0,n.useEffect)((()=>{t.current=e})),t.current};var f=a(184);const{TextArea:v}=c.default,{Title:b,Text:j}=i.default;const I=function(){var e,t,a,c;const i=(0,h.sV)(),{id:b}=(0,l.UO)(),[j,I]=(0,n.useState)([]),[w,y]=(0,n.useState)({}),[N,S]=(0,n.useState)(-1),[E,Z]=(0,n.useState)([]),[O,_]=(0,n.useState)({}),[C,z]=(0,n.useState)([]),[A,k]=(0,n.useState)([]),[G,T]=(0,n.useState)([]),[R,P]=(0,n.useState)({}),M=x(w);return(0,n.useEffect)((()=>{const e=()=>{(0,g.Jo)(b).then((e=>{y(e.data.concept),e.data.concept&&(k(e.data.concept.resultImages.map(((e,t)=>A[t]||e.prompt))),I(e.data.concept.resultImages.map(((e,t)=>j[t]||!1))))})).catch((e=>{console.log(e)}))};return e(),i&&(i.on("IMAGE_GENERATED",(t=>{console.log("IMAGE_GENERATED"),e()})),i.on("IMAGE_PROCESS",(t=>{console.log("IMAGE_PROCESS"),R[t.id]||e(),P((e=>({...e,[t.id]:{...t}})))}))),()=>{i&&(i.off("IMAGE_GENERATED"),i.off("IMAGE_PROCESS"))}}),[]),(0,n.useEffect)((()=>{var e,t;(null===w||void 0===w||null===(e=w.resultImages)||void 0===e?void 0:e.length)-(null===M||void 0===M||null===(t=M.resultImages)||void 0===t?void 0:t.length)==1&&window.scrollTo(0,document.body.scrollHeight)}),[null===w||void 0===w||null===(e=w.resultImages)||void 0===e?void 0:e.length]),(0,f.jsx)("div",{className:"text-center max-w-5xl w-screen mx-auto p-4",children:(0,f.jsxs)(r.Z,{gutter:[12,12],className:"sm:mt-6",children:[(0,f.jsx)(s.Z,{span:24,children:(null===(t=w.resultImages)||void 0===t?void 0:t.filter((e=>"completed"==e.status)).length)>0?(0,f.jsxs)("h4",{className:"bg-purple-500 rounded-full p-2 px-3 !text-white sm:text-lg md:text-xl",children:["These images are ",(0,f.jsx)("span",{className:"text-black font-bold",children:"AI Generated"}),". Use words to change them however you want."]}):(0,f.jsx)("h4",{className:"sm:text-lg md:text-xl",children:"Please wait 30 seconds while our AI Generates your starting image."})}),(0,f.jsxs)("div",{className:"bg-white p-4 rounded shadow-none mb-4 w-full",children:[!w.resultImages&&(0,f.jsxs)("div",{className:"w-full h-44 bg-center bg-no-repeat bg-[length:400px_300px]",style:{backgroundImage:"url(".concat(p,")"),backgroundColor:"#E9E9EB"},children:[(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),"Loading..."]}),null===(a=w.resultImages)||void 0===a?void 0:a.map(((e,t)=>{var a,n;return(0,f.jsxs)(r.Z,{gutter:[24,24],children:[e.addition&&(0,f.jsx)(s.Z,{span:24,className:"",children:(0,f.jsx)("p",{className:"mb-0 text-left p-2 border-l-4 border-0 border-solid border-l-gray-500 bg-gray-100 text-gray-700 rounded-r-full",children:e.addition})}),(0,f.jsx)(s.Z,{span:24,children:(0,f.jsx)("div",{children:(null===(a=e.urls)||void 0===a?void 0:a.length)>0&&(0,f.jsx)(o.Z.PreviewGroup,{children:(0,f.jsx)(r.Z,{gutter:[12,12],children:null===(n=e.urls)||void 0===n?void 0:n.map(((e,a)=>(0,f.jsx)(s.Z,{span:6,children:(0,f.jsx)(o.Z,{src:"".concat(m.Z.SOCKET_URL,"/image/").concat(e.split("/")[e.split("/").length-2],"/").concat(e.split("/")[e.split("/").length-1],"?w=170&h=170"),preview:{src:"".concat(e)},width:"100%"})},"".concat(t,"_").concat(a))))})})})}),"completed"!==e.status&&"failed"!==e.status&&(e.parent?w.resultImages.filter((t=>t.imageId==e.parent))[0].urls.length>0?w.resultImages.filter((t=>t.imageId==e.parent))[0].urls.map(((a,n)=>{var l,c,i;return(0,f.jsx)(s.Z,{span:6,children:(0,f.jsxs)("div",{className:"relative flex justify-center items-center flex-col bg-gray-200",children:[(0,f.jsx)("div",{className:"relative",children:(0,f.jsx)(o.Z,{src:"".concat((null===(l=R[e.imageId])||void 0===l?void 0:l.url)||a),preview:!1,fallback:w.inputImages[0].path.includes("https://")?"".concat(w.inputImages[0].path):"".concat(m.Z.SOCKET_URL).concat(w.inputImages[0].path),className:"w-full blur".concat(null!==(c=R[e.imageId])&&void 0!==c&&c.url?"-[1px]":""," clip_").concat(null!==(i=R[e.imageId])&&void 0!==i&&i.url?n:""),alt:"product"})}),(0,f.jsxs)("div",{className:"absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col",children:[(0,f.jsx)("div",{className:"loader"}),(0,f.jsx)("p",{className:"mb-0 text-white mt-2",children:R[e.imageId]?"".concat(R[e.imageId].status).concat("generating"==R[e.imageId].status?" (".concat(R[e.imageId].progress,"%)"):"","..."):"".concat(e.status,"...")})]})]})},"".concat(t,"_").concat(n))})):new Array(4).fill(w.inputImages[0].path.includes("https://")?"".concat(w.inputImages[0].path):"".concat(m.Z.SOCKET_URL).concat(w.inputImages[0].path)).map(((a,n)=>{var l,c,i;return(0,f.jsx)(s.Z,{span:6,children:(0,f.jsxs)("div",{className:"relative flex justify-center items-center flex-col bg-gray-200",children:[(0,f.jsx)("div",{className:"relative",children:(0,f.jsx)(o.Z,{src:"".concat((null===(l=R[e.imageId])||void 0===l?void 0:l.url)||a),preview:!1,fallback:w.inputImages[0].path.includes("https://")?"".concat(w.inputImages[0].path):"".concat(m.Z.SOCKET_URL).concat(w.inputImages[0].path),className:"w-full blur".concat(null!==(c=R[e.imageId])&&void 0!==c&&c.url?"-[1px]":""," clip_").concat(null!==(i=R[e.imageId])&&void 0!==i&&i.url?n:""),alt:"product"})}),(0,f.jsxs)("div",{className:"absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col",children:[(0,f.jsx)("div",{className:"loader"}),(0,f.jsx)("p",{className:"mb-0 text-white mt-2",children:R[e.imageId]?"".concat(R[e.imageId].status).concat("generating"==R[e.imageId].status?" (".concat(R[e.imageId].progress,"%)"):"","..."):"".concat(e.status,"...")})]})]})},"".concat(t,"_").concat(n))})):new Array(4).fill(0).map(((a,n)=>{var l,c,i;return(0,f.jsx)(s.Z,{span:6,children:(0,f.jsxs)("div",{className:"flex justify-center items-center flex-col bg-gray-200 relative",children:[(0,f.jsx)("div",{className:"relative",children:(0,f.jsx)(o.Z,{src:"".concat((null===(l=R[e.imageId])||void 0===l?void 0:l.url)||(w.inputImages[0].path.includes("https://")?"".concat(w.inputImages[0].path):"".concat(m.Z.SOCKET_URL).concat(w.inputImages[0].path))),preview:!1,fallback:w.inputImages[0].path.includes("https://")?"".concat(w.inputImages[0].path):"".concat(m.Z.SOCKET_URL).concat(w.inputImages[0].path),className:"w-full blur".concat(null!==(c=R[e.imageId])&&void 0!==c&&c.url?"-[1px]":""," clip_").concat(null!==(i=R[e.imageId])&&void 0!==i&&i.url?n:""),alt:"product"})}),(0,f.jsxs)("div",{className:"absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col",children:[(0,f.jsx)("div",{className:"loader"}),(0,f.jsx)("p",{className:"mb-0 text-white mt-2",children:R[e.imageId]?"".concat(R[e.imageId].status).concat("generating"==R[e.imageId].status?" (".concat(R[e.imageId].progress,"%)"):"","..."):"".concat(e.status,"...")})]})]})},"".concat(t,"_").concat(n))}))),"failed"==e.status&&new Array(4).fill(0).map(((e,a)=>(0,f.jsx)(s.Z,{span:6,children:(0,f.jsx)("div",{className:"flex justify-center items-center flex-col bg-gray-200  p-5",children:(0,f.jsx)("p",{className:"mb-0",children:"Failed"})})},"".concat(t,"_").concat(a)))),(0,f.jsxs)(s.Z,{span:24,children:[(0,f.jsx)(v,{placeholder:j[t]?"":"Describe what you want to add, change, or remove from your initial renderings",autoSize:{maxRows:5},value:j[t]?A[t]:G[t],onChange:e=>{if(j[t]){let a=[...A];a[t]=e.target.value,k(a)}else{let a=[...G];a[t]=e.target.value,T(a)}},disabled:"completed"!=e.status&&"failed"!=e.status}),(0,f.jsx)("div",{className:"mt-1 text-right",children:(0,f.jsx)(d.ZP,{type:"text",disabled:"completed"!=e.status&&"failed"!=e.status,onClick:()=>{I((e=>{let a=[...e];return a[t]=!a[t],[...a]}))},children:j[t]?"Basic Mode":"Advanced"})}),(0,f.jsx)("div",{className:"text-center mb-4",children:(0,f.jsx)(d.ZP,{type:"primary",size:"",onClick:()=>(async(e,t)=>{S(t);try{let a=await(0,g.ON)(b,{keywords:j[t]?A[t]:G[t],imageId:e,isAdvanced:j[t]});y(a.data.concept)}catch(a){console.log(a)}S(-1)})(e.imageId,t),loading:N==t,children:"Generate"})}),(0,f.jsx)(u.Z,{})]})]},t)})),1==(null===(c=w.resultImages)||void 0===c?void 0:c.length)&&new Array(10).fill(0).map(((e,t)=>(0,f.jsxs)(r.Z,{gutter:[24,24],children:[new Array(4).fill(0).map(((e,a)=>(0,f.jsx)(s.Z,{span:6,children:(0,f.jsxs)("div",{className:"flex justify-center items-center flex-col bg-gray-200 relative",children:[(0,f.jsx)("img",{src:w.inputImages[0].path.includes("https://")?"".concat(w.inputImages[0].path):"".concat(m.Z.SOCKET_URL).concat(w.inputImages[0].path),className:"w-full blur",alt:"product"}),(0,f.jsxs)("div",{className:"absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col",children:[(0,f.jsx)("div",{className:"loader"}),(0,f.jsx)("p",{className:"mb-0 text-white mt-2",children:"processing..."})]})]})},"".concat(t,"_").concat(a)))),(0,f.jsxs)(s.Z,{span:24,children:[(0,f.jsx)(v,{placeholder:"Describe what you want to add, change, or remove from your initial renderings",autoSize:{maxRows:5},disabled:!0}),(0,f.jsx)("div",{className:"mt-1 text-right",children:(0,f.jsx)(d.ZP,{type:"text",disabled:!0,children:"Advanced"})}),(0,f.jsx)("div",{className:"text-center mb-4",children:(0,f.jsx)(d.ZP,{type:"primary",size:"",disabled:!0,children:"Generate"})}),(0,f.jsx)(u.Z,{})]})]},t)))]})]})})}},2752:(e,t,a)=>{a.d(t,{DN:()=>o,Jo:()=>i,ON:()=>r,_I:()=>c,aR:()=>l,mW:()=>s});var n=a(3352);const l=e=>(0,n.j0)("v1/getImageDescription",e),c=e=>(0,n.j0)("v1/deleteFile",e),i=(e,t)=>(0,n.A_)("v1/getConceptById/".concat(e),t),r=(e,t)=>(0,n.j0)("v1/generateImage/".concat(e),t),s=(e,t)=>(0,n.A_)("v1/getProjects/".concat(e||""),t),o=e=>(0,n.j0)("v1/getImagesfromPin",e)},7128:(e,t,a)=>{a.d(t,{Z:()=>g});var n=a(1694),l=a.n(n),c=a(2791),i=a(1929),r=a(7521),s=a(5564),o=a(9922);const d=e=>{const{componentCls:t,sizePaddingEdgeHorizontal:a,colorSplit:n,lineWidth:l}=e;return{[t]:Object.assign(Object.assign({},(0,r.Wf)(e)),{borderBlockStart:"".concat(l,"px solid ").concat(n),"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",margin:"0 ".concat(e.dividerVerticalGutterMargin,"px"),verticalAlign:"middle",borderTop:0,borderInlineStart:"".concat(l,"px solid ").concat(n)},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:"".concat(e.dividerHorizontalGutterMargin,"px 0")},["&-horizontal".concat(t,"-with-text")]:{display:"flex",alignItems:"center",margin:"".concat(e.dividerHorizontalWithTextGutterMargin,"px 0"),color:e.colorTextHeading,fontWeight:500,fontSize:e.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:"0 ".concat(n),"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:"".concat(l,"px solid transparent"),borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},["&-horizontal".concat(t,"-with-text-left")]:{"&::before":{width:"5%"},"&::after":{width:"95%"}},["&-horizontal".concat(t,"-with-text-right")]:{"&::before":{width:"95%"},"&::after":{width:"5%"}},["".concat(t,"-inner-text")]:{display:"inline-block",padding:"0 1em"},"&-dashed":{background:"none",borderColor:n,borderStyle:"dashed",borderWidth:"".concat(l,"px 0 0")},["&-horizontal".concat(t,"-with-text").concat(t,"-dashed")]:{"&::before, &::after":{borderStyle:"dashed none none"}},["&-vertical".concat(t,"-dashed")]:{borderInlineStartWidth:l,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},["&-plain".concat(t,"-with-text")]:{color:e.colorText,fontWeight:"normal",fontSize:e.fontSize},["&-horizontal".concat(t,"-with-text-left").concat(t,"-no-default-orientation-margin-left")]:{"&::before":{width:0},"&::after":{width:"100%"},["".concat(t,"-inner-text")]:{paddingInlineStart:a}},["&-horizontal".concat(t,"-with-text-right").concat(t,"-no-default-orientation-margin-right")]:{"&::before":{width:"100%"},"&::after":{width:0},["".concat(t,"-inner-text")]:{paddingInlineEnd:a}}})}},u=(0,s.Z)("Divider",(e=>{const t=(0,o.TS)(e,{dividerVerticalGutterMargin:e.marginXS,dividerHorizontalWithTextGutterMargin:e.margin,dividerHorizontalGutterMargin:e.marginLG});return[d(t)]}),{sizePaddingEdgeHorizontal:0});var m=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var l=0;for(n=Object.getOwnPropertySymbols(e);l<n.length;l++)t.indexOf(n[l])<0&&Object.prototype.propertyIsEnumerable.call(e,n[l])&&(a[n[l]]=e[n[l]])}return a};const g=e=>{const{getPrefixCls:t,direction:a}=c.useContext(i.E_),{prefixCls:n,type:r="horizontal",orientation:s="center",orientationMargin:o,className:d,rootClassName:g,children:h,dashed:p,plain:x}=e,f=m(e,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","plain"]),v=t("divider",n),[b,j]=u(v),I=s.length>0?"-".concat(s):s,w=!!h,y="left"===s&&null!=o,N="right"===s&&null!=o,S=l()(v,j,"".concat(v,"-").concat(r),{["".concat(v,"-with-text")]:w,["".concat(v,"-with-text").concat(I)]:w,["".concat(v,"-dashed")]:!!p,["".concat(v,"-plain")]:!!x,["".concat(v,"-rtl")]:"rtl"===a,["".concat(v,"-no-default-orientation-margin-left")]:y,["".concat(v,"-no-default-orientation-margin-right")]:N},d,g),E=Object.assign(Object.assign({},y&&{marginLeft:o}),N&&{marginRight:o});return b(c.createElement("div",Object.assign({className:S},f,{role:"separator"}),h&&"vertical"!==r&&c.createElement("span",{className:"".concat(v,"-inner-text"),style:E},h)))}}}]);
//# sourceMappingURL=609.08b8d827.chunk.js.map