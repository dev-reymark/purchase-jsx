import{$ as i}from"./useControlledState-CjXxMMAQ.js";function o(e={}){let{isReadOnly:t}=e,[c,d]=i(e.isSelected,e.defaultSelected||!1,e.onChange);function l(a){t||d(a)}function f(){t||d(!c)}return{isSelected:c,setSelected:l,toggle:f}}export{o as $};
