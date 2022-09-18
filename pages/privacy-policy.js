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
import { useRouter } from "next/router"; 

const urlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/pages/225800";
const urlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/pages/325937";
const customUurlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/blogs?slug=privacy-policy";
const customUurlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/blogs?slug=privacy-policy&lang=nl";

const heroGradientStyle =
  "linear-gradient(180deg, #01215c 0%, rgba(1, 33, 92, 0) 50%),";
let localDataEn;
let localDataNl;

export async function getStaticProps() {
  let dataEn = {};
  let dataNl = {};
  if (localDataEn && localDataNl) {
    dataEn = localDataEn;
    dataNl = localDataNl;
  } else {
    const resEn = await fetch(urlEn, {
      method: "get",
    });
    dataEn = await resEn.json();

    localDataEn = dataEn;

    const resNl = await fetch(urlNl, {
      method: "get",
    });
    dataNl = await resNl.json();

    localDataNl = dataNl;
  }
  let customDataEn = {};
  let customDataNl = {};
  const res1En = await fetch(customUurlEn, {
    method: "get",
  });
  customDataEn = await res1En.json();
  const res1Nl = await fetch(customUurlNl, {
    method: "get",
  });
  customDataNl = await res1Nl.json();
  return {
    props: {
      dataEn, 
      dataNl,
      customDataEn,
      customDataNl
    },
  };
}

export default function Home(props) {
  const [windowWidth, setWindowWidth] = useState();
  const [isMobile, setIsMobile] = useState();
  const { locale } = useRouter();
  let data = {};
  let customData = {};
  if ( locale === "nl" ) {
    data = props.dataNl;
    customData = props.customDataNl;
  } else {
    data = props.dataEn;
    customData = props.customDataEn;
  }
  const seoData = data.yoast_head_json;
  const heroData = data.acf.landing.slider[0];
  const productData = data.acf.product_row;
  const textData = [customData[0].content];
  const customTitle = customData[0].title.rendered;
  useEffect(() => {
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
  }, []);
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

        className="hero"
        style={{
          height: 670,
            backgroundImage:
            heroData?.mobile.image && isMobile
              ? heroGradientStyle + "url(" + customData[0].acf.featured_image.url + ")"
              : heroData &&
                heroGradientStyle + "url(" + customData[0].acf.featured_image.url + ")"
        }}
      >
      {!isMobile && customData  && (
        <div className="r-container d-none d-sm-flex flex-column" style={{
          position: "absolute",
          color: "white",
          bottom: 0,
          width: "100%",
          maxWidth: "1280px",
          margin: "auto",
          paddingLeft: "12%",

        }}>

        <div className="text-panel col-lg-6 col-md-8 col-sm-10 col-12">
          <h1 className="text-capitalize text-left" style={{color:"white",marginBottom: 50}}>
            {heroData.title && renderHTML(customTitle)}
          </h1>

        </div>
        </div>
      )}
    </div>
    {customData && isMobile && (
      <div  style={{
        position: "absolute",
        bottom: 80,
        width: "100%",
        paddingLeft: 25,
        paddingRight: 25,
        margin: "auto",
        color:"white",
        fontSize: 28
      }}>

        <div className="text-panel col-lg-6 col-md-8 col-sm-10 col-12"  >
          <h1 className="text-capitalize text-left" style={{fontSize: 35}}>
            {heroData.title && renderHTML(customTitle)}
          </h1>

        </div>
        </div>
    )}


      {/* End Hero section */}
      {/* End Categories section */}
      {/* Start Categories section */}
      <div className="category d-md-flex row m-0">
        {textData?.map((item, index) => {
          return (
            <div className="col-lg-12 col-sm-12 col-12 p-0 mb-4" key={index}>

              <p className="guide-text mb-4" style={{marginTop:20,paddingLeft:"5%",paddingRight:"5%",fontSize: 18,lineHeight:"150%",fontWeight: 400,color: "rgba(2, 24, 37, 0.8)"}}>
                  {renderHTML(item.rendered)}

              </p>
            </div>
          );
        })}

      </div>
      {/* Start Collection section */}
      <div className="collection-section" style={{top: "-85px"}}>
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
    </div>
  );
}
