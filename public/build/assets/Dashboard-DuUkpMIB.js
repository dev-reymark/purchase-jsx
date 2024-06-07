import{r as c,j as e,$ as Y,Y as xe,a as Q}from"./app-DZe3A5Eo.js";import{A as fe}from"./AuthenticatedLayout-BJkFj0yU.js";import{a as he,b as ge}from"./index-CJckUUon.js";import{G as Z}from"./iconBase-DoQOPXeu.js";import{c as L}from"./chunk-ZBZZ6A2J-BUoSXG5g.js";import{$ as be,a as ve,b as $e,p as q,g as J,t as je,c as ye}from"./useMenuTriggerState-CYspXe38.js";import{$ as we,a as ee,b as N,c as Ne,d as Te,e as ke,f as Pe}from"./chunk-XHQUSKIE-Cm8YodC9.js";import{m as Oe,c as Ce,u as De,o as ze,d as P,a as Ae,f as He}from"./index-DF1axCFp.js";import{m as Ee}from"./VisuallyHidden-oXn3kJb5.js";import{T as Re}from"./chunk-6SYPMUJF-DKWkzE0F.js";import{w as Ve}from"./chunk-RFUEKIFS-BiXG_wtu.js";import{L as Ie,d as Se,m as Me,A as Le}from"./chunk-NXTXE2B3-H9fbYrcq.js";import"./ApplicationLogo-sVjwoLkn.js";import"./chunk-YAC6J4IU-BjIZhijt.js";import"./Combination-DUOysM2-.js";import"./useControlledState-CjXxMMAQ.js";const _e=1500,X=500;let y={},Be=0,z=!1,b=null,w=null;function Fe(t={}){let{delay:s=_e,closeDelay:a=X}=t,{isOpen:o,open:f,close:m}=be(t),l=c.useMemo(()=>`${++Be}`,[]),r=c.useRef(),h=()=>{y[l]=v},u=()=>{for(let i in y)i!==l&&(y[i](!0),delete y[i])},n=()=>{clearTimeout(r.current),r.current=null,u(),h(),z=!0,f(),b&&(clearTimeout(b),b=null),w&&(clearTimeout(w),w=null)},v=i=>{i||a<=0?(clearTimeout(r.current),r.current=null,m()):r.current||(r.current=setTimeout(()=>{r.current=null,m()},a)),b&&(clearTimeout(b),b=null),z&&(w&&clearTimeout(w),w=setTimeout(()=>{delete y[l],w=null,z=!1},Math.max(X,a)))},g=()=>{u(),h(),!o&&!b&&!z?b=setTimeout(()=>{b=null,z=!0,n()},s):o||n()};return c.useEffect(()=>()=>{clearTimeout(r.current),y[l]&&delete y[l]},[l]),{isOpen:o,open:i=>{!i&&s>0&&!r.current?g():n()},close:v}}function Ke(t,s){let a=we(t,{labelable:!0}),{hoverProps:o}=ee({onHoverStart:()=>s==null?void 0:s.open(!0),onHoverEnd:()=>s==null?void 0:s.close()});return{tooltipProps:N(a,o,{role:"tooltip"})}}function Ue(t,s,a){let{isDisabled:o,trigger:f}=t,m=Ne(),l=c.useRef(!1),r=c.useRef(!1),h=()=>{(l.current||r.current)&&s.open(r.current)},u=d=>{!l.current&&!r.current&&s.close(d)};c.useEffect(()=>{let d=$=>{a&&a.current&&$.key==="Escape"&&($.stopPropagation(),s.close(!0))};if(s.isOpen)return document.addEventListener("keydown",d,!0),()=>{document.removeEventListener("keydown",d,!0)}},[a,s]);let n=()=>{f!=="focus"&&(ke()==="pointer"?l.current=!0:l.current=!1,h())},v=()=>{f!=="focus"&&(r.current=!1,l.current=!1,u())},g=()=>{r.current=!1,l.current=!1,u(!0)},i=()=>{Pe()&&(r.current=!0,h())},p=()=>{r.current=!1,l.current=!1,u(!0)},{hoverProps:T}=ee({isDisabled:o,onHoverStart:n,onHoverEnd:v}),{focusableProps:k}=Te({isDisabled:o,onFocus:i,onBlur:p},a);return{triggerProps:{"aria-describedby":s.isOpen?m:void 0,...N(k,T,{onPointerDown:g,onKeyDown:g})},tooltipProps:{id:m}}}function We(t){const[s,a]=Oe(t,q.variantKeys),{ref:o,as:f,isOpen:m,content:l,children:r,defaultOpen:h,onOpenChange:u,isDisabled:n,trigger:v,shouldFlip:g=!0,containerPadding:i=12,placement:p="top",delay:T=0,closeDelay:k=500,showArrow:d=!1,offset:$=7,crossOffset:S=0,isDismissable:O,shouldCloseOnBlur:se=!0,portalContainer:re,isKeyboardDismissDisabled:le=!1,updatePositionDeps:_=[],shouldCloseOnInteractOutside:ae,className:oe,onClose:B,motionProps:ne,classNames:C,...M}=s,ie=f||"div",D=Fe({delay:T,closeDelay:k,isDisabled:n,defaultOpen:h,isOpen:m,onOpenChange:j=>{u==null||u(j),j||B==null||B()}}),A=c.useRef(null),H=c.useRef(null),E=c.useId(),x=D.isOpen&&!n;c.useImperativeHandle(o,()=>Ce(H));const{triggerProps:F,tooltipProps:ce}=Ue({isDisabled:n,trigger:v},D,A),{tooltipProps:K}=Ke({isOpen:x,...N(s,ce)},D),{overlayProps:U,placement:R,updatePosition:de}=ve({isOpen:x,targetRef:A,placement:je(p),overlayRef:H,offset:d?$+3:$,crossOffset:S,shouldFlip:g,containerPadding:i});De(()=>{_.length&&de()},_);const{overlayProps:W}=$e({isOpen:x,onClose:D.close,isDismissable:O,shouldCloseOnBlur:se,isKeyboardDismissDisabled:le,shouldCloseOnInteractOutside:ae},H),V=c.useMemo(()=>{var j,I,G;return q({...a,radius:(j=t==null?void 0:t.radius)!=null?j:"md",size:(I=t==null?void 0:t.size)!=null?I:"md",shadow:(G=t==null?void 0:t.shadow)!=null?G:"sm"})},[ze(a),t==null?void 0:t.radius,t==null?void 0:t.size,t==null?void 0:t.shadow]),ue=c.useCallback((j={},I=null)=>({...N(F,j),ref:Ee(I,A),"aria-describedby":x?E:void 0}),[F,x,E,D]),pe=c.useCallback(()=>({ref:H,"data-slot":"base","data-open":P(x),"data-arrow":P(d),"data-disabled":P(n),"data-placement":J(R,p),...N(K,W,M),style:N(U.style,M.style,s.style),className:V.base({class:C==null?void 0:C.base}),id:E}),[V,x,d,n,R,p,K,W,M,U,s,E]),me=c.useCallback(()=>({"data-slot":"content","data-open":P(x),"data-arrow":P(d),"data-disabled":P(n),"data-placement":J(R,p),className:V.content({class:Ae(C==null?void 0:C.content,oe)})}),[V,x,d,n,R,p,C]);return{Component:ie,content:l,children:r,isOpen:x,triggerRef:A,showArrow:d,portalContainer:re,placement:p,disableAnimation:t==null?void 0:t.disableAnimation,isDisabled:n,motionProps:ne,getTooltipContentProps:me,getTriggerProps:ue,getTooltipProps:pe}}var te=He((t,s)=>{const{Component:a,children:o,content:f,isOpen:m,portalContainer:l,placement:r,disableAnimation:h,motionProps:u,getTriggerProps:n,getTooltipProps:v,getTooltipContentProps:g}=We({...t,ref:s});let i;try{if(c.Children.count(o)!==1)throw new Error;if(!c.isValidElement(o))i=e.jsx("p",{...n(),children:o});else{const O=o;i=c.cloneElement(O,n(O.props,O.ref))}}catch{i=e.jsx("span",{}),Ve("Tooltip must have only one child node. Please, check your code.")}const{ref:p,id:T,style:k,...d}=v(),$=e.jsx("div",{ref:p,id:T,style:k,children:e.jsx(Ie,{features:Se,children:e.jsx(Me.div,{animate:"enter",exit:"exit",initial:"exit",variants:Re.scaleSpring,...N(u,d),style:{...ye(r)},children:e.jsx(a,{...g(),children:f})})})});return e.jsxs(e.Fragment,{children:[i,h&&m?e.jsx(Y,{portalContainer:l,children:e.jsx("div",{ref:p,id:T,style:k,...d,children:e.jsx(a,{...g(),children:f})})}):e.jsx(Le,{children:m?e.jsx(Y,{portalContainer:l,children:$}):null})]})});te.displayName="NextUI.Tooltip";var Ge=te;function Ye(t){return Z({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H212V212h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zM464 544H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H212V612h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200z"},child:[]}]})(t)}function Qe(t){return Z({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"},child:[]},{tag:"path",attr:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z"},child:[]}]})(t)}function pt({auth:t,purchaseCount:s,productCount:a,totalSales:o}){return e.jsxs(fe,{user:t.user,header:e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Dashboard"})}),children:[e.jsx(xe,{title:"Dashboard"}),e.jsx("div",{className:"py-12",children:e.jsxs("div",{className:"max-w-7xl mx-auto p-6 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6",children:[e.jsx(L,{as:Q,isPressable:!0,href:route("purchases.index"),children:e.jsxs("div",{className:"p-4 md:p-5 flex gap-x-4",children:[e.jsx("div",{className:"flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800",children:e.jsx(he,{className:"text-primary"})}),e.jsxs("div",{className:"grow",children:[e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx("p",{className:"text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500",children:"Total Purchases"}),e.jsx(Ge,{showArrow:!0,size:"sm",placement:"right",content:"Total number of purchases by all clients",children:e.jsx("div",{className:"hs-tooltip-toggle",children:e.jsx(Qe,{})})})]}),e.jsxs("div",{className:"mt-1 flex items-center gap-x-2",children:[e.jsx("h3",{className:"text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200",children:s}),e.jsxs("span",{className:"inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100",children:[e.jsxs("svg",{className:"inline-block size-4 self-center",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17"}),e.jsx("polyline",{points:"16 7 22 7 22 13"})]}),e.jsx("span",{className:"inline-block text-xs font-medium",children:"12.5%"})]})]})]})]})}),e.jsx(L,{as:Q,isPressable:!0,href:route("products.index"),children:e.jsxs("div",{className:"p-4 md:p-5 flex gap-x-4",children:[e.jsx("div",{className:"flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800",children:e.jsx(Ye,{className:"text-secondary"})}),e.jsxs("div",{className:"grow",children:[e.jsx("div",{className:"flex items-center gap-x-2",children:e.jsx("p",{className:"text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500",children:"Products"})}),e.jsx("div",{className:"mt-1 flex items-center gap-x-2",children:e.jsx("h3",{className:"text-xl font-medium text-gray-800 dark:text-neutral-200",children:a})})]})]})}),e.jsx(L,{children:e.jsxs("div",{className:"p-4 md:p-5 flex gap-x-4",children:[e.jsx("div",{className:"flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800",children:e.jsx(ge,{className:"text-success"})}),e.jsxs("div",{className:"grow",children:[e.jsx("div",{className:"flex items-center gap-x-2",children:e.jsx("p",{className:"text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500",children:"Total Sales"})}),e.jsxs("div",{className:"mt-1 flex items-center gap-x-2",children:[e.jsx("h3",{className:"text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200",children:"₱"+o}),e.jsxs("span",{className:"inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-100",children:[e.jsxs("svg",{className:"inline-block size-4 self-center",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("polyline",{points:"22 17 13.5 8.5 8.5 13.5 2 7"}),e.jsx("polyline",{points:"16 17 22 17 22 11"})]}),e.jsx("span",{className:"inline-block text-xs font-medium",children:"1.7%"})]})]})]})]})})]})})]})}export{pt as default};