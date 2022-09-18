import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import NumberFormat from "react-number-format";
import AppointmentModal from "../../components/appointmentModal";
import renderHTML from "react-render-html";
import WatchItems from "../../components/watchItems";
import Skeleton from "@mui/material/Skeleton";
import { RiArrowRightSFill, RiMailFill, RiPhoneFill, RiWhatsappFill, RiDvdFill } from "react-icons/ri";
import { useRouter } from "next/router";

const toursData = [
  { title: "Luxury Shopping Experience", description: "During our Luxury Shopping Experience, you will be completely pampered. Choosing a diamond is a special occasion. While enjoying a glass of champagne, one of our diamond consultants will take you through all the ins and outs that come with choosing the perfect diamond.", image: "/img/tour/tour-1.png" },
  { title: "Luxury Shopping Experience", description: "During our Luxury Shopping Experience, you will be completely pampered. Choosing a diamond is a special occasion. While enjoying a glass of champagne, one of our diamond consultants will take you through all the ins and outs that come with choosing the perfect diamond.", image: "/img/tour/tour-1.png" },
  { title: "Free Guided Diamond Factory Tour", description: "Our guided diamond factory tour is completely free of charge. We give free guided tours in more than 35 languages. Get your ticket today and discover the magical world of diamonds!", image: "/img/tour/tour-3.png" },
  { title: "Luxury Shopping Experience", description: "Our engagement workshop is for couples who are preparing for an engagement or anniversary and want to learn more about diamonds before they purchase. Make buying your engagement ring an unforgettable experience.", image: "/img/tour/tour-4.png" },
  { title: "Luxury Shopping Experience", description: "Come in for a Royal Experience at Royal Coster Diamonds and combine it with 'This is Holland'. Discover all the beautiful things the Dutch are so famous for.", image: "/img/tour/tour-5.png" },
]


const mainPageUrlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates?slug=main-tours-page";
const mainPageUrlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates?slug=main-tours-page&lang=nl";
let tourData, localSticky = 1;

const urlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates/327365";
const urlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates/329519";
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

