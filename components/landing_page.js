import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import NumberFormat from "react-number-format";
import AppointmentModal from "../components/appointmentModal";
import renderHTML from "react-render-html";
import Instagram from "../components/instagram";
import { RiArrowRightSFill, RiMailFill, RiPhoneFill, RiWhatsappFill, RiDvdFill, RiPlayCircleFill } from "react-icons/ri";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CollectionDetails from "../components/collectionDetails";
import "swiper/css";



SwiperCore.use([Autoplay, Navigation]);
/*export async function getStaticProps() {
  let data = {};
    const res = await fetch(mainPageUrl, {
      method: "get",
    });
    data = await res.json();
  return {
    props: {
      data,
    },
  };
}*/
export default function LandingPage() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [pageTitle, setPageTitle] = useState("");
  const [mainPageImage, setmainPageImage] = useState("");
  const [collectionData, setCollectionData] = useState([]);
  const [collectionSlider, setCollectionSlider] = useState([]);
  const [rendered, setRendered] = useState(false);
  const [collectionHandle, setCollectionHandle] = useState();
  const [shopifyTag, setShopifyTag] = useState();
    const [isMobile, setIsMobile] = useState();
    var  mainPageUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates?slug=wedding-consult";

  useEffect(() => {
      if (!rendered) {
        setIsMobile((window.innerWidth < 576) ? true : false);
        fetch(mainPageUrl, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => {
            setRendered(true);
            var d = res[0].acf;
            setPageTitle(d.header[0].text);
            $("#pageTitle").css({
              textAlign: "left"
            })
            $("[intro_left_text]").html(d.intro[0].intro_left_text);
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
            setCollectionHandle(d.royalcoster_slug)
            setShopifyTag(d.shipify_tag)
            var ww = setInterval(function() {
              if ($("#more").length > 0) {
                clearInterval(ww);
                $("#more").bind("click", function() {
                  window.location.href = "/collections/" + d.royalcoster_slug;
                })
              }
            }, 100)
          $.getScript("/jqueryui.js", function() {
            $.getScript("/jquery.validate.js", function() {
                var el = $("#visitDateWedding");

                el.datepicker({
                      dateFormat: "dd-mm-yy",
                      onSelect: function(dateText) {
                        el.attr("realdate", moment(el.datepicker("getDate")).format("YYYY-MM-DD HH:mm:ss"))
                     }
                  });
                  el.datepicker("setDate", moment(new Date()).format("DD-MM-YYYY"));
                  $("#sendMail").show()
                  $("#sendMail").unbind("click");
                  $("#sendMail").bind("click", function() {

                    $('#contactForm').submit();
                  });
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
                      visitDateWedding: {
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
                      $("#wUrl").val(window.location.href);
                      $.ajax({
                        url: "https://costercatalog.com/api/index.php?request=contactSupportWedding" + "&" + $("#contactForm").serialize(),
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

    }

  })
  return (

    <div className="collection-detail_page">
      <Head>
        <title>Royal Coster</title>
        <script async src="/jqueryui.js"></script>
              <script async src="/jquery.validate.js"></script>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section" id="hero">
        <div className="r-container text-center">
        {pageTitle && (
         <h1 id="pageTitle"style={{width: "40%",textAlign:"left"}} className="title text-center text-capitalize pb-md-5">
              {renderHTML(pageTitle)}
          </h1>
        )}

        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section py-md-5">
        <div className="row r-container py-5">

        {1 == 1 && (
          <div className="col-md-8 col-sm-12 col-xs-12 col-8 p-0" style={{width:"100%"}}>
            <p intro_right_text="1" className="guide-text mb-4">
              With an extensive stock of loose and set diamonds, we have the most beautiful diamond jewelry Collections. For more than 180 years, our craftsmen and women create beauty that lasts for centuries.</p>
          </div>
        )}

        </div>
      </div>
      <div className="tour-detail_page">
      <div style={{paddingBottom:30}} className="overview-section r-container row pt-5">
          <div className="col-md-6 pe-lg-5">
          <div className="overview-panel pe-lg-5 mb-5">
          <h3 className="title blue-text" overview_title="1">Overview</h3>
          <p className="description dark-text" overview_text="1"><p>This workshop is for couples who are preparing for an engagement or anniversary and want to learn more about diamonds and diamond rings before they purchase. Learn everything with us.</p>
          </p></div><div className="highlight-panel pe-lg-5"><h3 className="title text-uppercase mb-4" highlights_title="1">Highlights</h3>
          <ul id="highlights" className="description">

          </ul>
          </div>
        </div>
          <div className="col-md-6 book-date-panel mt-md-0 mt-5">
                <form id="contactForm"  action="https://costercatalog.com/api/index.php?request=contactSupport" method="post" className="row contact-form">
                    <input name="wUrl" type="hidden" id="wUrl" />
                    <div className="col-lg-6 col-md-6 mb-4 col-sm-12"><input type="text" name="firstName" id="firstName1" className="form-control px-4 py-3" placeholder="FirstName" /></div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4"><input type="text" name="lastName"  id="lastName1" className="form-control px-4 py-3" placeholder="LastName" /></div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4"><input type="email" name="email" id="email" className="form-control px-4 py-3" placeholder="Email" /></div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4"><input type="number" name="phoneNumber" id="phoneNumber" className="form-control px-4 py-3" placeholder="Tel" /></div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <select className="form-select px-4 py-3" name="language" id="language" aria-label="Preferred language">
                            <option value="Dutch">Dutch</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4"><input type="number" max="2" name="guest" id="guest" className="form-control px-4 py-3" placeholder="Number of guests" /></div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <input  name="visitDateWedding"   id="visitDateWedding" type="text" className="form-control px-4 py-3" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <select className="form-select px-4 py-3" aria-label="Time" name="scheduledTime" id="scheduledTime">
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
                    <div className="col-12 mb-5"><textarea className="form-control px-4 py-3" rows="4" name="moreInformation" id="moreInformation" placeholder="More information" spellCheck="false"></textarea></div>
                </form>
                <div className="col-12 text-end"><button id="sendMail" style={{display:"none",fontSize:15}} className="btn blue-btn px-5 py-3 round-form text-uppercase">submit</button></div>

                </div>
      </div>

      </div>
      {/* End guide section */}

      {/* Start collection section */}

      {/* End collection section */}

      {/* Start our collection section */}
      {shopifyTag && collectionHandle && (
        <div className="collection-section">
            <CollectionDetails collectionHandle={collectionHandle} shopifyTag={shopifyTag} />
        </div>
      )}

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
