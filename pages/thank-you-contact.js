import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import renderHTML from "react-render-html";
import ReactFlagsSelect from "react-flags-select";
import router, { useRouter } from "next/router";

export default function ThankYouContact() {
  const [selected, setSelected] = useState("LU");
  const router = useRouter();
  const [mode, setMode] = useState("consultation");
  const { locale } = useRouter();
  useEffect(() => {
    (function(h,o,t,j,a,r){

        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3002600,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    setTimeout(function() {

        if (router.query) {
          if (router.query.option == "newsLetter") {
            setMode("newsLetter")
              dataLayer.push({
                'conversionType': router.query.option,
                'event': 'conversion'
              });
          }
          if (router.query.option == "consultation") {
            setMode("consultation")
              dataLayer.push({
                'conversionType': router.query.option,
                'event': 'conversion'
              });
          }
        }
    }, 1000)
  });
  return (

    <div className="thank-you_page  thank-you_page-contact d-flex flex-column justify-content-between pb-5">
      <Head>
        <title>Thank You | Royal Coster</title>
      </Head>
      <div className="thank-you_header">
        <div className="top-bar px-5 py-3 mb-5">
          <div className="r-container d-flex justify-content-between align-items-center">
            <Link passHref={true} href="#">
              <a>{locale === "nl" ? "WAAROM KONINKLIJKE COSTER?" : "WHY ROYAL COSTER ?"}</a>
            </Link>
            <ReactFlagsSelect
              showSelectedLabel={false}
              showSecondarySelectedLabel={false}
              showOptionLabel={false}
              showSecondaryOptionLabel={false}
              selectedSize={14}
              optionsSize={14}
              fullWidth={false}
              selected={selected}
              onSelect={(code) => setSelected(code)}
              placeholder=" "
              className="flag-select pb-0"
            />
          </div>
        </div >
        <div className="logo-bar text-center py-5">
          <Link href="/">
            <a>
              <img src="/img/common/thank-you_logo.png" alt="logo-img" />
            </a>
          </Link>
        </div>
      </div >

      {router.query.option == "consultation" && (
        <div>
          <div className="text-panel text-center r-container mx-auto ">
            <h1 className="title  blue-text my-5">{locale === "nl" ? "Bedankt voor het plannen van een afspraak met ons!" : "Thank you for scheduling an appointment with us!"}</h1>
            <p className="description dark-text pb-5">{locale === "nl" ? "We kijken er naar uit je te ontmoeten." : "We are looking forward to meeting you."}</p>
          </div>
          <div className="btn-panel d-flex py-5 mb-5  justify-content-center">
            <Link href="/">
              <a className="btn blue-btn px-5 py-3 btn-home text-uppercase me-4 round-form">
              {locale === "nl" ? "terug naar huis" : "back to home"}
              </a>
            </Link>
            <button className="btn btn-subscribe text-uppercase round-form px-5 py-3">
            {locale === "nl" ? "Abonneren" : "Subscribe"}
            </button>
          </div>
        </div>
      )}
      {router.query.option == "enquiry" && (
        <div>
          <div className="text-panel text-center r-container mx-auto ">
            <h1 className="title  blue-text my-5">{locale === "nl" ? "Bedankt voor uw aanvraag!" : "Thank you for your enquiry!"}</h1>
            <p className="description dark-text pb-5">{locale === "nl" ? "We hebben uw aanvraag ontvangen en nemen spoedig contact met u op." : "We have received your request and will soon be in touch with you."}</p>
          </div>
          <div className="btn-panel d-flex py-5 mb-5  justify-content-center">
            <Link href="/">
              <a className="btn blue-btn px-5 py-3 btn-home text-uppercase me-4 round-form">
              {locale === "nl" ? "terug naar huis" : "back to home"}
              </a>
            </Link>
            <button className="btn btn-subscribe text-uppercase round-form px-5 py-3">
            {locale === "nl" ? "Abonneren" : "Subscribe"}
            </button>
          </div>
        </div>
      )}
      {router.query.option == "newsletter" && (
        <div>
          <div className="text-panel text-center r-container mx-auto ">
            <h1 className="title  blue-text my-5">{locale === "nl" ? "Bedankt voor het abonneren op onze nieuwsbrief!" : "Thank you for subscribing to our newsletter!"}</h1>
          </div>
          <div className="btn-panel d-flex py-5 mb-5  justify-content-center">
            <Link href="/">
              <a className="btn blue-btn px-5 py-3 btn-home text-uppercase me-4 round-form">
              {locale === "nl" ? "Terug naar home" : "back to home"}
              </a>
            </Link>
          </div>
        </div>
      )}
      {router.query.option == "contact" && (
        <div>
          <div className="text-panel text-center r-container mx-auto ">
            <h1 className="title  blue-text my-5">{locale === "nl" ? "Bedankt dat je contact met ons hebt opgenomen!" : "Thank you for contacting us!"}</h1>
            <p className="description dark-text pb-5">{locale === "nl" ? "We hebben uw bericht ontvangen. We nemen snel contact met je op!" : "We have received your message. We’ll reach out to you soon!"}</p>
          </div>
          <div className="btn-panel d-flex py-5 mb-5  justify-content-center">
            <Link href="/">
              <a className="btn blue-btn px-5 py-3 btn-home text-uppercase me-4 round-form">
              {locale === "nl" ? "terug naar huis" : "back to home"}
              </a>
            </Link>
            <button className="btn btn-subscribe text-uppercase round-form px-5 py-3">
            {locale === "nl" ? "Abonneren" : "Subscribe"}
            </button>
          </div>
        </div>
      )}
      <div className="top-pink-panel" />
      <div className="bottom-blue-panel" />
      <div className="bottom-pink-panel" />
    </div>
  );
}
