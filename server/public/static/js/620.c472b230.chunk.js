(self.webpackChunkclient=self.webpackChunkclient||[]).push([[620],{7620:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return T}});var r=n(2791),o=n(9434),a=n(7689),i="https://js.stripe.com/v3",c=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,s="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",l=null,u=function(e){return null!==l||(l=new Promise((function(t,n){if("undefined"!==typeof window&&"undefined"!==typeof document)if(window.Stripe&&e&&console.warn(s),window.Stripe)t(window.Stripe);else try{var r=function(){for(var e=document.querySelectorAll('script[src^="'.concat(i,'"]')),t=0;t<e.length;t++){var n=e[t];if(c.test(n.src))return n}return null}();r&&e?console.warn(s):r||(r=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",n=document.createElement("script");n.src="".concat(i).concat(t);var r=document.head||document.body;if(!r)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return r.appendChild(n),n}(e)),r.addEventListener("load",(function(){window.Stripe?t(window.Stripe):n(new Error("Stripe.js not available"))})),r.addEventListener("error",(function(){n(new Error("Failed to load Stripe.js"))}))}catch(o){return void n(o)}else t(null)}))),l},d=Promise.resolve().then((function(){return u(null)})),p=!1;d.catch((function(e){p||console.warn(e)}));var f=n(3588),m=n(3655),h=n(6106),y=n(914),v=n(4378),g=n(7128),b=n(5527),x=n(2074),E=n(4165),w=n(5861),S=n(9439),j=n(7027),C=n(4422),k=n(7309),O=n(2254),Z=n(8868),P=n(184);var A=function(e){var t=e.plan,n=(0,f.useStripe)(),i=(0,f.useElements)(),c=(0,a.s0)(),s=(0,o.I0)(),l=(0,o.v9)((function(e){return e.auth.user})),u=(0,r.useState)(!1),d=(0,S.Z)(u,2),p=d[0],m=d[1],h=(0,r.useState)((function(){return l.pm_last_four?1:2})),y=(0,S.Z)(h,2),v=y[0],g=y[1],b=function(){var e=(0,w.Z)((0,E.Z)().mark((function e(){var r,o,a,u,d,p,h,y,g,b,x,w;return(0,E.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,m(!0),2!==v){e.next=6;break}return e.next=5,null===n||void 0===n?void 0:n.createPaymentMethod({type:"card",card:i.getElement(f.CardElement),billing_details:{name:l.name,email:l.email}});case 5:y=e.sent;case 6:return e.next=8,(0,O.XW)({paymentMethod:null===(r=y)||void 0===r||null===(o=r.paymentMethod)||void 0===o?void 0:o.id,planId:t._id,pm_type:null===(a=y)||void 0===a||null===(u=a.paymentMethod)||void 0===u?void 0:u.card.brand,pm_last_four:null===(d=y)||void 0===d||null===(p=d.paymentMethod)||void 0===p?void 0:p.card.last4});case 8:if(!(g=e.sent).data.clientSecret){e.next=13;break}return e.next=12,null===n||void 0===n?void 0:n.confirmCardPayment(g.data.clientSecret);case 12:b=e.sent;case 13:null!==(h=b)&&void 0!==h&&h.error?j.ZP.error(b.error.message):(j.ZP.info("Subscribed successfully!"),s((0,Z.p_)({plan:{}})),c("/home")),m(!1),e.next=22;break;case 17:e.prev=17,e.t0=e.catch(0),console.log(e.t0),m(!1),null!==(x=e.t0.response)&&void 0!==x&&null!==(w=x.data)&&void 0!==w&&w.message?j.ZP.error(e.t0.response.data.message):e.t0.message&&j.ZP.error(e.t0.message);case 22:case"end":return e.stop()}}),e,null,[[0,17]])})));return function(){return e.apply(this,arguments)}}();return(0,P.jsxs)("div",{className:"grid gap-4 m-auto",children:[l.pm_last_four&&(0,P.jsx)("div",{children:(0,P.jsxs)(C.ZP.Group,{onChange:function(e){g(e.target.value)},value:v,children:[(0,P.jsx)(C.ZP,{value:1,children:"Use old card"}),(0,P.jsx)(C.ZP,{value:2,children:"Use new Card"})]})}),2==v&&(0,P.jsx)(f.CardElement,{className:"border border-solid border-gray-400 py-3 px-4 rounded"}),(0,P.jsx)(k.ZP,{loading:p,size:"large",type:"primary",onClick:b,disabled:!n,children:"Subscribe"})]})},_=n(5169),N=m.Z.Title,M=m.Z.Text,z=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];p=!0;var r=Date.now();return d.then((function(e){return function(e,t,n){if(null===e)return null;var r=e.apply(void 0,t);return function(e,t){e&&e._registerWrapper&&e._registerWrapper({name:"stripe-js",version:"1.54.0",startTime:t})}(r,n),r}(e,t,r)}))}(_.Z.stripePK);var T=function(){var e=(0,a.UO)().slug,t=(0,o.v9)((function(t){var n=t.plan.plans.filter((function(t){return t.slug===e}));return n.length>0?n[0]:{}})),n=(0,o.I0)();return(0,r.useEffect)((function(){t._id||n((0,x.qY)())}),[]),(0,P.jsx)("div",{className:"container mx-auto my-4",children:(0,P.jsxs)(h.Z,{gutter:[16,16],children:[(0,P.jsx)(y.Z,{span:24,children:(0,P.jsx)(N,{level:3,className:"text-center mt-5",children:"Subscribe now!"})}),(0,P.jsx)(y.Z,{span:24,className:"flex justify-center",children:(0,P.jsxs)(v.Z,{className:"shadow-lg max-w-md",children:[(0,P.jsxs)("div",{children:[(0,P.jsx)(N,{level:4,children:t.name}),(0,P.jsx)(M,{type:"secondary",className:"word-break",children:t.description})]}),(0,P.jsx)(g.Z,{}),t.price>0&&(0,P.jsxs)(N,{level:3,children:["$",t.price,(0,P.jsx)(M,{type:"secondary",children:"/month"})]}),0==t.price&&(0,P.jsx)(N,{level:3,children:"Free"}),t.services&&t.services.map((function(e,t){return(0,P.jsxs)("div",{className:"my-2",children:[(0,P.jsx)(b.Z,{})," ",(0,P.jsx)("span",{className:"text-lg",children:e})]},t)})),(0,P.jsx)("div",{className:"mt-4",children:(0,P.jsx)(f.Elements,{stripe:z,nonce:"random-nonce",children:(0,P.jsx)(A,{plan:t})})})]})},t._id)]})})}},2254:function(e,t,n){"use strict";n.d(t,{XW:function(){return a},om:function(){return i},rE:function(){return o}});var r=n(3352),o=function(){return(0,r.A_)("plans/getUserSubscription")},a=function(e){return(0,r.j0)("plans/createSubscription",e)},i=function(e){return(0,r.j0)("plans/increasePlanLimit",e)}},5527:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(7462),o=n(2791),a={icon:function(e,t){return{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z",fill:e}},{tag:"path",attrs:{d:"M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm193.4 225.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.3 0 19.9 5 25.9 13.3l71.2 98.8 157.2-218c6-8.4 15.7-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.4 12.7z",fill:t}},{tag:"path",attrs:{d:"M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z",fill:e}}]}},name:"check-circle",theme:"twotone"},i=n(4291),c=function(e,t){return o.createElement(i.Z,(0,r.Z)({},e,{ref:t,icon:a}))};var s=o.forwardRef(c)},3588:function(e,t,n){!function(e,t){"use strict";function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e){return o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){return c(e)||s(e,t)||l(e,t)||d()}function c(e){if(Array.isArray(e))return e}function s(e,t){var n=e&&("undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=n){var r,o,a=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(s){c=!0,o=s}finally{try{i||null==n.return||n.return()}finally{if(c)throw o}}return a}}function l(e,t){if(e){if("string"===typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function d(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function p(e,t){return e(t={exports:{}},t.exports),t.exports}t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var f="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";function m(){}function h(){}h.resetWarningCache=m;var y=function(){function e(e,t,n,r,o,a){if(a!==f){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:h,resetWarningCache:m};return n.PropTypes=n,n},v=p((function(e){e.exports=y()})),g=function(e){var n=t.useRef(e);return t.useEffect((function(){n.current=e}),[e]),n.current},b=function(e){return null!==e&&"object"===o(e)},x=function(e){return b(e)&&"function"===typeof e.then},E=function(e){return b(e)&&"function"===typeof e.elements&&"function"===typeof e.createToken&&"function"===typeof e.createPaymentMethod&&"function"===typeof e.confirmCardPayment},w="[object Object]",S=function e(t,n){if(!b(t)||!b(n))return t===n;var r=Array.isArray(t);if(r!==Array.isArray(n))return!1;var o=Object.prototype.toString.call(t)===w;if(o!==(Object.prototype.toString.call(n)===w))return!1;if(!o&&!r)return t===n;var a=Object.keys(t),i=Object.keys(n);if(a.length!==i.length)return!1;for(var c={},s=0;s<a.length;s+=1)c[a[s]]=!0;for(var l=0;l<i.length;l+=1)c[i[l]]=!0;var u=Object.keys(c);if(u.length!==a.length)return!1;var d=t,p=n,f=function(t){return e(d[t],p[t])};return u.every(f)},j=function(e,t,n){return b(e)?Object.keys(e).reduce((function(o,i){var c=!b(t)||!S(e[i],t[i]);return n.includes(i)?(c&&console.warn("Unsupported prop change: options.".concat(i," is not a mutable property.")),o):c?r(r({},o||{}),{},a({},i,e[i])):o}),null):null},C="Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.",k=function(e){if(null===e||E(e))return e;throw new Error(C)},O=function(e){if(x(e))return{tag:"async",stripePromise:Promise.resolve(e).then(k)};var t=k(e);return null===t?{tag:"empty"}:{tag:"sync",stripe:t}},Z=t.createContext(null);Z.displayName="ElementsContext";var P=function(e,t){if(!e)throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(t," in an <Elements> provider."));return e},A=t.createContext(null);A.displayName="CartElementContext";var _=function(e,t){if(!e)throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(t," in an <Elements> provider."));return e},N=function(e){var n=e.stripe,r=e.options,o=e.children,a=t.useMemo((function(){return O(n)}),[n]),c=i(t.useState(null),2),s=c[0],l=c[1],u=i(t.useState(null),2),d=u[0],p=u[1],f=i(t.useState((function(){return{stripe:"sync"===a.tag?a.stripe:null,elements:"sync"===a.tag?a.stripe.elements(r):null}})),2),m=f[0],h=f[1];t.useEffect((function(){var e=!0,t=function(e){h((function(t){return t.stripe?t:{stripe:e,elements:e.elements(r)}}))};return"async"!==a.tag||m.stripe?"sync"!==a.tag||m.stripe||t(a.stripe):a.stripePromise.then((function(n){n&&e&&t(n)})),function(){e=!1}}),[a,m,r]);var y=g(n);t.useEffect((function(){null!==y&&y!==n&&console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.")}),[y,n]);var v=g(r);return t.useEffect((function(){if(m.elements){var e=j(r,v,["clientSecret","fonts"]);e&&m.elements.update(e)}}),[r,v,m.elements]),t.useEffect((function(){var e=m.stripe;e&&e._registerWrapper&&e.registerAppInfo&&(e._registerWrapper({name:"react-stripe-js",version:"2.1.0"}),e.registerAppInfo({name:"react-stripe-js",version:"2.1.0",url:"https://stripe.com/docs/stripe-js/react"}))}),[m.stripe]),t.createElement(Z.Provider,{value:m},t.createElement(A.Provider,{value:{cart:s,setCart:l,cartState:d,setCartState:p}},o))};N.propTypes={stripe:v.any,options:v.object};var M=function(e){var n=t.useContext(Z);return P(n,e)},z=function(e){var n=t.useContext(A);return _(n,e)},T=function(){return M("calls useElements()").elements},I=function(){return M("calls useStripe()").stripe},B=function(){return z("calls useCartElement()").cart},L=function(){return z("calls useCartElementState()").cartState},R=function(e){return(0,e.children)(M("mounts <ElementsConsumer>"))};R.propTypes={children:v.func.isRequired};var W=function(e,n,r){var o=!!r,a=t.useRef(r);t.useEffect((function(){a.current=r}),[r]),t.useEffect((function(){if(!o||!e)return function(){};var t=function(){a.current&&a.current.apply(a,arguments)};return e.on(n,t),function(){e.off(n,t)}}),[o,n,e,a])},H=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},U=function(e,n){var r="".concat(H(e),"Element"),o=n?function(e){M("mounts <".concat(r,">")),z("mounts <".concat(r,">"));var n=e.id,o=e.className;return t.createElement("div",{id:n,className:o})}:function(n){var o,a=n.id,c=n.className,s=n.options,l=void 0===s?{}:s,u=n.onBlur,d=n.onFocus,p=n.onReady,f=n.onChange,m=n.onEscape,h=n.onClick,y=n.onLoadError,v=n.onLoaderStart,b=n.onNetworksChange,x=n.onCheckout,E=n.onLineItemClick,w=n.onConfirm,S=n.onCancel,C=n.onShippingAddressChange,k=n.onShippingRateChange,O=M("mounts <".concat(r,">")).elements,Z=i(t.useState(null),2),P=Z[0],A=Z[1],_=t.useRef(null),N=t.useRef(null),T=z("mounts <".concat(r,">")),I=T.setCart,B=T.setCartState;W(P,"blur",u),W(P,"focus",d),W(P,"escape",m),W(P,"click",h),W(P,"loaderror",y),W(P,"loaderstart",v),W(P,"networkschange",b),W(P,"lineitemclick",E),W(P,"confirm",w),W(P,"cancel",S),W(P,"shippingaddresschange",C),W(P,"shippingratechange",k),"cart"===e?o=function(e){B(e),p&&p(e)}:p&&(o="expressCheckout"===e?p:function(){p(P)}),W(P,"ready",o),W(P,"change","cart"===e?function(e){B(e),f&&f(e)}:f),W(P,"checkout","cart"===e?function(e){B(e),x&&x(e)}:x),t.useLayoutEffect((function(){if(null===_.current&&O&&null!==N.current){var t=O.create(e,l);"cart"===e&&I&&I(t),_.current=t,A(t),t.mount(N.current)}}),[O,l,I]);var L=g(l);return t.useEffect((function(){if(_.current){var e=j(l,L,["paymentRequest"]);e&&_.current.update(e)}}),[l,L]),t.useLayoutEffect((function(){return function(){_.current&&(_.current.destroy(),_.current=null)}}),[]),t.createElement("div",{id:a,className:c,ref:N})};return o.propTypes={id:v.string,className:v.string,onChange:v.func,onBlur:v.func,onFocus:v.func,onReady:v.func,onEscape:v.func,onClick:v.func,onLoadError:v.func,onLoaderStart:v.func,onNetworksChange:v.func,onCheckout:v.func,onLineItemClick:v.func,onConfirm:v.func,onCancel:v.func,onShippingAddressChange:v.func,onShippingRateChange:v.func,options:v.object},o.displayName=r,o.__elementType=e,o},G="undefined"===typeof window,q=U("auBankAccount",G),D=U("card",G),F=U("cardNumber",G),Y=U("cardExpiry",G),V=U("cardCvc",G),X=U("fpxBank",G),$=U("iban",G),K=U("idealBank",G),J=U("p24Bank",G),Q=U("epsBank",G),ee=U("payment",G),te=U("expressCheckout",G),ne=U("paymentRequestButton",G),re=U("linkAuthentication",G),oe=U("address",G),ae=U("shippingAddress",G),ie=U("cart",G),ce=U("paymentMethodMessaging",G),se=U("affirmMessage",G),le=U("afterpayClearpayMessage",G);e.AddressElement=oe,e.AffirmMessageElement=se,e.AfterpayClearpayMessageElement=le,e.AuBankAccountElement=q,e.CardCvcElement=V,e.CardElement=D,e.CardExpiryElement=Y,e.CardNumberElement=F,e.CartElement=ie,e.Elements=N,e.ElementsConsumer=R,e.EpsBankElement=Q,e.ExpressCheckoutElement=te,e.FpxBankElement=X,e.IbanElement=$,e.IdealBankElement=K,e.LinkAuthenticationElement=re,e.P24BankElement=J,e.PaymentElement=ee,e.PaymentMethodMessagingElement=ce,e.PaymentRequestButtonElement=ne,e.ShippingAddressElement=ae,e.useCartElement=B,e.useCartElementState=L,e.useElements=T,e.useStripe=I,Object.defineProperty(e,"__esModule",{value:!0})}(t,n(2791))},914:function(e,t,n){"use strict";var r=n(9752);t.Z=r.Z},7128:function(e,t,n){"use strict";n.d(t,{Z:function(){return h}});var r=n(4942),o=n(9439),a=n(1694),i=n.n(a),c=n(2791),s=n(1929),l=n(7521),u=n(5564),d=n(9922),p=function(e){var t,n=e.componentCls,o=e.sizePaddingEdgeHorizontal,a=e.colorSplit,i=e.lineWidth;return(0,r.Z)({},n,Object.assign(Object.assign({},(0,l.Wf)(e)),(t={borderBlockStart:"".concat(i,"px solid ").concat(a),"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",margin:"0 ".concat(e.dividerVerticalGutterMargin,"px"),verticalAlign:"middle",borderTop:0,borderInlineStart:"".concat(i,"px solid ").concat(a)},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:"".concat(e.dividerHorizontalGutterMargin,"px 0")}},(0,r.Z)(t,"&-horizontal".concat(n,"-with-text"),{display:"flex",alignItems:"center",margin:"".concat(e.dividerHorizontalWithTextGutterMargin,"px 0"),color:e.colorTextHeading,fontWeight:500,fontSize:e.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:"0 ".concat(a),"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:"".concat(i,"px solid transparent"),borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}}),(0,r.Z)(t,"&-horizontal".concat(n,"-with-text-left"),{"&::before":{width:"5%"},"&::after":{width:"95%"}}),(0,r.Z)(t,"&-horizontal".concat(n,"-with-text-right"),{"&::before":{width:"95%"},"&::after":{width:"5%"}}),(0,r.Z)(t,"".concat(n,"-inner-text"),{display:"inline-block",padding:"0 1em"}),(0,r.Z)(t,"&-dashed",{background:"none",borderColor:a,borderStyle:"dashed",borderWidth:"".concat(i,"px 0 0")}),(0,r.Z)(t,"&-horizontal".concat(n,"-with-text").concat(n,"-dashed"),{"&::before, &::after":{borderStyle:"dashed none none"}}),(0,r.Z)(t,"&-vertical".concat(n,"-dashed"),{borderInlineStartWidth:i,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0}),(0,r.Z)(t,"&-plain".concat(n,"-with-text"),{color:e.colorText,fontWeight:"normal",fontSize:e.fontSize}),(0,r.Z)(t,"&-horizontal".concat(n,"-with-text-left").concat(n,"-no-default-orientation-margin-left"),(0,r.Z)({"&::before":{width:0},"&::after":{width:"100%"}},"".concat(n,"-inner-text"),{paddingInlineStart:o})),(0,r.Z)(t,"&-horizontal".concat(n,"-with-text-right").concat(n,"-no-default-orientation-margin-right"),(0,r.Z)({"&::before":{width:"100%"},"&::after":{width:0}},"".concat(n,"-inner-text"),{paddingInlineEnd:o})),t)))},f=(0,u.Z)("Divider",(function(e){var t=(0,d.TS)(e,{dividerVerticalGutterMargin:e.marginXS,dividerHorizontalWithTextGutterMargin:e.margin,dividerHorizontalGutterMargin:e.marginLG});return[p(t)]}),{sizePaddingEdgeHorizontal:0}),m=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};var h=function(e){var t,n=c.useContext(s.E_),a=n.getPrefixCls,l=n.direction,u=e.prefixCls,d=e.type,p=void 0===d?"horizontal":d,h=e.orientation,y=void 0===h?"center":h,v=e.orientationMargin,g=e.className,b=e.rootClassName,x=e.children,E=e.dashed,w=e.plain,S=m(e,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","plain"]),j=a("divider",u),C=f(j),k=(0,o.Z)(C,2),O=k[0],Z=k[1],P=y.length>0?"-".concat(y):y,A=!!x,_="left"===y&&null!=v,N="right"===y&&null!=v,M=i()(j,Z,"".concat(j,"-").concat(p),(t={},(0,r.Z)(t,"".concat(j,"-with-text"),A),(0,r.Z)(t,"".concat(j,"-with-text").concat(P),A),(0,r.Z)(t,"".concat(j,"-dashed"),!!E),(0,r.Z)(t,"".concat(j,"-plain"),!!w),(0,r.Z)(t,"".concat(j,"-rtl"),"rtl"===l),(0,r.Z)(t,"".concat(j,"-no-default-orientation-margin-left"),_),(0,r.Z)(t,"".concat(j,"-no-default-orientation-margin-right"),N),t),g,b),z=Object.assign(Object.assign({},_&&{marginLeft:v}),N&&{marginRight:v});return O(c.createElement("div",Object.assign({className:M},S,{role:"separator"}),x&&"vertical"!==p&&c.createElement("span",{className:"".concat(j,"-inner-text"),style:z},x)))}},6106:function(e,t,n){"use strict";var r=n(7545);t.Z=r.Z}}]);
//# sourceMappingURL=620.c472b230.chunk.js.map