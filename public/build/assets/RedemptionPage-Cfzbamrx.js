import{q as h,r as s,j as e,Y as x}from"./app-DZe3A5Eo.js";import{S as r}from"./sweetalert2.all-U6Xlt3MP.js";import{c as j}from"./chunk-ZBZZ6A2J-BUoSXG5g.js";import{i as R}from"./chunk-ZH5EUE66-B37RNOwp.js";import{b as g}from"./chunk-NXTXE2B3-H9fbYrcq.js";import"./index-DF1axCFp.js";import"./chunk-XHQUSKIE-Cm8YodC9.js";import"./chunk-RXDYTPX4-aYd7C-dW.js";import"./useControlledState-CjXxMMAQ.js";const T=()=>{const{redemptionUrl:a}=h().props,[c,m]=s.useState(!1),[n,i]=s.useState(!1),[l,d]=s.useState(null),[o,p]=s.useState(""),u=async()=>{if(!o){r.fire({icon:"error",title:"Oops...",text:"Please enter the unique code!"});return}i(!0),d(null);try{const t=await fetch(`${a}?uniqueCode=${o}`,{method:"GET",headers:{"Content-Type":"application/json"}}),f=await t.json();if(!t.ok)throw new Error(f.message);if(!(await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"}})).ok)throw new Error("Redemption failed");m(!0),r.fire({icon:"success",title:"Success!",text:"Redemption successful!"})}catch(t){d(t.message),r.fire({icon:"error",title:"Oops...",text:t.message})}finally{i(!1)}};return e.jsxs(e.Fragment,{children:[e.jsx(x,{title:"Redeem"}),e.jsx("div",{className:"py-12 p-4",children:e.jsxs(j,{className:"w-full mx-auto p-4",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Redemption Page"}),e.jsx("div",{className:"mb-4",children:e.jsx(R,{label:"Unique Code",labelPlacement:"outside",placeholder:"Enter unique code",type:"text",value:o,onChange:t=>p(t.target.value)})}),c?e.jsx("p",{children:"Redeemed"}):e.jsx(g,{color:"primary",onClick:u,disabled:n,children:n?"Loading...":"Redeem"}),l&&e.jsx("p",{children:l})]})})]})};export{T as default};