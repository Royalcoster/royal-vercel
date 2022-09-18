import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import NumberFormat from "react-number-format";
import AppointmentModal from "../../components/appointmentModal";
import renderHTML from "react-render-html";
import Instagram from "../../components/instagram";
import { RiArrowRightSFill, RiMailFill, RiPhoneFill, RiWhatsappFill, RiDvdFill, RiPlayCircleFill } from "react-icons/ri";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/router";
const mainPageUrlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/collections?slug=main-collections-page";
const mainPageUrlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/collections?slug=main-collections-page&lang=nl";

SwiperCore.use([Autoplay, Navigation]);

const urlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/collections/328314";
const urlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/collections/329278";

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

export default function Collection(props) {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [pageTitle, setPageTitle] = useState("");
  const [mainPageImage, setmainPageImage] = useState("");
  const [collectionData, setCollectionData] = useState([]);
  const [collectionSlider, setCollectionSlider] = useState([]);
  const [rendered, setRendered] = useState(false);
  const { locale } = useRouter();
  let data = {};
  if ( locale === "nl" ) {
    data = props.dataNl;
  } else {
    data = props.dataEn;
  }
  const seoData = data.yoast_head_json;

  useEffect(() => {
    if (!rendered) {
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3002600,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      fetch(locale === "nl" ? mainPageUrlNl : mainPageUrlEn, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setRendered(true);
          var d = res[0].acf;

          setPageTitle(d.page_title);
          if (d.page_intro[0].intro_left_text !== undefined) {
            $("[intro_left_text]").html(d.page_intro[0].intro_left_text);
          } else {
            $("[intro_left_text]").html("")
          }
          if (d.page_intro[0].intro_right_text !== undefined) {
            $("[intro_right_text]").html(d.page_intro[0].intro_right_text);
          } else {
            $("[intro_right_text]").html("")
          }

          $("#hero").css({
            backgroundImage: "url(" + d.main_page_image.sizes["2048x2048"] + ")"
          })
          var cdd = [];
          var css = [];
          d.collections_list.map((itm,index) => {
            cdd.push({
              title: itm.title,
              description: itm.description,
              image: itm.image,
              subImage: itm.subimage,
              slug: itm.shopify_tag
            })
          })
        d.other_collection.map((ii, index) => {
            css.push({
              title: ii.title,
              image: ii.image,
              url: ii.url
            })
          })
          setCollectionData(cdd);
          setCollectionSlider(css);
          $("em").css({
            fontStyle: "italic"
          })

          $("#pageTitle").css({
            color: d.title_font_color
          })
      })
    }
  }, [rendered])
  return (

    <div className="collection_page">
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
      <Header />
      {/* Start hero section */}
      <div className="hero-section" id="hero">
        <div className="r-container text-center">
        {(true) && (
         <h1 id="pageTitle" className="title text-center text-capitalize pb-md-5">

          </h1>
        )}

        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section py-md-5">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            {/* <h3 intro_left_text="1" className="title text-capitalize">Diamond <span>Jewelry</span></h3> */}
            <h3 intro_left_text="1" className="title text-capitalize">{data.acf.page_intro.intro_left_text}</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-4 pb-sm-5">
            {/* <p intro_right_text="1" className="guide-text mb-4">
              With an extensive stock of loose and set diamonds, we have the most beautiful diamond jewelry Collections. For more than 180 years, our craftsmen and women create beauty that lasts for centuries.</p> */}
            <p intro_right_text="1" className="guide-text mb-4">{data.acf.page_intro.intro_right_text}</p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start collection section */}
      <div className="collection-section r-container pb-5">
        {
          collectionData.length > 0 && collectionData.map((collection, index) => {
            return (
              <div className="row m-0 align-items-center mt-5 pt-5 collection-panel" key={index}>
                <div className="image-panel d-flex align-items-center p-0 col-md-6 mb-md-0 mb-5">
                  <img className="sub-image" src={collection.subImage} alt="collection-sub-image" />
                  <img className="main-image" src={collection.image} alt="collection-main-image" />
                </div>
                <div className={"text-panel col-md-6 p-0 ps-md-5 " + (index % 2 && 'order-md-first')}>
                  <h3 className="title mx-lg-5 px-md-5 mb-5 blue-text">{renderHTML(collection.title)}</h3>
                  <p className="description mx-lg-5 px-md-5 pb-5 mb-0">{renderHTML(collection.description)}</p>
                  <div className="btn-panel mt-md-5 mx-lg-5 px-5">
                    <Link
                      passHref={true}
                      href={{
                        pathname: "/collection/[slug]",
                        query: {
                          slug: collection.slug,
                        },
                      }}
                    >
                      <a className="btn btn-explore px-5 py-3">
                        {locale === "nl" ? "Ontdek" : "EXPLORE"}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      {/* End collection section */}

      {/* Start our collection section */}
      <div className="our-collection-section mt-5">
        <div className="r-container py-5">
          <div className="title-panel">
            <h3 className="title py-5 mb-0">{locale === "nl" ? "Andere collecties" : "Other Collections"}</h3>
          </div>
          <div className="slider-panel">
            <Swiper
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              slidesPerView={4}
              spaceBetween={20}
              loop={true}
              className="mySwiper"
              breakpoints={{
                996: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 3,
                },
                590: {
                  slidesPerView: 2,
                },
                480: {
                  slidesPerView: 1,
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
              {
                collectionSlider.length > 0 && collectionSlider.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Link href={item.url}>
                        <div className="slider-item mb-5">
                          <div className="image-panel hover-scale round mb-4">
                            <img src={item.image} className="tour-image" alt="tour-image" />
                          </div>
                          <h3 className="title mb-4 blue-text">{item.title}</h3>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <div className="btn-bottom-panel py-5">
              <button ref={navigationPrevRef} className="btn px-0 me-5">
                <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
              </button>
              <button ref={navigationNextRef} className="btn px-0">
                <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End our collection section */}

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

    </div >
  );
}
