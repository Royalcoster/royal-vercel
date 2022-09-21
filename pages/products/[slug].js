import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "/components/header";
import Footer from "/components/footer";
import Schedule from "/components/schedule";
import Customer from "/components/customer";
import ProductDetail from "/components/productDetail";
import NeedHelp from "/components/needHelp";
import DropHintModal from "/components/dropHintModal";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import renderHTML from "react-render-html";
import { setWishList } from "/redux/actions/wishListAction";
import { setCartData } from "/redux/actions/cartDataAction";
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
} from "react-icons/ri";

import { HiOutlineArrowLeft } from "react-icons/hi";
import { Skeleton } from "@material-ui/lab";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Fragment } from 'react';
import { Button } from 'react';
SwiperCore.use([Autoplay, Navigation]);

const products = {
  id: 1,
  images: ["product-1.png", "product-2.png", "product-3.png"],
  title: "Brilliant Cut Diamond Engagement Ring",
  style: "Halo style",
  description:
    "Exude grace with this round Aphrodite band, set with round, brilliant diamonds and halo to lend eternal style.",
  price: 645,
  product_type: ""
};
// const products = ["product-1.png", "product-2.png", "product-3.png"];
const sizeList = [
  { size: 5 },
  { size: 6 },
  { size: 7 },
  { size: 8 },
  { size: 9 },
];
const meterials = [
  { meterial: "material-1.png" },
  { meterial: "material-2.png" },
  { meterial: "material-3.png" },
  { meterial: "material-4.png" },
];

