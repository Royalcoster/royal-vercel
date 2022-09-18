import React, { useState, useRef, useEffect } from "react";
//import CookieConsent from "react-cookie-consent";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import renderHTML from "react-render-html";
import Schedule from "../components/schedule";
import Collection from "../components/collection";
import Help from "../components/help";
import Instagram from "../components/instagram";
import Script from "next/script";
import { useRouter } from "next/router";

const urlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/pages/225800";
const urlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/pages/325937";

const heroGradientStyle =
  "linear-gradient(180deg, #01215c 0%, rgba(1, 33, 92, 0) 50%),";
let localData;

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

export default function Home( props ) {
  const { locale } = useRouter();
  let data = {};
  if ( locale === "nl" ) {
    data = props.dataNl;
  } else {
    data = props.dataEn;
  }

  const [windowWidth, setWindowWidth] = useState();
  const [isMobile, setIsMobile] = useState();
  const heroData = data.acf.landing.slider[0];
  const productData = data.acf.product_row;
  const textData = [data.content];
  const seoData = data.yoast_head_json;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) {
      var cData = [];
    $("#appointmentForm").find("#online").val("schedule_appointment_header_online");
    $("#appointmentForm").find("#visit").val("schedule_appointment_header");
    $("#appointmentForm").find("#idvisit").val("002");
    $("#appointmentForm").find("#idonline").val("003");
        (function(h,o,t,j,a,r){

            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3002600,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        setIsMobile((window.innerWidth < 576) ? true : false);
        var ww = setInterval(function() {
          if ($("#video").height() > 0) {
            clearInterval(ww)
            setTimeout(function() {
              if ($(window).width() < 576) {
                  $("#video").parent().css({
                    height: $("#video").height(),

                  })
                }
                  $("#video").css({
                    visibility: "visible"
                  })
                }, 2000);
              }
          } , 100);
          setLoaded(true);
      }
  }, [loaded]);

  return (

    <div className="homepage">
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

      <div
      className={heroData.mobile.video.url ? "hero mobie_video" : "hero"}
      style={{
        height: 670,
        minheight: 670,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
          backgroundImage:
          heroData?.mobile.image && isMobile
            ? heroGradientStyle + "url(" + heroData.mobile.image.link + ")"
            : heroData &&
              heroGradientStyle + "url(" + heroData.image.url + ")"
      }}
    >
      { !isMobile && (
        <video id="video" style={{filter: "brightness(40%)",visibility:"hidden", position: "absolute",top:0,zIndex: 0}}
          autoPlay="autoplay"
          loop="loop"
          muted
          defaultmuted="defaultmuted"
          playsInline
          onContextMenu={() => false}
          vvsd
          preload="auto"
          className="d-xl-block d-none bg_video"
        >
          <source src={heroData.video.url} type="video/mp4" />
        </video>
      )}

      {heroData && !isMobile && (
        <div className="r-container d-none d-sm-flex flex-column" style={{
          position: "absolute",
          color: "white",
          bottom: 0,
          width: "100%",
          maxWidth: "1280px",
          margin: "auto",
          paddingLeft: "12%"
        }}>

          <div className="text-panel col-lg-6 col-md-8 col-sm-10 col-12">
            <h1 className="text-capitalize text-left" style={{color:"white"}}>
              {heroData.title && renderHTML(heroData.title)}
            </h1>
            <p className="mt-4 mb-5 pt-2" style={{color:"white"}}>
              {heroData.sub_title && renderHTML(heroData.sub_title)}
            </p>
          </div>
          <div className="btn-panel">
            {heroData.button && (
              <Link href={heroData.button.url}>
                <a style={{backgroundColor:"white",color:"black"}} className="btn rainbow-btn dark-btn round-form px-5 py-3 me-3 mt-5">
                  SEE LUNA COLLECTION
                </a>
              </Link>
            )}
            {heroData.button2 && (
              <Link href={heroData.button2.url} >
                <a style={{backgroundColor:"white",color:"black"}} className="btn blue-outline-btn shop-now-btn round-form px-5 py-3 mt-5">
                  {heroData.button2.title}
                </a>
              </Link>
            )}
          </div>
        </div>
      )}
      {heroData && isMobile && 'Outer Video' != heroData.slider_type && (
        <div  style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          paddingLeft: 25,
          paddingRight: 25,
          margin: "auto"
        }}>

          <div className="text-panel col-lg-6 col-md-8 col-sm-10 col-12"  >
            <h1 className="text-capitalize text-left" style={{fontSize: 30}}>
              {heroData.title && renderHTML(heroData.title)}
            </h1>
            <p className="mt-4 mb-5 pt-2">
              {heroData.sub_title && renderHTML(heroData.sub_title)}
            </p>
          </div>
          <div className="btn-panel">
            {heroData.button && (
              <Link href={heroData.button.url}>
                <a className="btn rainbow-btn dark-btn round-form px-5 py-3 me-3 mt-5">
                  {heroData.button.title}
                </a>
              </Link>
            )}
            {heroData.button2 && (
              <Link href={heroData.button2.url}>
                <a className="btn blue-outline-btn shop-now-btn round-form px-5 py-3 mt-5">
                  {heroData.button2.title}
                </a>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
    {heroData && isMobile && 'Outer Video' == heroData.slider_type && (
      <div className="text-panel-container mt-4 mb-5" style={{
        paddingLeft: 25,
        paddingRight: 25,
        textAlign: 'center'
      }}>

        <div className="text-panel col-lg-6 col-md-8 col-sm-10 col-12"  >
          <h1 className="text-capitalize text-left" style={{fontSize: 30}}>
            {heroData.title && renderHTML(heroData.title)}
          </h1>
          <p className="mb-5 pt-2" style={{fontSize: 14}}>
            {heroData.sub_title && renderHTML(heroData.sub_title)}
          </p>
        </div>
        <div className="btn-panel">
          {heroData.button && (
            <Link href={heroData.button.url}>
              <a className="btn rainbow-btn dark-btn round-form px-5 py-3 me-3 my-2" style={{fontSize: 12}}>
                {heroData.button.title}
              </a>
            </Link>
          )}
          {heroData.button2 && (
            <Link href={heroData.button2.url}>
              <a className="btn blue-outline-btn shop-now-btn round-form px-5 py-3 my-2" style={{fontSize: 12}}>
                {heroData.button2.title}
              </a>
            </Link>
          )}
        </div>
      </div>
    )}
    {/* End Hero section */}

      <div className="categories d-none d-md-flex row m-0">
        {productData?.map((item, index) => {
          return (
            <div className="col-lg-3 col-sm-6 col-12 p-0 mb-4" key={index}>
              <Link passHref={true} href={item.product_row_url}>
                <a>
                  <div className="category-item round">
                    <img src={item.product_row_img.url} alt="category" />
                    <div className="hover-title p-4">
                      {item.product_row_img_title}
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      {/* End Categories section */}

      {/* Start Categories section */}
      <div className="category d-md-flex row m-0 pt-5 pt-md-0">
        {!isMobile && textData?.map((item, index) => {
          return (
            <div className="col-lg-12 col-sm-12 col-12 p-0" key={index}>
              <p className="guide-text" style={{paddingLeft:"25%",paddingRight:"25%",fontSize: 18,lineHeight:"150%",fontWeight: 400,color: "rgba(2, 24, 37, 0.8)"}}>
                  <h1 style={{width:"100%",textAlign:"center",color: "#01215c",fontSize:  "3.6rem"}}>Royal Coster</h1>
                  {renderHTML(item.rendered)}
              </p>
            </div>
          );
        })}
        {isMobile && textData?.map((item, index) => {
          return (
            <div className="col-lg-12 col-sm-12 col-12 p-0" style={{marginTop:10}} key={index}>
              <p className="guide-text" style={{paddingLeft:"5%",paddingRight:"5%",fontSize: 16,lineHeight:"150%",fontWeight: 400,color: "rgba(2, 24, 37, 0.8)"}}>
                  <h1 style={{width:"100%",textAlign:"center",color: "#01215c",fontSize:  "3rem"}}>Royal Coster</h1>
                  {renderHTML(item.rendered)}
              </p>
            </div>
          );
        })}
      </div>
      {/* Start Collection section */}
      <div className="collection-section">
        <Collection />
      </div>
      {/* End Collection section */}

      {/* Start Help section */}
      <Help />
      {/* End Help section */}

      {/* Start Instagram section */}
      <Instagram />
      {/* End Instagram section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}
      {/* Start Footer */}
      <Footer />


      {/* End Footer */}

      {/* Defer loading non-essential script */}
      <Script
        src="https://www.google-analytics.com/analytics.js"
        strategy="lazyOnload"
      />

    </div>
  );
}
