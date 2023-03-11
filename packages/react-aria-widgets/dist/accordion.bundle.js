!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("react")):"function"==typeof define&&define.amd?define(["react"],r):"object"==typeof exports?exports.accordion=r(require("react")):e.accordion=r(e.react)}(self,(e=>(()=>{var r={329:(e,r,t)=>{"use strict";var n=t(631);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,r,t,o,i,a){if(a!==n){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function r(){return e}e.isRequired=e;var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,elementType:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:i,resetWarningCache:o};return t.PropTypes=t,t}},849:(e,r,t)=>{e.exports=t(329)()},631:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},156:r=>{"use strict";r.exports=e}},t={};function n(e){var o=t[e];if(void 0!==o)return o.exports;var i=t[e]={exports:{}};return r[e](i,i.exports,n),i.exports}n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{"use strict";n.r(o),n.d(o,{Accordion:()=>T,AccordionHeader:()=>C,AccordionPanel:()=>V,AccordionSection:()=>f,BaseAccordionHeader:()=>_,BaseAccordionPanel:()=>F,withAccordionManager:()=>H});var e=n(156),r=n.n(e),t=n(849),i=n.n(t);function a(){return a=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},a.apply(this,arguments)}function c(e){var t=r().forwardRef((function(t,n){return r().createElement(e,a({},t,{ref:n}))}));return t.displayName="NoOp",t}function s(e){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return function(t,n,o){var i=t[n];return r&&null==i?new Error("".concat(n," is a required prop.")):e(t,n,o)}}function u(e,r){var t=e[r];if(!Number.isInteger(t)||t<1||t>6)return new Error("".concat(r," must be an integer between 1 and 6 (inclusive)."))}var l=s(u);function d(e){var t=e.children,n=e.id,o=e.index,i=e.headerLevel,a=e.onClick,c=e.onKeyDown,s=e.allowMultiple,u=e.allowToggle,l=e.getIsExpanded,d=e.getIsDisabled,f=e.toggleSection,p=e.setHeaderRef,b=e.focusHeader,y=e.focusPrevHeader,g=e.focusNextHeader,v=e.focusFirstHeader,h=e.focusLastHeader;return"function"==typeof t?t({id:n,index:o,headerLevel:i,onClick:a,onKeyDown:c,allowMultiple:s,allowToggle:u,getIsExpanded:l,getIsDisabled:d,toggleSection:f,setHeaderRef:p,focusHeader:b,focusPrevHeader:y,focusNextHeader:g,focusFirstHeader:v,focusLastHeader:h}):r().Children.map(t,(function(e){return r().cloneElement(e,{id:n,index:o,headerLevel:i,onClick:a,onKeyDown:c,allowMultiple:s,allowToggle:u,getIsExpanded:l,getIsDisabled:d,toggleSection:f,setHeaderRef:p,focusHeader:b,focusPrevHeader:y,focusNextHeader:g,focusFirstHeader:v,focusLastHeader:h})}))}l.isRequired=s(u,!0),d.propTypes={children:i().oneOfType([i().node,i().func]).isRequired,id:i().string.isRequired,index:i().number.isRequired,headerLevel:l.isRequired,onClick:i().func.isRequired,onKeyDown:i().func.isRequired,allowMultiple:i().bool.isRequired,allowToggle:i().bool.isRequired,getIsExpanded:i().func.isRequired,getIsDisabled:i().func.isRequired,toggleSection:i().func.isRequired,setHeaderRef:i().func.isRequired,focusHeader:i().func.isRequired,focusPrevHeader:i().func.isRequired,focusNextHeader:i().func.isRequired,focusFirstHeader:i().func.isRequired,focusLastHeader:i().func.isRequired};const f=c(d);var p=["allowMultiple","allowToggle"];function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function y(){return y=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},y.apply(this,arguments)}function g(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,m(n.key),n)}}function v(e,r){return v=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,r){return e.__proto__=r,e},v(e,r)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function w(e){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},w(e)}function O(e,r,t){return(r=m(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function m(e){var r=function(e,r){if("object"!==b(e)||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!==b(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===b(r)?r:String(r)}function H(e){var t;return t=function(t){!function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),r&&v(e,r)}(s,t);var n,o,i,a,c=(i=s,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=w(i);if(a){var t=w(this).constructor;e=Reflect.construct(r,arguments,t)}else e=r.apply(this,arguments);return function(e,r){if(r&&("object"===b(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return h(e)}(this,e)});function s(e){var r;return function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,s),O(h(r=c.call(this,e)),"getAllowToggle",(function(){var e=r.props,t=e.allowToggle;return!!e.allowMultiple||t})),O(h(r),"getIsExpanded",(function(e){return r.state.expandedSections.has(e)})),O(h(r),"getIsDisabled",(function(e){return!r.getAllowToggle()&&r.getIsExpanded(e)})),O(h(r),"toggleSection",(function(e){var t=r.props.allowMultiple,n=r.getIsExpanded(e),o=r.getIsDisabled(e);r.setState((function(r){var i=r.expandedSections;return t?n?i.delete(e):i.add(e):(i.clear(),n&&!o||i.add(e)),{expandedSections:i}}))})),O(h(r),"setHeaderRef",(function(e){r.sectionRefs.push(e)})),O(h(r),"focusHeader",(function(e){r.sectionRefs[e].focus()})),O(h(r),"focusPrevHeader",(function(e){r.focusHeader(0===e?r.sectionRefs.length-1:e-1)})),O(h(r),"focusNextHeader",(function(e){r.focusHeader(e===r.sectionRefs.length-1?0:e+1)})),O(h(r),"focusFirstHeader",(function(){r.focusHeader(0)})),O(h(r),"focusLastHeader",(function(){r.focusHeader(r.sectionRefs.length-1)})),r.state={expandedSections:new Set},r.sectionRefs=[],r}return n=s,(o=[{key:"render",value:function(){var t=this.props,n=t.allowMultiple,o=(t.allowToggle,function(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(t,p));return r().createElement(e,y({allowMultiple:n,allowToggle:this.getAllowToggle(),getIsExpanded:this.getIsExpanded,getIsDisabled:this.getIsDisabled,toggleSection:this.toggleSection,setHeaderRef:this.setHeaderRef,focusHeader:this.focusHeader,focusPrevHeader:this.focusPrevHeader,focusNextHeader:this.focusNextHeader,focusFirstHeader:this.focusFirstHeader,focusLastHeader:this.focusLastHeader},o))}}])&&g(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),s}(r().Component),O(t,"propTypes",{allowMultiple:i().bool,allowToggle:i().bool}),O(t,"defaultProps",{allowMultiple:!0,allowToggle:!0}),t}function R(e){return R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R(e)}function P(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,E(n.key),n)}}function x(e,r){return x=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,r){return e.__proto__=r,e},x(e,r)}function j(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}function q(e,r,t){return(r=E(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function E(e){var r=function(e,r){if("object"!==R(e)||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!==R(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===R(r)?r:String(r)}var I=function(e){!function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),r&&x(e,r)}(c,e);var t,n,o,i,a=(o=c,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=S(o);if(i){var t=S(this).constructor;e=Reflect.construct(r,arguments,t)}else e=r.apply(this,arguments);return function(e,r){if(r&&("object"===R(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return j(e)}(this,e)});function c(){var e;!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,c);for(var r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];return q(j(e=a.call.apply(a,[this].concat(t))),"onClick",(function(r){(0,e.props.toggleSection)(r.target.id)})),q(j(e),"onKeyDown",(function(r){var t=e.props,n=t.focusPrevHeader,o=t.focusNextHeader,i=t.focusFirstHeader,a=t.focusLastHeader,c=r.key,s=Number.parseInt(r.target.dataset.index,10);"ArrowUp"===c?(r.preventDefault(),n(s)):"ArrowDown"===c?(r.preventDefault(),o(s)):"Home"===c?(r.preventDefault(),i()):"End"===c&&(r.preventDefault(),a())})),e}return t=c,(n=[{key:"render",value:function(){var e=this,t=this.props,n=t.children,o=t.headerLevel,i=t.allowMultiple,a=t.allowToggle,c=t.getIsExpanded,s=t.getIsDisabled,u=t.toggleSection,l=t.setHeaderRef,d=t.focusHeader,p=t.focusPrevHeader,b=t.focusNextHeader,y=t.focusFirstHeader,g=t.focusLastHeader;return r().Children.map(n,(function(t,n){if(t.type!==f)throw new Error("Only <AccordionSection>s are valid children of <Accordion>.");return r().cloneElement(t,{index:n,onClick:e.onClick,onKeyDown:e.onKeyDown,headerLevel:o,allowMultiple:i,allowToggle:a,getIsExpanded:c,getIsDisabled:s,toggleSection:u,setHeaderRef:l,focusHeader:d,focusPrevHeader:p,focusNextHeader:b,focusFirstHeader:y,focusLastHeader:g})}))}}])&&P(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(r().Component);q(I,"propTypes",{children:i().node.isRequired,headerLevel:l,allowMultiple:i().bool.isRequired,allowToggle:i().bool.isRequired,getIsExpanded:i().func.isRequired,getIsDisabled:i().func.isRequired,toggleSection:i().func.isRequired,setHeaderRef:i().func.isRequired,focusHeader:i().func.isRequired,focusPrevHeader:i().func.isRequired,focusNextHeader:i().func.isRequired,focusFirstHeader:i().func.isRequired,focusLastHeader:i().func.isRequired}),q(I,"defaultProps",{headerLevel:2});const T=H(I);function D(){return D=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},D.apply(this,arguments)}var L=r().forwardRef((function(e,t){var n=e.children,o=e.id,i=e.controlsId,a=e.headerLevel,c=e.onClick,s=e.onKeyDown,u=e.isExpanded,l=e.isDisabled,d=e.headerProps,f=e.buttonProps,p="h".concat(a);return r().createElement(p,d,r().createElement("button",D({type:"button",id:o,"aria-controls":i,onClick:c,onKeyDown:s,"aria-expanded":u,"aria-disabled":l,ref:t},f),n))}));L.propTypes={children:i().node.isRequired,id:i().string,controlsId:i().string.isRequired,headerLevel:l.isRequired,onClick:i().func.isRequired,onKeyDown:i().func,isExpanded:i().bool,isDisabled:i().bool,headerProps:i().object,buttonProps:i().object},L.defaultProps={id:void 0,onKeyDown:void 0,isExpanded:!1,isDisabled:!1,headerProps:{},buttonProps:{}},L.displayName="BaseAccordionHeader";const _=L;function N(e){return"".concat(e,"-panel")}function k(e){var t=e.children,n=e.id,o=e.index,i=e.headerLevel,a=e.setHeaderRef,c=e.onClick,s=e.onKeyDown,u=e.getIsExpanded,l=e.getIsDisabled,d=e.headerProps,f=e.buttonProps,p=u(n),b=l(n),y=Object.assign({},f,{"data-index":o});return r().createElement(_,{id:n,controlsId:N(n),headerLevel:i,onClick:c,onKeyDown:s,isExpanded:p,isDisabled:b,headerProps:d,buttonProps:y,ref:a},t)}k.propTypes={children:i().node.isRequired,id:i().string.isRequired,index:i().number.isRequired,headerLevel:l.isRequired,setHeaderRef:i().func.isRequired,onClick:i().func.isRequired,onKeyDown:i().func.isRequired,getIsExpanded:i().func.isRequired,getIsDisabled:i().func.isRequired,headerProps:i().object,buttonProps:i().object},k.defaultProps={headerProps:{},buttonProps:{}};const C=c(k);var M=["children","id","labelId","tagName"];function A(){return A=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},A.apply(this,arguments)}function K(e){var t=e.children,n=e.id,o=e.labelId,i=e.tagName,a=function(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(e,M);return r().createElement(i,A({id:n,"aria-labelledby":o},a),t)}K.propTypes={children:i().node.isRequired,id:i().string.isRequired,labelId:i().string,tagName:i().string},K.defaultProps={labelId:void 0,tagName:"section"};const F=K;var B=["children","id","getIsExpanded","className","index","headerLevel","onClick","onKeyDown","allowMultiple","allowToggle","getIsDisabled","toggleSection","setHeaderRef","focusHeader","focusPrevHeader","focusNextHeader","focusFirstHeader","focusLastHeader"];function U(){return U=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},U.apply(this,arguments)}function W(e){var t=e.children,n=e.id,o=e.getIsExpanded,i=e.className,a=(e.index,e.headerLevel,e.onClick,e.onKeyDown,e.allowMultiple,e.allowToggle,e.getIsDisabled,e.toggleSection,e.setHeaderRef,e.focusHeader,e.focusPrevHeader,e.focusNextHeader,e.focusFirstHeader,e.focusLastHeader,function(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(e,B)),c=o(n);return r().createElement(F,U({id:N(n),labelId:n,className:"".concat(i," ").concat(c?"":"react-aria-widgets-hidden")},a),t)}W.propTypes={children:i().node.isRequired,id:i().string.isRequired,getIsExpanded:i().func.isRequired,className:i().string},W.defaultProps={className:""};const V=c(W)})(),o})()));
//# sourceMappingURL=accordion.bundle.js.map