const customerSlider = [
  {
    name: "Anne, Nice, France",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-1.png",
    description:
      "I bought a beautiful ring last month at Coster Diamonds. Love the location and excellent service!",
  },
  {
    name: "Oscar, Dortmund, Germany",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Loved the experience! Great service from a very experienced staff. Interesting private tour and perfect process. I would definitely recommend going here if you are interested in diamonds.⁠",
  },
  {
    name: "Lisa, Den Haag, The Netherlands",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Veel geleerd en fijne ervaring gehad bij Coster Diamonds voor het kopen van nieuwe prachtige oorbellen! Zeker een aanrader om even rond te kijken.⁠",
  },
  {
    name: "Julian, Groningen, The Netherlands",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Hele fijne ervaring gehad bij Coster Diamonds!! Echt een aanrader als je geïnteresseerd bent in diamanten. Toplocatie en geen pressure om iets snel te kopen. Het hele proces ging heel rustig en verliep perfect.⁠",
  },
  {
    name: "Julie, Nijmegen, The Netherlands",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Super goede ervaring gehad bij Coster Diamonds. Heel vriendelijk en ervaren personeel. Ik werd zo goed geholpen met wat het beste past bij mij en mijn huidige sieraden.⁠",
  },
  {
    name: "Jack, Charlotte, The United States of America",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Very friendly and helpful staff. Best place to buy diamonds or come for a great experience.⁠",
  },
  {
    name: "Martine, Den Helder, The Netherlands",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Hele informatieve, interessante en leuke middag gehad bij Coster Diamonds. Toplocatie en fijn personeel. Ik zou er zeker terugkomen.⁠",
  },
  {
    name: "Lucy, Bari, Italy",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "They have a huge collection of diamonds and an amazing diamond factory. The tour was amazing and informative. Loved the shopping experience and I recommend everyone to visit this beautiful place.",
  },
  {
    name: "Sam, Amsterdam, The Netherlands",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Geweldige tour gehad bij Coster Diamonds! Veel geleerd en fijne ervaring gehad met het kopen van een mooie ring. Ik zou er zeker terugkomen voor de fijne ervaring en service. Onvergetelijke dag gehad, grote aanrader.⁠",
  },
  {
    name: "Daniel, Paris, France",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "When we visited the Coster Diamonds we got a very interesting tour about the history of Coster Diamonds. Furthermore, we were showed the diamond polishers and goldsmiths at work. After the tour we had a great experience buying jewelry. There was no pressure to buy anything. I would totally recommend this place for an unforgettable experience.",
  },
  {
    name: "Jamie, Copenhagen, Denmark",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Very positive experience. There was a free guided tour available in many languages which made it very personal. Very interesting to see the diamonds journey from beginning to end.  Extremely happy with my purchase and customer service to help me find the perfect addition to my style.⁠",
  },
  {
    name: "Tim, Breda, The Netherlands",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Fijne service en personeel dat goed het verschil kan uitleggen tussen variaties en verschillen tussen producten. Ambacht komt duidelijk naar voren en dat maakte het een one of a kind experience. Heel professioneel personeel en persoonlijke aandacht.⁠",
  },
  {
    name: "Tom, Amsterdam, The Netherlands",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Great location to buy hand crafted jewelry but also a museum showing the family history and diamond production. Beautiful and perfect location to buy a diamond. I would definitely recommend everyone who wants an unforgettable experience.",
  },
  {
    name: "Matt, Manchester, The United Kingdom",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Very welcoming place and friendly staff. Had a great experience buying my first diamond ring. Very experienced staff. Coming back for sure.⁠",
  },
  {
    name: "Eric, New York, The United States of America",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "They organize free tours to get to know how a diamond is cut and how to distinguish different types and qualities of diamonds. That was a great and interesting experience. It’s a must for everyone who is interested in diamonds.⁠",
  },
  {
    name: "Macy, Amsterdam, The Netherlands",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Unforgettable experience at Coster Diamonds. Very friendly and helpful staff. Made my first diamond purchase perfect. Staff helped me make the perfect choice and informed me about how to style it with my current jewelry. Very good service and would definitely come back.",
  },
  {
    name: "Sara, Leiden, The Netherlands",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Hele fijne ervaring gehad bij Coster diamonds. Personeel is heel vriendelijk en behulpzaam bij het uitzoeken van een nieuwe aanwinst. Er werd duidelijk uitgelegd wat de beste opties die bij je passen. Ik vond het het leukste dat er echt persoonlijke aandacht was tijdens het hele proces. Er werd gekeken naar de combinatie met mijn huidige sieraden en kledingstijl. Een onvergetelijke ervaring en een aanrader.",
  },
  {
    name: "Gerard, Arnhem, The Netherlands",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Ik schrijf niet snel een review over een ervaring na een aankoop, maar deze is zeker de moeite waard. Van begin tot eind een geweldige ervaring gehad. Fijne en persoonlijke service waarbij er geen druk op staat om iets te kopen. Hele informatieve en leuke tour gekregen waarbij voornamelijk de ambacht centraal stond. Er werd op een persoonlijke manier gekeken naar wat je precies wilt en wat het beste bij je past. Het ervaren personeel en goede service maakte de dag perfect.",
  },
  {
    name: "Thomas, Zwolle, The Netherlands",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "Als iemand zonder ervaring met diamanten of enige kennis. Geweldige aanrader om een leuke tour te doen en er meer over te weten te komen. Vriendelijk personeel en fijne service gedurende de hele tijd dat je er bent.⁠",
  },
];
const getProductURL = process.env.NEXT_PUBLIC_GET_PRODUCT_URL;
const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
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
export async function getStaticProps({ params, preview = false, previewData }) {
  let shopifyid = params.slug.split("-")[params.slug.split("-").length - 1];
  const res = await fetch("https://royalcoster.com:81/royalcoster/getProductForShare.php?shopifyid=" + shopifyid);
  const data = await res.json();

  return {
    props: {
        data: data || {},
    },
  };
}

