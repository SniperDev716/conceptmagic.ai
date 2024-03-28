"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[128],{7128:(e,t,a)=>{a.r(t),a.d(t,{default:()=>T});var s=a(2791),l=(a(9434),a(7689)),i=a(586),n=a(3655),o=a(6517),c=a(7027),r=a(6106),d=a(914),h=a(9389),u=a(183),p=a(4622),m=a(7309),x=a(2351),g=a(8455),f=a(4771),v=a(8890),j=a.n(v),w=a(5169),y=a(8300),N=(a(8868),a(2752)),b=a(184);const Z=e=>{let{selected:t}=e;return(0,b.jsxs)("div",{style:t?{left:"4px",top:"4px",position:"absolute",zIndex:"1"}:{display:"none"},children:[(0,b.jsx)("svg",{style:{fill:"white",position:"absolute"},width:"24px",height:"24px",children:(0,b.jsx)("circle",{cx:"12.5",cy:"12.2",r:"8.292"})}),(0,b.jsx)("svg",{style:{fill:"#06befa",position:"absolute"},width:"24px",height:"24px",children:(0,b.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"})})]})},k={transition:"transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"},S={transform:"translateZ(0px) scale3d(0.9, 0.9, 1)",transition:"transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"},C={backgroundColor:"#eee",cursor:"pointer",overflow:"hidden",position:"relative"},I=e=>{let{index:t,photo:a,margin:l,direction:i,top:n,left:o,selected:c,onClick:r}=e;const[d,h]=(0,s.useState)(c==t),u=(100-30/a.width*100)/100,p=(100-30/a.height*100)/100;S.transform="translateZ(0px) scale3d(".concat(u,", ").concat(p,", 1)"),"column"===i&&(C.position="absolute",C.left=o,C.top=n);return(0,s.useEffect)((()=>{h(c==t)}),[c]),(0,b.jsxs)("div",{style:{margin:l,height:a.height,width:a.width,...C},className:d?"":"not-selected",children:[(0,b.jsx)(Z,{selected:!!d}),(0,b.jsx)("img",{alt:a.title,style:d?{...k,...S}:{...k},...a,onClick:e=>{r(t)}}),(0,b.jsx)("style",{children:".not-selected:hover{outline:2px solid #06befa}"})]})},{Content:L,Sider:z}=i.default,{Title:P,Text:_}=n.default,{Dragger:D}=o.default;const T=function(){const e=(0,l.s0)(),[t,a]=(0,s.useState)((0,y.cF)("image_type")||"Product Renderings"),[i,n]=(0,s.useState)(!1),[v,Z]=(0,s.useState)(!1),[k,S]=(0,s.useState)(!1),[C,L]=(0,s.useState)([]),[z,_]=(0,s.useState)(""),[D,T]=(0,s.useState)(""),[R,F]=(0,s.useState)([]),[O,U]=(0,s.useState)({}),[A,E]=(0,s.useState)(-1),M=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a={query:t};e?(j()("#imagelistview .infinite-scroll-component").scrollTop(0),S(!0)):(a={...a,...O},Z(!0)),(0,N.DN)(a).then((t=>{F(e?t.data.images:[...R,...t.data.images]),U({bookmarks:t.data.bookmarks,token:t.data.token,cookie:t.data.cookie})})).catch((e=>{console.log(e)})).finally((()=>{S(!1),Z(!1)}))};return(0,s.useEffect)((()=>{M(!0)}),[]),(0,b.jsx)("div",{className:"text-center max-w-5xl w-screen mx-auto px-6 md:px-2 p-2",children:(0,b.jsxs)(r.Z,{gutter:[24,24],className:"mt-6",children:[(0,b.jsx)(d.Z,{span:24,children:(0,b.jsx)(P,{level:3,children:"Select an image that you'd like to use as a starting point."})}),(0,b.jsxs)(d.Z,{span:24,className:"",children:[(0,b.jsx)("div",{className:"max-w-md mb-2 ml-auto",children:(0,b.jsx)(h.default.Search,{size:"large",onSearch:()=>{M(!0)},loading:k,value:t,onChange:e=>a(e.target.value)})}),(0,b.jsx)("div",{id:"imagelistview",className:"max-h-[calc(100vh_-_425px)] min-h-[350px] overflow-y-auto overflow-x-hidden border-4 border-solid border-blue-400 rounded-lg",children:(0,b.jsx)(f.Z,{dataLength:R.length,next:()=>{M()},hasMore:!0,scrollableTarget:"imagelistview",loader:(0,b.jsxs)("div",{className:"mt-2 flex",children:[(0,b.jsx)("div",{className:"w-1/4 p-1",children:(0,b.jsx)(u.Z.Image,{className:"!w-full",active:!0,loading:v},Date.now())}),(0,b.jsx)("div",{className:"w-1/4 p-1",children:(0,b.jsx)(u.Z.Image,{className:"!w-full",active:!0,loading:v},Date.now())}),(0,b.jsx)("div",{className:"w-1/4 p-1",children:(0,b.jsx)(u.Z.Image,{className:"!w-full",active:!0,loading:v},Date.now())}),(0,b.jsx)("div",{className:"w-1/4 p-1",children:(0,b.jsx)(u.Z.Image,{className:"!w-full",active:!0,loading:v},Date.now())})]}),scrollThreshold:"100px",children:R.length>0&&(0,b.jsx)(g.Z,{photos:R,direction:"column",columns:4,onClick:e=>{console.log(e.target,arguments)},renderImage:e=>{let{index:t,left:a,top:s,key:l,photo:i}=e;return(0,b.jsx)(I,{selected:A,margin:"2px",direction:"column",index:t,photo:i,left:a,top:s,onClick:e=>{E(e),L([])}},l)}})})})]}),(0,b.jsx)(p.Z,{className:"!m-0",children:"Or"}),(0,b.jsx)(d.Z,{span:24,children:(0,b.jsx)(o.default,{name:"file",multiple:!1,fileList:C,action:"".concat(w.Z.HOST_URL,"v1/upload"),showUploadList:!0,listType:"picture",accept:"image/*",headers:{Authorization:(0,y.cF)("token")},data:{oldFile:D},onChange:e=>{var t,a;"done"===e.file.status&&(T(null===(t=e.file.response)||void 0===t?void 0:t.path),e.file.thumbUrl="".concat(w.Z.SOCKET_URL).concat(null===(a=e.file.response)||void 0===a?void 0:a.path));L(1==e.fileList.length?e.fileList:e.fileList.splice(1,1)),E(-1)},onRemove:e=>{var t;(0,N._I)({path:null===(t=e.response)||void 0===t?void 0:t.path}).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))},children:(0,b.jsx)(m.ZP,{className:"",size:"large",icon:(0,b.jsx)(x.Z,{}),children:"Choose from your computer"})})}),(0,b.jsx)(d.Z,{span:24,children:(0,b.jsx)(h.default,{type:"text",className:"text-center",size:"large",placeholder:"Name Your Project...",value:z,onChange:e=>_(e.target.value)})}),(0,b.jsx)(d.Z,{span:24,children:(0,b.jsx)("div",{className:"text-center",children:(0,b.jsx)(m.ZP,{type:"primary",size:"large",onClick:async()=>{if(i)return;if(!z)return c.ZP.warning("Please input name your project!");let t=C.filter((e=>"done"==e.status)).map((e=>{var t;return null===(t=e.response)||void 0===t?void 0:t.path}));if(0==t.length&&-1==A)return c.ZP.warning("Please choose your inspiration image");n(!0);try{let a=await(0,N.aR)({fileLists:-1==A?t:[R[A].src],name:z});e("/result/".concat(a.data.id))}catch(a){console.log(a)}n(!1)},loading:i,children:"Next step"})})})]})})}},2752:(e,t,a)=>{a.d(t,{DN:()=>r,Jo:()=>n,ON:()=>o,_I:()=>i,aR:()=>l,mW:()=>c});var s=a(3352);const l=e=>(0,s.j0)("v1/getImageDescription",e),i=e=>(0,s.j0)("v1/deleteFile",e),n=(e,t)=>(0,s.A_)("v1/getConceptById/".concat(e),t),o=(e,t)=>(0,s.j0)("v1/generateImage/".concat(e),t),c=e=>(0,s.A_)("v1/getProjects",e),r=e=>(0,s.j0)("v1/getImagesfromPin",e)}}]);
//# sourceMappingURL=128.8da48574.chunk.js.map