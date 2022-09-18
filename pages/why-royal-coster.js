import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import NumberFormat from "react-number-format";
import AppointmentModal from "../components/appointmentModal";
import AnswerPanel from "../components/answerPanel";
import renderHTML from "react-render-html";
import { useRouter } from "next/router";
import { RiArrowRightSFill, RiMailFill, RiPhoneFill, RiWhatsappFill, RiDvdFill } from "react-icons/ri";

const mainPageUrlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates?slug=why-royal-coster";
const mainPageUrlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates?slug=why-royal-coster&lang=nl";

export default function WhyRoyalCoster() {
  const [pageData, setPageData] = useState();
  const [loaded, setLoaded] = useState(false);
  const { locale } = useRouter();
  let mainPageUrl;
  if ( locale === "nl" ) {
    mainPageUrl = mainPageUrlNl;
  } else {
    mainPageUrl = mainPageUrlEn;
  }
  useEffect(() => {
    if (!loaded) {

      fetch(mainPageUrl, {
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        setPageData(data[0].acf)

        $("#hero").css({
          backgroundImage: "url(" + data[0].acf.image + ")"
        })
        $("em").css({
          fontStyle: "italic"
        })

      })
      setLoaded(true);
    }
  })
  return (
    <div className="why-royal-coster_page">
      <Head>
        <title>Why Royal Coster | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section" id="hero">
      {pageData && (
        <div className="r-container">
          <h1  className="title text-white col-lg-4 col-md-6 col-sm-8 text-capitalize mb-5" id="title">
            {renderHTML(pageData.title)}
          </h1>

        </div>
      )}
      </div>

      {/* Start guide section */}
      <div className="guide-section py-5">
      {pageData && (
        <div className="row r-container py-5">

          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">{renderHTML(pageData.intro_left)}</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              {renderHTML(pageData.intro_right)}
            </p>
          </div>
        </div>
      )}
      </div>
      {/* End guide section */}

      {/* Start our value section */}
      <div className="our-value-section r-container py-md-5">
        <h1 className="title py-5 my-md-5 blue-text text-center">Our <span>Core</span><br />Values</h1>
        <div className="idea-panel round text-center p-5">
          <img className="mark-image mb-5" src="/img/common/mobile_logo.png" alt="mark-image" />
          <div className="text-panel d-flex justify-content-md-evenly justify-content-between flex-wrap flex-sm-row flex-column text-start">
            <p><span>C</span>raftsmanship</p>
            <p><span>O</span>penness</p>
            <p><span>S</span>upportive</p>
            <p><span>T</span>rustworthy</p>
            <p><span>E</span>xceptional</p>
            <p><span>R</span>oyal</p>
          </div>
        </div>
        <div className="top-pink-box" />
        <div className="bottom-blue-box" />
        <div className="bottom-pink-box" />
      </div>
      {/* End our value section */}

      {/* Start passport section */}
      {pageData && (
      <div className="passpost-section text-white py-5">
        <div className="r-container py-md-5 d-flex justify-content-between flex-column flex-md-row align-items-md-center">
          <h3 className="title mb-4 mb-md-0">{renderHTML(pageData.blue_left)}</h3>
          {renderHTML(pageData.blue_right)}
        </div>
      </div>
      )}
      {/* End passport section */}
      {pageData && loaded &&
        pageData.answersdata.map((item, index) => {
          return (
            <AnswerPanel key={index} data={item} />
          )
        })}


      {/* Start foundation section */}

      <div className="foundation-section">

        <div className="r-container pt-md-5 pb-5 row">
          <div className="text-panel my-5 pe-md-5 col-md-5 col-lg-3">
            {pageData && (
              <h3 className="title blue-text mb-5 text-capitalize">{pageData.bottom_left_title}</h3>
            )}
          {pageData && (
            <p className="mb-0">{renderHTML(pageData.bottom_bottom_text)}</p>
          )}
          {pageData && (
            <a href={pageData.bottom_slug}  >
              <div className="book-panel round d-flex justify-content-center align-items-center" style={{marginTop:-40,backgroundColor:"transparent",height:"90%"}}><img style={{maxHeight:"100%"}} src={pageData.bottom_image} /></div>
            </a>
          )}
          </div>

        </div>

      </div>

      {/* End foundation section */}

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
