import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import NumberFormat from "react-number-format";
import AppointmentModal from "../components/appointmentModal";
import renderHTML from "react-render-html";
import WatchItems from "../components/watchItems";
import { RiArrowRightSFill, RiMailFill, RiPhoneFill, RiWhatsappFill, RiDvdFill } from "react-icons/ri";
import router, { useRouter } from "next/router";


const noteData = [
  "Monday: 9: 00 AM – 5: 00 PM",
  "Tuesday: 9: 00 AM – 5: 00 PM",
  "Wednesday: 9: 00 AM – 5: 00 PM",
  "Thursday: 9: 00 AM – 5: 00 PM",
  "Friday: 9: 00 AM – 5: 00 PM",
  "Saturday: 9: 00 AM – 5: 00 PM",
  "Sunday: 9: 00 AM – 5: 00 PM",
]

const cardData = [
  { title: "annual bonus", content: "You will receive an annual bonus that can be as much as <em>10%</em> on your total purchases at Royal Coster Diamonds. You will receive the bonus at every beginning of the year in the form of a <em>cheque</em>." },
  { title: "Discount on Purchase", content: "At Royal Coster Diamonds you will get <em>discounts</em> on items from our store." },
  { title: "We Clean Jewelry for free", content: "Of course you want your jewelry to be <em>clean</em> and <em>shiny</em>. As a member of The 1840 Club, we will clean it once a year for you." },
  //{ title: "Join Royal-for-a-day Program", content: "You can participate in our exclusive <strong>Royal-For-a-Day</strong> program where you can borrow a very exclusive piece of jewelry once a year." },
  { title: "Discounts & Tickets from partners", content: "Discounts on selected <em>events</em> and <em>tickets</em> from partners of The 1840 Club, such as a discount on access to a cruise." },
  { title: "Invite to special events", content: "You will get exclusive <em>invitations</em> to special events, such as …" },
  { title: "First to know", content: "Be the first to know about all <em>promotions</em> including our annual sale." },
]

export default function Vip() {
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
    delete localStorage.vip;
    $("em").css({
      fontStyle: "italic",
      fontSize: 21
    })
    if ($(window).width() < 576) {
      $("[card]").bind("click", function() {
        $(this).closest("div").find("p").toggle();
      })
    } else {

      $(".discription").show();
    }
    $("#joinvip").unbind("click");
    $("#joinvip").bind("click", function() {
       localStorage.vip = "1";
       window.location.href = "/myaccount/register";
    })
  })
  return (
    <div className="vip_page">
      <Head>
        <title>VIP | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-white text-capitalize mb-5 text-center">
          {locale === "nl" ? "Ons" : "Our"} <span>{locale === "nl" ? "Premie" : "Premium"}</span><br />{locale === "nl" ? "beloningsprogramma" : "rewards program"}
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section py-5">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">{locale === "nl" ? "Het Diamond Privilege" : "The Diamond Privilege"}</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
            {locale === "nl" ? "De 1840 Club is ontstaan omdat we onze trouwe klanten graag verwennen met bijzondere privileges. Als lid van deze exclusieve club profiteer je van" : "The 1840 Club was created, because we like to spoil our loyal customers with special privileges. As a member of this exclusive club you profit from "}<em>{locale === "nl" ? "meerdere/uitnodigend/interessant" : "several/inviting/interesting"}</em> {locale === "nl" ? "een uitkering." : "benefits."} </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start benifit section */}
      <div className="benifit-section r-container pt-5">
        <div className="top-panel py-5">
          <div className="text-panel py-md-5">
            <h3 className="title text-capitalize text-center blue-text mb-4">{locale === "nl" ? "Voordelen van" : "Benefits of"}<br />{locale === "nl" ? "Lid geweest" : "Been A Member"}</h3>
            <p className="description text-center dark-text mb-5">{locale === "nl" ? "Als lid van The 1840 Club ben je" : "As a member of The 1840 Club you"}<br className="d-sm-block d-none" />{locale === "nl" ? "krijgt voor altijd de volgende privileges:" : "will receive the following privileges forever:"}
            </p>
            <div className="btn-panel text-center">
              <button id="joinvip" className="btn btn-join blue-btn text-uppercase px-5 py-3 round-form">{locale === "nl" ? "doe nu mee" : "join now"}</button>
            </div>
          </div>
        </div>
        <div className="card-panel row">
          {
            cardData.map((card, index) => {
              return (
                <div className="col-lg-4 col-md-6 mb-4 d-flex" card="1" key={index}>
                  <div className="round card-item p-4">
                    <h3 className="title blue-text text-capitalize">{card.title}</h3>
                    <p className="discription dark-text">{renderHTML(card.content)}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      {/* End binifit section */}

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
