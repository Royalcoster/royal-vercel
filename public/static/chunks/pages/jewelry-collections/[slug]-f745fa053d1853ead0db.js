(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3999,1911,1149,6688,4433],{2572:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return o}});var s=a(67294),i=a(62051),n=a(51801),r=a(41664),c=(a(52535),a(25675)),l=a(85893);function o(){var e=(0,s.useState)([]),t=e[0],a=e[1],i=s.useRef(null),o=s.useRef(null);return(0,s.useEffect)((function(){fetch("https://wp.royalcoster.com/wp-json/wp/v2/pages/225800",{method:"get"}).then((function(e){return e.json()})).then((function(e){var t=[];$.each(e.acf.collection_slider,(function(){console.log(this);var e=this;fetch("https://costercatalog.com/shopify/royalcoster_api/images/getImage.php?src="+e.collection_item_img.url,{mathod:"get"}).then((function(e){return e.json()})).then((function(a){e.collectionImage=a.image,t.push(e)}))}));var s=setInterval((function(){t.length==e.acf.collection_slider.length&&(clearInterval(s),a(t))}),100)}))}),[]),(0,l.jsx)("div",{className:"collections",children:t.length>0&&(0,l.jsxs)("div",{className:"r-container",children:[(0,l.jsx)("div",{className:"row m-0 p-0 top-panel align-items-center",children:(0,l.jsx)("h2",{className:"col-12 text-center text-lg-start p-0 pb-5 mt-5",children:"Our Collections"})}),(0,l.jsx)(n.t,{navigation:{prevEl:i.current,nextEl:o.current},slidesPerView:4,spaceBetween:30,loop:!0,className:"mySwiper text-center",breakpoints:{1204:{slidesPerView:4},992:{slidesPerView:3},768:{slidesPerView:2},480:{slidesPerView:1},1:{slidesPerView:1}},autoplay:{delay:2500,disableOnInteraction:!1,pauseOnMouseEnter:!0},onSwiper:function(e){setTimeout((function(){e.params.navigation.prevEl=i.current,e.params.navigation.nextEl=o.current,e.navigation.destroy(),e.navigation.init(),e.navigation.update()}))},children:t.map((function(e,t){if(""!=e.collection_item_img_title)return(0,l.jsx)(n.o,{children:(0,l.jsx)(r.default,{passHref:!0,href:e.collection_item_url,children:(0,l.jsx)("a",{children:(0,l.jsxs)("div",{style:{width:300,height:300,maxWidth:300,maxHeight:300},children:[(0,l.jsx)(c.default,{alt:"Category",src:e.collectionImage,layout:"fill",objectFit:"cover",quality:100}),(0,l.jsx)("p",{style:{bottom:5,left:10,zIndex:1,position:"absolute",color:"white"},className:"mt-3",children:e.collection_item_img_title})]})})})},t)}))}),(0,l.jsxs)("div",{className:"btn-bottom-panel mt-5 text-center text-md-start",children:[(0,l.jsx)("button",{ref:i,className:"btn px-0 me-5",children:(0,l.jsx)("img",{loading:"lazy",src:"/img/common/leftArrow_black.png",alt:"rightArrow"})}),(0,l.jsx)("button",{ref:o,className:"btn px-0",children:(0,l.jsx)("img",{loading:"lazy",src:"/img/common/rightArrow_black.png",alt:"rightArrow"})})]})]})})}i.ZP.use([i.pt,i.W_])},11911:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return r}});var s=a(67294),i=a(41664),n=a(85893);function r(){var e=[{img:"Frame.png",url:"#"},{img:"Frame-1.png",url:"#"},{img:"Frame-2.png",url:"#"},{img:"Frame-3.png",url:"#"},{img:"Frame-4.png",url:"#"},{img:"Frame-5.png",url:"#"},{img:"Frame-6.png",url:"#"},{img:"Frame-7.png",url:"#"},{img:"Frame-8.png",url:"#"},{img:"Frame-9.png",url:"#"},{img:"Frame-11.png",url:"#"},{img:"Frame-12.png",url:"#"}];var t=(0,s.useState)(!1),a=t[0],r=t[1],c=(0,s.useState)(!1),l=(c[0],c[1]),o=(0,s.useState)(),d=o[0],m=o[1];return(0,s.useEffect)((function(){a||(fetch("https://wp.royalcoster.com/wp-json/wp/v2/page_templates?slug=footer"+(localStorage.language,""),{method:"get"}).then((function(e){return e.json()})).then((function(e){var t=[];console.log(e),$.each(e[0].acf.submenu,(function(){var e={};e.title=this.title;var a=[];$.each(this.menus,(function(){var e={};e.link=this.text,e.url=this.url,a.push(e)})),e.url=a,t.push(e)})),m(t),l(!0)})),r(!0))})),(0,n.jsxs)("div",{className:"footer pt-5",id:"footer",children:[(0,n.jsx)("div",{className:"main-footer r-container d-md-block d-none",children:d&&(0,n.jsx)("div",{className:"footer-middle row p-0 m-0 pt-5",children:d.map((function(e,t){return(0,n.jsxs)("div",{className:"col-lg-3 col-md-6 col-12 text-md-start text-center m-0 mb-5",children:[(0,n.jsx)("h3",{className:"mb-5",children:e.title}),e.url.map((function(e,t){return(0,n.jsx)(i.default,{passHref:!0,href:e.tags?{pathname:e.url,query:{tags:e.tags,productType:e.product_type}}:e.url,children:(0,n.jsx)("a",{className:"row m-0 mb-3 text-uppercase",children:e.link})},t)}))]},t)}))})}),(0,n.jsxs)("div",{className:"mobile-footer r-container d-md-none d-block",children:[(0,n.jsxs)("div",{className:"mobile-footer-logo text-center",children:[(0,n.jsx)("img",{src:"/img/common/logo_black.png",alt:"footer-logo"}),(0,n.jsx)("p",{className:"mobile-footer__title my-5",children:"The oldest diamond polishing factory in the world. Home of the Royal 201."})]}),(0,n.jsxs)("div",{className:"accordion",id:"links-panel",children:[d&&d.map((function(e,t){return(0,n.jsxs)("div",{className:"accordion-item",children:[(0,n.jsx)("h2",{className:"accordion-header",children:(0,n.jsx)("button",{className:"accordion-button collapsed py-5 ps-0","data-bs-toggle":"collapse","data-bs-target":"#footerIndex"+t,children:e.title})}),(0,n.jsx)("div",{className:"accordion-collapse collapse",id:"footerIndex"+t,children:(0,n.jsx)("div",{className:"accordion-body",children:e.url.map((function(e,t){return(0,n.jsx)(i.default,{passHref:!0,href:e.url,children:(0,n.jsx)("a",{children:(0,n.jsx)("div",{className:"link-item mb-5 text-uppercase",children:e.link})})},t)}))})})]},t)})),(0,n.jsxs)("div",{className:"accordion-item",children:[(0,n.jsx)("h2",{className:"accordion-header",children:(0,n.jsx)("button",{className:"accordion-button collapsed py-5 ps-0","data-bs-toggle":"collapse","data-bs-target":"#footerPrivacy",children:"Privacy"})}),(0,n.jsx)("div",{className:"accordion-collapse collapse",id:"footerPrivacy",children:(0,n.jsxs)("div",{className:"accordion-body",children:[(0,n.jsx)(i.default,{passHref:!0,href:"/privacy-policy",children:(0,n.jsx)("a",{children:(0,n.jsx)("div",{className:"link-item mb-5 text-uppercase",children:"Privacy Policy"})})}),(0,n.jsx)(i.default,{passHref:!0,href:"#",children:(0,n.jsx)("a",{children:(0,n.jsx)("div",{className:"link-item mb-5 text-uppercase",children:"Terms"})})})]})})]})]}),(0,n.jsx)("div",{className:"col-12 py-4 px-0 text-center",children:e.map((function(e,t){return(0,n.jsx)(i.default,{passHref:!0,href:e.url,children:(0,n.jsx)("a",{className:0==t?"ms-0":"ms-4",children:(0,n.jsx)("img",{src:"/img/common/"+e.img,alt:"payment-getway",width:"38",className:"my-2"})})},t)}))})]}),(0,n.jsx)("div",{className:"footer-bottom r-container py-3",children:(0,n.jsxs)("div",{className:"row m-auto align-items-center p-0",children:[(0,n.jsxs)("div",{className:"col-md-5 text-md-start text-center px-0 text-uppercase",children:[(0,n.jsxs)("div",{className:"mb-3 text-decoration-underline",children:[(0,n.jsx)(i.default,{passHref:!0,href:"/privacy-policy",children:(0,n.jsx)("a",{className:"text-uppercase",children:"Privacy Policy"})}),(0,n.jsx)(i.default,{passHref:!0,href:"#",children:(0,n.jsx)("a",{className:"text-uppercase ms-5",children:"Terms"})})]}),"\xa9 2020 Royal Coster Diamonds - All rights reserved"]}),(0,n.jsx)("div",{className:"col-md-7 d-md-block d-none px-0 mt-md-0 mt-3 text-md-end text-center",children:e.map((function(e,t){return(0,n.jsx)("a",{className:0==t?"ms-0":"ms-4",children:(0,n.jsx)("img",{src:"/img/common/"+e.img,alt:"payment-getway",width:"38",className:"my-4"})},t)}))})]})})]})}},1149:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return l}});a(67294);var s=a(24186),i=a(79352),n=a(41664),r=a(85893);function c(){return(0,r.jsxs)("div",{className:"visit-panel my-5 r-container row round",children:[(0,r.jsx)("div",{className:"col-lg-6 bg-panel order-lg-last"}),(0,r.jsx)("div",{className:"col-lg-6 form-panel d-flex flex-column justify-content-between p-5 pe-lg-0 pe-5",children:(0,r.jsxs)("div",{className:"text-panel text-white p-md-5 pe-lg-0 pe-5 pt-5 p-0 pe-0",children:[(0,r.jsxs)("h3",{className:"title col-sm-9 col-12 mb-4",children:["Visit ",(0,r.jsx)("span",{children:"Royal"})," Coster"]}),(0,r.jsx)("p",{className:"text-capitalize col-sm-9 col-12 mb-0",children:"Book an experience and learn about our heritage or visit us to see more diamonds & jewelry"}),(0,r.jsxs)("div",{className:"btn-panel d-flex justify-content-between flex-wrap mt-3",children:[(0,r.jsx)(n.default,{href:"/tour",children:(0,r.jsxs)("a",{className:"btn book-btn round-form pink-btn d-flex align-items-center justify-content-between px-5 py-3 mt-4 col-sm-9 col-12",children:[(0,r.jsx)("span",{className:"text-uppercase",children:"Book tours & workshops"}),(0,r.jsx)(i.nzV,{})]})}),(0,r.jsxs)("div",{className:"d-flex justify-content-sm-start justify-content-around flex-fill mt-4",children:[(0,r.jsx)(n.default,{href:"tel:+310203055555",children:(0,r.jsx)("a",{className:"contact-btn ms-3 pink-outline-btn btn round-form px-3 py-3",children:(0,r.jsx)(i.XAr,{})})}),(0,r.jsx)(n.default,{href:"/contact#direction",children:(0,r.jsx)("a",{className:"direction-btn ms-3 pink-outline-btn btn round-form px-3 py-3",children:(0,r.jsx)(i.ANQ,{})})})]})]})]})})]})}function l(){return(0,r.jsxs)("div",{className:"schedule ",children:[(0,r.jsx)(c,{}),(0,r.jsx)(s.Z,{})]})}},6845:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var s=a(41664),i=a(57333),n=a(85893);function r(e){var t=e.watchData;return(0,n.jsx)(n.Fragment,{children:t.map((function(e,t){return(0,n.jsxs)("div",{className:"watch_item-panel mt-5 pb-5",children:[(0,n.jsx)("div",{className:"title-panel row m-0 py-4",children:(0,n.jsx)("h3",{className:"title col-lg-4 col-md-6 col-12 text-capitalize blue-text",children:e.itemTitle})}),(0,n.jsx)("div",{className:"item-panel py-5 row",children:e.items.map((function(e,t){return(0,n.jsxs)("div",{className:"col-lg-3 col-md-4 col-sm-6 col-12",children:[(0,n.jsx)(s.default,{href:e.url,children:(0,n.jsx)("a",{children:(0,n.jsx)("div",{className:"image-panel round hover-scale mb-3",children:(0,n.jsx)("img",{src:"/img/watch/"+e.image,className:"item-image",alt:"watch-image"})})})}),(0,n.jsx)("h4",{className:"item-title text-capitalize mb-3",children:e.title}),(0,n.jsx)("p",{className:"item-id text-capitalize mb-4",children:e.id}),(0,n.jsx)("h3",{className:"item-cost text-uppercase",children:(0,n.jsx)(i.Z,{value:e.cost,displayType:"text",decimalScale:2,fixedDecimalScale:!0,thousandSeparator:!0,prefix:"\u20ac "})})]},t)}))})]},t)}))})}},52521:function(e,t,a){"use strict";a.r(t),a.d(t,{__N_SSG:function(){return S},default:function(){return D}});var s=a(15861),i=a(87757),n=a.n(i),r=a(67294),c=a(41664),l=a(9008),o=a(33274),d=a(11911),m=a(1149),p=a(77505),u=a(68341),h=a.n(u),g=a(57333),x=(a(6845),a(2572)),f=a(56239),j=a(25675),v=(a(2962),a(11163)),y=a(31844),N=a(85893),b=[];function _(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";e=e.toLowerCase();for(var t=['"',"'","\\","(",")","[","]"],a=0;a<t.length;++a)e=e.replace(t[a],"");return"-"==(e=e.replace(/\W+/g,"-")).charAt(e.length-1)&&(e=e.replace(/-+\z/,"")),"-"==e.charAt(0)&&(e=e.replace(/\A-+/,"")),e}var w=[],k=0,S=!0;function D(e){var t=(0,r.useState)("all"),a=t[0],i=(t[1],(0,r.useState)()),u=i[0],S=i[1],D=(0,r.useState)(),Z=D[0],P=(D[1],(0,r.useState)()),E=(P[0],P[1],(0,r.useState)(!0)),F=(E[0],E[1]),C=(0,r.useState)(),T=C[0],q=C[1],I=(0,v.useRouter)(),z=(0,r.useState)(),A=z[0],L=z[1],R=(0,r.useState)(""),H=(R[0],R[1],(0,r.useState)(!1)),O=H[0],B=H[1],V=(0,r.useState)(!0),W=(V[0],V[1],function(e){var t=e.attr("position")-1,a=w[t];dataLayer.push({ecommerce:null});var s={event:"productClick",ecommerce:{value:a.variants[0].node.price.toString(),currencyCode:"EUR",click:{actionField:{list:"shop"},products:[{id:a.variants[0].node.sku.toString(),name:a.title,price:a.variants[0].node.price.toString(),brand:a.vendor,category:a.product_type,variant:a.variants[0].id.toString(),position:(t+1).toString()}]}}};dataLayer.push(s),ga("gtag_UA_54391819_8.send",{hitType:"event",eventCategory:"Product Click",eventAction:a.title+" ("+a.variants[0].node.sku+")",eventLabel:a.title+" ("+a.variants[0].node.sku+")"}),dataLayer.push({ecommerce:null}),s={event:"view_item",ecommerce:{value:a.variants[0].node.price,currencyCode:"EUR",detail:{products:[{id:a.variants[0].node.sku,name:a.title,price:a.variants[0].node.price,brand:a.vendor,variant:a.variants[0].node.id.split("/")[a.variants[0].node.id.split("/").length-1],category:a.product_type}]}}},localStorage.selectedItem=JSON.stringify(a),dataLayer.push(s)});(0,r.useEffect)((function(){var t,a,s,i;console.log(e),t=window,a=document,t.hj=t.hj||function(){(t.hj.q=t.hj.q||[]).push(arguments)},t._hjSettings={hjid:3002600,hjsv:6},s=a.getElementsByTagName("head")[0],(i=a.createElement("script")).async=1,i.src="https://static.hotjar.com/c/hotjar-"+t._hjSettings.hjid+".js?sv="+t._hjSettings.hjsv,s.appendChild(i),q(),$(".product-panel").html(""),window.scrollTo({top:300,left:0,behavior:"smooth"})}),[]),(0,r.useEffect)((function(){if(I.query.slug){setTimeout((function(){$("#closeMobileMenu").trigger("click")}),1e3);var e="https://wp.royalcoster.com/wp-json/wp/v2/collections?slug="+I.query.slug;(new FormData).append("handle",I.query.slug),fetch(e,{method:"get"}).then((function(e){return e.json()})).then((function(e){S(e[0].acf),localStorage.pageData=JSON.stringify(e[0]),localStorage.referrer=e[0].acf.title.replace("<p>","").replace("</p>",""),localStorage.backLink="/watch/"+I.query.slug,localStorage.mainBackTitle="JEWELRY BRANDS",localStorage.mainBackHref="/jewelry-brands",localStorage.handle=e[0].acf.shopify_collection_handle,t(e[0].acf.image)}))}var t=function(){var e=(0,s.Z)(n().mark((function e(t){return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:U(!0),fetch("https://costercatalog.com/shopify/royalcoster_api/images/getImage.php?src="+t,{mathod:"get"}).then((function(e){return e.json()})).then((function(e){L(e.image)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),[I.query]);var U=function(){var e=(0,s.Z)(n().mark((function e(){var t,a,s,i,r=arguments;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]&&r[0],a=r.length>1&&void 0!==r[1]?r[1]:"",console.log(a),s="https://costercatalog.com/shopify/royalcoster_api/getCollectionProducts.php",i=new FormData,F(!1),i.append("handle",localStorage.handle),t?i.append("after",""):i.append("after",',after:"'+a+'"'),e.next=10,fetch(s,{method:"post",body:i}).then((function(e){return e.json()})).then((function(e){t&&(q(b=[]),B(!0)),B(!1),$.each(e.data,(function(){b.push(this)})),q(b);var a=$.parseJSON(localStorage.pageData);B(!0);var s=0,i=[];$.each(e.data,(function(e){var t=this,a={id:t.costerid,name:t.title+" ("+t.costerid+")",price:t.price,brand:t.vendor,category:t.productType,position:9*k+(e+1),list:"Collection "+I.query.slug.replace(/-/g," ")};s+=parseFloat(t.price),i.push(a)})),$.each(e.data,(function(){w.push(this)})),$.each($(".product-item"),(function(e){$(this).attr("position",e+1),$(this).unbind("click"),$(this).bind("click",(function(){W($(this))}))})),0==k&&(k+=1),ga("gtag_UA_54391819_8.send",{hitType:"event",eventCategory:"Collections",eventAction:I.query.slug.replace(/-/g," "),eventLabel:I.query.slug.replace(/-/g," ")});var n={event:"productImpression",ecommerce:{value:s,currencyCode:"EUR",impressions:i}};if(dataLayer.push(n),"Yes"!=e.hasNextPage){F(!1),localStorage.last=e.last;var r=window.innerWidth<576,c=2,l=!0;if(void 0!==a.side_images){if(a.side_images.length>0&&!r)for(;$.each(a.side_images,(function(){$("<div style='width:50%;min-height:100%;background-size:contain;background-repeat:no-repeat;background-position:top center;background-image:url("+this.image+");'></div>").insertBefore($("[item]").eq(c)),l?(c+=4,l=!1):(c+=8,l=!0)})),!(c>$("[item]").length););a.side_images.length>0&&r&&$("[item]").length>4&&setTimeout((function(){for(c=4;$.each(a.side_images,(function(){$("<img style='width:100%;padding:30px;padding-top:0px;' src='"+this.image+"' />").insertBefore($("[item]").eq(c)),c+=4})),!(c>$("[item]").length););}),1)}}else"Yes"==e.hasNextPage&&U(!1,e.last)}));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,r.useEffect)((function(){}),[Z,a]);return(0,N.jsx)(N.Fragment,{children:(0,N.jsxs)("div",{className:"collection-detail_page",children:[(0,N.jsxs)(l.default,{children:[e.seoData.title&&(0,N.jsxs)("title",{children:[e.seoData.title," | Royal Coster"]}),e.seoData.og_description&&(0,N.jsx)("meta",{name:"description",content:e.seoData.og_description}),e.seoData.og_locale&&(0,N.jsx)("meta",{property:"og:locale",content:e.seoData.og_locale}),e.seoData.og_type&&(0,N.jsx)("meta",{property:"og:type",content:e.seoData.og_type}),e.seoData.og_title&&(0,N.jsx)("meta",{property:"og:title",content:e.seoData.og_title}),e.seoData.og_description&&(0,N.jsx)("meta",{property:"og:descrog_description",content:e.seoData.og_description}),e.seoData.og_url&&(0,N.jsx)("meta",{property:"og:urlog_url",content:e.seoData.og_url}),e.seoData.og_site_name&&(0,N.jsx)("meta",{property:"og:site_name",content:e.seoData.og_site_name}),e.seoData.article_publisher&&(0,N.jsx)("meta",{property:"article:publisher",content:e.seoData.article_publisher}),e.seoData.article_modified_time&&(0,N.jsx)("meta",{property:"article:modified_time",content:e.seoData.article_modified_time}),e.seoData.og_image&&(0,N.jsx)("meta",{property:"og:image",content:e.seoData.og_image}),e.seoData.auther&&(0,N.jsx)("meta",{name:"auther",content:e.seoData.auther}),e.seoData.twitter_card&&(0,N.jsx)("meta",{name:"twitter:card",content:e.seoData.twitter_card}),e.seoData.twitter_site&&(0,N.jsx)("meta",{name:"twitter:site",content:e.seoData.twitter_site}),e.seoData.schema&&(0,N.jsx)("script",{type:"application/ld+json",className:"yoast-schema-graph"})]}),(0,N.jsx)(o.default,{}),A?(0,N.jsx)("div",{className:"hero-section",style:{width:"100%",background:"url("+A+")"},children:(0,N.jsx)("div",{className:"r-container",children:(0,N.jsx)("h1",{id:"pageTitle",className:"title blue-text text-capitalize mb-5"})})}):(0,N.jsx)(y.Z,{variant:"rect",height:400,width:"100%"}),u&&(0,N.jsx)("div",{className:"guide-section",children:(0,N.jsxs)("div",{className:"row r-container py-5",children:[(0,N.jsx)("div",{className:"col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5",children:(0,N.jsx)("h3",{className:"title text-capitalize"})}),""==u.intro_left&&(0,N.jsx)("div",{className:"col-md-12 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5",children:(0,N.jsx)("p",{className:"guide-text mb-4",children:h()(u.intro_right)})}),""!=u.intro_left&&(0,N.jsxs)("div",{className:"row",children:[(0,N.jsx)("div",{className:"col-md-4 col-xs-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5",children:(0,N.jsx)("h3",{className:"title text-capitalize",children:h()(u.intro_left)})}),(0,N.jsx)("div",{className:"col-md-8 col-xs-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5",children:(0,N.jsx)("p",{className:"guide-text mb-4",children:h()(u.intro_right)})})]})]})}),(0,N.jsxs)("div",{className:"product-section r-container",children:[(0,N.jsx)("div",{className:"product-type-panel d-flex justify-content-center flex-wrap py-5 my-5"}),O?(0,N.jsx)("div",{className:"product-panel row",children:O&&T&&T.length>0?T.map((function(e,t){return(0,N.jsx)(c.default,{passHref:!0,href:{pathname:"/"+(-1==e.tags.indexOf("variants")?"jewelry":"shop")+"/[master]/[collection]/[slug]",query:{master:window.location.href.split("/")[window.location.href.split("/").length-2],collection:window.location.href.split("/")[window.location.href.split("/").length-1],slug:_(e.title)+"-"+e.shopifyid}},children:(0,N.jsx)("a",{cursor:e.cursor,item:t,className:"product-item col-md-3 col-sm-4 col-6 mb-5",children:(0,N.jsxs)("div",{style:{width:"100%",minWidth:"100%"},children:[(0,N.jsx)("div",{id:"image_"+t,className:"image-panel round hover-scale mb-3",style:{position:"relative",backgroundImage:"url(https://royalcoster.com/loadingimage.gif)",backgroundRepeat:"no-repeat",backgroundSize:"75px 75px",backgroundPosition:"center center"},children:(0,N.jsx)(j.default,{onLoadingComplete:function(){$("#"+("image_"+t)).css({backgroundImage:"none"})},alt:e.title,src:e.image,layout:"fill",objectFit:"contain",quality:100})}),(0,N.jsx)("h3",{className:"title mb-3",children:e.title}),(0,N.jsxs)("h3",{className:"price blue-text mb-0",children:[parseInt(e.Fullprice)!=parseInt(e.price)&&(0,N.jsx)("h3",{className:"price blue-text mb-0",children:(0,N.jsx)(g.Z,{style:{color:"red",textDecoration:"line-through"},value:e.Fullprice,displayType:"text",decimalScale:2,fixedDecimalScale:!0,thousandSeparator:!0,prefix:"\u20ac "})}),(0,N.jsx)(g.Z,{value:e.price,displayType:"text",decimalScale:2,fixedDecimalScale:!0,thousandSeparator:!0,prefix:"\u20ac "})]})]})})},t)})):(0,N.jsx)("h3",{className:"empty-text text-center mb-5 pb-5"})}):(0,N.jsxs)("div",{className:"row pb-5",id:"skeleton",children:[(0,N.jsxs)("div",{className:"col-md-4 col-sm-6 mb-5",children:[(0,N.jsx)(y.Z,{variant:"rect",height:300}),(0,N.jsx)(y.Z,{variant:"text",className:"mt-1",height:20}),(0,N.jsx)(y.Z,{variant:"text",height:20})]}),(0,N.jsxs)("div",{className:"col-md-4 col-sm-6 mb-5",children:[(0,N.jsx)(y.Z,{variant:"rect",height:300}),(0,N.jsx)(y.Z,{variant:"text",className:"mt-1",height:20}),(0,N.jsx)(y.Z,{variant:"text",height:20})]}),(0,N.jsxs)("div",{className:"col-md-4 col-sm-6 mb-5",children:[(0,N.jsx)(y.Z,{variant:"rect",height:300}),(0,N.jsx)(y.Z,{variant:"text",className:"mt-1",height:20}),(0,N.jsx)(y.Z,{variant:"text",height:20})]}),(0,N.jsxs)("div",{className:"col-md-4 col-sm-6 mb-5",children:[(0,N.jsx)(y.Z,{variant:"rect",height:300}),(0,N.jsx)(y.Z,{variant:"text",className:"mt-1",height:20}),(0,N.jsx)(y.Z,{variant:"text",height:20})]}),(0,N.jsxs)("div",{className:"col-md-4 col-sm-6 mb-5",children:[(0,N.jsx)(y.Z,{variant:"rect",height:300}),(0,N.jsx)(y.Z,{variant:"text",className:"mt-1",height:20}),(0,N.jsx)(y.Z,{variant:"text",height:20})]}),(0,N.jsxs)("div",{className:"col-md-4 col-sm-6 mb-5",children:[(0,N.jsx)(y.Z,{variant:"rect",height:300}),(0,N.jsx)(y.Z,{variant:"text",className:"mt-1",height:20}),(0,N.jsx)(y.Z,{variant:"text",height:20})]})]}),!1]}),(0,N.jsx)("div",{className:"collection-section",children:(0,N.jsx)(x.default,{})}),(0,N.jsx)(f.default,{}),(0,N.jsx)(m.default,{}),(0,N.jsx)(d.default,{}),(0,N.jsx)(p.Z,{})]})})}},83424:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/jewelry-collections/[slug]",function(){return a(52521)}])},45179:function(){},49708:function(e,t,a){"use strict";var s=a(67294);function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var n="_2R-kh",r="_wPDyp",c="_vzTHL",l="_3xnQP",o="_3lhLL";s.Component},15861:function(e,t,a){"use strict";function s(e,t,a,s,i,n,r){try{var c=e[n](r),l=c.value}catch(o){return void a(o)}c.done?t(l):Promise.resolve(l).then(s,i)}function i(e){return function(){var t=this,a=arguments;return new Promise((function(i,n){var r=e.apply(t,a);function c(e){s(r,i,n,c,l,"next",e)}function l(e){s(r,i,n,c,l,"throw",e)}c(void 0)}))}}a.d(t,{Z:function(){return i}})}},function(e){e.O(0,[3808,1844,2962,6239,9774,2888,179],(function(){return t=83424,e(e.s=t);var t}));var t=e.O();_N_E=t}]);