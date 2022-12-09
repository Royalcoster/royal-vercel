import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "/components/header";
import Footer from "/components/footer";
import Schedule from "/components/schedule";
import Customer from "/components/customer";
import ProductDetail from "/components/productDetail";
import styles from '/components/productDetails.module.css'
import NeedHelp from "/components/needHelp";
import DropHintModal from "/components/dropHintModal";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import renderHTML from "react-render-html";
import { setWishList } from "/redux/actions/wishListAction";
//import { setCartData } from "/redux/actions";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import { NextSeo } from 'next-seo';
import Image from "next/image";
import {
  RiHeartFill,
  RiShareLine,
  RiErrorWarningLine,
  RiChat1Line,
  RiCustomerService2Fill,
  RiSubtractFill,
  RiAddFill,
  RiArrowRightSLine,
  RiFacebookCircleFill,
  RiTwitterFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiWhatsappFill,
  RiFacebookLine,
  RiTwitterLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiWhatsappLine,
  RiMailLine,
  RiLightbulbLine,
  RiArrowDownLine,
} from "react-icons/ri";

import { HiOutlineArrowLeft } from "react-icons/hi";
import { Skeleton } from "@material-ui/lab";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Fragment } from 'react';
import { Button } from 'react';
import { relative } from "path";
SwiperCore.use([Autoplay, Navigation]);
export async function getStaticPaths() {
  return {
    paths: [],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: "blocking",
  }
}
const handleImageLoad = (id) => {
  $("#" + id).css({
    backgroundImage: "none"
  })
};
const handleImageSrc = (id) => {
  $("#" + id).css({
    backgroundImage: "url(https://royalcoster.com/loadingimage.gif)"
  })
};
export async function getStaticProps(context) {

  const { params } = context;
  var lcl = context.locale;
  if (lcl == "en") {
    lcl = "nl"
  }
   let trns = {};
  if (lcl == "en") {
     const res1 = await fetch("https://royalcoster.com/translations/products_" + "nl" + ".json");
     trns = await res1.json();
   } else {
     const res1 = await fetch("https://royalcoster.com/translations/products_" + lcl + ".json");
     trns = await res1.json();
   }
  let shopifyid = params.slug.split("-")[params.slug.split("-").length - 1];
  const res = await fetch("https://costercatalog.com/shopify/royalcoster_api/getProduct.php" + "?shopifyid=" + shopifyid + "&language=" + context.locale);
  const data = await res.json();

  return {
    props: {
        data: data || {},
        translation: trns || {}
    },
  };
}

function ProductRing(props) {
  const [size, setSize] = useState(0);
  const [carat, setCarat] = useState();
  const [rs, setRS] = useState([]);
  const [carats, setCarats] = useState([]);
  const [vars, setVars] = useState(false);
  const [favorItem, setFavorItem] = useState();
  const [itemAmount, setItemAmount] = useState(1);
  const [itemPrice, setItemPrice] = useState();
  const [mainImage, setMainImage] = useState();
  const router = useRouter();
  const { locale } = useRouter();

  const [accessToken, setAccessToken] = useState();
  const [productData, setProductData] = useState();
  const [optionValue, setOptionValue] = useState();
  const [sizeList, setSizeList] = useState([]);
  const [lettersList, setLettersList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [fullPrice, setFullPrice] = useState();
  const mesage = 'Your notification here';
  const [facebookLink, setFacebookLink] = useState();
  const [linkdinLink, setLinkdinLink] = useState();
  const [twitterLink, setTwitterLink] = useState();
  const [whatsAppLink, setWhatsAppLink] = useState();
  const [realShopifyId, setRealShopifyId] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [isMobile, setIsMobile] = useState();
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [handle, setHandle] = useState();
  const [available, setAvailable] = useState();
  const [sku, setSku] = useState();
  const [swiperImages, setSwiperImages] = useState();
  const getProductURL = "https://costercatalog.com/shopify/royalcoster_api/getProduct.php";
  const graphqlURL = "https://costercatalog.com/shopify/royalcoster_api/graphql.php";
  const [loaded, setLoaded] = useState(false);
  // why to buy
  const [whyToBuy, setWhyToBuy] = useState();
  let rsns = [];
  useEffect(() => {
    fetch("https://wp.royalcoster.com/wp-json/wp/v2/collections?slug=why-to-buy&lang=" + locale, {
        method: "get",

      })
      .then((res) => res.json())
      .then((data) => {
        var urls = window.location.href.substring(window.location.href.indexOf("//") + 2).split("/");
        var why = data[0].acf.url_parts;
        var whyproduct = data[0].acf.products;
        if (whyproduct) {
          $.each(whyproduct, function() {
              if (urls[4] == this.id) {
                rsns = this.why_to_buy;
              }
          })
          if (rsns.length > 0) {
            setWhyToBuy(rsns);
          }
        }
        if (rsns.length == 0) {
          $.each(why, function() {
            if (urls[3] == this.id) {
              rsns = this.reasons;
            }
          })
          if (rsns.length > 0) {
            setWhyToBuy(rsns);
          }
        }
        if (rsns.length == 0) {
          $.each(why, function() {
            if (urls[2] == this.id) {
              rsns = this.reasons;
            }
          })
          if (rsns.length > 0) {
            setWhyToBuy(rsns);
          }
        }
        if (rsns.length == 0) {
          setWhyToBuy(data[0].acf.general);
        }
    });
  })

  function checkItemAmount(amount, available) {
    var message = "At this moment we only have " + available + " product(s) in stock. Would you like to order more than one? Please contact us.";
    const action = key => (
      <div>
        <button className="btn btn-primary btn-lg" onClick={() => { window.location.href='/contact'; }}>
            'CONTACT US'
        </button>

      </div>
    );
    if (amount > available) {
      enqueueSnackbar(message, {
          variant: 'warning',
          autoHideDuration: 10000,
          action,
      });
    } else {
        setItemAmount(amount);
    }
  }
  useEffect(() => {
    if (!loaded) {
      $("#appointmentForm").find("#online").val("book_appointment_pdp_store");
      $("#appointmentForm").find("#visit").val("schedule_an_appointment_pdp");
      $("#appointmentForm").find("#idvisit").val("018");
      $("#appointmentForm").find("#idonline").val("019");
      setLoaded(true)
    }
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3002600,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    setIsMobile((window.innerWidth < 576) ? true : false);

    $.each($(".description span"), function() {
      $(this).css({
        color: "black",
        fontWeight: 400
      })
    })
//    $(".description").find("[additionaldescription]").show();
  }, [productData]);
  useEffect(() => {
    setTimeout(function() {

        $(".swiper-slide").css({
          width: 100
        })
        $(".swiper-wrapper").css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        })
        $(".swiper-slide").css({
          visibility: "visible"
        })
      }, 3000);
    dataLayer.push({
    'bookCategory': 'fiction',
    'productName': window.location.href,
    'bookAuthor': 'Gabriel García Márquez'
  });
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
      if (localStorage.wishList) {
        props.setWishList(JSON.parse(localStorage.wishList));
      }
    }
    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
  }, []);

