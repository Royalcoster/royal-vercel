import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import renderHTML from "react-render-html";
import ReactFlagsSelect from "react-flags-select";
import { useRouter } from "next/router";

export default function ThankYouVIP() {
  const [selected, setSelected] = useState("LU");
  const { locale } = useRouter();

  return (
    <div className="thank-you_page  thank-you_page-VIP">
      <Head>
        <title>Thank You | Royal Coster</title>
      </Head>
      <div className="thank-you_header">
        <div className="top-bar px-5 py-3">
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
      <div className="text-panel text-center r-container mx-auto mt-md-5 mb-5">
        <h1 className="title text-capitalize blue-text my-5">{locale === "nl" ? "Bedankt voor je lidmaatschap van de VIP-club" : "Thank you for Joining VIP club"}</h1>
        <p className="description dark-text pb-5">{locale === "nl" ? "Je hebt onlangs verzocht om lid te worden van de VIP Club via onze website. Dankjewel voor je aanvraag. Controleer alstublieft uw mail. De service wordt zo snel mogelijk uitgevoerd. Ondertussen lees je hier de" : "Your recently requested to join VIP Club from our website. Thank you for your request. Please check your mail. The service will fulfill as soon as possible. In the mean time, here you can read the"} <span className="text-decoration-underline">{locale === "nl" ? "regels van de zorg!" : "rules of care!"}</span></p>
      </div>
      <div className="list-panel round p-4 mx-auto">
        <div className="d-flex justify-content-between booking-panel">
          <p>{locale === "nl" ? "Lid worden van een club" : "Joining Club"}</p>
          <p>{locale === "nl" ? "Gevraagde datum" : "Requested Date"}</p>
        </div>
        <div className="experience-panel d-flex justify-content-between">
          <div className="experience-box">
            <h3 className="blue-text">{locale === "nl" ? "VIP-club" : "VIP Club"}</h3>
            <p>1 Person  -  <span>$400.50</span></p>
          </div>
          <h3 className="blue-text text-end">{locale === "nl" ? "Zondag 9 oktober" : "Sunday, October 9th"}<br/>2021 @ 18:00 - 11:42</h3>
        </div>
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
      <div className="top-pink-panel" />
      <div className="bottom-blue-panel" />
      <div className="bottom-pink-panel" />
    </div>
  );
}
