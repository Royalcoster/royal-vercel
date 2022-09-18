(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7881],{58365:function(e,t,a){"use strict";var n=a(87462),i=a(45987),s=a(67294),r=a(86010),l=(a(45697),a(59693)),c=a(8786),o=s.forwardRef((function(e,t){var a=e.animation,l=void 0===a?"pulse":a,c=e.classes,o=e.className,d=e.component,m=void 0===d?"span":d,p=e.height,u=e.variant,h=void 0===u?"text":u,f=e.width,x=(0,i.Z)(e,["animation","classes","className","component","height","variant","width"]),v=Boolean(x.children);return s.createElement(m,(0,n.Z)({ref:t,className:(0,r.Z)(c.root,c[h],o,v&&[c.withChildren,!f&&c.fitContent,!p&&c.heightAuto],!1!==l&&c[l])},x,{style:(0,n.Z)({width:f,height:p},x.style)}))}));t.Z=(0,c.Z)((function(e){return{root:{display:"block",backgroundColor:(0,l.Fq)(e.palette.text.primary,"light"===e.palette.type?.11:.13),height:"1.2em"},text:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 60%",transform:"scale(1, 0.60)",borderRadius:e.shape.borderRadius,"&:empty:before":{content:'"\\00a0"'}},rect:{},circle:{borderRadius:"50%"},pulse:{animation:"$pulse 1.5s ease-in-out 0.5s infinite"},"@keyframes pulse":{"0%":{opacity:1},"50%":{opacity:.4},"100%":{opacity:1}},wave:{position:"relative",overflow:"hidden","&::after":{animation:"$wave 1.6s linear 0.5s infinite",background:"linear-gradient(90deg, transparent, ".concat(e.palette.action.hover,", transparent)"),content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}},"@keyframes wave":{"0%":{transform:"translateX(-100%)"},"60%":{transform:"translateX(100%)"},"100%":{transform:"translateX(100%)"}},withChildren:{"& > *":{visibility:"hidden"}},fitContent:{maxWidth:"fit-content"},heightAuto:{height:"auto"}}}),{name:"MuiSkeleton"})(o)},39151:function(e,t,a){"use strict";a.d(t,{Z:function(){return l}});var n=a(67294),i=a(62051),s=a(51801),r=(a(52535),a(85893));function l(e){var t=e.customerSlider,a=n.useRef(null),i=n.useRef(null);return(0,r.jsxs)("div",{className:"customer-section r-container py-5",children:[(0,r.jsxs)("div",{className:"top-panel d-flex justify-content-between",children:[(0,r.jsx)("h3",{className:"title py-5 blue-text",children:"Happy Customers"}),(0,r.jsxs)("div",{className:"btn-bottom-panel d-flex align-items-center",children:[(0,r.jsx)("button",{ref:a,className:"btn px-0 me-5",children:(0,r.jsx)("img",{src:"/img/common/leftArrow_black.png",alt:"rightArrow"})}),(0,r.jsx)("button",{ref:i,className:"btn px-0",children:(0,r.jsx)("img",{src:"/img/common/rightArrow_black.png",alt:"rightArrow"})})]})]}),(0,r.jsx)(s.t,{navigation:{prevEl:a.current,nextEl:i.current},slidesPerView:1.6,spaceBetween:30,loop:!0,className:"mySwiper py-5",breakpoints:{1208:{slidesPerView:3},1:{slidesPerView:1}},autoplay:{delay:2500,disableOnInteraction:!1,pauseOnMouseEnter:!0},onSwiper:function(e){setTimeout((function(){e.params.navigation.prevEl=a.current,e.params.navigation.nextEl=i.current,e.navigation.destroy(),e.navigation.init(),e.navigation.update()}))},children:t.map((function(e,t){return(0,r.jsx)(s.o,{children:(0,r.jsx)("div",{className:"customer-slider-item row m-0",children:(0,r.jsxs)("div",{className:"col-lg-12 col-md-12 col-sm-12 col-12 text-panel p-0 p-5",children:[(0,r.jsx)("div",{className:"customer-title d-flex",children:(0,r.jsx)("div",{className:"customer-info",children:(0,r.jsx)("h3",{className:"blue-text",children:e.name})})}),(0,r.jsxs)("p",{className:"description m-0 mt-5",children:['"',e.description,'"']})]})})},t)}))})]})}i.ZP.use([i.pt,i.W_])},60643:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(67294),i=a(53352),s=a(85893);function r(){var e=(0,n.useState)(!1),t=e[0],a=e[1],r=(0,n.useState)(),l=r[0],c=r[1],o=(0,n.useState)(),d=o[0],m=o[1],p=(0,n.useState)(),u=p[0],h=p[1],f=(0,i.Ds)().enqueueSnackbar;return(0,n.useEffect)((function(){t||($("#messageDH").unbind("change"),$("#messageDH").bind("change",(function(e){h(e.target.value)})),$("#sender").unbind("change"),$("#sender").bind("change",(function(e){m(e.target.value)})),$("#sendername").unbind("change"),$("#sendername").bind("change",(function(e){c(e.target.value),console.log(l)})),a(!0))}),[t]),(0,n.useEffect)((function(){try{$("#addFriends").unbind("click"),$("#addFriends").bind("click",(function(){var e=$("#friends").find("div").eq(0).clone();e.find("label").remove(),e.find("input").val(""),e.css({marginTop:-10,paddingTop:0,paddingBottom:0}),e.attr("added",1),e.appendTo($("#friends"))})),$("#sendHint").unbind("click"),$("#sendHint").bind("click",(function(){var e=[];$.each($("[mail]"),(function(){e.push($(this).val())}));var t=[];$.each($("[fname]"),(function(){t.push($(this).val())}));var a=window.location.href.split("-"),n=a[a.length-1];$("#sendHint").text("SENDING YOUR HINT"),$("#sendHint").prop("disabled",!0),$.ajax({url:"https://costercatalog.com/api/index.php?request=dropHintMail",type:"POST",dataType:"json",data:{names:t.join(","),email:e.join(","),sendername:l,message:u.replace(/(?:\r\n|\r|\n)/g,"<br>"),sender:d,shopifyid:n,url:window.location.href},success:function(e){var t="success"!=e.status?"error":"success";f("success"!=e.status?"Hint sending failed.":"Hint sent successfuly",{variant:t}),"success"==e.status&&($("#dropHintModal").find("input").val(""),$("#dropHintModal").find("textarea").val(""),$("[added]").remove()),setTimeout((function(){var e={event:"drop_a_hint",formId:"001",response:[{name:"your_name",value:l},{name:"your_email",value:d},{name:"your_message",value:u.replace(/(?:\r\n|\r|\n)/g,"<br>")}],uniqueEventId:16};console.log(e),dataLayer.push(e),$("#dropHint").modal("hide")}),0)}})}))}catch(e){}})),(0,s.jsx)("div",{className:"modal fade",id:"dropHint",tabIndex:"-1","aria-labelledby":"dropHint",children:(0,s.jsx)("div",{className:"modal-dialog modal-dialog-centered modal-dialog-scrollable r-container",id:"dropHintModal",children:(0,s.jsxs)("div",{className:"modal-content px-sm-5 px-4 py-4 round-form",style:{overflowY:"auto"},children:[(0,s.jsxs)("div",{className:"modal-header  py-3 px-0",children:[(0,s.jsx)("h3",{className:"modal-title",children:"DROP A HINT"}),(0,s.jsx)("button",{type:"button",className:"btn-close d-sm-none d-block","data-bs-dismiss":"modal","aria-label":"Close",style:{zIndex:10,position:"absolute",right:30},onClick:function(){$("#dropHintModal").modal("hide")}})]}),(0,s.jsxs)("div",{id:"friendsContainer",children:[(0,s.jsx)("div",{id:"friends",children:(0,s.jsx)("div",{friend:"1",className:"modal-body px-0",children:(0,s.jsxs)("div",{className:"friend-info row m-0  pt-2 pb-4",children:[(0,s.jsxs)("div",{className:"friend-name col-sm-6 col-12 px-0 pe-sm-3 pe-0",children:[(0,s.jsx)("label",{htmlFor:"friendName",children:"Friend's Name"}),(0,s.jsx)("input",{type:"text",fname:"1",className:"form-control px-4 py-3",placeholder:"Name"})]}),(0,s.jsxs)("div",{className:"friend-name col-sm-6 col-12 px-0 ps-sm-3 ps-0",children:[(0,s.jsx)("label",{htmlFor:"friendName",children:"Friend's Email"}),(0,s.jsx)("input",{mail:"1",type:"text",className:"form-control px-4 py-3",placeholder:"Email"})]})]})})}),(0,s.jsx)("button",{id:"addFriends",className:"btn pink-btn py-3 btn-add-friend round-form text-uppercase mt-2 mb-5",children:"Add another friend"}),(0,s.jsx)("label",{className:"messge-label mb-3",htmlFor:"messageBox",children:"Message"}),(0,s.jsx)("textarea",{id:"messageDH",className:"form-control p-4",rows:4,placeholder:"Something Here..."}),(0,s.jsxs)("div",{className:"your-info row m-0 pt-5 py-4",children:[(0,s.jsxs)("div",{className:"your-name col-sm-6 col-12 px-0 pe-sm-3 pe-0",children:[(0,s.jsx)("label",{htmlFor:"yourName",children:"Your Name"}),(0,s.jsx)("input",{id:"sendername",type:"text",className:"form-control px-4 py-3",placeholder:"Name"})]}),(0,s.jsxs)("div",{className:"your-name col-sm-6 col-12 px-0 ps-sm-3 ps-0",children:[(0,s.jsx)("label",{htmlFor:"yourName",children:"Your Email"}),(0,s.jsx)("input",{id:"sender",type:"text",className:"form-control px-4 py-3",placeholder:"Email"})]})]}),(0,s.jsxs)("div",{className:"check-panel d-flex align-items-center",children:[(0,s.jsx)("input",{className:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault"}),(0,s.jsx)("label",{className:"form-check-label ms-3 text-capitalize",htmlFor:"flexCheckDefault",children:"Sign up for special offers"})]}),(0,s.jsx)("p",{className:"description pt-4 pb-5",children:"By signing up you confirm that you have read the Privacy Policy and agree that your email and gender will be collected and used by Royal Coster for the purposes of sending news, promotions and updates via email. You can withdraw your consent at any time by unsubscribing or contacting us via"}),(0,s.jsx)("button",{id:"sendHint",className:"btn blue-btn btn-send text-uppercase round-form py-3",children:"Send"})]})]})})})}},65989:function(e,t,a){"use strict";a.r(t),a.d(t,{__N_SSG:function(){return L}});var n=a(42982),i=a(4942),s=a(67294),r=a(41664),l=a(9008),c=a(33274),o=a(11911),d=a(1149),m=(a(39151),a(74455)),p=a(56497),u=a(60643),h=a(62051),f=(a(51801),a(11163)),x=a(57333),v=a(68341),g=a.n(v),j=a(40600),b=a(96303),y=a(46458),N=(a(52535),a(2962),a(79352)),w=a(53854),S=a(58365),k=a(53352),_=a(85893);function C(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function O(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?C(Object(a),!0).forEach((function(t){(0,i.Z)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):C(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}h.ZP.use([h.pt,h.W_]);var I={setWishList:j.Q5,setCartData:b.Ng},L=!0;t.default=(0,y.$j)((function(e){return{wishList:e.wishList.value,cartData:e.cartData.value}}),I)((function(e){var t=(0,s.useState)(0),i=t[0],h=t[1],v=(0,s.useState)([]),j=v[0],b=v[1],y=(0,s.useState)(),C=y[0],I=y[1],L=(0,s.useState)(1),Z=L[0],D=L[1],H=(0,s.useState)(),T=H[0],P=H[1],E=(0,s.useState)(),R=E[0],F=E[1],A=(0,f.useRouter)(),z=(0,s.useState)(),W=z[0],q=z[1],J=(0,s.useState)(),M=J[0],B=J[1],V=(0,s.useState)(),Y=V[0],X=V[1],U=(0,s.useState)([]),G=U[0],K=U[1],Q=(0,s.useState)([]),ee=Q[0],te=Q[1],ae=(0,k.Ds)().enqueueSnackbar,ne=(0,s.useState)(),ie=ne[0],se=ne[1],re=(0,s.useState)(),le=re[0],ce=re[1],oe=(0,s.useState)(),de=(oe[0],oe[1]),me=(0,s.useState)(),pe=me[0],ue=me[1],he=(0,s.useState)(),fe=he[0],xe=he[1],ve=(0,s.useState)(),ge=(ve[0],ve[1]),je=(0,s.useState)(),be=je[0],ye=je[1],Ne=(0,s.useState)(),we=(Ne[0],Ne[1]);(0,s.useEffect)((function(){ye(window.innerWidth<576),$.each($(".description span"),(function(){$(this).css({color:"black",fontWeight:400})}))})),(0,s.useEffect)((function(){var t,n,i,s;t=window,n=document,t.hj=t.hj||function(){(t.hj.q=t.hj.q||[]).push(arguments)},t._hjSettings={hjid:3002600,hjsv:6},i=n.getElementsByTagName("head")[0],(s=n.createElement("script")).async=1,s.src="https://static.hotjar.com/c/hotjar-"+t._hjSettings.hjid+".js?sv="+t._hjSettings.hjsv,i.appendChild(s),dataLayer.push({bookCategory:"fiction",productName:window.location.href,bookAuthor:"Gabriel Garc\xeda M\xe1rquez"}),void 0!==typeof document&&(a(43734),localStorage.wishList&&e.setWishList(JSON.parse(localStorage.wishList))),localStorage.access_token&&q(localStorage.access_token)}),[]);var Se=function(e){var t=$(event.target);h(t.val()),0==t.val()?$("#delivery").html(""):$("#delivery").html(t.find("option:selected").attr("available"));var a=$.parseJSON(localStorage.selectedItem);dataLayer.push({ecommerce:null});var n={event:"selectRingSize",ecommerce:{value:a.variants[0].node.price,currencyCode:"EUR",detail:{products:[{id:a.variants[0].node.sku,name:a.title,price:a.variants[0].node.sku,brand:a.vendor,variant:a.variants[0].node.id,category:a.product_type,dimension1:t.find("option:selected").html()}]}}};a.dimension1=t.find("option:selected").html(),localStorage.selectedItem=JSON.stringify(a),dataLayer.push(n)};(0,s.useEffect)((function(){if(A.query.slug){$(".confirm-section").css({visibility:"hidden"}),we(window.location.href.split("/")[window.location.href.split("/").length-2]);var e=document.location.href.split("-");ge(e[e.length-1]);var t=new FormData,a=document.location.href;ce("https://www.facebook.com/sharer.php?u="+a+"&scrape=yes"),de("https://www.linkedin.com/shareArticle?mini=true&url="+a),ue("https://twitter.com/share?url="+a),xe("https://api.whatsapp.com/send?text=I wanted to share this with you: "+encodeURI(window.location.href)),t.append("shopifyid",e[e.length-1]),fetch("https://royalcoster.com:81/royalcoster/getProduct.php",{method:"post",body:t}).then((function(e){return e.json()})).then((function(e){if(console.log(e),B(e),$(".confirm-section").css({visibility:"visible"}),F(e.image.src.replace(".jpg","_300x.jpg")),P(e.variants[0].price),parseInt(e.variants[0].price)!=parseInt(e.fullprice)&&parseInt(e.fullprice)>0&&se(e.fullprice),b(e.tags.split(",")),X({variantTitle:e.variants[0].title,variantId:e.variants[0].id}),"Rings"==e.product_type){var t=[];t[0]="-1";for(var a=48;a<61;a++)t.push(a.toString());K(t)}var n=e.tags.split(",");$.each(n,(function(){this.toLowerCase().indexOf("letter")>-1&&te(["Select Letter","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"])})),localStorage.wishList&&JSON.parse(localStorage.wishList).find((function(t){return t.shopifyid==e.id}))&&I("favor")}))}}),[A.query]);var ke=function(e){var t=screen.width/2-300,a=screen.height/2-300;window.open(e,"MsgWindow","top="+a+", left="+t+",width=600,height=600")};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)(l.default,{children:[e.data.title&&(0,_.jsxs)("title",{children:[e.data.title," | Royal Coster"]}),e.data.title&&(0,_.jsx)("meta",{name:"description",content:e.data.body_html}),e.data.title&&(0,_.jsx)("meta",{itemProp:"name",content:e.data.title+" | Royal Coster"}),e.data.title&&(0,_.jsx)("meta",{itemProp:"description",content:e.data.body_html}),e.data.title&&(0,_.jsx)("meta",{itemProp:"image",content:e.data.images[0].src}),e.data.title&&(0,_.jsx)("meta",{property:"fb:app_id",content:"362991595876147"}),e.data.title&&(0,_.jsx)("meta",{property:"og:url",content:"https://royalcoster.com"+A.asPath}),e.data.title&&(0,_.jsx)("meta",{property:"og:type",content:"website"}),e.data.title&&(0,_.jsx)("meta",{property:"og:title",content:e.data.title+" | Royal Coster"}),e.data.title&&(0,_.jsx)("meta",{property:"og:description",content:e.data.body_html}),e.data.title&&(0,_.jsx)("meta",{property:"og:image",content:e.data.images[0].src}),e.data.title&&(0,_.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),e.data.title&&(0,_.jsx)("meta",{name:"twitter:title",content:e.data.title+" | Royal Coster"}),e.data.title&&(0,_.jsx)("meta",{name:"twitter:description",content:e.data.body_html}),e.data.title&&(0,_.jsx)("meta",{name:"twitter:image",content:e.data.images[0].src})]}),(0,_.jsxs)("div",{className:"productRing_page",id:"productPage",children:[(0,_.jsx)(c.default,{}),(0,_.jsx)("div",{className:"state-section",children:(0,_.jsxs)("div",{className:"link-panel  r-container py-3 d-flex align-items-center",children:[(0,_.jsx)("button",{className:"btn back-arrow d-flex me-3 blue-text px-0",onClick:function(){return A.back()},children:(0,_.jsx)(w.Tsu,{})}),(0,_.jsx)(r.default,{passHref:!0,href:"/",children:(0,_.jsx)("a",{className:"mx-2",children:"HOME"})}),M&&A.query&&localStorage.mainBackHref&&(0,_.jsxs)(_.Fragment,{children:["/",(0,_.jsx)(r.default,{passHref:!0,href:localStorage.mainBackHref,children:(0,_.jsx)("a",{className:"mx-2 text-uppercase",children:localStorage.mainBackTitle})}),"/",(0,_.jsx)(r.default,{passHref:!0,href:localStorage.backLink,children:(0,_.jsx)("a",{className:"mx-2 text-uppercase",children:localStorage.referrer})}),"/"]}),(0,_.jsx)("span",{className:"title ms-2 text-uppercase blue-text",children:M&&M.title})]})}),M?(0,_.jsxs)("div",{className:"confirm-section py-5 mb-5 row r-container",style:{visibility:"hidden"},children:[(0,_.jsx)("div",{className:"show-product col-md-6 col-12 p-0 pt-5 pe-5",children:(0,_.jsxs)("div",{className:"row m-0",children:[(0,_.jsx)("div",{className:"tile-product col-2 p-0 pe-3",children:M.images&&M.images.length>0&&M.images.map((function(e,t){return(0,_.jsx)("button",{className:"btn btn-show-product mb-3 p-0 round-form",onClick:function(){return F(e.src.replace(".jpg","_500x.jpg"))},children:(0,_.jsx)("img",{src:e.src.replace(".jpg","_50x.jpg"),alt:"product-image"})},t)}))}),(0,_.jsxs)("div",{className:"main-product col-10 p-0",children:[!be&&(0,_.jsx)("div",{className:"image-panel round mb-4",children:(0,_.jsx)("div",{className:"image-box",style:{width:"100%",height:"550px",backgroundImage:"url("+R+")",backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"top center"}})}),be&&(0,_.jsx)("div",{className:"image-panel round mb-4",children:(0,_.jsx)("div",{className:"image-box",style:{width:"100%",height:"275px",backgroundImage:"url("+R+")",backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"top center"}})}),(0,_.jsxs)("div",{className:"btn-panel d-flex align-items-center justify-content-between",children:[(0,_.jsx)("button",{className:"btn px-4 py-2 blue-text btn-share text-uppercase round-form d-flex align-items-center",onClick:function(){var e=setInterval((function(){try{$("#dropHint").modal("show"),$("#dropHint").appendTo("body"),clearInterval(e)}catch(t){}}),100)},children:"drop a hint"}),le&&(0,_.jsx)("button",{id:"facebookLink",className:"btn link-item d-flex align-items-center justify-content-center mb-3",onClick:function(){return ke(le)},children:(0,_.jsx)(N.Ybm,{})}),pe&&(0,_.jsx)("button",{className:"btn link-item d-flex align-items-center justify-content-center mb-3",onClick:function(){return ke(pe)},children:(0,_.jsx)(N.HSY,{})}),(0,_.jsx)("button",{className:"btn link-item d-flex align-items-center justify-content-center mb-3",onClick:function(){return ke("https://instagram.com/costerdiamondsofficial/")},children:(0,_.jsx)(N.Adh,{})}),!1,(0,_.jsx)("button",{style:{marginTop:-10},className:"btn link-item d-flex align-items-center justify-content-center",onClick:function(){return ke(fe)},children:(0,_.jsx)(N.nmQ,{})})]})]})]})}),(0,_.jsxs)("div",{className:"show-setting col-md-6 col-12 p-0 pt-5 ps-5",children:[(0,_.jsxs)("div",{className:"title-panel",children:[(0,_.jsx)("h3",{className:"type pb-4 m-0",children:g()(M.vendor)}),(0,_.jsx)("h3",{className:"title text-capitalize pb-4 m-0",children:g()(M.title)}),"watches"==M.product_type.toString().toLowerCase()&&(0,_.jsxs)("h4",{style:{fontWeight:400,fontSize:27},className:"blue-text",children:["Reference Number ",M.reference]}),(0,_.jsx)("p",{className:"description pb-4 m-0",children:M.body_html&&g()(M.body_html.replace("geelgoud","yellow gold"))})]}),(0,_.jsxs)("div",{className:"confirm-panel",children:[M.options.length>0&&M.options.map((function(e,t){return(0,_.jsxs)("div",{className:"material-setting-panel py-4",children:[(0,_.jsxs)("label",{htmlFor:"selectKarat",className:"d-flex align-items-center pb-4 text-uppercase",children:[e.name," :",Y?Y[0]:e.values[0],(0,_.jsx)(N.j6O,{className:"ms-2"})]}),(0,_.jsx)("div",{className:"material-box d-flex flex-wrap",children:e.values.length>0&&e.values.map((function(e,t){return(0,_.jsxs)("button",{className:"btn btn-material px-4 py-2 round-form mt-3 text-uppercase me-3 "+(Y||0!=t?Y&&Y.variantTitle==e?"active":"":"active"),onClick:function(){return X({variantTitle:e,variantId:M.variants.find((function(t){return t.title==e})).id})},children:[console.log(e),"Default Title"==e?M.title:e]},t)}))})]},t)})),G.length>0&&(0,_.jsxs)("div",{className:"selector-panel row m-0 py-4",children:[(0,_.jsx)("div",{className:"select-karat col-lg-6 col-md-12 col-sm-6 col-12 p-0 pe-lg-3 pe-md-0 pe-sm-3 pe-0",children:(0,_.jsxs)("div",{className:"d-flex justify-content-between pb-4 align-items-center",children:[(0,_.jsxs)("h3",{onClick:function(){window.open("https://royalcoster.com:81/royalcoster/Ringsizer.pdf","_blank")},htmlFor:"selectKarat",className:"d-flex align-items-center m-0 text-uppercase",children:["Ring Size",(0,_.jsx)(N.j6O,{className:"ms-2"})]}),(0,_.jsx)("div",{className:"material-box d-flex flex-wrap",children:(0,_.jsx)("button",{className:"btn btn-material px-4 py-2 round-form mt-3 text-uppercase me-3 active",style:{background:"#f6f6f6",color:"black",fontWeight:400,fontSize:"1.4rem",border:"2px solid #c4a060",marginTop:-30},onClick:function(){window.open("https://royalcoster.com:81/royalcoster/Ringsizer.pdf","_blank")},children:"FIND MY SIZE"})})]})}),(0,_.jsx)("div",{className:"d-flex justify-content-between pb-4 align-items-center",children:(0,_.jsx)("div",{className:"select-box",children:(0,_.jsx)("table",{children:(0,_.jsxs)("tr",{children:[(0,_.jsx)("td",{children:(0,_.jsx)("select",{className:"form-select blue-text ps-4 round-form py-3","aria-label":"Default select example",value:i,id:"selectSize",style:{width:150},onChange:function(e){return Se()},children:G.length>0&&G.map((function(e,t){return(0,_.jsx)("option",{style:j.indexOf(" "+e.toString())>-1?{fontWeight:"bold",color:"green"}:{},available:j.indexOf(" "+e.toString())>-1?"Delivery within 3 days":"Delivery in 6 weeks with. We will contact you about the fastest delivery",value:t,children:t>0?e:"Select"},t)}))})}),(0,_.jsx)("td",{style:{verticalAlign:"bottom",paddingLeft:10},children:(0,_.jsx)("p",{style:{float:"left",fontSize:"1.6rem",fontWeight:400},id:"delivery"})})]})})})})]}),ee.length>0&&(0,_.jsxs)("div",{className:"selector-panel row m-0 py-4",children:[(0,_.jsx)("div",{className:"select-karat col-lg-6 col-md-12 col-sm-6 col-12 p-0 pe-lg-3 pe-md-0 pe-sm-3 pe-0",children:(0,_.jsx)("div",{className:"d-flex justify-content-between pb-4 align-items-center",children:(0,_.jsxs)("h3",{htmlFor:"selectKarat",className:"d-flex align-items-center m-0 text-uppercase",children:["Select Letter",(0,_.jsx)(N.j6O,{className:"ms-2"})]})})}),(0,_.jsx)("div",{className:"d-flex justify-content-between pb-4 align-items-center",children:(0,_.jsx)("div",{className:"select-box",children:(0,_.jsx)("select",{className:"form-select blue-text ps-4 round-form py-3","aria-label":"Default select example",value:i,id:"selectLetter",style:{width:150},onChange:function(e){return Se()},children:ee.length>0&&ee.map((function(e,t){return(0,_.jsx)("option",{value:e,children:e},t)}))})})})]}),(0,_.jsxs)("div",{className:"cost-panel d-flex justify-content-between align-items-center py-4",children:[(0,_.jsxs)("div",{className:"price-panel",children:[(0,_.jsx)("h4",{className:"text-uppercase",children:"total"}),ie&&ie>1&&(0,_.jsx)("h3",{className:"full-price text-decoration-line-through",style:{color:"red"},children:(0,_.jsx)(x.Z,{style:{color:"red"},value:ie*Z,displayType:"text",decimalScale:2,fixedDecimalScale:!0,thousandSeparator:!0,prefix:"\u20ac "})}),(0,_.jsx)("h3",{className:"blue-text",children:(0,_.jsx)(x.Z,{value:T*Z,displayType:"text",decimalScale:2,fixedDecimalScale:!0,thousandSeparator:!0,prefix:"\u20ac "})})]}),(0,_.jsxs)("div",{className:"amount-panel d-flex align-items-center",children:[(0,_.jsx)("button",{className:"btn btn-decrease round-form blue-text d-flex align-items-center justify-content-center p-4",onClick:function(){return Z>1&&D(Z-1)},children:(0,_.jsx)(N.$N3,{})}),(0,_.jsx)("span",{className:"mx-4",children:Z}),(0,_.jsx)("button",{className:"btn btn-increase round-form blue-text d-flex align-items-center justify-content-center p-4",onClick:function(){return e=Z+1,t=M.available,void(e>t?ae("At this moment we only have "+t+" product(s) in stock. Would you like to order more than one? Please contact us.",{variant:"warning",autoHideDuration:1e4,action:function(e){return(0,_.jsx)("div",{children:(0,_.jsx)("button",{className:"btn btn-primary btn-lg",onClick:function(){window.location.href="/contact"},children:"'CONTACT US'"})})}}):D(e));var e,t},children:(0,_.jsx)(N.uGf,{})})]})]}),(0,_.jsxs)("div",{className:"confirm-box d-flex flex-wrap justify-content-between align-items-start m-0 py-4",children:[W&&(0,_.jsx)("button",{className:"btn favor-btn round-form d-flex align-items-center justify-content-center p-4 me-3 "+C,onClick:function(){return function(){if(C){I();var t=e.wishList,a=t.find((function(e){return e.shopifyid==M.id}));a&&(t.splice(t.indexOf(a),1),e.setWishList(t))}else{I("favor");var i={shopifyid:M.id,title:M.title,price:M.variants[0].price,variantID:M.variants[0].id,image:M.image.src.replace(".jpg","_100x.jpg"),amount:Z,product_type:"Rings",descripion:M.body_html};localStorage.wishList?e.setWishList([].concat((0,n.Z)(e.wishList),[i])):(localStorage.setItem("wishList",JSON.stringify([i])),e.setWishList([i]))}}()},children:(0,_.jsx)(N.iB2,{})}),M&&M.available>0&&(0,_.jsxs)("div",{className:"setting-btn-panel d-flex flex-column flex-1 text-end",children:[(0,_.jsx)("button",{className:"btn blue-btn text-uppercase round-form px-5 py-3 mb-4",onClick:function(t){t.preventDefault();var a=0,i=0,s="Select Letter";if($("#selectSize").length>0&&"Select"==(i=$("#selectSize").find("option:selected").text())){return ae("Please select ring size",{variant:"error"}),!1}if($("#selectLetter").length>0&&"Select Letter"==(s=$("#selectLetter").find("option:selected").val())){return ae("Please select letter",{variant:"error"}),!1}var r="";0!=i&&(r+=" (Ring Size "+i+")"),"Select Letter"!=s&&(r+=" (Letter "+s+")");var l=new FormData,c='{productVariant(id: "gid://shopify/ProductVariant/'.concat(Y.variantId,'") {id title storefrontId}}');l.append("graphql",btoa(c)),fetch("https://royalcoster.com:81/royalcoster/graphql.php",{method:"post",body:l}).then((function(e){return e.json()})).then((function(t){var l=$.parseJSON(localStorage.selectedItem),c={shopifyid:M.id,size:i,letter:"Select Letter"==s?"":s,maxCount:M.available,description:M.body_html,title:M.title+r,price:M.variants[0].price,variant:O(O({},Y),{},{storefrontId:t.data.productVariant.storefrontId}),image:M.image.src.replace(".jpg","_100x.jpg"),amount:Z,product_type:M.product_type,url:window.location.href},o=Z;if(localStorage.cart){var d=JSON.parse(localStorage.cart).cartData;d.map((function(e){e.shopifyid==M.id&&(a+=e.amount)}));var m=d.find((function(e,t){return e.shopifyid==c.shopifyid})),p=M.available-a;if(!p){return void ae("Stock is not enough.",{variant:"warning"})}if(o>p&&(D(p),o=p),m){var u=d.find((function(e){return e.variant.variantId==c.variant.variantId}));u?(u.amount+=o,localStorage.setItem("cart",JSON.stringify({cartData:d})),e.setWishList(d)):(localStorage.setItem("cart",JSON.stringify({cartData:[].concat((0,n.Z)(d),[c])})),e.setWishList([].concat((0,n.Z)(d),[c])))}else localStorage.setItem("cart",JSON.stringify({cartData:[].concat((0,n.Z)(d),[O(O({},c),{},{amount:o})])}))}else{if(!M.available){return void ae("Stock is not enough.",{variant:"warning"})}o>M.available&&(o=M.available,D(M.available)),localStorage.setItem("cart",JSON.stringify({cartData:[O(O({},c),{},{amount:o})]}))}l=$.parseJSON(localStorage.selectedItem);dataLayer.push({ecommerce:null});var h,f={event:"addToCart",ecommerce:{value:o*parseFloat(l.variants[0].price),currencyCode:"EUR",add:{products:[{id:l.variants[0].node.sku,name:l.title,price:l.variants[0].node.price,brand:l.vendor,variant:l.variants[0].node.id,category:l.product_type,dimension1:l.dimension1,quantity:o}]}}};(ga("gtag_UA_54391819_8.send",{hitType:"event",eventCategory:"Add To Cart",eventAction:"Add To Cart: "+l.title+" ("+l.variants[0].node.sku+") "+(void 0!==l.dimension1?" Size "+l.dimension1:""),eventLabel:"Add to cart"}),l.quantity=o,void 0===localStorage.cItems)?(h={})[l.shopifyid]={id:l.variants[0].node.id,name:l.title+" ("+l.variants[0].node.sku+")",price:l.variants[0].node.price,brand:l.vendor,variant:l.variants[0].node.sku,category:l.product_type,dimension1:l.dimension1,quantity:o}:(h=$.parseJSON(localStorage.cItems))[l.shopifyid]={id:l.variants[0].node.id,name:l.title+" ("+l.variants[0].node.sku+")",price:l.variants[0].node.price,brand:l.vendor,variant:l.variants[0].node.sku,category:l.product_type,dimension1:l.dimension1,quantity:o};dataLayer.push(f),localStorage.cItems=JSON.stringify(h),window.location.href="/cart"}))},children:"add to cart"}),(0,_.jsx)("p",{className:"m-0",children:"Price includes VAT"})]}),M&&0==M.available&&(0,_.jsxs)("div",{className:"setting-btn-panel d-flex flex-column flex-1 text-end",children:[(0,_.jsx)("button",{className:"btn blue-btn text-uppercase round-form px-5 py-3 mb-4",onClick:function(e){window.location.href="/contact"},children:"contact us"}),(0,_.jsx)("p",{className:"m-0",children:"Price includes VAT"})]})]}),(0,_.jsxs)("div",{className:"help-panel d-flex justify-content-between py-4",children:[(0,_.jsx)("p",{className:"text-uppercase m-0",children:"Need help?"}),(0,_.jsxs)("div",{className:"link-panel d-flex",children:[(0,_.jsx)(r.default,{passHref:!0,href:"/contact",children:(0,_.jsxs)("a",{className:"text-uppercase me-4 d-flex align-items-center blue-text",children:[(0,_.jsx)(N.cNh,{className:"me-2"}),"contact"]})}),(0,_.jsx)(r.default,{passHref:!0,href:"javascript:window.tidioChatApi.open();",children:(0,_.jsxs)("a",{className:"text-uppercase d-flex align-items-center blue-text",children:[(0,_.jsx)(N.CXA,{className:"me-2"}),"chat"]})})]})]}),(0,_.jsxs)("div",{className:"schedule-panel d-flex align-items-center justify-content-between flex-wrap py-4",children:[(0,_.jsx)("p",{className:"m-0 text-uppercase",children:"Not ready to purchase online?"}),(0,_.jsx)("button",{className:"btn btn-schedule text-uppercase blue-text my-3 px-5 py-2",onClick:function(e){$("#appointment").modal("show"),setTimeout((function(){$("#appointmentForm").find("#online").val("schedule_appointment_pdp_online"),$("#appointmentForm").find("#visit").val("schedule_appointment_pdp"),$("#appointmentForm").find("#idvisit").val("016"),$("#appointmentForm").find("#idonline").val("017")}),1500)},children:"Schedule an appointment"})]})]})]})]}):(0,_.jsxs)("div",{className:"row r-container mb-5",children:[(0,_.jsx)("div",{className:"col-md-6 col-12 p-0 pt-5 pe-5",children:(0,_.jsxs)("div",{className:"row m-0",children:[(0,_.jsxs)("div",{className:"tile-product d-sm-block d-none col-2 p-0 pe-3",children:[(0,_.jsx)(S.Z,{variant:"rect",width:"100%",height:50,animation:"wave"}),(0,_.jsx)(S.Z,{variant:"rect",width:"100%",className:"mt-4",height:50,animation:"wave"}),(0,_.jsx)(S.Z,{variant:"rect",width:"100%",className:"mt-4",height:50,animation:"wave"}),(0,_.jsx)(S.Z,{variant:"rect",width:"100%",className:"mt-4",height:50,animation:"wave"})]}),(0,_.jsx)("div",{className:"main-product col-sm-10 col-12 p-0",children:(0,_.jsx)(S.Z,{variant:"rect",width:"100%",height:300,animation:"wave"})}),(0,_.jsxs)("div",{className:"tile-product d-sm-none d-flex col-12 p-0 pt-4",children:[(0,_.jsx)(S.Z,{variant:"rect",width:50,height:50,animation:"wave"}),(0,_.jsx)(S.Z,{variant:"rect",width:50,className:"ms-4",height:50,animation:"wave"}),(0,_.jsx)(S.Z,{variant:"rect",width:50,className:"ms-4",height:50,animation:"wave"})]})]})}),(0,_.jsxs)("div",{className:"col-md-6 col-12 p-0 pt-5 ps-5",children:[(0,_.jsx)(S.Z,{variant:"text",width:"100%",height:45,className:"mb-4"}),(0,_.jsx)(S.Z,{variant:"text",width:"100%",height:45,className:"mb-4"}),(0,_.jsx)(S.Z,{variant:"text",height:35,width:"100%"}),(0,_.jsx)(S.Z,{variant:"text",height:35,width:"100%"}),(0,_.jsx)(S.Z,{variant:"text",height:35,width:"100%"}),(0,_.jsx)(S.Z,{variant:"text",height:35,width:"100%"})]})]}),M?(0,_.jsx)(m.Z,{informations:M.specifications,productID:M.variants[0].sku,productDescription:M.body_html,productType:M.product_type,reference:M.reference,nosimilar:!0}):(0,_.jsxs)("div",{className:"r-container pt-5",children:[(0,_.jsx)(S.Z,{variant:"text",width:"100%",height:40}),(0,_.jsx)(S.Z,{variant:"text",width:"100%",height:40}),(0,_.jsx)(S.Z,{variant:"text",width:"100%",height:40}),(0,_.jsx)(S.Z,{variant:"text",width:"100%",height:40})]}),(0,_.jsx)(p.Z,{}),(0,_.jsx)(u.Z,{}),(0,_.jsx)(d.default,{}),(0,_.jsx)(o.default,{})]})]})}))},97322:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/search/[slug]",function(){return a(65989)}])}},function(e){e.O(0,[6556,3808,8786,2962,3353,9774,2888,179],(function(){return t=97322,e(e.s=t);var t}));var t=e.O();_N_E=t}]);