import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import AppointmentModal from "../../components/appointmentModal";
import renderHTML from "react-render-html";
import NumberFormat from "react-number-format";
import WatchItems from "../../components/watchItems";
import Collection from "../../components/collection";
import Instagram from "../../components/instagram";
import Image from "next/image";
import { NextSeo } from 'next-seo';
import {
  RiArrowRightSFill,
  RiMailFill,
  RiPhoneFill,
  RiWhatsappFill,
  RiDvdFill,
} from "react-icons/ri";
import router, { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";

const productTypes = ["all", "rings", "earrings", "necklaces", "bracelets"];
let products = [];

export async function getServerSideProps({ params, preview = false, previewData }) {

  const res = await fetch("https://wp.royalcoster.com/wp-json/wp/v2/collections?slug=graduation-day");
  const data = await res.json();
  data[0].acf.intro_right = "For any big accomplishment in life we feel we should have a little celebration. Whether it is graduating from high school, university, getting a Ph.D or achieving something amazing at work. It is a moment you remember and cherish forever. And with good reason. As a parent, grandparent, sibling, partner, or another family member you want to show how proud you are. Or maybe you just want to treat yourself to an amazing gift.";
  data[0].acf.intro_left = "Celebrate success!";
  return {
    props: {
        data: data[0].acf || {},
    },
  };
}

function getFilterValue(str = "") {

  str = str.toLowerCase();
  var toReplace = ['"', "'", "\\", "(", ")", "[", "]"];
  // For the old browsers
  for (var i = 0; i < toReplace.length; ++i) {
    str = str.replace(toReplace[i], "");
  }
  str = str.replace(/\W+/g, "-");
  if (str.charAt(str.length - 1) == "-") {
    str = str.replace(/-+\z/, "");
  }
  if (str.charAt(0) == "-") {
    str = str.replace(/\A-+/, "");
  }
  return str;
}

let localSticky = 1,
productsShowed = [],
 cP = 0,
  localMainData;

export default function CollectionDetail(props) {
  const [productType, setProductType] = useState("all");
  const [mainData, setMainData] = useState();
  const [tag, setTag] = useState();
  const [sticky, setSticky] = useState();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const router = useRouter();
  const [mainImage, setMainImage] = useState();
  const [sortRule, setSortRule] = useState("");
  const [productsLoaded,setProductsLoaded] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const pushClickEvent = (obj) => {
    var pageData = null;
    var ind = obj.attr("position") - 1;
    var item = productsShowed[ind];
    dataLayer.push({ ecommerce: null });

  /*  ga('gtag_UA_54391819_8.send', {
      hitType: 'event',
      eventCategory: 'Video',
      eventAction: 'play',
      eventLabel: 'cats.mp4'
    });*/
    var dll = {
        "event": "productClick",
        "ecommerce": {
          "value": item.variants[0].node.price,
          "currencyCode": "EUR",
          "click": {
            "actionField": {"list": "shop"},
            "products": [{
               "id": item.variants[0].node.sku,
               "name": item.title,
               "price": item.variants[0].node.price,
               "brand": item.vendor,
               "category": item.product_type,
               "position": ind + 1,
           }]
          }
        }
      }
      dataLayer.push(dll);
        ga('gtag_UA_54391819_8.send', {
          hitType: 'event',
          eventCategory: 'Product Click',
          eventAction:  item.title  + " (" + item.variants[0].node.sku + ")",
          eventLabel: item.title  + " (" + item.variants[0].node.sku + ")"
        });
      dataLayer.push({ ecommerce: null });
      dll = {
        // "event": "productDetail",
        "event": "view_item",
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
                 "category": item.product_type
              }]
            },
          }
        }
        localStorage.selectedItem = JSON.stringify(item);

      dataLayer.push(dll);
  };

  useEffect(() => {
    console.log(props);
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3002600,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    setProduct();
    $(".product-panel").html("");
    window.scrollTo({
      top: 300,
      left: 0,
      behavior: 'smooth'
    });

  }, [])
  function isInViewport(element) {
    if (element === undefined) {
      return false;
    }
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
  useEffect(() => {

    if (true) {

      let detailURL = "https://wp.royalcoster.com/wp-json/wp/v2/collections?slug=" + "graduation-day";

      let formData = new FormData();
      formData.append(
        "handle",
        router.query.slug
      );
      // Get detail main data
      fetch(detailURL, {
        method: "get",

      })
        .then((res) => res.json())
        .then((data) => {
          setMainData(data[0].acf);

          data[0].acf.intro_right = "For any big accomplishment in life we feel we should have a little celebration. Whether it is graduating from high school, university, getting a Ph.D or achieving something amazing at work. It is a moment you remember and cherish forever. And with good reason. As a parent, grandparent, sibling, partner, or another family member you want to show how proud you are. Or maybe you just want to treat yourself to an amazing gift.";
          data[0].acf.intro_left = "Celebrate success!";
          localStorage.pageData = JSON.stringify(data[0]);
          localStorage.referrer = data[0].acf.title.replace("<p>", "").replace("</p>", "");
          localStorage.backLink = "/collection/graduating-day";
          localStorage.mainBackTitle = "JEWELRY COLLECTIONS";
          localStorage.mainBackHref = "/jewelry-collections";
          localStorage.handle = data[0].acf.shopify_collection_handle;


          fetchImage(data[0].acf.image);

        });
   }
   const fetchImage = async (inm) => {
       getCollection(true);
         setMainImage(inm);
    
   }

  }, [router.query]);

  const  getCollection = async (firstLoad = false, last = "") => {

            let productURL = "https://royalcoster.com:81/royalcoster/getCollectionProducts.php";
            let formData = new FormData();
            setLoading(false);
            formData.append("handle", localStorage.handle)
            if (!firstLoad) {
              formData.append("after", ',after:\"' +   last + '\"')
            } else {
              formData.append("after", "");
            }
          await  fetch(productURL, {
              method: "post",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data)
                if (firstLoad) {
                  products = [];
                    setProduct(products);
                  setProductsLoaded(true);
                }
                setProductsLoaded(false);
                $.each(data.data, function() {
                  products.push(this)
                });
                setProduct(products)
                var pd = $.parseJSON(localStorage.pageData)
                setProductsLoaded(true);

                var ttv = 0;
                var imprs = [];
                $.each(data.data, function(ind) {
                  var ths = this;

                  var obj = {
                       id: ths.costerid,
                       name: ths.title + " (" + ths.costerid + ")",
                       price: ths.price,
                       brand: ths.vendor,
                       category: ths.productType,
                       position: (cP * 9) + (ind + 1),
                       list: "Collection " + router.query.slug.replace(/-/g," ")
                  }


                  ttv += parseFloat(ths.price);
                  imprs.push(obj)
              });
              $.each(data.data, function() {
                  productsShowed.push(this);
              })

              $.each($(".product-item"), function(ind) {
                $(this).attr("position", ind + 1);
                $(this).unbind("click");
                $(this).bind("click", function() {

                  pushClickEvent($(this));
                });
              })
              if (true) {
                if (cP == 0) {
                  cP += 1;
                }
                ga('gtag_UA_54391819_8.send', {
                  hitType: 'event',
                  eventCategory: 'Collections',
                  eventAction:  router.query.slug.replace(/-/g," "),
                  eventLabel:   router.query.slug.replace(/-/g," "),
                });
                  var dl = {
                    event: "productImpression",
                    ecommerce: {
                      value: ttv,
                      currencyCode: "EUR",
                      impressions: imprs
                    }
                  }
                  dataLayer.push(dl);

                }

                if (data.hasNextPage != "Yes") {
                  setLoading(false);
                  localStorage.last = data.last;
                  var isMobile = ((window.innerWidth < 576) ? true : false);
                  var pos = 2;
                  var left = true;
                  if (pd.side_images !== undefined) {
                    if (pd.side_images.length > 0 && !isMobile) {
                      while (1 == 1) {
                          $.each(pd.side_images, function() {
                            $("<div style='width:50%;min-height:100%;background-size:contain;background-repeat:no-repeat;background-position:top center;background-image:url(" + this.image + ");'></div>").insertBefore($("[item]").eq(pos));
                            if (left) {
                              pos = pos + 4;
                              left = false;
                            } else {
                              pos = pos + 8;
                              left = true;
                            }
                          });

                          if (pos > $("[item]").length) {
                            break;
                          }
                      }
                    }
                    if (pd.side_images.length > 0 && isMobile && $("[item]").length > 4) {
                      setTimeout(function() {
                          pos = 4;
                          while (1 == 1) {
                              $.each(pd.side_images, function() {

                                $("<img style='width:100%;padding:30px;padding-top:0px;' src='" + this.image + "' />").insertBefore($("[item]").eq(pos));
                                pos = pos + 4;
                              });

                              if (pos > $("[item]").length) {
                                break;
                              }
                          }
                        }, 1)
                    }
                  } else {
                    //getCollection(localStorage.handle,",after:\"" + $("[cursor]").eq($("[cursor]").length - 1).attr("cursor") + "\"");
                  }
                } else {
                  if (data.hasNextPage == "Yes") {
                      if (true) {
                          getCollection(false, data.data[data.data.length -1].cursor);
                      } else {
                        setTimeout(function() {
                          getCollection(false, data.data[data.data.length -1].cursor);
                        }, ((250 - parseInt(false,data.available)) / 50) * 1000);
                      }
                    }
                }
              });

  }

  useEffect(() => {

  }, [tag, productType]);
  const handleImageLoad = (id) => {
    $("#" + id).css({
      backgroundImage: "none"
    })
  };

  return (
    <>

    <div className="collection-detail_page">
    <Head>
      {props.data.title && (
        <title>{props.data.title.replace(/(<([^>]+)>)/gi, "")} | Royal Coster</title>
      )}
      {props.data.title && (
        <meta name="description" content={props.data.intro_right.replace(/(<([^>]+)>)/gi, "")} />
      )}
      {props.data.title && (
        <meta
          itemProp="name"
          content={props.data.title.replace(/(<([^>]+)>)/gi, "") + " | Royal Coster"}
        />
      )}
      {props.data.title && (
        <meta itemProp="description" content={props.data.intro_right.replace(/(<([^>]+)>)/gi, "")} />
      )}
      {props.data.title && (
        <meta itemProp="image" content={props.data.image} />
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
          content={props.data.title.replace(/(<([^>]+)>)/gi, "") + " | Royal Coster"}
        />
      )}
      {props.data.title && (
        <meta
          property="og:description"
          content={props.data.intro_right.replace(/(<([^>]+)>)/gi, "")}
        />
      )}
      {props.data.title && (
        <meta
          property="og:image"
          content={props.data.image}
        />
      )}
      {props.data.title && (
        <meta name="twitter:card" content="summary_large_image" />
      )}
      {props.data.title && (
        <meta
          name="twitter:title"
          content={props.data.title.replace(/(<([^>]+)>)/gi, "") + " | Royal Coster"}
        />
      )}
      {props.data.title && (
        <meta
          name="twitter:description"
          content={props.data.intro_right.replace(/(<([^>]+)>)/gi, "")}
        />
      )}
      {props.data.title && (
        <meta
          name="twitter:image"
          content={props.data.image}
        />
      )}
    </Head>
      <Header />
      {/* Start hero section */}
      {mainImage ? (
        <div
          className="hero-section"
          style={{
            width:"100%",
            background:
              "url(" + mainImage + ")",
          }}
        >
          <div className="r-container">

            <h1 id="pageTitle" className="title blue-text text-capitalize mb-5">

            </h1>
          </div>
        </div>
      ) : (
        <Skeleton variant="rect" height={400} width="100%" />
      )}

      {/* Start guide section */}
      {mainData  && (
        <div className="guide-section">
          <div className="row r-container py-5">
            <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
              <h3 className="title text-capitalize">
              </h3>
            </div>
            {mainData.intro_left == "" && (
              <div className="col-md-12 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
                <p className="guide-text mb-4">
                  {renderHTML(mainData.intro_right)}
                </p>
              </div>
            )}
            {mainData.intro_left != "" && (
              <div className="row">
                <div className="col-md-4 col-xs-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
                  <h3 className="title text-capitalize">
                    {renderHTML(mainData.intro_left)}
                  </h3>
                </div>
                <div className="col-md-8 col-xs-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
                  <p className="guide-text mb-4">
                    {renderHTML(mainData.intro_right)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}


      {/* End guide section */}

      {/* Start product section */}
      <div className="product-section r-container">

              <div className="product-type-panel d-flex justify-content-center flex-wrap py-5 my-5">

              </div>
        {productsLoaded ? (
          <div className="product-panel row">
            {(productsLoaded && product && product.length > 0) ? (
              product.map((item, index) => (
                <Link
                  passHref={true}
                  onClick={() => { alert("blah") }}
                  href={{
                    pathname: "/shop/[master]/[collection]/[slug]",
                    query: {
                     master:  window.location.href.split("/")[window.location.href.split("/").length - 2],
                      collection:  window.location.href.split("/")[window.location.href.split("/").length - 1],
                      slug: getFilterValue(item.title) + "-" + item.shopifyid,

                    },
                  }}
                  key={index}
                >
                <a cursor={item.cursor} item={index}  className="product-item col-md-3 col-sm-4 col-6 mb-5">
                  <div style={{
                    width: "100%",
                    minWidth: "100%"
                  }}>

                  <div id={"image_" + index}  className="image-panel round hover-scale mb-3" style={{
                    position: "relative",
                    backgroundImage: "url(https://royalcoster.com/loadingimage.gif)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "75px 75px",
                      backgroundPosition: "center center"

                  }}>
                  <Image
                      onLoadingComplete={() => {
                        handleImageLoad("image_" + index);
                      }}

                      alt={item.title}
                      src={item.image}
                      layout="fill"
                      loading="lazy"
                      objectFit="contain"
                      quality={100}

                  />
                  </div>
                    <h3 className="title mb-3">{item.title}</h3>
                    <h3 className="price blue-text mb-0">
                    {(parseInt(item.Fullprice) != parseInt(item.price )) && (
                      <h3 className="price blue-text mb-0">
                        {
                          <NumberFormat style={{color:"red", textDecoration:"line-through"}}
                            value={item.Fullprice}
                            displayType="text"
                            decimalScale={2}
                            fixedDecimalScale={true}
                            thousandSeparator={true}
                            prefix={"€ "}
                          />
                        }
                      </h3>
                    )}
                      {
                        <NumberFormat
                          value={item.price}
                          displayType="text"
                          decimalScale={2}
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                          prefix={"€ "}
                        />
                      }
                    </h3>
                  </div></a>
                </Link>

              ))
            ) : (
              <h3 className="empty-text text-center mb-5 pb-5"></h3>
            )}
          </div>
        ) : (
          <div className="row pb-5" id="skeleton">
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
          </div>
        )}
        {false && (
          <div className="row pb-5">
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
          </div>
        )}
      </div>
      {/* End product section */}

      {/* Start collection section */}
      <div className="collection-section">
        <Collection />
      </div>
      {/* End collection section */}

      {/* Start instagram section */}
      <Instagram />
      {/* End instagram section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}

      <AppointmentModal />
    </div>
    </>
  );
}
