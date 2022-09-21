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


// export async function getStaticPaths() {
//   const paths = { param: 1 };
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// }

// export async function getStaticProps({ param }) {
//   let data = {};
//   console.log(param)
//   return {
//     props: {
//       data
//     }
//   }
// }

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

export default function CollectionDetail() {
  const [productType, setProductType] = useState("all");
  const [mainData, setMainData] = useState(localMainData);
  const [tag, setTag] = useState();
  const [sticky, setSticky] = useState(localSticky);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const router = useRouter();
  const [sortRule, setSortRule] = useState("");
  const [productsLoaded,setProductsLoaded] = useState(false);
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

    if (router.query.slug) {

      let detailURL = "https://wp.royalcoster.com/wp-json/wp/v2/collections?slug=" + router.query.slug;

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
          localStorage.pageData = JSON.stringify(data[0].acf);
          localStorage.referrer = data[0].acf.title.replace("<p>", "").replace("</p>", "");
          localStorage.backLink = "/jewelry-brands/" + router.query.slug;
          localStorage.mainBackTitle = "JEWELRY BRANDS";
          localStorage.mainBackHref = "/jewelry-brands";
         getCollection(data[0].acf.shopify_collection_handle);
        });
   }

  }, [router.query]);

  const getCollection = (hndl, after = "") => {
            let productURL = "https://royalcoster.com:81/royalcoster/getCollectionProducts.php";
            let formData = new FormData();
            setLoading(true);

            formData.append("handle", hndl)
            formData.append("after", after)

            fetch(productURL, {
              method: "post",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                if (after == "") {
                  products = [];
                  setProduct(products);
                  setProductsLoaded(true);
                }
                setProductsLoaded(false);
                $.each(data.data, function() {
                  products.push(this)
                });
                console.log(products);
                setProduct(products);
                var pd = $.parseJSON(localStorage.pageData)

                setProductsLoaded(true);
                var isMobile = ((window.innerWidth < 576) ? true : false);
                var pos = 2;
                var left = true;
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
                if (pd.side_images.length > 0 && isMobile) {
                  pos = 3;
                  while (1 == 1) {
                      $.each(pd.side_images, function() {
                        $("<img style='width:100%;padding:30px;padding-top:0px;' src='" + this.image + "' />").insertBefore($("[item]").eq(pos - 1));
                        pos = pos + 4;
                      });

                      if (pos > $("[item]").length) {
                        break;
                      }
                  }
                }
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
                } else {
                  getCollection(hndl,",after:\"" + data.last + "\"");
                }
              });

  };

  useEffect(() => {
    if (tag) {
      setProduct()

    }
  }, [tag, productType]);

  return (
    <>
     { mainData && (
       <NextSeo
           title={mainData.title.replace("<p>", "").replace("</p>", "") + " | Coster Diamonds"}
           description={mainData.intro_right}

       />
     )}
    <div className="collection-detail_page">

      <Header />
      {/* Start hero section */}
      {mainData ? (
        <div
          className="hero-section"
          style={{
            background:
              "url(" + mainData.image + ")",
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
            {productsLoaded ? (
              product.map((item, index) => (
                <Link
                  passHref={true}
                  href={{
                    pathname: "/shop/[collection]/[slug]",
                    query: {
                      collection: window.location.href.split("/")[window.location.href.split("/").length - 1],
                      slug: getFilterValue(item.title) + "-" + item.shopifyid,

                    },
                  }}
                  key={index}
                >
                  <div item="1"  className="product-item col-md-3 col-sm-4 col-6 mb-5"><a target="_blank" >
                    <div className="image-panel round hover-scale mb-3">
                      <img src={item.image} alt="product-image" />
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
                  </a></div>
                </Link>
              ))
            ) : (
              <h3 className="empty-text text-center mb-5 pb-5"></h3>
            )}
          </div>
        ) : (
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
        {loading && (
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