function ProductRing(props) {
  const [size, setSize] = useState(0);
  const [tags, setPTags] = useState([]);
    const [rs, setRS] = useState([]);
  const [favorItem, setFavorItem] = useState();
  const [itemAmount, setItemAmount] = useState(1);
  const [itemPrice, setItemPrice] = useState();
  const [mainImage, setMainImage] = useState();
  const router = useRouter();
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
  //


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

  }, [productData]);
  useEffect(() => {

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
         "value": item.variants[0].node.price,
         "currencyCode": "EUR",
         "detail": {
           "products": [{
              "id": item.variants[0].node.sku,
              "name": item.title,
              "price": item.variants[0].node.sku,
              "brand":  item.vendor,
              "variant": item.variants[0].node.id,
              "category": item.product_type,
              "dimension1": el.find("option:selected").html()
           }]
         }
       }
     }


     item.dimension1 = el.find("option:selected").html();
     localStorage.selectedItem = JSON.stringify(item);
     dataLayer.push(dll);
 }
 const  openContact = (e) => {
   window.location.href = "/contact";
 }
  const addCart = (e) => {
    e.preventDefault();
    let cartAmount = 0;
    let currentSize = 0;
    let curentLetter = "Select Letter";
    if ($("#selectSize").length > 0) {
        currentSize = $("#selectSize").find("option:selected").text();
        if (currentSize == "Select") {
          let variant = "error";
          enqueueSnackbar("Please select ring size", { variant });
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
    let formData = new FormData();
    const graphql = `{productVariant(id: "gid://shopify/ProductVariant/${optionValue.variantId}") {id title storefrontId}}`;
    formData.append("graphql", btoa(graphql));
    fetch(graphqlURL, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        var item = $.parseJSON(localStorage.selectedItem);
        let cartItem = {
          shopifyid: productData.id,
          size: currentSize,
          letter: (curentLetter == "Select Letter") ? "" : curentLetter,
          maxCount: productData.available,
          description: productData.body_html,
          title: productData.title + ss,
          price: productData.variants[0].price,
          variant: {
            ...optionValue,
            storefrontId: data.data.productVariant.storefrontId,
          },
          image: productData.image.src,
          amount: itemAmount,
          product_type: productData.product_type,
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
          // "event": "addToCart",
          "event": "add_to_cart",
          "ecommerce": {
               "value": selectedAmount * parseFloat(item.variants[0].price),
                "currencyCode": "EUR",
                "add": {
                  "products": [{
                    "id": item.variants[0].node.sku,
                    "name": item.title,
                    "price": item.variants[0].node.price,
                    "brand":  item.vendor,
                    "variant": item.variants[0].node.id,
                    "category": item.product_type,
                    "dimension1": item.dimension1,
                    "quantity": selectedAmount
                  }]
                }
              }

        }
        ga('gtag_UA_54391819_8.send', {
          hitType: 'event',
          eventCategory: 'Add To Cart',
          eventAction:   "Add To Cart: " + item.title + " (" + item.variants[0].node.sku + ") " + ((item.dimension1 !== undefined) ? " Size " + item.dimension1 : ""),
          eventLabel:   "Add to cart",
        });

        item.quantity = selectedAmount;
        if (localStorage.cItems === undefined) {
          var ccc = {};
          ccc[item.shopifyid] = {
            "id": item.variants[0].node.id,
            "name": item.title + " (" + item.variants[0].node.sku + ")",
            "price": item.variants[0].node.price,
            "brand":  item.vendor,
            "variant": item.variants[0].node.sku,
            "category": item.product_type,
            "dimension1": item.dimension1,
            "quantity": selectedAmount
          }
      } else {
          var ccc = $.parseJSON(localStorage.cItems);
          ccc[item.shopifyid] = {
            "id": item.variants[0].node.id,
            "name":  item.title + " (" + item.variants[0].node.sku + ")",
            "price": item.variants[0].node.price,
            "brand":  item.vendor,
            "variant": item.variants[0].node.sku,
            "category": item.product_type,
            "dimension1": item.dimension1,
            "quantity": selectedAmount
          }
      }
        dataLayer.push(dll);
       localStorage.cItems = JSON.stringify(ccc);
        window.location.href =("/cart");
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
        title: productData.title,
        price: productData.variants[0].price,
        variantID: productData.variants[0].id,
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
      fetch("https://royalcoster.com:81/royalcoster/getProduct.php", {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProductData(data);
          $(".confirm-section").css({
            visibility: "visible"
          })
          setMainImage(data.image.src);


      /*      $.getScript("/magiczoom.js", function() {
             setTimeout(function() {
               $(".MagicZoom").attr("href", data.image.src);
               MagicZoom.refresh();
             }, 2000);
           });*/

          setItemPrice(data.variants[0].price);
          if (parseInt(data.variants[0].price) != parseInt(data.fullprice) && (parseInt(data.fullprice) > 0)) {
            setFullPrice(data.fullprice);
          }
          if (data.ringsizes) {
            setRS(data.ringsizes.split(","));
          } else {
            setRS([]);
          }
          setOptionValue({
            variantTitle: data.variants[0].title,
            variantId: data.variants[0].id,
          });
          if (data.product_type == "Rings") {
              var sizes = [];
              sizes[0] = "-1";
              for (let i=48;i<61;i++) {
                sizes.push(i.toString());
              }
             setSizeList(sizes);
           }
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
    }

  }
  }, [router.query, isMobile, isLoaded]);
  const openShareWindow = (link) => {
    var left = (screen.width/2)-(300);
    var top = (screen.height/2)-(300);
    window.open(link, "MsgWindow", "top=" + top + ", left=" + left + ",width=600,height=600");
  };
  return (
    <>
    <Head>

      {props.data.title && (
        <title>{props.data.title}</title>
      )}
      {props.data.title && (
        <meta name="description" content={props.data.body_html} />
      )}
      {props.data.title && (
        <meta
          itemProp="name"
          content={props.data.title}
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
          content={props.data.title}
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
          content={props.data.title}
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
          <span className="title ms-2 text-uppercase blue-text">
            {productData && productData.title}
          </span>

        </div>
      </div>
      {/* End state section */}

      {/* Start confirm section */}
      {productData ? (
        <div className="confirm-section py-5 mb-5 row r-container" style={{visibility: "hidden"}}>
          <div className="show-product col-md-6 col-12 p-0 pt-5 pe-5">
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
            {productData && productData.images && productData.images.length > 1 && (

              <Swiper

                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}

                slidesPerView={(productData.images.length > 4) ? 4 : productData.images.length}
                spaceBetween={15}
                centeredSlides= {true}
     centeredSlidesBounds= {true}
                className="mySwiper"
                breakpoints={{
                  996: {
                    slidesPerView: (productData.images.length > 4) ? 4 : productData.images.length,
                  },
                  768: {
                    slidesPerView: (productData.images.length > 2) ? 3 : productData.images.length,
                  },
                  590: {
                    slidesPerView: (productData.images.length > 1) ? 2 : productData.images.length,
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
                {!isMobile && productData.images && productData.images.length > 0 &&
                  productData.images.map((item, index) => {
                    return (

                      <SwiperSlide key={index}
                        style={{
                          width:"100px !important"
                        }}
                      >
                      <button id={"image_" + index}
                        className="btn btn-show-product mb-3 p-0 round-form"

                        onClick={() => {
                          setMainImage(item.src)
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
                }
              )}
              {isMobile && productData.images && productData.images.length > 0 &&
                productData.images.map((item, index) => {
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
              }
            )}
            </Swiper>
          )}
          {productData.images && productData.images.length > 1 && (
            <div className="btn-bottom-panel mt-5">
              <button ref={navigationPrevRef} className="btn px-0 me-5">
                <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
              </button>
              <button ref={navigationNextRef} className="btn px-0">
                <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
              </button>
            </div>
          )}
                <div style={{marginTop:10}} className="btn-panel d-flex align-items-center justify-content-between">

                  <button
                    className="btn px-4 py-2 blue-text btn-share text-uppercase round-form d-flex align-items-center"
                    onClick={loadDropHint}
                  >
                    drop a hint
                  </button>

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
          <div className="show-setting col-md-6 col-12 p-0 pt-5 ps-5">
            <div className="title-panel">
              {productData.vendor && (
              <h3 className="type pb-4 m-0">

                {renderHTML(productData.vendor)}

              </h3>
            )}
            {productData.title && (
              <h3 className="title text-capitalize pb-4 m-0">
                {renderHTML(productData.title)}
              </h3>
            )}
              { productData.product_type && productData.product_type.toString().toLowerCase() == "watches" && (
                  <h4 style={{
                    fontWeight: 400,
                    fontSize: 27
                  }} className="blue-text">SKU {productData.variants[0].sku}</h4>
                )}
              {productData.product_type && productData.product_type.toString().toLowerCase() == "watches" && (
                  <h4 style={{
                    fontWeight: 400,
                    fontSize: 27
                  }} className="blue-text">Reference Number {productData.reference}</h4>
                )}
                { productData.product_type && productData.product_type.toString().toLowerCase() != "watches" && (
                    <h4 style={{
                      fontWeight: 400,
                      fontSize: 27
                    }} className="blue-text">SKU {productData.variants[0].sku}</h4>
                  )}
              <p className="description pb-4 m-0">
                {productData.body_html && (renderHTML(productData.body_html.replace("geelgoud", "yellow gold")))}
              </p>
            </div>
            <div className="confirm-panel">
              {productData.options && productData.options.length > 0 &&
                productData.options.map((option, key) => {
                  return (
                    <div className="material-setting-panel py-4" key={key}>
                      <label
                        htmlFor="selectKarat"
                        className="d-flex align-items-center pb-4 text-uppercase"
                      >
                        {option.name} :
                        {optionValue ? optionValue[0] : option.values[0]}
                        <RiErrorWarningLine className="ms-2" />
                      </label>
                      <div className="material-box d-flex flex-wrap">
                        {option.values.length > 0 &&
                          option.values.map((value, index) => {
                            return (
                              <button
                                className={
                                  "btn btn-material px-4 py-2 round-form mt-3 text-uppercase me-3 " +
                                  (!optionValue && index == 0
                                    ? "active"
                                    : optionValue &&
                                      optionValue.variantTitle == value
                                    ? "active"
                                    : "")
                                }
                                key={index}
                                onClick={() =>
                                  setOptionValue({
                                    variantTitle: value,
                                    variantId: productData.variants.find(
                                      (variant) => variant.title == value
                                    ).id,
                                  })
                                }
                              >{
                                console.log(value)
                              }
                                {value == "Default Title" ? productData.title : value}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
              {sizeList.length > 0 && (
                <div className="selector-panel row m-0 py-4">
                  <div className="select-karat col-lg-6 col-md-12 col-sm-6 col-12 p-0 pe-lg-3 pe-md-0 pe-sm-3 pe-0">
                    <div className="d-flex justify-content-between pb-4 align-items-center">
                      <h3
                      onClick={() => {
                          window.open("https://royalcoster.com:81/royalcoster/Ringsizer.pdf","_blank")
                        }}
                        htmlFor="selectKarat"
                        className="d-flex align-items-center m-0 text-uppercase"
                      >

                        Ring Size
                        <RiErrorWarningLine    className="ms-2" />
                      </h3>
                      <div className="material-box d-flex flex-wrap">
                      <button
                        className="btn btn-material px-4 py-2 round-form mt-3 text-uppercase me-3 active"
                        style={{
                          background: "#f6f6f6",
                          color: "black",
                          fontWeight: 400,
                          fontSize: "1.4rem",
                          border: "2px solid #c4a060",
                          marginTop: -30
                        }}
                        onClick={() => {
                          window.open("https://royalcoster.com:81/royalcoster/Ringsizer.pdf","_blank")
                        }}
                      >
                      FIND MY SIZE
                      </button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between pb-4 align-items-center">
                    <div className="select-box">
                    <table><tr><td>
                      <select
                        className="form-select blue-text ps-4 round-form py-3"
                        aria-label="Default select example"
                        value={size}
                        id="selectSize"
                        style={{width:150}}
                        onChange={(event) => deliveryTime(event)}
                      >
                        {sizeList.length > 0 &&

                          sizeList.map((item, index) => {
                            return (
                              <option
                              style={(rs.indexOf(item.toString()) > -1) ? {fontWeight:"bold", color:'green'} : {}}
                              available={(rs.indexOf(item.toString()) > -1) ? "Delivery within 3 days" : "Delivery in 6 weeks with. We will contact you about the fastest delivery"} value={index} key={index}>
                                {(index > 0) ? item : "Select"}
                              </option>
                            );
                          })}
                      </select>
                      </td><td style={{verticalAlign: "bottom",paddingLeft: 10 }}>
                      <p style={{float:"left",fontSize: "1.6rem",fontWeight: 400 }} id="delivery"></p>
                      </td></tr></table>
                    </div>
                  </div>
                </div>
              )}
              {lettersList.length > 0 && (
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
              <div className="cost-panel d-flex justify-content-between align-items-center py-4">
                <div className="price-panel">
                  <h4 className="text-uppercase">total</h4>
                  {fullPrice && (fullPrice > 1) && (
                    <h3 className="full-price text-decoration-line-through" style={{color:"red"}}>
                      <NumberFormat  style={{color:"red"}}
                        value={fullPrice * itemAmount}
                        displayType="text"
                        decimalScale={2}
                        fixedDecimalScale={true}
                        thousandSeparator={true}
                        prefix="€ "
                      />
                    </h3>
                  )}
                  <h3 className="blue-text">
                    <NumberFormat
                      value={itemPrice * itemAmount}
                      displayType="text"
                      decimalScale={2}
                      fixedDecimalScale={true}
                      thousandSeparator={true}
                      prefix="€ "
                    />
                  </h3>
                </div>
                <div className="amount-panel d-flex align-items-center">
                  <button
                    className="btn btn-decrease round-form blue-text d-flex align-items-center justify-content-center p-4"
                    onClick={() =>
                      itemAmount > 1 && setItemAmount(itemAmount - 1)
                    }
                  >
                    <RiSubtractFill />
                  </button>
                  <span className="mx-4">{itemAmount}</span>
                  <button
                    className="btn btn-increase round-form blue-text d-flex align-items-center justify-content-center p-4"
                    onClick={() =>
                      (1 == 1) &&
                      checkItemAmount(itemAmount + 1, productData.available)
                    }
                  >
                    <RiAddFill />
                  </button>
                </div>
              </div>
              <div className="confirm-box d-flex flex-wrap justify-content-between align-items-start m-0 py-4">
                {accessToken && (
                  <button
                    className={
                      "btn favor-btn round-form d-flex align-items-center justify-content-center p-4 me-3 " +
                      favorItem
                    }
                    onClick={() => selectFavor()}
                  >
                    <RiHeartFill />
                  </button>
                )}

                {productData && productData.available > 0 && (
                  <div className="setting-btn-panel d-flex flex-column flex-1 text-end">
                    <button
                      className="btn blue-btn text-uppercase round-form px-5 py-3 mb-4"
                      onClick={addCart}
                    >
                      add to cart
                    </button>
                    <p className="m-0">Price includes VAT</p>
                  </div>
                )}
                {productData && productData.available == 0 && (
                  <div className="setting-btn-panel d-flex flex-column flex-1 text-end">
                    <button
                      className="btn blue-btn text-uppercase round-form px-5 py-3 mb-4"
                      onClick={openContact}
                    >
                      contact us
                    </button>
                    <p className="m-0">Price includes VAT</p>
                  </div>
                )}
              </div>
              <div className="help-panel d-flex justify-content-between py-4">
                <p className="text-uppercase m-0">Need help?</p>
                <div className="link-panel d-flex">
                  <Link passHref={true} href="/contact">
                    <a className="text-uppercase me-4 d-flex align-items-center blue-text">
                      <RiCustomerService2Fill className="me-2" />
                      contact
                    </a>
                  </Link>

                  <Link passHref={true} href="javascript:window.tidioChatApi.open();">
                    <a className="text-uppercase d-flex align-items-center blue-text">
                      <RiChat1Line className="me-2" />
                      chat
                    </a>
                  </Link>
                </div>
              </div>
              <div className="schedule-panel d-flex align-items-center justify-content-between flex-wrap py-4">
                <p className="m-0 text-uppercase">
                  Not ready to purchase online?
                </p>
                <button
                  className="btn btn-schedule text-uppercase blue-text my-3 px-5 py-2"
                  data-bs-toggle="modal"
                  data-bs-target="#appointment"
                >
                  Schedule an appointment
                </button>
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
          productID={productData.variants[0].sku}
          productDescription={productData.body_html}
          productType={productData.product_type}
          reference={productData.reference}
          nosimilar={false}
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
        <NeedHelp />


      {/* End customer section */}

      {/* Start help section */}
      <DropHintModal />

      {/* End help section */}

      {/* Start Schedule section */}
      <Schedule />
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
  setCartData: setCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRing);
