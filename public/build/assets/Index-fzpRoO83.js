import{r as d,j as e,Y as E}from"./app-DZe3A5Eo.js";import{d as p}from"./index-D_IJPO7K.js";import{S as a}from"./sweetalert2.all-U6Xlt3MP.js";import{A as D}from"./AuthenticatedLayout-BJkFj0yU.js";import{u as S,C as P}from"./CreateProductModal-B2o-kirj.js";import{c as A}from"./chunk-ZBZZ6A2J-BUoSXG5g.js";import{m as I,a as Y,b as B,c as F,d as O}from"./chunk-X4CB5I5S-Dy29aVIG.js";import{b as c}from"./chunk-NXTXE2B3-H9fbYrcq.js";import"./ApplicationLogo-sVjwoLkn.js";import"./chunk-YAC6J4IU-BjIZhijt.js";import"./index-DF1axCFp.js";import"./useMenuTriggerState-CYspXe38.js";import"./useControlledState-CjXxMMAQ.js";import"./chunk-XHQUSKIE-Cm8YodC9.js";import"./VisuallyHidden-oXn3kJb5.js";import"./chunk-6SYPMUJF-DKWkzE0F.js";import"./Combination-DUOysM2-.js";import"./index-CJckUUon.js";import"./iconBase-DoQOPXeu.js";import"./chunk-HUKVTWEI-ClycOMCv.js";import"./useToggleState-BDjIqUK2.js";import"./chunk-RFUEKIFS-BiXG_wtu.js";import"./chunk-RXDYTPX4-aYd7C-dW.js";import"./chunk-OKTOLZE5-BM3pR4xK.js";import"./chunk-7F3ZLNJ6-Cd56nhL-.js";import"./chunk-77LBB3F4-DUpZ6Bhu.js";import"./chunk-ZH5EUE66-B37RNOwp.js";import"./chunk-WRGKOHGB-BHQY6HPR.js";const ce=({products:u,onDelete:x,auth:h})=>{const{isOpen:f,onOpen:g,onClose:i}=S(),[t,j]=d.useState(null),[n,b]=d.useState(!1),[r,m]=d.useState(null),N=s=>{j(s),g()},y=()=>{t&&a.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(async s=>{if(s.isConfirmed)try{await p.Inertia.delete(route("products.destroy",t.id)),x(t.id),i(),a.fire("Deleted!","Your product has been deleted.","success")}catch(o){console.error("Error deleting product:",o),a.fire("Error!","An error occurred while deleting the product.","error")}})},v=()=>{y()},w=()=>{b(!0),m(t)},C=async()=>{if(r)try{const{id:s,...o}=r;await p.Inertia.put(route("products.update",r.id),o),i(),a.fire("Updated!","Your product has been updated.","success")}catch(s){console.error("Error updating product:",s),a.fire("Error!","An error occurred while updating the product.","error")}},l=s=>{const{name:o,value:_}=s.target;r&&m({...r,[o]:_})};return e.jsx(e.Fragment,{children:e.jsxs(D,{user:h.user,header:e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Products"})}),children:[e.jsx(E,{title:"Products"}),e.jsx("div",{className:"py-8 px-4",children:e.jsxs("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:[e.jsx(P,{}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5",children:u.map(s=>e.jsx(A,{children:e.jsxs("div",{className:"border border-gray-200 rounded p-4 cursor-pointer flex",onClick:()=>N(s),children:[e.jsxs("div",{className:"flex-grow",children:[e.jsx("h3",{className:"text-lg font-bold mb-1",children:s.name}),e.jsxs("p",{className:"text-gray-600 mb-1",children:[e.jsx("strong",{children:"Price:"})," ₱",s.price]}),e.jsxs("p",{className:"text-gray-600",children:[e.jsx("strong",{children:"Description:"})," ",s.description]})]}),e.jsx("div",{className:"ml-4",children:e.jsx("img",{src:s.image_url,alt:s.name,className:"h-20 w-20 object-cover rounded"})})]},s.id)}))})]})}),t&&e.jsx(I,{isOpen:f,onOpenChange:i,children:e.jsxs(Y,{children:[e.jsx(B,{className:"flex flex-col gap-1",children:n?"Edit Product":t.name}),e.jsx(F,{children:n?e.jsxs("form",{children:[e.jsx("input",{type:"text",name:"name",value:(r==null?void 0:r.name)||"",onChange:l,className:"w-full border rounded-md p-2 mb-4",placeholder:"Name"}),e.jsx("input",{type:"number",name:"price",value:(r==null?void 0:r.price)||"",onChange:l,className:"w-full border rounded-md p-2 mb-4",placeholder:"Price"}),e.jsx("textarea",{name:"description",value:(r==null?void 0:r.description)||"",onChange:l,className:"w-full border rounded-md p-2 mb-4",placeholder:"Description"}),e.jsx("input",{type:"text",name:"image_url",value:(r==null?void 0:r.image_url)||"",onChange:l,className:"w-full border rounded-md p-2 mb-4",placeholder:"Image URL"})]}):e.jsxs(e.Fragment,{children:[e.jsx("img",{src:t.image_url,alt:t.name,className:"w-full mb-4"}),e.jsx("p",{children:t.description})]})}),e.jsxs(O,{children:[e.jsx(c,{color:"danger",variant:"solid",onPress:v,children:"Delete"}),n?e.jsx(c,{color:"primary",onPress:C,children:"Save"}):e.jsx(c,{color:"primary",onPress:w,children:"Edit"})]})]})})]})})};export{ce as default};