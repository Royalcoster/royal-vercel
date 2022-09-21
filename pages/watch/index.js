import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import NumberFormat from "react-number-format";
import WatchDetails from "../../components/watchDetails";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import renderHTML from "react-render-html";
import { useRouter } from "next/router";
SwiperCore.use([Autoplay, Navigation]);
const mainPageUrlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/collections?slug=watches-main-page";
const mainPageUrlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/collections?slug=watches-main-page&lang=nl";

const vendors = [
  { vendor: "OMEGA", image: "omega.png" },
  { vendor: "TAG-Heuer", image: "tag_heuer.png" },
  { vendor: "Chopard", image: "chopard.png" },
  { vendor: "Piaget", image: "piaget.png" },
  { vendor: "Longines", image: "longines.png" },
  { vendor: "Frederique-Constant", image: "frederique.png" },
  { vendor: "Titoni", image: "titoni.png" },
  { vendor: "Hamilton", image: "hamilton.png" },

];

const silderData = [
  { tags: "OMEGA", productType:"watches", image: "omega.png", url:"/watch/omega-watches" },
  { tags: "tag-heuer", productType:"watches", image: "tag_heuer.png",url:"/watch/tag-heuer-watches" },
  { tags:"chopard", productType:"watches", image: "chopard.png" ,url:"/watch/chopard-watches"},
  { tags: "piaget", productType:"watches", image: "piaget.png",url:"/watch/piaget-watches" },
  { tags: "longines", productType:"watches", image: "longines.png",url:"/watch/longines-watches" },
  { tags: "frederique-constant", productType:"watches", image: "frederique.png",url:"/watch/frederique-constant-watches" },
  { tags: "titoni", productType:"watches", image: "titoni.png",url:"/watch/titoni-watches" },
  { tags: "hamilton", productType:"watches", image: "hamilton.png",url:"/watch/hamilton-watches" },

];

const basicData = [
  {
    title: "Omega Diamond Watches",
    description:
      "Superior craftsmanship in a range from grand complications to refined three-hand watches. These are the OMEGA Luxury Watches.",
    btnText: "Show Omega watches",
    coverImage: "watch-cover-1.png",
    itemTitle: "Omega Luxury Watches",
  },
  {
    title: "TAG Heuer Diamond Watches",
    description:
      "Superior craftsmanship in a range from grand complications to refined three-hand watches. These are the TAG Heuer Luxury Watches.",
    btnText: "Show TAG Heuer watches",
    coverImage: "watch-cover-1.png",
    itemTitle: "TAG Heuer Watches",
  },
  {
    title: "Chopard Diamond Watches",
    description:
      "Superior craftsmanship in a range from grand complications to refined three-hand watches. These are the Chopard Luxury Watches.",
    btnText: "Show Chopard watches",
    coverImage: "watch-cover-1.png",
    itemTitle: "Chopard Watches",
  },
  {
    title: "Piaget Diamond Watches",
    description:
      "Superior craftsmanship in a range from grand complications to refined three-hand watches. These are the Piaget Luxury Watches.",
    btnText: "Show Piaget watches",
    coverImage: "watch-cover-1.png",
    itemTitle: "Piaget Watches",
  },
  {
    title: "Longines Diamond Watches",
    description:
      "Superior craftsmanship in a range from grand complications to refined three-hand watches. These are the Longines Luxury Watches.",
    btnText: "Show Longines watches",
    coverImage: "watch-cover-1.png",
    itemTitle: "Longines Watches",
  },
  {
    title: "Frederique Constant Diamond Watches",
    description:
      "Superior craftsmanship in a range from grand complications to refined three-hand watches. These are the Frederique Constant Luxury Watches.",
    btnText: "Show Frederique Constant watches",
    coverImage: "watch-cover-1.png",
    itemTitle: "Frederique Constant Watches",
  },

  {
    title: "Titoni Diamond Watches",
    description:
      "Superior craftsmanship in a range from grand complications to refined three-hand watches. These are the Titoni Luxury Watches.",
    btnText: "Show Titoni watches",
    coverImage: "watch-cover-1.png",
    itemTitle: "Titoni Watches",
  },
  {
    title: "Hamilton Diamond Watches",
    description:
      "Superior craftsmanship in a range from grand complications to refined three-hand watches. These are the Hamilton Luxury Watches.",
    btnText: "Show Hamilton watches",
    coverImage: "watch-cover-1.png",
    itemTitle: "Hamilton Watches",
  }

];

const urlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/collections/327380";
const urlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/collections/327564";
export async function getStaticProps() {
  let dataEn = {};
  let dataNl = {};
  const resEn = await fetch(urlEn, {
    method: "get",
  });
  dataEn = await resEn.json();

  const resNl = await fetch(urlNl, {
    method: "get",
  });
  dataNl = await resNl.json();
  return {
    props: {
      dataEn,
      dataNl,
    },
  };
}

export default function Watch(props) {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [watchData, setWatchData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [itemPrice, setItemPrice] = useState(false);
  const [fullPrice, setFullprice] = useState(false);
  const { locale } = useRouter();
  let data = {};
  let mainPageUrl;
  if ( locale === "nl" ) {
    data = props.dataNl;
    mainPageUrl = mainPageUrlNl;
  } else {
    data = props.dataEn;
    mainPageUrl = mainPageUrlEn;
  }
  const seoData = data.yoast_head_json;
  let scrollDone = false;
  let watchDataTemp = [];
  useEffect(() => {
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3002600,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    $(window).scroll(function() {
      localStorage.watchesTop = $(window).scrollTop();

    })

    $(document).ready(function() {
      if (!scrollDone) {
          window.scrollTo(0,localStorage.watchesTop);
          scrollDone = true;
      }
      var ww1 = setInterval(function() {
         if ($("[watches]").length > 0) {
            clearInterval(ww1);

         }
       },100)
       var ww = setInterval(function() {

         if ($("[watchLink]").length > 0) {
           clearInterval(ww);
           setTimeout(function() {
             $("[watchLink]").unbind("click");
             $("[watchLink]").bind("click", function() {

               var ind = 1;
               var item = $.parseJSON(atob($(this).attr("watchData")));
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
                     "value": item.variants[0].node.price.toString(),
                     "currencyCode": "EUR",
                     "click": {
                       "actionField": {"list": "shop"},
                       "products": [{
                          "id": ((item.variants[0].node.sku != "") ? item.variants[0].node.sku : item.variants[0].node.id),
                          "name": item.title + " (" + item.variants[0].node.sku + ")",
                          "price": item.variants[0].node.price.toString(),
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
                  //  "event": "productDetail",
                    "event": "view_item",
                     "ecommerce": {
                       "value": item.variants[0].node.price,
                       "currencyCode": "EUR",
                       "detail": {
                         "products": [{
                           "id": ((item.variants[0].node.sku != "") ? item.variants[0].node.sku : item.variants[0].node.id),
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
             });
           }, 1000)
         }
       }, 100)
    })
    if (!loaded) {
      fetch(mainPageUrl, {
        method: "get"
      })
        .then((res) => res.json())
        .then((data) => {
          setPageData(data[0].acf);
           setLoaded(true);
            $("#hero").css({
            backgroundImage: "url(" + data[0].acf.main_page_image.sizes["2048x2048"] + ")"
          })
          $("em").css({
            fontStyle: "italic"
          })
          $.each(data[0].acf.collections_list, function(ind) {
            var ths = this;
            let productURL = "https://royalcoster.com:81/royalcoster/getWatchesCollections.php";
            let formData = new FormData();
            formData.append("handle", this.shopify_collection_handle);

          /*  fetch(productURL, {
              method: "post",
              body: formData,
            })
              .then((res1) => res1.json())
              .then((r) => {
                console.log(r)*/

                  watchDataTemp.push({
                   description: ths.description,
                   title: ths.title,
                   btnText: ths.btnText,
                   coverImage: ths.coverImage,
                   itemTitle: this.itemTitle,
                   royalcoster_slug: this.royalcoster_slug,
                   data: [],
                  });
                  if (watchDataTemp.length == data[0].acf.collections_list.length) {
                    setWatchData(watchDataTemp);
                   setDataLength(watchDataTemp.length);
                   setLoading(false);

                 }

             });
        //  })
        });

      }
  }, [dataLength]);

  return (
    <div className="watch_page">
      <Head>
      {seoData.title && (
          <title>{seoData.title} | Royal Coster</title>
      )}
      {seoData.og_description && (
          <meta name="description" content={seoData.og_description}/>
      )}
      {seoData.og_locale && (
          <meta property="og:locale" content={seoData.og_locale}/>
      )}
      {seoData.og_type && (
          <meta property="og:type" content={seoData.og_type}/>
      )}
      {seoData.og_title && (
          <meta property="og:title" content={seoData.og_title}/>
      )}
      {seoData.og_description && (
          <meta property="og:descrog_description" content={seoData.og_description}/>
      )}
      {seoData.og_url && (
          <meta property="og:urlog_url" content={seoData.og_url}/>
      )}
      {seoData.og_site_name && (
          <meta property="og:site_name" content={seoData.og_site_name}/>
      )}
      {seoData.article_publisher && (
          <meta property="article:publisher" content={seoData.article_publisher}/>
      )}
      {seoData.article_modified_time && (
          <meta property="article:modified_time" content={seoData.article_modified_time}/>
      )}
      {seoData.og_image && (
          <meta property="og:image" content={seoData.og_image}/>
      )}
      {seoData.auther && (
          <meta name="auther" content={seoData.auther}/>
      )}
      {seoData.twitter_card && (
          <meta name="twitter:card" content={seoData.twitter_card}/>
      )}
      {seoData.twitter_site && (
          <meta name="twitter:site" content={seoData.twitter_site}/>
      )}
      {seoData.schema && (
          <script type="application/ld+json" className="yoast-schema-graph">
          {/* {seoData.schema} */}
          </script>
      )}
      </Head>
      <Header page="homepage" />
      {/* Start hero section */}
      {pageData && loaded && (
        <div className="hero-section" id="hero">
          <div className="r-container">
            <p className="text-capitalize"></p>
            <h1 className="title text-white text-capitalize">

            </h1>
          </div>
        </div>
      )}
      {/* End Hero section */}

      {/* Start guide section */}
    {pageData && loaded && (
      <div className="guide-section  py-5">
        <div className="row r-container py-sm-5 py-3">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">{renderHTML(pageData.page_intro[0].intro_left_text)}</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text">
            {renderHTML(pageData.page_intro[0].intro_right_text)}
            </p>
          </div>
        </div>
      </div>
    )}
      {/* End guide section */}


      {/* Start logo section */}
      <div className="logo-panel r-container row justify-content-between flex-wrap pb-3 mt-5">
        <Swiper
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          className="mySwiper"
          breakpoints={{
            1024: {
              slidesPerView: 6,
            },
            996: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 4,
            },
            590: {
              slidesPerView: 3.5,
            },
            480: {
              slidesPerView: 2.8,
            },
            360: {
              slidesPerView: 2.4,
            },
            280: {
              slidesPerView: 2,
            },
            1: {
              slidesPerView: 1,
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
          {silderData && silderData.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link
                    passHref={true}
                    href={item.url}
                  >
                    <a watches={item.url} href={item.url}
                      className="px-4 py-2 btn-vendor round-form d-flex align-items-center"
                    >
                      <img src={"/img/watch/logo/" + item.image} alt="logo-image" />
                    </a>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* End logo section */}

      {/* Start watch detail section */}
      {pageData && loaded &&  (
           <WatchDetails watchData={watchData} loading={loading} vlength={dataLength} />

      )}
      {/* End watch detail section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}
