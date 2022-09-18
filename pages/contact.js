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
import { RiMailFill, RiPhoneFill, RiWhatsappFill, RiMessengerFill } from "react-icons/ri";
import { useRouter } from "next/router";

const noteDataEn = [
  "Monday: 9: 00 AM – 5: 00 PM",
  "Tuesday: 9: 00 AM – 5: 00 PM",
  "Wednesday: 9: 00 AM – 5: 00 PM",
  "Thursday: 9: 00 AM – 5: 00 PM",
  "Friday: 9: 00 AM – 5: 00 PM",
  "Saturday: 9: 00 AM – 5: 00 PM",
  "Sunday: 9: 00 AM – 5: 00 PM",
]

const noteDataNl = [
  "Maandag: 09: 00 – 17: 00",
  "Dinsdag: 09: 00 – 17: 00",
  "Woensdag: 09: 00 – 17: 00",
  "Donderdag: 09: 00 – 17: 00",
  "Vrijdag: 09: 00 – 17: 00",
  "Zaterdag: 09: 00 – 17: 00",
  "Zondag: 09: 00 – 17: 00",
]

export default function ContactUs() {
  const { locale } = useRouter();
  let noteData = []
  if (locale === "nl") {
    noteData = noteDataNl
  } else {
    noteData = noteDataEn
  }
  const [country1, setCountry1] = useState();
useEffect(() => {
    $("#appointmentForm").find("#online").val("book_appointment_contact_online");
    $("#appointmentForm").find("#visit").val("book_appointment_contact");
    $("#appointmentForm").find("#idvisit").val("005");
    $("#appointmentForm").find("#idonline").val("006");
     /*  localStorage.setItem("online", "book_appointment_contact_online");
       localStorage.setItem("visit", "book_appointment_contact");
       localStorage.setItem("idvisit", "005");
       localStorage.setItem("idonline", "006");
       localStorage.setItem("eidonline", "16");
       localStorage.setItem("eidvisit", "11");*/
    var fsb = false;

   $.getScript("/jqueryui.js", function() {
     $.getScript("/jquery.validate.js", function() {
       console.log("/translations/errors_" + ((locale != "en") ? locale : "nl") + ".json");
        fetch("/translations/errors_" + ((locale != "en") ? locale : "nl") + ".json" , {
            method: "get",

          })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            var errs = [];
            if (locale == "en") {
              for (var key in data) {
                errs[key] = key;
              }
            } else {
              errs = data;
            }
        
               var el = $("#visitDate");
               el.datepicker({
                     dateFormat: "dd-mm-yy",
                     onSelect: function(dateText) {
                       el.attr("realdate", moment(el.datepicker("getDate")).format("YYYY-MM-DD HH:mm:ss"))
                    }
                 });
                 el.datepicker("setDate", moment(new Date()).format("DD-MM-YYYY"));
                 $("#sendMail").show()

               jQuery.validator.addMethod("phone", function(phone_number, element) {
                   phone_number = phone_number.replace(/\s+/g, "");
                   return this.optional(element) || phone_number.length > 9 &&
                   phone_number.match(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/);
               }, "Please specify a valid phone number");

                 $("#contactForm").validate({
                   rules: {

                     lastName: {
                         required: true
                     },
                     email: {
                       required: true,
                       email: true
                     },
                     visitDate: {
                       required: true,

                     },
                     phoneNumber: {
                       phone: true,
                       required: true
                     },
                     guest: {
                       required: true
                     },
                     moreInformation: {
                       required: true
                     }
                   },
                   messages: {
                     lastNeme: {
                       required: errs["This field is required"]
                     },
                     visitDate: {
                       required: errs["This field is required"]
                     },
                     email: {
                       required: errs["This field is required"],
                       email: errs["Please enter valid email"]
                     },
                     phoneNumber: {
                       required: errs["This field is required"],
                       phone: errs["Please enter valid phone number"]
                     },
                     guest: {
                       required: errs["This field is required"],
                     },
                     moreInformation: {
                       required: errs["This field is required"],
                    },
                   },
                   submitHandler: function(form) {
                     $.ajax({
                       url: "https://costercatalog.com/api/index.php?request=contactSupport" + "&" + $("#contactForm").serialize(),
                       type: "GET",
                       dataType: "json",
                       success:function(res) {
                         console.log($("#contactForm").serialize());
                         var rsp = [
                           {name: "first_name", value: $("#firstName").val()},
                            {name: "your_email", value: $("#email").val()},
                            {name: "your_phone_number", value: $("#phoneNumber").val()},
                            {name: "your_message", value: $("#moreInformation").val().replace(/(?:\r\n|\r|\n)/g, '<br>')}
                         ];
                         var dll = {
                          event: "contact_form",
                           formId: "004",
                           response: rsp
                         }
                         dataLayer.push(dll);
                         window.location.href="/thank-you-contact?option=contact"
                       }
                     })

                   }
               })
             })
           })
       })
   })


  return (
    <div className="contactus_page">
      <Head>
        <title>Contact Us | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <p className="text-capitalize mb-0">{locale === "nl" ? "180 jaar ervaring tot uw dienst" : "180 years of experience at your service"}</p>
          <h1 className="title text-white text-capitalize mb-5">
            {locale === "nl" ? "Wij helpen u graag!" : "Contact a diamond"}<br />{locale === "nl" ? "" : "consultant"}
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">{locale === "nl" ? "Neem contact op" : "Get in touch"}</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              {locale === "nl" ? "Kunt u niet vinden wat u zocht? Vertel ons uw wensen zo gedetailleerd mogelijk en een diamantconsulent neemt spoedig contact met u op." : "Couldn’t find what you were looking for? Tell us your wishes as detailed as possible and a diamond consultant will get in touch with you shortly."}
            </p>
            <p className="guide-text mb-4">
              {locale === "nl" ? "Neem voor vragen over cadeaus en sieraden contact op met een verkoopprofessional. Neem voor begeleiding bij engagement contact op met een diamantconsulent." : "For questions about gifting and jewelry, contact a sales professional. For engagement guidance, contact a diamond consultant."}
            </p>
            <p className="guide-text mb-0">
              {locale === "nl" ? "U kunt ook onderstaand formulier invullen, dan nemen wij zo spoedig mogelijk contact met u op." : "You can also fill out the form below and we will get back to you as soon as possible."}
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start ask section */}
      <div className="ask-section">
        <div className="r-container ask-main-panel round row p-md-5 p-4">
          <form id="contactForm" className="col-md-6 p-md-4 mt-md-0 mt-5 p-0">
            <h3 className="title mb-5">{locale === "nl" ? "Vraag ons alles" : "Ask Us Anything"}</h3>
            <input type="text" className="form-control p-4 mb-4 round-form" name="firstName" id="firstName1" placeholder={locale === "nl" ? "Voornaam" : "First Name"} />
            <input type="text" className="form-control p-4 mb-4 round-form" name="lastName" id="lastName1" placeholder={locale === "nl" ? "Achternaam" : "Last Name"} />
            <input className="form-control p-4 mb-4 round-form" type="email" name="email" id="email"  placeholder={locale === "nl" ? "E-mailadres" : "Email Adress"} />
            <input type="number" className="form-control p-4 mb-4 round-form" name="phoneNumber" id="phoneNumber" placeholder={locale === "nl" ? "Telefoonnummer" : "Phone number"} />
            <textarea className="form-control p-4 mb-4 round-form" name="moreInformation" id="moreInformation" rows="3"></textarea>
            <br /><button id="sendMail"  style={{display:"none",fontSize:15}} className='btn blue-btn round-form px-4 py-2 text-uppercase'>{locale === "nl" ? "Indienen" : "submit"}</button>

          </form>

          <div className="col-md-6 ps-md-4 p-0 mt-0 order-md-last order-first">
            <div className="link-panel p-md-5 p-3 round d-flex justify-content-between">
              <Link href="javascript:$('#contactForm').submit()">
                <a  >
                  <div className="rounded-circle d-flex justify-content-center align-items-center">
                    <RiMailFill />
                  </div>
                </a>
              </Link>
              <Link href="tel:0203055555">
                <a>
                  <div className="rounded-circle d-flex justify-content-center align-items-center">
                    <RiPhoneFill />
                  </div>
                </a>
              </Link>
              <Link href="https://www.facebook.com/RoyalCosterDiamonds">
                <a>
                  <div className="rounded-circle d-flex justify-content-center align-items-center">
                    <RiMessengerFill />
                  </div>
                </a>
              </Link>
              <Link href="https://wa.me/31629705658">
                <a>
                  <div className="rounded-circle d-flex justify-content-center align-items-center">
                    <RiWhatsappFill />
                  </div>
                </a>
              </Link>
            </div>
            <div className="note-panel round mt-4 py-5 px-md-5 px-4">

              {
                noteData.map((note, index) => {
                  return (
                    <p key={index} className={"m-0 " + (index != 0 && "mt-4")}>{note}</p>
                  )
                })
              }
              <div id="direction" />
            </div>
          </div>
        </div>
      </div>
      {/* End ask section */}
      <div className="map-section r-container round p-5 mt-5">
        <h3 className="title mt-md-5 mb-5 blue-text">{locale === "nl" ? "Routeplanner" : "Direction"}</h3>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.5967266461016!2d4.880994015994667!3d52.35959905585618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609ef0246f37f%3A0x3cc8701575536c70!2sRoyal%20Coster%20Diamonds!5e0!3m2!1sen!2sru!4v1632814327214!5m2!1sen!2sru" width="100%" height="450" className="p-0 round mb-md-5" allowFullScreen="" loading="lazy"></iframe>
      </div>

      {/* Start banner section */}
      <div className="banner-section r-container round row mt-5 mb-4">
        <div className="text-panel col-lg-6 col-12 p-0 p-md-5 p-sm-3">
          <h3 className="title text-capitalize px-5 pt-5 mb-5">{locale === "nl" ? "Onze diamant" : "Our Diamond"}<br /><span>{locale === "nl" ? "adviseurs" : "Consultants"}</span></h3>
          <div className="description mb-5 px-5">
            <p>{locale === "nl" ? "Onze Diamond Consultants zijn hoogopgeleide en ervaren experts op het gebied van diamanten, diamanten juwelen, mode en trends." : "Our Diamond Consultants are highly trained and experienced experts in the field of diamonds, diamond jewelry, fashion and trends."}</p>
            <p>{locale === "nl" ? "Plan een gesprek met een diamantconsulent om u te helpen bij het kiezen van een verlovingsring, trouwringen of dat unieke jubileumgeschenk." : "Schedule a call with a Diamond Consultant to help you choose an engagement ring, wedding bands or that unique anniversary gift."}</p>
          </div>
          <button className="btn pink-btn round-form ms-5 mb-5 text-uppercase py-3 px-5"
            data-bs-toggle="modal"
            data-bs-target="#appointment">{locale === "nl" ? "BOEK AFSPRAAK" : "BOOK APPOINTMENT"}</button>
        </div>
        <div className="bg-panel col-lg-6 col-12 order-first order-lg-last"></div>
      </div>
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
