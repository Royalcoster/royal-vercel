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
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ToursDetails from "../components/toursDetails";
import "swiper/css";
import { useRouter } from "next/router";


SwiperCore.use([Autoplay, Navigation]);

const noteDataEn = [
  "Monday: 09: 00 AM – 05: 00 PM",
  "Tuesday: 09: 00 AM – 05: 00 PM",
  "Wednesday: 09: 00 AM – 05: 00 PM",
  "Thursday: 09: 00 AM – 05: 00 PM",
  "Friday: 09: 00 AM – 05: 00 PM",
  "Saturday: 09: 00 AM – 05: 00 PM",
  "Sunday: 09: 00 AM – 05: 00 PM",
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

export default function Appointment() {
  const [pageTitle, setPageTitle] = useState();
  var  mainPageUrlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates?slug=appointment";
  var  mainPageUrlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates?slug=appointment&lang=nl";
  const { locale } = useRouter();
  let mainPageUrl;
  let noteData;
  if ( locale === "nl" ) {
    mainPageUrl = mainPageUrlNl;
    noteData = noteDataNl;
  } else {
    mainPageUrl = mainPageUrlEn;
    noteData = noteDataEn;
  }
  useEffect(() => {
    $("#appointmentForm").find("#online").val("book_appointment_page_online");
  $("#appointmentForm").find("#visit").val("book_appointment_page");
  $("#appointmentForm").find("#idvisit").val("0107");
  $("#appointmentForm").find("#idonline").val("008");
    fetch(mainPageUrl, {
      method: "GET",
   })
     .then((res) => res.json())
     .then((res) => {

       var d = res[0].acf;
       setPageTitle(d.header[0].text);
       $("#pageTitle").css({
         textAlign: "left"
       })
       $("#pageTitle").find("*").css({
         fontSize: "unset !important"
       })
       $("[intro_left_text]").html(d.intro[0].intro_left_text);
       $("[intro_left_text]").css({
         fontSize: "4.8rem",
         fontWeight: 400,
         color: "#01215c"
       })
       $("[intro_right_text]").html(d.intro[0].intro_right_text);
       $("#hero").css({
         backgroundImage: "url(" + d.header[0].image + ")"
       })
       var cdd = [];
       var css = [];
       $("#pageTitle").css({
         color: d.header[0].text_color,
         textAlign: "left"
       })
       $("#pageTitle > p").css({
         textAlign: "left"
       })
       for (var key in d.page_data) {
         $("[" + key + "]").html(d.page_data[key]);
       }
       for (var key in d) {
         $("[" + key + "]").html(d[key]);
       }
       $.each(d.page_data.highlights_list, function() {
         $("<li className='mb-4'>" + this.highlight_text + "</li>").appendTo($("#highlights"));
       })
       $("#highlights li").css({
         lineHeight: "200%"
       })
       $("em").css({
         fontStyle: "italic"
       })
     });

   var fsb = false;
   $.getScript("/jqueryui.js", function() {
     $.getScript("/jquery.validate.js", function() {

         var el = $("#visitDateAppointment");
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
                 max: 2,
                 required: true
               },
               moreInformation: {
                 required: true
               }
             },
             submitHandler: function(form) {
               $("#aUrl").val(window.location.href);
               $.ajax({
                 url: "https://costercatalog.com/api/index.php?request=appointmentRequestPage" + "&" + $("#contactForm").serialize() + "&apUrl=" + window.location.href ,
                 type: "GET",
                 dataType: "json",
                 success:function(res) {
                   window.location.href="/thank-you-contact?option=consultation"
                 }
               })

             }
         })
       })
       })
   })


  return (
    <div className="appointment_page">
      <Head>
        <title>Schedule Appointment | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section" id="hero">
        <div className="r-container">
        {pageTitle && (
         <div id="pageTitle" style={{fontSize:"unset !important",width: "80%",textAlign:"left"}} className="title text-center text-capitalize pb-md-5">
              {renderHTML(pageTitle)}
          </div>
        )}
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 intro_left_text="1"  introclassName="title text-capitalize">{locale === "nl" ? "Neem contact op" : "Get in touch"}</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p intro_right_text="1" className="guide-text mb-4">

            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start ask section */}
      <div className="ask-section">
        <div className="r-container ask-main-panel round row p-md-5 p-4">
        <form id="contactForm" className="col-md-6 col-lg-6 p-md-4 mt-md-0 mt-5 p-0">

          <h3 className="title mb-5">{locale === "nl" ? "Plan consult" : "Schedule consult"}</h3>
            <input name="aUrl" type="hidden" id="aUrl" />
            <div className="row">
                <div className="col-lg-6 col-md-6 mb-4 col-sm-12"><input type="text" name="firstName" id="firstName1" className="form-control px-4 py-3" placeholder={locale === "nl" ? "Voornaam" : "FirstName"} /></div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4"><input type="text" name="lastName"  id="lastName1" className="form-control px-4 py-3" placeholder={locale === "nl" ? "Achternaam" : "LastName"} /></div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4"><input type="email" name="email" id="email" className="form-control px-4 py-3" placeholder="Email" /></div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4"><input type="number" name="phoneNumber" id="phoneNumber" className="form-control px-4 py-3" placeholder="Tel" /></div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                  <select style={{fontSize:15}} className="form-select px-4 py-3" name="language" id="language" aria-label="Preferred language">
                      <option value="Dutch">{locale === "nl" ? "Nederlands" : "Dutch"}</option>
                      <option value="English">{locale === "nl" ? "Engels" : "English"}</option>
                  </select>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4"><input type="number" max="2" name="guest" id="guest" className="form-control px-4 py-3" placeholder={locale === "nl" ? "Aantal gasten" : "Number of guests"} /></div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                    <input  name="visitDateAppointment"  readOnly id="visitDateAppointment" type="text" className="form-control px-4 py-3" />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                    <select style={{fontSize:15}} className="form-select px-4 py-3" aria-label="Time" name="scheduledTime" id="scheduledTime">
                        <option value="09 : 00">09 : 00</option>
                        <option value="09 : 30">09 : 30</option>
                        <option value="10 : 00">10 : 00</option>
                        <option value="10 : 30">10 : 30</option>
                        <option value="11 : 00">11 : 00</option>
                        <option value="11 : 30">11 : 30</option>
                        <option value="12 : 00">12 : 00</option>
                        <option value="12 : 30">12 : 30</option>
                        <option value="13 : 00">13 : 00</option>
                        <option value="13 : 30">13 : 30</option>
                        <option value="14 : 00">14 : 00</option>
                        <option value="14 : 30">14 : 30</option>
                        <option value="15 : 00">15 : 00</option>
                        <option value="15 : 30">15 : 30</option>
                        <option value="16 : 00">16 : 00</option>
                        <option value="16 : 30">16 : 30</option>
                    </select>
                </div>
            </div>
            <div className="col-12 mb-5"><textarea className="form-control px-4 py-3" rows="4" name="moreInformation" id="moreInformation" placeholder={locale === "nl" ? "Meer informatie" : "More information"} spellCheck="false"></textarea></div>
            <div className="col-12 text-end"><button id="sendMail" style={{display:"none",fontSize:15}} className="btn blue-btn px-5 py-3 round-form text-uppercase">{locale === "nl" ? "Indienen" : "Submit"}</button></div>

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
      <div className="guide-section pt-5">
        <div className="row r-container pt-5" style={{backgroundColor: "transparent"}}>
          <div className="title-panel pb-5" style={{backgroundColor: "transparent"}}>
            <h3 className="title mb-lg-5 text-left py-5 blue-text">{locale === "nl" ? "Meer" : "More"} <span>{locale === "nl" ? "Rondleidingen" : "Tours"}</span> & {locale === "nl" ? "Ervaringen" : "Experiences"}</h3>
          </div>
              <ToursDetails />
        </div>
      </div>
      <Schedule />

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}


    </div >
  );
}
