"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[128,415],{5415:(e,t,s)=>{s.r(t),s.d(t,{categories:()=>j,default:()=>f});var a=s(2791),l=s(9434),i=s(7689),n=s(3990),r=s(4921),o=s(6106),c=s(914),d=s(8531),u=s(8868),p=s(8300),h=s(184);const{Content:g,Sider:x}=n.default,{Title:m,Text:v}=r.default,j=[{src:"(1) Product Design.webp",value:"Product Design"},{src:"(2) Packaging.webp",value:"Package Design"},{src:"(3) Logo design.webp",value:"Logo Design"},{src:"(4) Resturant Design.webp",value:"Resturant Design"},{src:"(5) Room Design.webp",value:"Room Design"},{src:"(6) Store Design.webp",value:"Store Exterior"},{src:"(7) Advertisement.webp",value:"Advertisement Design"},{src:"(8) App Design.webp",value:"App Design"},{src:"(9) Website Design.webp",value:"Website Design"},{src:"(10) Flyer Design.webp",value:"Flyer Design"},{src:"(11) Business Cards.webp",value:"Business Cards"},{src:"(12) Sticker Design.webp",value:"Sticker Design"},{src:"(13) Album Art.webp",value:"Album Art"},{src:"(14) Signage.webp",value:"Signage Design"},{src:"(15) Automotive.webp",value:"Automotive Design"},{src:"(16) Fashion.webp",value:"Fashion Design"},{src:"(17) Furniture.webp",value:"Furniture Design"},{src:"(18) Film Concept Art.webp",value:"Film Concept Art"},{src:"(19) Stock Photos.webp",value:"Stock Photos"},{src:"(20) Food Photography.webp",value:"Food Photography"},{src:"(21) Character Design.webp",value:"Character Design"}];const f=function(){const e=(0,l.I0)(),t=(0,i.s0)(),s=(0,l.v9)((e=>e.auth.plan)),{id:n}=(0,i.UO)();return(0,a.useEffect)((()=>{e((0,u.Wh)())}),[]),(0,a.useEffect)((()=>{}),[s]),(0,h.jsx)(g,{className:"text-center max-w-7xl mx-auto p-2 my-5",children:(0,h.jsxs)(o.Z,{children:[(0,h.jsx)(c.Z,{span:24,children:(0,h.jsx)("h3",{className:"text-lg sm:text-xl md:text-2xl mb-6",children:"Pick a Category to Explore Your Creativity"})}),(0,h.jsx)(c.Z,{span:24,children:(0,h.jsx)(o.Z,{gutter:[24,24],children:j.map(((e,s)=>(0,h.jsx)(c.Z,{span:8,children:(0,h.jsxs)("div",{className:"text-center hover:-m-1",children:[(0,h.jsx)(d.Z,{preview:!1,src:"/imgs/category/".concat(e.src),className:"!w-full md:w-[80%] mx-auto bg-gray-300 cursor-pointer rounded shadow-sm hover:shadow-lg",onClick:()=>(e=>{(0,p.po)("image_type",e.value),t("/upload")})(e),placeholder:!0})," ",(0,h.jsx)("br",{}),(0,h.jsx)("h4",{className:"text-md sm:text-lg md:text-xl mt-2",children:e.value})]})},s)))})})]})})}},4320:(e,t,s)=>{s.r(t),s.d(t,{default:()=>_});var a=s(2791),l=(s(9434),s(7689)),i=s(3990),n=s(4921),r=s(1234),o=s(3832),c=s(6106),d=s(914),u=s(5),p=s(1692),h=s(2556),g=s(8531),x=s(43),m=s(183),v=s(2351),j=s(2622),f=s(8455),w=s(4771),b=s(8890),y=s.n(b),N=s(5169),D=s(8300),Z=(s(8868),s(2752)),k=s(184);const C=e=>{let{selected:t}=e;return(0,k.jsxs)("div",{style:t?{left:"4px",top:"4px",position:"absolute",zIndex:"1"}:{display:"none"},children:[(0,k.jsx)("svg",{style:{fill:"white",position:"absolute"},width:"24px",height:"24px",children:(0,k.jsx)("circle",{cx:"12.5",cy:"12.2",r:"8.292"})}),(0,k.jsx)("svg",{style:{fill:"#06befa",position:"absolute"},width:"24px",height:"24px",children:(0,k.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"})})]})},S={transition:"transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"},P={transform:"translateZ(0px) scale3d(0.9, 0.9, 1)",transition:"transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"},A={backgroundColor:"#eee",cursor:"pointer",overflow:"hidden",position:"relative"},F=e=>{let{index:t,photo:s,margin:l,direction:i,top:n,left:r,selected:o,onClick:c}=e;const[d,u]=(0,a.useState)(o==t),p=(100-30/s.width*100)/100,h=(100-30/s.height*100)/100;P.transform="translateZ(0px) scale3d(".concat(p,", ").concat(h,", 1)"),"column"===i&&(A.position="absolute",A.left=r,A.top=n);return(0,a.useEffect)((()=>{u(o==t)}),[o]),(0,k.jsxs)("div",{style:{margin:l,height:s.height,width:s.width,...A},className:d?"":"not-selected",children:[(0,k.jsx)(C,{selected:!!d}),(0,k.jsx)("img",{alt:s.title,style:d?{...S,...P}:{...S},...s,onClick:e=>{c(t)}}),(0,k.jsx)("style",{children:".not-selected:hover{outline:2px solid #06befa}"})]})};var I=s(5415);const{Content:L,Sider:z}=i.default,{Title:R,Text:T}=n.default,{Dragger:U}=r.default;const _=function(){var e;const t=(0,l.s0)(),[s,i]=(0,a.useState)((0,D.cF)("image_type")||"Product Renderings"),[n,b]=(0,a.useState)(!1),[C,S]=(0,a.useState)(!1),[P,A]=(0,a.useState)(!1),[L,z]=(0,a.useState)([]),[T,U]=(0,a.useState)(""),[_,E]=(0,a.useState)(""),[O,W]=(0,a.useState)([]),[B,M]=(0,a.useState)({}),[Y,q]=(0,a.useState)(-1),G=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t={query:s};e?(y()("#imagelistview .infinite-scroll-component").scrollTop(0),A(!0)):(t={...t,...B},S(!0)),(0,Z.DN)(t).then((t=>{W(e?t.data.images:[...O,...t.data.images]),M({bookmarks:t.data.bookmarks,token:t.data.token,cookie:t.data.cookie})})).catch((e=>{console.log(e)})).finally((()=>{A(!1),S(!1)}))};(0,a.useEffect)((()=>{G(!0)}),[]);const H=e=>{var t;z([]),E(""),(0,Z._I)({path:null===(t=e.response)||void 0===t?void 0:t.path}).then((e=>{})).catch((e=>{console.log(e)}))};return(0,k.jsx)("div",{className:"text-center max-w-7xl w-screen mx-auto px-6 md:px-2 p-2",children:(0,k.jsxs)(c.Z,{gutter:[24,24],className:"mt-6",children:[(0,k.jsxs)(d.Z,{span:24,children:[(0,k.jsxs)("div",{className:"flex items-center",children:[(0,k.jsx)("div",{className:"flex-1",children:(0,k.jsx)(u.Z,{style:{width:"100%"},options:I.categories,filterOption:(e,t)=>-1!==t.value.toUpperCase().indexOf(e.toUpperCase()),value:s,onChange:e=>{i(e)},children:(0,k.jsx)(p.default.Search,{size:"large",onSearch:()=>{G(!0)},loading:P,placeholder:"Search images.."})})}),(0,k.jsx)("div",{className:"mx-5",children:(0,k.jsx)("span",{className:"text-gray-500 text-lg",children:"or"})}),(0,k.jsx)("div",{className:"",children:(0,k.jsx)(r.default,{name:"file",multiple:!1,fileList:L,action:"".concat(N.Z.HOST_URL,"v1/upload"),showUploadList:!1,listType:"picture",accept:"image/*",headers:{Authorization:(0,D.cF)("token")},data:{oldFile:_},onChange:e=>{var t,s;"done"===e.file.status&&(E(null===(t=e.file.response)||void 0===t?void 0:t.path),e.file.thumbUrl="".concat(N.Z.SOCKET_URL).concat(null===(s=e.file.response)||void 0===s?void 0:s.path));z(1==e.fileList.length?e.fileList:e.fileList.splice(1,1)),q(-1)},onRemove:H,children:(0,k.jsx)(h.ZP,{className:"",block:!0,size:"large",icon:(0,k.jsx)(v.Z,{}),children:"Upload Image"})})})]}),(0,k.jsxs)("div",{className:"mt-4",children:[L.length>0&&_&&(0,k.jsxs)("div",{className:"relative w-fit mx-auto",children:[(0,k.jsx)(g.Z,{src:L[0].thumbUrl,className:"max-h-80"}),(0,k.jsx)("div",{className:"absolute top-4 right-4",children:(0,k.jsx)(h.ZP,{type:"primary",shape:"circle",icon:(0,k.jsx)(j.Z,{}),danger:!0,onClick:()=>H(L[0])})})]}),L.length>0&&!_&&(0,k.jsx)("div",{className:"flex justify-center",children:(0,k.jsx)(x.Z,{tip:"Uploading(".concat((null===(e=L[0])||void 0===e?void 0:e.percent)||0,"%)..."),children:(0,k.jsx)("div",{className:"flex items-center justify-center h-80 w-80"})})})]})]}),(0,k.jsx)(d.Z,{span:24,children:(0,k.jsx)(R,{level:3,children:"Select an image that you'd like to use as a starting point."})}),(0,k.jsx)(d.Z,{span:24,children:(0,k.jsx)("div",{id:"imagelistview",className:"max-h-[calc(100vh_-_425px)] min-h-[350px] overflow-y-auto overflow-x-hidden border-4 border-solid border-blue-400 rounded-lg",children:(0,k.jsx)(w.Z,{dataLength:O.length,next:()=>{G()},hasMore:!0,scrollableTarget:"imagelistview",loader:(0,k.jsxs)("div",{className:"mt-2 flex",children:[(0,k.jsx)("div",{className:"w-1/4 p-1",children:(0,k.jsx)(m.Z.Image,{className:"!w-full",active:!0,loading:C},Date.now())}),(0,k.jsx)("div",{className:"w-1/4 p-1",children:(0,k.jsx)(m.Z.Image,{className:"!w-full",active:!0,loading:C},Date.now())}),(0,k.jsx)("div",{className:"w-1/4 p-1",children:(0,k.jsx)(m.Z.Image,{className:"!w-full",active:!0,loading:C},Date.now())}),(0,k.jsx)("div",{className:"w-1/4 p-1",children:(0,k.jsx)(m.Z.Image,{className:"!w-full",active:!0,loading:C},Date.now())})]}),scrollThreshold:"100px",children:O.length>0&&(0,k.jsx)(f.Z,{photos:O,direction:"column",columns:4,onClick:e=>{console.log(e.target,arguments)},renderImage:e=>{let{index:t,left:s,top:a,key:l,photo:i}=e;return(0,k.jsx)(F,{selected:Y,margin:"2px",direction:"column",index:t,photo:i,left:s,top:a,onClick:e=>{q(e),z([])}},l)}})})})}),(0,k.jsx)(d.Z,{span:24,children:(0,k.jsx)(p.default,{type:"text",className:"text-center",size:"large",placeholder:"Name Your Project...",value:T,onChange:e=>U(e.target.value)})}),(0,k.jsx)(d.Z,{span:24,children:(0,k.jsx)("div",{className:"text-center",children:(0,k.jsx)(h.ZP,{type:"primary",size:"large",onClick:async()=>{if(n)return;if(!T)return o.ZP.warning("Please input name your project!");let e=L.filter((e=>"done"==e.status)).map((e=>{var t;return null===(t=e.response)||void 0===t?void 0:t.path}));if(0==e.length&&-1==Y)return o.ZP.warning("Please choose your inspiration image");b(!0);try{let s=await(0,Z.aR)({fileLists:-1==Y?e:[O[Y].src],name:T});t("/result/".concat(s.data.id))}catch(s){console.log(s)}b(!1)},loading:n,className:"w-72",children:"Generate"})})})]})})}},2752:(e,t,s)=>{s.d(t,{DN:()=>c,Jo:()=>n,ON:()=>r,_I:()=>i,aR:()=>l,mW:()=>o});var a=s(3352);const l=e=>(0,a.j0)("v1/getImageDescription",e),i=e=>(0,a.j0)("v1/deleteFile",e),n=(e,t)=>(0,a.A_)("v1/getConceptById/".concat(e),t),r=(e,t)=>(0,a.j0)("v1/generateImage/".concat(e),t),o=(e,t)=>(0,a.A_)("v1/getProjects/".concat(e||""),t),c=e=>(0,a.j0)("v1/getImagesfromPin",e)}}]);
//# sourceMappingURL=128.3c77b386.chunk.js.map