export default function Tour(props) {
  const [perPage, setPerPage] = useState(6);
  const [loadding, setLoadding] = useState(true);
  const [tours, setTours] = useState([]);
  const [sticky, setSticky] = useState(localSticky);
  const [mounted, setMounted] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [pageData, setPageData] = useState();
  const [loaded, setLoaded] = useState(false);

  const { locale } = useRouter();
  const tourURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/tours?order=desc&orderby=modified&lang=" + locale;
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
  useEffect(() => {
    if (!loaded) {
      (function(h,o,t,j,a,r){

          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:3002600,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      fetch(mainPageUrl, {
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        setPageData(data[0].acf)

        $("#hero").css({
          backgroundImage: "url(" + data[0].acf.image.sizes["2048x2048"] + ")"
        })
        $("#tourImage").css({
          backgroundImage: "url(" + data[0].acf.tour_image + ")"
        })
        $("em").css({
          fontStyle: "italic"
        })

      })
      setLoaded(true);
    }
  })
  // Get all tour's data and set local tour's data, loadding statu and loadmore button's state // --count=6
  const getTourData = () => {
    localSticky = sticky;
    setLoadding(true)

    fetch(tourURL + "&per_page=" + "15" + "&page=" + sticky, {
      method: 'get'
    }).then(res => res.json()).
      then(data => {

        setShowLoadMore(data.length >= 6);
        setLoadding(false);

        if (data.length) {
          tourData = [...tours, ...data];
          setTours(tourData);
        }
      })
  }

  // when first mounted, if there is local tour's data, set tour' data from it. if else, call getTourData() function and set tour's data. when sticky change, call getTourData() function and set tour's data
  useEffect(() => {

    if ($(window).width() < 576) {
      setIsMobile(true);
    }
    if (sticky) {
      if (mounted) {
        getTourData();
      } else {
        if (tourData) {
          setTours(tourData);
          setLoadding(false);
        } else {
          getTourData();
        }
        setMounted(true);
      }
    }
  }, [sticky])

  return (
    <div className="tour_page">
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
      {pageData && loaded && (
        <div className="r-container">
          <p className="text-capitalize col-lg-4 col-md-6 col-sm-8 mb-3">{renderHTML(pageData.title_above)}</p>
          <h1 className="title text-white col-lg-4 col-md-6 col-sm-8 text-capitalize mb-5">
            {renderHTML(pageData.title_below)}
          </h1>
        </div>
      )}
      </div>

      {/* Start guide section */}

      <div className="guide-section pt-5">

        <div className="row r-container pt-5">
        {pageData && loaded && (
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">{renderHTML(pageData.intro_left)}</h3>
          </div>
        )}
        {pageData && loaded && (
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
            {renderHTML(pageData.intro_right)}</p>
          </div>
          )}
        </div>

      </div>

      {/* End guide section */}

      {/* Start more tour section */}
      <div className="more-tour-section mb-5">
      {!isMobile && (
        <div className="guide-section pt-5">
          <div className="row r-container pt-5" style={{backgroundColor: "transparent"}}>
            <div className="title-panel pb-5" style={{backgroundColor: "transparent"}}>
              <h3 className="title mb-lg-5 text-left py-5 blue-text">{locale === "nl" ? "Meer" : "More"} <span>{locale === "nl" ? "Rondleidingen" : "Tours"}</span> & {locale === "nl" ? "Ervaringen" : "Experiences"}</h3>
            </div>
          </div>
        </div>
        )}
        {isMobile && (
            <div className="title-panel pb-5">
              <h3 className="title mb-lg-5 text-left py-5 blue-text" style={{marginLeft:15}}>{locale === "nl" ? "Meer" : "More"} <span>{locale === "nl" ? "Rondleidingen" : "Tours"}</span> & {locale === "nl" ? "Ervaringen" : "Experiences"}</h3>
            </div>
          )}

        <div className="tours-panel" style={{background: "#f7f3ec" }}>
          <div className="r-container">
            <div className="row">
              {tours.length > 0 &&
                tours.map((tour, index) => {
                  return (
                    <div className="col-lg-4 col-md-6 tour-item px-3 mb-5" key={index}>
                     <Link
                      passHref={true}
                      href={((locale == "en") ? "" : "/nl") + "/tour/" + tour.slug}>
                        <a>
                          <div className="image-panel hover-scale round mb-4">
                            {tour.acf.landing.image && <img src={tour.acf.landing.image.url} className="tour-image" alt="tour-image" />}
                          </div>
                        </a>
                      </Link>
                      <h3 style={{minHeight:63}} className="title mb-4 blue-text">{tour.title.rendered && renderHTML(tour.title.rendered)}</h3>
                      <p style={{minHeight:150,wordBreak:"break-word"}} className="description mb-5">{tour.acf.overview.content && renderHTML(tour.acf.overview.content)}</p>
                      <Link
                        passHref={true}
                        href={ ((locale == "en") ? "" : "/nl") + "/tour/" + tour.slug  }>
                        <a style={{position:"relative",bottom:0}} className="more-detail text-uppercase mb-5 d-flex">{locale === "nl" ? "Meer details" : "More Details"} <RiArrowRightSFill className="ms-2" /></a>
                      </Link>
                    </div>
                  )
                })
              }
              {
                loadding && <>
                  <div className="col-lg-4 col-md-6 px-3 mb-5">
                    <div className="image-panel hover-scale round mb-4">
                      <Skeleton variant="rect" animation="wave" width="100%" height={250} />
                    </div>
                    <Skeleton variant="text" animation="wave" width="100%" height={50} />
                    <Skeleton className="mt-3" variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width={100} height={30} />
                  </div>
                  <div className="col-lg-4 col-md-6 px-3 mb-5 d-md-block d-none">
                    <div className="image-panel hover-scale round mb-4">
                      <Skeleton variant="rect" animation="wave" width="100%" height={250} />
                    </div>
                    <Skeleton variant="text" animation="wave" width="100%" height={50} />
                    <Skeleton className="mt-3" variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width={100} height={30} />
                  </div>
                  <div className="col-lg-4 col-md-6 px-3 mb-5 d-lg-block d-none">
                    <div className="image-panel hover-scale round mb-4">
                      <Skeleton variant="rect" animation="wave" width="100%" height={250} />
                    </div>
                    <Skeleton variant="text" animation="wave" width="100%" height={50} />
                    <Skeleton className="mt-3" variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width={100} height={30} />
                  </div>
                </>
              }
            </div>
            {
              !loadding && showLoadMore &&
              <button className="btn btn-load text-uppercase blue-btn round-form px-5 py-3" onClick={() => { setSticky(sticky + 1) }}>{locale === "nl" ? "Laadt meer" : "Load More"}</button>
            }
          </div>
        </div>
      </div>
      {/* End more tour section */}

      {/* Start banner section */}
      {pageData && loaded && (
      <div className="banner-section r-container round row mt-5 mb-4">
        <div className="text-panel col-lg-7 col-12 p-0 p-md-5 p-sm-3">
          <h3 className="title text-capitalize px-5 pt-5 mb-5">{renderHTML(pageData.tour_title)}</h3>
          <div className="description mb-5 pb-5 px-5">
            <p className="mb-5">{renderHTML(pageData.tour_text)}</p>
          </div>
          <button className="btn pink-btn round-form ms-5 mb-5 text-uppercase py-3 px-5"
            data-bs-toggle="modal"
            data-bs-target="#appointment">{locale === "nl" ? "Afspraak maken" : "BOOK APPOINTMENT"}</button>
        </div>
        <div className="bg-panel col-lg-5 col-12 order-first order-lg-last" id="tourImage"></div>
      </div>
    )}
      {/* End banner section */}

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