/*  useEffect(() => {
    props.wishList &&
      localStorage.setItem("wishList", JSON.stringify(props.wishList));
  }, [props.wishList]);*/
  const caratSet = (e) => {
    var el = $(event.target);
    setCarat(el.val());
    var item = $.parseJSON(localStorage.selectedItem);
    item.carats = el.find("option:selected").html();
    localStorage.selectedItem = JSON.stringify(item);

    reloadProductSimple();
  };
 const deliveryTime = (e) => {
   var el = $(event.target);
   setSize(el.val())
   if (el.val() == 0) {
     $("#delivery").html("");
   } else {
      $("#delivery").html(el.find("option:selected").attr("available"));
   }
   var item = $.parseJSON(localStorage.selectedItem);
   dataLayer.push({ ecommerce: null });
   var dll = {
     "event": "selectRingSize",
       "ecommerce": {
         "value": item.variants[0].price.toString(),
         "currencyCode": "EUR",
         "detail": {
           "products": [{
              "id": item.variants[0].sku.toString(),
              "name": item.title,
              "price": item.variants[0].sku.toString(),
              "brand":  item.vendor,
              "variant": item.variants[0].id.toString(),
              "category": item.product_type,
            //  "dimension1": el.find("option:selected").html().toString()
           }]
         }
       }
     }


    // item.dimension1 = el.find("option:selected").html();
     localStorage.selectedItem = JSON.stringify(item);
     dataLayer.push(dll);
  //   reloadProductSimple();
 }
 const  openContact = (e) => {
   window.location.href = "/contact";
 }
 let localProductData = null;
 const addCart = (e) => {
 e.preventDefault();
 let cartAmount = 0;
 let currentSize = 0;
 let curentLetter = "Select Letter";
 if ($("#selectSize").length > 0) {
     currentSize = $("#selectSize").find("option:selected").text();
     if (currentSize == "Select your size") {
       let variant = "error";
         enqueueSnackbar(props.translation["Please select ring size"], { variant });
       return false;
     }
 }
 if ($("#selectLetter").length > 0) {
     curentLetter = $("#selectLetter").find("option:selected").val();
     if (curentLetter == "Select Letter") {
       let variant = "error";
       enqueueSnackbar("Please select letter", { variant });
       return false;
     }
 }
 var ss = "";
 if (currentSize != 0) {
   ss += " (Ring Size " + currentSize + ")";
 }
 if (curentLetter != "Select Letter") {
   ss += " (Letter " + curentLetter + ")";
 }
 var iimg = "";

 $.each(productData.images, function() {
   var ths = this;
   $.each(ths.variant_ids, function() {
     if (this.toString().trim() == optionValue.variantId.toString().trim()) {
       if (iimg == "") {
         console.log(ths)
         iimg = ths.src;
       }
     }
   });

 })
 let formData = new FormData();
 const graphql = `{productVariant(id: "gid://shopify/ProductVariant/${optionValue.variantId}") {id title storefrontId}}`;
 formData.append("graphql", btoa(graphql));

 fetch(graphqlURL, {
   method: "post",
   body: formData,
 })
   .then((res) => res.json())
   .then((data) => {
     //alert(JSON.stringify(data));
    // console.log(data)
     var item = $.parseJSON(localStorage.selectedItem);
     let cartItem = {
       shopifyid: productData.id,
       size: currentSize,
       letter: (curentLetter == "Select Letter") ? "" : curentLetter,
       maxCount: productData.available,
       description: productData.body_html,
       title: optionValue.variantTitle + " " + productData.title + ss,
       price: optionValue.price,
       variant: {
         ...optionValue,
         image: iimg,
         storefrontId: data.data.productVariant.storefrontId,
       },
       amount: itemAmount,
       product_type: productData.product_type,
       carats: $("#selectCarat").val(),
       image: iimg,
       url: window.location.href
     };

     let selectedAmount = itemAmount;

     if (localStorage.cart) {
       let cartData = JSON.parse(localStorage.cart).cartData;
       cartData.map((product) => {
         if (product.shopifyid == productData.id) {
           cartAmount += product.amount;
         }
       });

       let setItem = cartData.find(
         (item, index) => item.shopifyid == cartItem.shopifyid
       );
       let available = productData.available - cartAmount;

       if (!available) {
         const variant = "warning";
         enqueueSnackbar("Stock is not enough.", { variant });
         return;
       }

       if (selectedAmount > available) {
         setItemAmount(available);
         selectedAmount = available;
       }

       if (setItem) {
         const variantItem = cartData.find(
           (item) => item.variant.variantId == cartItem.variant.variantId
         );
         if (variantItem) {
           variantItem.amount += selectedAmount;
           localStorage.setItem(
             "cart",
             JSON.stringify({ cartData: cartData })
           );
           props.setWishList(cartData);
         } else {
           localStorage.setItem(
             "cart",
             JSON.stringify({ cartData: [...cartData, cartItem] })
           );
           props.setWishList([...cartData, cartItem]);
         }
       } else {
         localStorage.setItem(
           "cart",
           JSON.stringify({
             cartData: [
               ...cartData,
               {
                 ...cartItem,
                 amount: selectedAmount,
               },
             ],
           })
         );
       }
     } else {
       if (!productData.available) {
         const variant = "warning";
         enqueueSnackbar("Stock is not enough.", { variant });
         return;
       }

       if (selectedAmount > productData.available) {
         selectedAmount = productData.available;
         setItemAmount(productData.available);
       }

       localStorage.setItem(
         "cart",
         JSON.stringify({
           cartData: [
             {
               ...cartItem,
               amount: selectedAmount,
             },
           ],
         })
       );
     }
     var item = $.parseJSON(localStorage.selectedItem);
     dataLayer.push({ ecommerce: null });
     var dll = {
      //  "event": "addToCart",
      "event": "add_to_cart",
       "ecommerce": {
            "value": (selectedAmount * parseFloat(optionValue.price)).toString(),
             "currencyCode": "EUR",
             "add": {
               "products": [{
                 "id": item.variants[0].sku.toString(),
                 "name": item.title,
                 "price": item.variants[0].price.toString(),
                 "brand":  item.vendor,
                 "variant": item.variants[0].id.toString(),
                 "category": item.product_type,
               //  "dimension1": item.dimension1.toString(),
                 "quantity": selectedAmount.toString()
               }]
             }
           }

     }
     ga('gtag_UA_54391819_8.send', {
       hitType: 'event',
       eventCategory: 'Add To Cart',
       eventAction:   "Add To Cart: " + item.title + " (" + item.variants[0].sku + ") " + ((item.dimension1 !== undefined) ? " Size " + item.dimension1 : ""),
       eventLabel:   "Add to cart",
     });

     item.quantity = selectedAmount;
     item.shopifyid = item.variants[0].product_id;


     if (localStorage.cItems === undefined) {
       var ccc = {};
       ccc[item.shopifyid] = {
         "id": item.variants[0].sku,
         "name": item.title + " (" + item.variants[0].sku + ")",
         "simpleName": item.title,
           "price": optionValue.price,
         "brand":  item.vendor,
         "variant": optionValue.variantId,
         "category": item.product_type,
       //  "dimension1": item.dimension1,
         "quantity": selectedAmount
       }
   } else {
       var ccc = $.parseJSON(localStorage.cItems);
       ccc[item.shopifyid] = {
         "id": item.variants[0].sku,
         "name":  item.title + " (" + item.variants[0].sku + ")",
         "simpleName": item.title,
           "price": optionValue.price,
         "brand":  item.vendor,
         "variant": optionValue.variantId,
         "category": item.product_type,
       //  "dimension1": item.dimension1,
         "quantity": selectedAmount
       }
   }

     dataLayer.push(dll);
    localStorage.cItems = JSON.stringify(ccc);
     router.push("/" + locale + "/cart");
   });
};

  const selectFavor = () => {
    if (favorItem) {
      setFavorItem();
      let localProducts = props.wishList;
      let removeProduct = localProducts.find(
        (item) => item.shopifyid == productData.id
      );
      if (removeProduct) {
        localProducts.splice(localProducts.indexOf(removeProduct), 1);
        props.setWishList(localProducts);
      }
    } else {
      setFavorItem("favor");
      let productItem = {
        shopifyid: productData.id,
        title: props.data.title,
        price: productData.variants[productData.default_variant_pos].price,
        variantID: productData.variants[productData.default_variant_pos].id,
        image: productData.image.src,
        amount: itemAmount,
        product_type: "Rings",
        Description: productData.body_html,
      };
      if (localStorage.wishList) {
        props.setWishList([...props.wishList, productItem]);
      } else {
        localStorage.setItem("wishList", JSON.stringify([productItem]));
        props.setWishList([productItem]);
      }
    }
  };
  function loadDropHint() {

    var ww = setInterval(function() {
       try {
            $("#dropHint").modal("show");
            $("#dropHint").appendTo("body");
            clearInterval(ww);
        } catch(err) {
        }
      }, 100);
  }
  function fireShare(media, cid, artsearch) {
    var dd = window.location.href.split("/");
    var uu = dd[dd.length -1];

    if (media == "facebook") {
      FB.ui({
          method: 'share',
          href: "share.royalcoster.com/shareProduct.php?url=" + window.location.href + "&id=" + (new Date()).getTime() + "&shopifyid=" + realShopifyId + "&scrape=yes",
      }, function(response){});
      return
    }

    $("#" + media + "_share").trigger("click");
  }
  useEffect(() => {

  if (!isLoaded) {
    setIsLoaded(true);
    if (router.query.slug) {

      $(".confirm-section").css({
        visibility: "hidden"
      })
      setHandle(window.location.href.split("/")[window.location.href.split("/").length - 2])
      let shopifyid = router.query.slug.split("-");
      setRealShopifyId(shopifyid[shopifyid.length - 1]);
      let formData = new FormData();
      const currentURL = document.location.href;
      setFacebookLink("https://www.facebook.com/sharer.php?u=" + currentURL + "&scrape=yes");
      setLinkdinLink(
          "https://www.linkedin.com/shareArticle?mini=true&url=" + currentURL
        );
        setTwitterLink("https://twitter.com/share?url=" + currentURL);
      setWhatsAppLink('https://api.whatsapp.com/send?text=I wanted to share this with you: ' + encodeURI(window.location.href));
      formData.append("shopifyid", shopifyid[shopifyid.length - 1]);
      formData.append("dataonly", "1");
      formData.append("language", locale);
      if (window.location.hash == "") {
        formData.append("variant", "");
      } else {
        formData.append("variant", window.location.hash.substring(1));
      }
      fetch("https://costercatalog.com/shopify/royalcoster_api/getProduct.php", {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {

          setProductData(data);
          localStorage.page = JSON.stringify(data);
          setAvailable(data.available);
          setVariables(data, data.variants[data.default_variant_pos].title);
          var wwt = setInterval(function() {

            if ($("[variant]").length > 0) {
              clearInterval(wwt);
              setTimeout(function() {

                }, 1000)
            }
          }, 100)
          $(".confirm-section").css({
            visibility: "visible"
          })
          setMainImage(data.image.src);
          localStorage.selectedItem = JSON.stringify(data);

      /*      $.getScript("/magiczoom.js", function() {
             setTimeout(function() {
               $(".MagicZoom").attr("href", data.image.src);
               MagicZoom.refresh();
             }, 2000);
           });*/

          setItemPrice(data.variants[data.default_variant_pos].price);
        /*  if (parseInt(data.variants[data.default_variant_pos].price) != parseInt(data.fullprice) && (parseInt(data.fullprice) > 0)) {
            setFullPrice(data.fullprice);
          }*/
          if (data.ringsizes) {
           setRS(data.ringsizes.split(","));
         } else {
           setRS([]);
         }
         setOptionValue({
           variantTitle: data.variants[data.default_variant_pos].title,
           sku: data.variants[data.default_variant_pos].sku,
           variantId: data.variants[data.default_variant_pos].id,
           price: data.variants[data.default_variant_pos].price
         });
         if (data.product_type == "Rings") {
             var sizes = [];
             sizes[0] = "-1";
            $.each(data.ringsizes.split(","), function() {
              sizes.push(this);
            })
            setSizeList(sizes);
          }



          setOptionValue({
            value: data.options[0].values[0],
            variantTitle: data.variants[data.default_variant_pos].title,
            variantId: data.variants[data.default_variant_pos].id,
            sku: data.variants[data.default_variant_pos].sku,
            price: data.variants[data.default_variant_pos].price,
          });

           var tgs = data.tags.split(",");
           $.each(tgs, function() {
             if (this.toLowerCase().indexOf("letter") > -1) {

               setLettersList(["Select Letter","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]);
             }
           })
      /*    data.tags.split(",").map((item) => {
            if (item >= 45 && item <= 65) setSizeList([...sizeList, item]);
          });*/
          if (
            localStorage.wishList &&
            JSON.parse(localStorage.wishList).find(
              (item) => item.shopifyid == data.id
            )
          ) {
            setFavorItem("favor");
          }
        });
        var tt = {};

        if (locale == "en") {

              for (var key in props.translation) {
                tt[key.toLowerCase()] = key;
              }

            } else {
              for (var key in props.translation) {
                tt[key.toLowerCase()] = props.translation[key];
              }
            }

            var ww = setInterval(function() {
              if ($("[t]").length > 0) {

                clearInterval(ww);
                    $.each($("[t]"), function() {
                      var kk = $(this).html().toLowerCase();
                      console.log(kk + "  " + tt[kk.trim()])
                      if (tt[kk.trim()] !== undefined) {
                        $(this).html(tt[kk.trim()]);
                      }
                    })
                    $.each($("[tc]"), function() {
                      var kk = ($(this).attr("tc") == "1") ? $(this).html().toLowerCase() : $(this).attr("tc").toLowerCase();

                      if (tt[kk.trim()] !== undefined) {
                        $(this).html(tt[kk.trim()]);
                      }
                    })
              }
            }, 100);
    }

  }
  }, [router.query, isMobile, isLoaded]);
  const setVariables = (data, color) => {
    var clr = color.split("/")[0].trim();

    var cc = [];
    setCarats([]);

    $.each(data.variants, function() {
      if (this.title.indexOf("/") > -1 && this.title.indexOf(clr) == 0) {
        var cn = this.title.split("/")[1];
        if (cc.indexOf(cn) == -1) {
          cc.push(cn);
        }
      }
    })
    setCarats(cc);

    setCarat(" " + color.split("/")[1].trim())
    localProductData = data;
      refreshPage(data.variants[data.default_variant_pos].title,$("#selectSize").val(),$("#selectCarat").val(), data.variants[data.default_variant_pos].id);

  };
  const openShareWindow = (link) => {
    var left = (screen.width/2)-(300);
    var top = (screen.height/2)-(300);
    window.open(link, "MsgWindow", "top=" + top + ", left=" + left + ",width=600,height=600");
  };
  const reloadProduct = (vid) => {

    var cc = [];
    setCarats([]);
    var color = $("[variant='" + vid + "']").attr("variantname");

    $.each(productData.variants, function() {
      if (this.title.indexOf("/") > -1 && this.title.indexOf(color.trim()) == 0) {
        var cn = this.title.split("/")[1];

        if (cc.indexOf(cn) == -1) {
          cc.push(cn);
        }
      }
    })
    setCarats(cc);
    setCarat(cc[0]);
    //  setItemPrice();
    setTimeout(function() {
      refreshPage($("[variant='" + vid + "']").text(),$("#selectSize").val(),cc[0], vid);
    }, 300);
  };
  const reloadProductSimple = () => {
    refreshPage(optionValue.variantTitle.split("/")[0].trim(),$("#selectSize").val(),$("#selectCarat").val(), optionValue.variantId);
  };
  const refreshPage = (color,size,carat,variant) => {
      console.log(color + " " + size + " " + carat + " " + variant)
      setSwiperImages();
     var data = $.parseJSON(localStorage.page);
     var sim = [];
     var simd = [];
     $.each(data.images, function() {

       if (this.variant_ids.join(",").indexOf(variant.toString().trim()) > -1) {
         if (simd.indexOf(this.id == -1)) {
            sim.push(this);
            simd.push(this.id);
          }
       }
     })
     console.log(sim);
     setSwiperImages(sim);
     setTimeout(function() {

       setMainImage(sim[0]);
     }, 1000)
     $(".swiper-wrapper").css({
       visibility: "hidden"
     })
     setTimeout(function() {

         $(".swiper-slide").css({
           width: 100
         })
         $(".swiper-wrapper").css({
           display: "flex",
           alignItems: "center",
           justifyContent: "center"
         })
         $(".swiper-wrapper").css({
           visibility: "visible"
         })
       }, 1000);
     var vtitle = "";
      if (color.indexOf("/") > -1) {
         vtitle = color;
      } else {
        vtitle = color + " /" + carat;
      }

      let formData = new FormData();
        let shopifyid = router.query.slug.split("-");
        setVars();

            var iid = "";
            var found = false;
            $.each(data.variants, function() {

              if (this.title == vtitle) {
                found = true;
                setItemPrice(this.price);
                iid = this.image_id;
                setSku(this.sku);
                setAvailable(this.inventory_quantity);
                setOptionValue({
                  variantTitle: vtitle,
                  variantId: data.variants.find(
                    (variant) => variant.title == vtitle
                  ).id,
                  sku: data.variants.find(
                    (variant) => variant.title == vtitle
                  ).sku,
                  price: data.variants.find(
                    (variant) => variant.title == vtitle
                  ).price
                })
              }
            })

            $.each($("[variant]"), function() {
              if ($(this).attr("variantname") == color.split("/")[0].trim()) {

                $(this).addClass("active");
              } else {
                $(this).removeClass("active");
              }
            });
            $.each($("[variant]"), function() {
              if ($(this).attr("variantname").indexOf("/") > -1) {
                $(this).remove();
              }
            });
            $.each(data.images, function() {
              var ths = this;
              $.each(this.variant_ids, function () {
                if (this.toString().trim() == variant.toString().trim()) {

                }
              })

            })

            $.each($("[variant]"), function() {

             var vid = $(this).attr("variant");
             var ths = this;
               var seted = false;
             $.each(data.images, function() {

               var ii = this;

               $.each(this.variant_ids,function() {
                   if (this.toString().trim() == vid.trim()) {
                     if (!seted) {

                         $(ths).css({
                           height: 50,
                           backgroundImage: "url(" + ii.src + ")",
                           paddingLeft:60,
                           visibility: "visible"
                         })
                         seted = true;
                     }
                   }
               });
             })

           })
    };
  return (
    <>
    {props && (
    <Head>

      {props.data.title && (
        <title>{props.data.title} | Royal Coster</title>
      )}
      {props.data.body_html && (
        <meta name="description" content={props.data.body_html} />
      )}
      {props.data.title && (
        <meta
          itemProp="name"
          content={props.data.title + " | Royal Coster"}
        />
      )}
      {props.data.title && (
        <meta itemProp="description" content={props.data.body_html} />
      )}
      {props.data.title && (
        <meta itemProp="image" content={props.data.images[0].src} />
      )}
      {props.data.title && (
        <meta property="fb:app_id" content="362991595876147" />
      )}
      {props.data.title && (
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_APP_URL + router.asPath}
        />
      )}
      {props.data.title && (
        <meta property="og:type" content="website" />
      )}
      {props.data.title && (
        <meta
          property="og:title"
          content={props.data.title + " | Royal Coster"}
        />
      )}
      {props.data.title && (
        <meta
          property="og:description"
          content={props.data.body_html}
        />
      )}
      {props.data.title && (
        <meta
          property="og:image"
          content={props.data.images[0].src}
        />
      )}
      {props.data.title && (
        <meta name="twitter:card" content="summary_large_image" />
      )}
      {props.data.title && (
        <meta
          name="twitter:title"
          content={props.data.title + " | Royal Coster"}
        />
      )}
      {props.data.title && (
        <meta
          name="twitter:description"
          content={props.data.body_html}
        />
      )}
      {props.data.title && (
        <meta
          name="twitter:image"
          content={props.data.images[0].src}
        />
      )}
    </Head>
  )}
    <div className="productRing_page" id="productPage">

      <Header />

      {/* Start state section */}
      <div className="state-section">
        <div className="link-panel  r-container py-3 d-flex align-items-center">
          <button
            className="btn back-arrow d-flex me-3 blue-text px-0"
            onClick={() => router.back()}
          >
            <HiOutlineArrowLeft />
          </button>

          <Link passHref={true} href="/">
            <a className="mx-2">HOME</a>
          </Link>
          {productData && router.query && localStorage.mainBackHref && (


            <>
            /
            <Link
              passHref={true}
              href={localStorage.mainBackHref}
            >
              <a className="mx-2 text-uppercase">
                {localStorage.mainBackTitle}
              </a>
            </Link>
            /

              <Link
                passHref={true}
                href={localStorage.backLink}
              >
                <a className="mx-2 text-uppercase">
                  {localStorage.referrer}
                </a>
              </Link>
              /
            </>
          )}
          <span className="title ms-2 text-uppercase">
            {productData && productData.title}
          </span>

        </div>
      </div>
      {/* End state section */}

      {/* Start confirm section */}
      {productData ? (
        <div className="confirm-section mb-5 row r-container" style={{visibility: "hidden"}}>
          <div className="show-product col-md-6 col-12 pt-2 pt-md-5 ps-0 pe-0 pe-md-5">
            <div className="row m-0">
              <div className="tile-product col-2 p-0 pe-3" style={{display:"none"}}>
              </div>
              <div className="main-product col-12 p-0">
              {!isMobile && productData && mainImage && (
                <div className="image-panel round mb-4">
                  <div id="mImage" isim="1" className="image-box"  style={{
                      position: "relative",
                      width:"100%",
                      padding: 0,
                      height: "550px",
                        backgroundImage:
                           "url(https://royalcoster.com/loadingimage.gif)",
                           backgroundSize: "150px 150px",
                           backgroundRepeat: "no-repeat",
                           backgroundPosition: "center center"
                    }} >
                    <Image
                        onLoadingComplete={() => {
                          handleImageLoad("mImage");
                        }}
                        alt={productData.title}
                        src={mainImage}
                        objectFit="contain"
                        layout="fill"
                        quality={100}
                    />

                  {/*}  {mainImage && <img src={mainImage} alt="main-image" />} */}
                  </div>
                </div>

              )}
              {isMobile &&  productData && mainImage && (
                <div className="image-panel round mb-4">
                  <div id="mImage" isim="1" className="image-box"  style={{
                    position: "relative",
                    width:"100%",
                    padding: 0,
                    height: "270px",
                      backgroundImage:
                        "url(https://royalcoster.com/loadingimage.gif)",
                        backgroundSize: "75px 75px",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center"
                  }} >
                      <Image
                        onLoadingComplete={() => {
                          handleImageLoad("mImage");
                        }}
                        alt={productData.title}
                        src={mainImage}
                        objectFit="contain"
                        layout="fill"
                        quality={100}
                    />

                  {/*}  {mainImage && <img src={mainImage} alt="main-image" />} */}
                  </div>
                </div>

              )}
                {swiperImages && (

                  <Swiper

                    navigation={{
                      prevEl: navigationPrevRef.current,
                      nextEl: navigationNextRef.current,
                    }}

                    slidesPerView={5}
                    spaceBetween={20}

                    className="mySwiper"
                    breakpoints={{
                      996: {
                        slidesPerView: (swiperImages.length > 4) ? 4 : swiperImages.length,
                      },
                      768: {
                        slidesPerView: (swiperImages.length > 2) ? 3 : swiperImages.length,
                      },
                      590: {
                        slidesPerView: (swiperImages.length > 1) ? 2 : swiperImages.length,
                      },
                      480: {
                        slidesPerView: 2,
                      },
                      1: {
                        slidesPerView: 2,
                      },
                    }}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}

                    onSwiper={(swiper) => {
                      // Delay execution for the refs to be defined
                      setTimeout(() => {
                        // Override prevEl & nextEl now that refs are defined
                        swiper.params.navigation.prevEl = navigationPrevRef.current;
                        swiper.params.navigation.nextEl = navigationNextRef.current;

                        // Re-init navigation
                        swiper.navigation.destroy();
                        swiper.navigation.init();
                        swiper.navigation.update();
                      });
                    }}
                    >
                    {!isMobile && swiperImages &&
                      swiperImages.map((item, index) => {
                        return (

                          <SwiperSlide key={index}
                            style={{
                              width:"100px !important",

                            }}
                          >
                          <button id={"image_" + index}
                            className="btn btn-show-product mb-3 p-0 round-form"

                            onClick={() => {
                              setMainImage(item.src)
                              }
                            }
                            varis={item.variant_ids}
                            style={{
                                position: "relative",
                                width:"100px",
                                height: "100px",
                                  backgroundImage:
                                    "url(https://royalcoster.com/loadingimage.gif)",
                                    backgroundSize: "50px 50px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center center"
                              }}
                          >
                          <Image
                              onLoadingComplete={() => {
                                handleImageLoad("image_" + index);
                              }}

                              alt={productData.title}
                              src={item.src}
                              layout="fill"
                            objectFit="contain"
                            quality={100}

                          />
                          </button>
                        </SwiperSlide>
                      );})}
                    {isMobile && swiperImages &&
                    swiperImages.map((item, index) => {
                        return (

                          <SwiperSlide key={index}
                          style={{
                            width:"100px !important"
                          }}
                          >
                          <button id={"image_" + index}
                            className="btn btn-show-product mb-3 p-0 round-form"

                            onClick={() => {

                              setMainImage(item.src);
                              }
                            }
                            style={{
                                position: "relative",
                                width:"100px",
                                height: "100px",
                                  backgroundImage:
                                    "url(https://royalcoster.com/loadingimage.gif)",
                                    backgroundSize: "50px 50px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center center"
                              }}
                          >
                          <Image
                              onLoadingComplete={() => {
                                handleImageLoad("image_" + index);
                              }}

                              alt={productData.title}
                              src={item.src}
                              layout="fill"
                            objectFit="contain"
                            quality={100}

                          />
                          </button>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
              )}
                {productData && productData.images && productData.images.length > 1 && (
                  <div className="btn-bottom-panel mb-5 px-4">
                    <button ref={navigationPrevRef} className="btn px-0 me-5">
                      <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
                    </button>
                    <button ref={navigationNextRef} className="btn px-0">
                      <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
                    </button>
                  </div>
                )}
                <div style={{marginTop:10, position: "relative", zIndex: 1,}} className="btn-panel d-flex align-items-center justify-content-end">

                  {facebookLink && (
                    <button id="facebookLink"
                      className="btn link-item d-flex align-items-center justify-content-center mb-3"
                        onClick={() => openShareWindow(facebookLink)}
                    >
                      <RiFacebookLine />
                    </button>
                  )}
                  {twitterLink && (
                    <button
                      className="btn link-item d-flex align-items-center justify-content-center mb-3"
                      onClick={() => openShareWindow(twitterLink)}
                    >
                      <RiTwitterLine />
                    </button>
                  )}
                  <button className="btn link-item d-flex align-items-center justify-content-center mb-3"
                    onClick={() => openShareWindow('https://instagram.com/costerdiamondsofficial/')}
                  >
                    <RiInstagramLine />
                  </button>
                  {false && (
                    <button
                      className="btn link-item d-flex align-items-center justify-content-center mb-3"
                      onClick={() => openShareWindow(linkdinLink)}
                    >
                      <RiLinkedinLine />
                    </button>
                  )}
                  <button style={{marginTop:-10}} className="btn link-item d-flex align-items-center justify-content-center"
                    onClick={() => openShareWindow(whatsAppLink)}
                  >
                    <RiWhatsappLine />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="show-setting col-md-6 col-12 pt-2 pt-md-5 pe-0 ps-0 ps-md-5">
            <div className="title-panel">
            {/* {productData && productData.vendor && (
              <h3 className="type pb-4 m-0">

                {renderHTML(productData.vendor)}

              </h3>
            )} */}
            {productData && productData.title && (
              <h3 className="title text-capitalize pb-4 mt-5 mt-md-0">
                {renderHTML(productData.title)}
              </h3>
            )}
            <div className="price-panel">
              <h4 className="pb-4">
                {fullPrice && (fullPrice > 1) && (
                  <NumberFormat  style={{color:"red"}}
                    value={fullPrice * itemAmount}
                    displayType="text"
                    decimalScale={2}
                    fixedDecimalScale={true}
                    thousandSeparator={true}
                    prefix="€ "
                  />
                )}
                <NumberFormat
                  value={itemPrice * itemAmount}
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  prefix="€ "
                />
              </h4>
            </div>
            {/* { productData && productData.product_type && productData.product_type.toString().toLowerCase() == "watches" && (
              <h4 style={{
                fontWeight: 400,
                fontSize: 27
              }} className="blue-text">SKU {sku}</h4>
            )}
            {productData && productData.product_type && productData.product_type.toString().toLowerCase() == "watches" && (
              <h4 style={{
                fontWeight: 400,
                fontSize: 27
              }} className="blue-text">Reference Number {productData.reference}</h4>
            )} */}
            {/* {productData && productData.product_type && productData.product_type.toString().toLowerCase() != "watches" && (
              <h4 style={{
                fontWeight: 400,
                fontSize: 27
              }} className="blue-text">SKU {sku}</h4>
            )} */}
              <p className="description pb-4 m-0">
                {productData && productData.body_html && (renderHTML(productData.body_html.replace("geelgoud", "yellow gold")))}
              </p>
            </div>
            <div className="confirm-panel">
              {productData && productData.options && productData.options.length > 0 &&
                productData.options.map((option, key) => {
                  return (
                    <div className="material-setting-panel d-flex align-items-center py-2" key={key}>
                      {/* <label
                        htmlFor="selectKarat"
                        className="d-flex align-items-center pb-4 text-uppercase"
                      >
                        {option.name} :
                        {optionValue ? optionValue[0] : option.values[0]}
                        <RiErrorWarningLine className="ms-2" />
                      </label> */}
                      <div className="material-box d-flex flex-wrap">
                        {option.values.length > 0 &&
                          option.values.map((value, index) => {
                            return (
                              <button
                              variantname={value}
                              variant= {productData.variants.find(
                                (variant) => variant.title == value
                              ).id}
                                className={
                                  "btn btn-material  py-2 round-form mt-2 text-uppercase me-2 " +
                                  (!optionValue && index == 0
                                    ? "active"
                                    : optionValue &&
                                      optionValue.variantTitle == value
                                    ? "active"
                                    : "")
                                }
                                style={{
                                  visibility: "hidden",
                                  backgroundImage: "",
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "30px",
                                  backgroundPosition: "5px center",
                                  textIndent: -9999,
                                }}
                                key={index}


                                onClick={() => {
                                  var vid = productData.variants.find(
                                    (variant) => variant.title == value
                                  ).id;

                                  setOptionValue({
                                    variantTitle: value,
                                    variantId: productData.variants.find(
                                      (variant) => variant.title == value
                                    ).id,
                                    sku: productData.variants.find(
                                      (variant) => variant.title == value
                                    ).sku,
                                    price: productData.variants.find(
                                      (variant) => variant.title == value
                                    ).price,
                                  })
                                  reloadProduct(vid);
                                }
                              }
                              >
                              {value == "Default Title" ? productData.title : value}
                              </button>
                            );
                          })}
                      </div>
                      {productData && carats.length > 0  && (
                        <div className="select-box">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={carat}
                            id="selectCarat"
                            style={{maxWidth:80}}
                            onChange={(event) => caratSet(event)}
                          >
                            {carats.length > 0 &&
                              carats.map((item, index) => {
                                return (
                                  <option
                                  value={item} key={index}>
                                    {(index > 0) ? item : item} crt
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      )}
                    </div>
                  );
                })}
              {productData && sizeList.length > 0 && (
                <div className="selector-panel d-flex align-items-center py-2 mt-4">
                  <div className="select-box">

                    <select
                      className="form-select px-0"
                      aria-label="Default select example"
                      value={size}
                      id="selectSize"
                      style={{maxWidth:180}}
                      onChange={(event) => deliveryTime(event)}
                    >
                      {sizeList.length > 0 &&

                        sizeList.map((item, index) => {
                          return (
                            <option t="1"
                          style={(rs.indexOf(item.toString()) > -1) ? {fontWeight:"bold", color:'green'} : {}}
                          available={(rs.indexOf(item.toString()) > -1) ? "Delivery within 3 days" : "Delivery in 6 weeks with. We will contact you about the fastest delivery"} value={item.toString()} key={index}>
                            {(index > 0) ? item : "Select your size"}
                          </option>
                          );
                        })}
                    </select>

                  </div>
                  <div className="select-karat">
                    <h6
                      onClick={() => {
                          window.open("https://costercatalog.com/shopify/royalcoster_api/Ringsizer.pdf","_blank")
                        }}
                        htmlFor="selectKarat"
                        className="d-flex align-items-center m-0 text-uppercase text-decoration-underline"
                      >
                      <label t="1">Size Guide</label>
                      {/* <RiErrorWarningLine    className="ms-2" /> */}
                    </h6>
                  </div>
                </div>
              )}
              <div className="d-none align-items-center px-4 py-2" style={{justifyContent: "space-between"}}>
                <div className="d-flex align-items-center" style={{flex: "1"}}>
                {productData && productData.product_type=="Rings" && (
                  <button
                    className="btn mt-2 text-uppercase me-5 text-decoration-underline px-0"
                    style={{
                      color: "black",
                      fontWeight: 400,
                      fontSize: "1rem",
                    }}
                    onClick={() => {
                      window.open("https://costercatalog.com/shopify/royalcoster_api/Ringsizer.pdf","_blank")
                    }}
                  >
                  FIND MY SIZE
                  </button>
                )}
                  <button
                    className="btn mt-2 text-uppercase me-3 text-decoration-underline px-0"
                    style={{
                      color: "black",
                      fontWeight: 400,
                      fontSize: "1rem",
                    }}
                    onClick={() => {
                      window.open("https://royalcoster.com/Carat.pdf","_blank")
                    }}
                  >
                    BUYING GUIDE
                  </button>
                </div>
                <div className="amount-panel d-flex align-items-center">
                  <button
                    className="btn btn-decrease d-flex align-items-center justify-content-center p-2"
                    onClick={() =>
                      itemAmount > 1 && setItemAmount(itemAmount - 1)
                    }
                  >
                    <RiSubtractFill />
                  </button>
                  <span className="mx-4">{itemAmount}</span>
                  <button
                    className="btn btn-increase d-flex align-items-center justify-content-center p-2"
                    onClick={() =>
                      (1 == 1) &&
                      checkItemAmount(itemAmount + 1, available)
                    }
                  >
                    <RiAddFill />
                  </button>
                </div>
              </div>
              {productData && lettersList.length > 0 && (
                <div className="selector-panel row m-0 py-4">
                  <div className="select-karat col-lg-6 col-md-12 col-sm-6 col-12 p-0 pe-lg-3 pe-md-0 pe-sm-3 pe-0">
                    <div className="d-flex justify-content-between pb-4 align-items-center">
                      <h3
                        htmlFor="selectKarat"
                        className="d-flex align-items-center m-0 text-uppercase"
                      >

                        Select Letter
                        <RiErrorWarningLine className="ms-2" />
                      </h3>

                    </div>
                  </div>
                  <div className="d-flex justify-content-between pb-4 align-items-center">
                    <div className="select-box">
                      <select
                        className="form-select blue-text ps-4 round-form py-3"
                        aria-label="Default select example"
                        value={size}
                        id="selectLetter"
                        style={{width:150}}
                        onChange={(event) => deliveryTime(event)}
                      >
                        {lettersList.length > 0 &&

                          lettersList.map((item, index) => {
                            return (
                              <option key={index} value={item}>{item}</option>
                            );
                          })}
                      </select>

                    </div>
                  </div>
                </div>
              )}

              <div className="confirm-box d-flex flex-wrap justify-content-between align-items-start m-0 py-4">
                {productData && accessToken && (
                  <button
                    className={
                      "btn favor-btn d-flex align-items-center justify-content-center p-4 me-3 " +
                      favorItem
                    }
                    onClick={() => selectFavor()}
                  >
                    <RiHeartFill />
                  </button>
                )}

                {productData && productData && productData.available > 0 && (
                  <div className="setting-btn-panel d-flex flex-column flex-1 text-end">
                    <button t="1"
                      className="btn dark-btn text-uppercase px-5 py-4"
                      onClick={addCart}
                    >
                      add to cart
                    </button>
                    {/* <p className="m-0">Price includes VAT</p> */}
                  </div>
                )}
                {productData && productData.available == 0 && (
                  <div className="setting-btn-panel d-flex flex-column flex-1 text-end">
                    <button t="1"
                      className="btn blue-btn text-uppercase round-form px-5 py-4"
                      onClick={openContact}
                    >
                      contact us
                    </button>
                    {/* <p className="m-0">Price includes VAT</p> */}
                  </div>
                )}
              </div>

              <div className="schedule-panel d-flex align-items-center justify-content-between flex-nowrap py-2">
                {/* <p className="m-0 text-uppercase">
                  Not ready to purchase online?
                </p> */}
                <button t="1"
                  className="btn btn-schedule text-uppercase px-5 py-4 mb-4"
                  onClick={(e) => {
                  $("#appointment").modal("show");
                  setTimeout(function() {
                    $("#appointmentForm").find("#online").val("schedule_appointment_pdp_online");
                    $("#appointmentForm").find("#visit").val("schedule_appointment_pdp");
                    $("#appointmentForm").find("#idvisit").val("016");
                    $("#appointmentForm").find("#idonline").val("017");
              //      alert(  localStorage.setItem("idonline"));

                    $("#appointment").on("hidden.bs.modal", function() {
                      $("#appointmentForm").find("#online").val("book_appointment_pdp_store");
                      $("#appointmentForm").find("#visit").val("schedule_an_appointment_pdp");
                      $("#appointmentForm").find("#idvisit").val("018");
                      $("#appointmentForm").find("#idonline").val("019");
                    })
                  }, 1500);
              }
            }
                >
                  Book an in-store or virtual appointment
                </button>
              </div>

              <div className="help-panel d-flex justify-content-between py-2">

                <Link passHref={true} href="javascript:window.tidioChatApi.open();">
                  <a className="d-flex align-items-center">
                    <RiChat1Line className="me-2" />
                    <label t="1">Chat</label>
                  </a>
                </Link>

                <Link passHref={true} href="/contact">
                  <a className="me-4 d-flex align-items-center">
                    <RiCustomerService2Fill className="me-2" />
                    <label t="1">Call us</label>
                  </a>
                </Link>

                <Link passHref={true} href="mailto:support@costerdiamonds.com">
                  <a className="d-flex align-items-center">
                    <RiMailLine className="me-2" />
                    <label t="1">E-mail us</label>
                  </a>
                </Link>

                <button
                    className="btn btn-share text-decoration-ubderline d-flex align-items-center"
                    style={{fontSize: 12}}
                    onClick={loadDropHint}
                  >
                    <RiLightbulbLine className="me-2" />
                    <label t="1">Drop a hint</label>
                </button>
              </div>

              <div className="additional-panel d-flex align-items-center justify-content-between flex-nowrap py-2">
                <Link passHref={true} href="#product-details">
                  <a className="text-uppercase d-flex align-items-center">
                    <RiArrowDownLine className="me-2" />
                  <label t="1">Product details</label>
                  </a>
                </Link>

                { productData && productData.product_type && productData.product_type.toString().toLowerCase() == "watches" && (
                  <h4 style={{
                    fontWeight: 500,
                    fontSize: 12
                  }}>SKU {sku}</h4>
                )}
                {productData && productData.product_type && productData.product_type.toString().toLowerCase() != "watches" && (
                  <h4 style={{
                    fontWeight: 500,
                    fontSize: 12
                  }}>SKU {sku}</h4>
                )}
              </div>

              <div>
                {whyToBuy && (
                  <ul className={styles.greencheck} >
                    {whyToBuy.map((item, index) => (
                      <li   key={index}>
                        {renderHTML(item.text)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row r-container mb-5">
          <div className="col-md-6 col-12 p-0 pt-5 pe-5">
            <div className="row m-0">
              <div className="tile-product d-sm-block d-none col-2 p-0 pe-3">
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation="wave"
                />
                <Skeleton
                  variant="rect"
                  width="100%"
                  className="mt-4"
                  height={50}
                  animation="wave"
                />
                <Skeleton
                  variant="rect"
                  width="100%"
                  className="mt-4"
                  height={50}
                  animation="wave"
                />
                <Skeleton
                  variant="rect"
                  width="100%"
                  className="mt-4"
                  height={50}
                  animation="wave"
                />
              </div>
              <div className="main-product col-sm-10 col-12 p-0">
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={300}
                  animation="wave"
                />
              </div>
              <div className="tile-product d-sm-none d-flex col-12 p-0 pt-4">
                <Skeleton
                  variant="rect"
                  width={50}
                  height={50}
                  animation="wave"
                />
                <Skeleton
                  variant="rect"
                  width={50}
                  className="ms-4"
                  height={50}
                  animation="wave"
                />
                <Skeleton
                  variant="rect"
                  width={50}
                  className="ms-4"
                  height={50}
                  animation="wave"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 p-0 pt-5 ps-5">
            <Skeleton
              variant="text"
              width="100%"
              height={45}
              className="mb-4"
            />
            <Skeleton
              variant="text"
              width="100%"
              height={45}
              className="mb-4"
            />
            <Skeleton variant="text" height={35} width="100%" />
            <Skeleton variant="text" height={35} width="100%" />
            <Skeleton variant="text" height={35} width="100%" />
            <Skeleton variant="text" height={35} width="100%" />
          </div>
        </div>
      )}
      {/* End confirm section */}

      {/* Start product detail section */}
      {productData ? (
        <ProductDetail
          informations={productData.specifications}
          productID={productData.variants[productData.default_variant_pos].sku}
          productDescription={productData.body_html}
          productType={productData.product_type}
          reference={productData.reference}
          nosimilar={false}
          handleurl=""
        />
      ) : (
        <div className="r-container pt-5">
          <Skeleton variant="text" width="100%" height={40}></Skeleton>
          <Skeleton variant="text" width="100%" height={40}></Skeleton>
          <Skeleton variant="text" width="100%" height={40}></Skeleton>
          <Skeleton variant="text" width="100%" height={40}></Skeleton>
        </div>
      )}
      {/* End product detail section */}

      {/* Start customer section */}
      {/* <NeedHelp /> */}

      {/* End customer section */}

      {/* Start help section */}
      <DropHintModal />

      {/* End help section */}

      {/* Start Schedule section */}
      {/* <Schedule /> */}
      {/* End Schedule section */}
      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  wishList: state.wishList.value,
  cartData: state.cartData.value,
});

const mapDispatchToProps = {
  setWishList: setWishList,
  //setCartData: setCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRing);
