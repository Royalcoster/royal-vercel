"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1844],{31844:function(t,e,n){n.d(e,{Z:function(){return R}});var a=n(63366),i=n(87462),r=n(67294),o=n(86010),s=(n(45697),n(66396),n(8679),n(94199));function h(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return(0,s.O)(e)}var l=function(){var t=h.apply(void 0,arguments),e="animation-"+t.name;return{name:e,styles:"@keyframes "+e+"{"+t.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}};var u=n(77463);function d(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function c(t){return parseFloat(t)}var m=n(41796),p=n(63886),f=n(34368),g=n(21420);function w(t){return(0,g.Z)("MuiSkeleton",t)}(0,n(11271).Z)("MuiSkeleton",["root","text","rectangular","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var v=n(85893);const b=["animation","className","component","height","style","variant","width"];let y,k,C,S,Z=t=>t;const _=l(y||(y=Z`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),x=l(k||(k=Z`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),M=(0,p.ZP)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,e[n.variant],!1!==n.animation&&e[n.animation],n.hasChildren&&e.withChildren,n.hasChildren&&!n.width&&e.fitContent,n.hasChildren&&!n.height&&e.heightAuto]}})((({theme:t,ownerState:e})=>{const n=d(t.shape.borderRadius)||"px",a=c(t.shape.borderRadius);return(0,i.Z)({display:"block",backgroundColor:(0,m.Fq)(t.palette.text.primary,"light"===t.palette.mode?.11:.13),height:"1.2em"},"text"===e.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${n}/${Math.round(a/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===e.variant&&{borderRadius:"50%"},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})}),(({ownerState:t})=>"pulse"===t.animation&&h(C||(C=Z`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),_)),(({ownerState:t,theme:e})=>"wave"===t.animation&&h(S||(S=Z`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(90deg, transparent, ${0}, transparent);
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),x,e.palette.action.hover)));var R=r.forwardRef((function(t,e){const n=(0,f.Z)({props:t,name:"MuiSkeleton"}),{animation:r="pulse",className:s,component:h="span",height:l,style:d,variant:c="text",width:m}=n,p=(0,a.Z)(n,b),g=(0,i.Z)({},n,{animation:r,component:h,variant:c,hasChildren:Boolean(p.children)}),y=(t=>{const{classes:e,variant:n,animation:a,hasChildren:i,width:r,height:o}=t,s={root:["root",n,a,i&&"withChildren",i&&!r&&"fitContent",i&&!o&&"heightAuto"]};return(0,u.Z)(s,w,e)})(g);return(0,v.jsx)(M,(0,i.Z)({as:h,ref:e,className:(0,o.Z)(y.root,s),ownerState:g},p,{style:(0,i.Z)({width:m,height:l},d)}))}))}}]);