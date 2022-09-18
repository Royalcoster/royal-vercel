import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import CraftingIdea from "../components/craftingIdea";
import Instagram from "../components/instagram";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import renderHTML from "react-render-html";
import { useRouter } from "next/router";

const timeLineListsEn = [
  {
    title: "Share your thoughts.",
    description:
      "Contact our design team and let us know what kind of jewelry you would like to make. The more detailed your requirements are, the easier it is for us to make the jewelry you want. Together we will discuss all the possibilities of creating your dream piece.",
    image: "item-1.png",
  },
  {
    title: "Design your piece.",
    description:
      "Once you have a clear idea in mind of your design, our team will start working on the details of your item. This is a collaborative process between you and our designer. To better illustrate your vision, we can give you drawings, computer designs and models of jewelry. Our experts go into production only when you are completely satisfied with the results.",
    image: "item-2.png",
  },
  {
    title: "Get the jewelry of your dreams.",
    description:
      "Once you have approved the design, our team will start working on the creation. During the process, they will keep you informed about the status by sending photos and other related content. When finished, the item can either be picked up or be send to you and then your dream jewel is ready to be worn!",
    image: "item-3.png",
  },
];
const timeLineListsNl = [
  {
    title: "deel uw ideeën",
    description:
      "Neem contact op met ons ontwerpteam en laat ons weten wat voor soort sieraad u wilt ontwerpen. Hoe gedetailleerder uw ideeën zijn, hoe makkelijker het voor ons ontwerpteam is om uw droom sieraad te ontwerpen. Gedurende het gehele traject van ontwerpen houdt u contact met het ontwerpteam, om zo uw perfecte sieraad te creëren.",
    image: "item-1.png",
  },
  {
    title: "Ontwerp uw sieraad",
    description:
      "Zodra u een duidelijk beeld heeft van uw ontwerp, gaat ons team aan de slag met uw sieraad. Dit is een samenwerkingsproces tussen jou en onze ontwerper. Om uw visie beter te illustreren, kunnen we u tekeningen, computerontwerpen en modellen van sieraden opsturen. Onze experts gaan pas in productie als u helemaal tevreden bent met het resultaat.",
    image: "item-2.png",
  },
  {
    title: "Ontvang het sieraad van uw dromen",
    description:
      "Na goedkeuring van het ontwerp gaat ons team aan de slag met de uw sieraad. Tijdens het proces houden wij u op de hoogte van de status door foto's en andere gerelateerde inhoud te sturen. Wij doen er alles aan om uw droom sieraad zo snel mogelijk te creëren.",
    image: "item-3.png",
  },
];

const mainPageUrlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates?slug=custom-jewelry";
const mainPageUrlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates?slug=custom-jewelry&lang=nl";
let signatureSliders = [
  { url: "product-1.png", reference:"/collection/empress-collection" },
  { url: "product-2.png", reference:"/collection/rainbow-collection" },
  { url: "product-3.png", reference:"/collection/touch-of-glam" },
  { url: "product-4.png", reference:"/collection/wedding-ring-collection" },
];

SwiperCore.use([Autoplay, Navigation]);

const urlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates/327322";
const urlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/page_templates/329507";

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

export default function Bespoke(props) {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [pageData, setPageData] = useState();
  const [loaded, setLoaded] = useState(false);
  const { locale } = useRouter();
  let data = {};
  let mainPageUrl;
  let timeLineLists;
  if ( locale === "nl" ) {
    data = props.dataNl;
    mainPageUrl = mainPageUrlNl;
    timeLineLists = timeLineListsNl;
  } else {
    data = props.dataEn;
    mainPageUrl = mainPageUrlEn;
    timeLineLists = timeLineListsEn;
  }
  const seoData = data.yoast_head_json;
  useEffect(() => {
    if (!loaded) {
      $("#appointmentForm").find("#online").val("book_appointment_custom_jewelry");
    $("#appointmentForm").find("#visit").val("book_appointment_custom_jewelry_online");
    $("#appointmentForm").find("#idvisit").val("026");
    $("#appointmentForm").find("#idonline").val("027");
      setLoaded(true);
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
    }
  })
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
    document.addEventListener("scroll", () => {
      if (document.querySelectorAll(".MuiTimelineItem-root"))
        document
          .querySelectorAll(".MuiTimelineItem-root")
          .forEach((element) => {
            if (
              element.offsetTop - element.offsetHeight < window.scrollY &&
              window.scrollY < element.offsetTop + element.offsetHeight
            ) {
              if (!element.classList.contains("active")) {
                element.classList.add("active");
              } else {
              }
            } else
              element.classList.contains("active") &&
                element.classList.remove("active");
          });
    });
  }, []);
  return (
    <div className="bespoke_page">
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
    {pageData &&  (
      <div className="hero-section" id="hero">
        <div className="r-container">

          <h1 className="title text-white text-capitalize">
            {renderHTML(pageData.title)}
          </h1>
        </div>

      </div>
    )}
      {/* End Hero section */}

      {/* Start guide section */}
    {pageData &&  (
      <div className="guide-section py-5">
        <div className="row r-container py-sm-5 py-3">

          <div className="col-lg-3 col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">{renderHTML(pageData.intro_left)}</h3>
          </div>
          <div className="col-lg-9 col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text">
            {renderHTML(pageData.intro_right)}
            </p>
          </div>
        </div>
      </div>
    )}
      {/* End guide section */}

      {/* Start journey section */}
      <div className="journey-section py-5 r-container">
        {locale === "en" && (
          <h3 className="title text-capitalize text-sm-center mt-sm-5 py-5">
            The <span>Journey</span>
            <br />
            of Jewel
          </h3>
        )}
        {locale === "nl" && (
          <h3 className="title text-capitalize text-sm-center mt-sm-5 py-5">
            Van droom tot
            <br />
            werkelijkheid
          </h3>
        )}
        <Timeline className="time-line time-line-mobile d-lg-none d-block mb-0 pb-0 px-0">
          {timeLineLists.map((item, index) => {
            return (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot className={"line-dot-" + index} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <img
                    src={"/img/bespoke/" + item.image}
                    className="item-image mb-5"
                    alt="timeLine-image"
                    data-aos-duration={700}
                    data-aos-once={true}
                    data-aos={index % 2 == 1 ? "fade-right" : "fade-left"}
                  />
                  <div
                    className="text-panel mb-5 pb-5"
                    data-aos={index % 2 == 0 ? "fade-right" : "fade-left"}
                    data-aos-duration={400}
                    data-aos-once={true}
                  >
                    <p className="item-step m-0 pb-4 text-uppercase">
                      {locale === "nl" ? "Stap" : "Step"} {index + 1}
                    </p>
                    <h3 className="item-title m-0 pb-5">{item.title}</h3>
                    <p className="item-description">{item.description}</p>
                  </div>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>

        <Timeline
          className="time-line d-lg-block d-none mb-0 pb-0"
          align="alternate"
        >
          {timeLineLists.map((item, index) => {
            return (
              <TimelineItem key={index}>
                <TimelineOppositeContent>
                  <div
                    className="text-panel"
                    data-aos={index % 2 == 0 ? "fade-right" : "fade-left"}
                    data-aos-duration={400}
                    data-aos-once={true}
                  >
                    <p className="item-step m-0 pb-4 text-uppercase">
                      Step {index + 1}
                    </p>
                    <h3 className="item-title m-0 pb-5">{item.title}</h3>
                    <p className="item-description">{item.description}</p>
                  </div>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot className={"line-dot-" + index} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>
                    <img
                      src={"/img/bespoke/" + item.image}
                      className="item-image"
                      alt="timeLine-image"
                      data-aos-duration={700}
                      data-aos-once={true}
                      data-aos={index % 2 == 1 ? "fade-right" : "fade-left"}
                    />
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
        <div className="btn-panel text-center pb-5 mb-5">
          <button className="btn blue-btn round-form text-uppercase px-5 py-3 mb-5" data-bs-toggle="modal" data-bs-target="#enquiryModal">
            send an enquiry
          </button>
        </div>
      </div>
      {/* End journey section */}
      {/* Start signature section */}
      <div className="signature-section pt-sm-5">
        <div className="title-panel py-5">

          <div className="r-container">

            <div className="row mt-5 mx-0">
              <div className="col-md-6 p-0 pe-5 py-5">
              {pageData && (
                <h3 className="m-0 pe-lg-5 me-lg-5">
                  {renderHTML(pageData.signature_creations_left)}
                </h3>
              )}
              </div>
              <div className="col-md-6 p-0 ps-lg-5 pt-md-5 pb-5">
              {pageData && (
                <p className="m-0 ps-lg-5 ms-lg-5">
                  {renderHTML(pageData.signature_creations_right)}
                </p>
                )}
              </div>
            </div>

          </div>
        </div>
        <div className="slider-panel r-container">
          <Swiper
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            className="mySwiper"
            breakpoints={{
              1024: {
                slidesPerView: 4
              },
              996: {
                slidesPerView: 3.5,
              },
              768: {
                slidesPerView: 2,
              },
              590: {
                slidesPerView: 2,
              },
              480: {
                slidesPerView: 1,
              },
              1: {
                slidesPerView: 1,
              },
            }}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            //   pauseOnMouseEnter: true,
            // }}
            onSwiper={(swiper) => {
              // Delay execution for the refs to be defined
              setTimeout(() => {
                // Override prevEl & nextEl now that refs are defined
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;

                // Re-init navigation
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {pageData && pageData.collections.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Link passHref={true} href={item.slug}>
                    <a  href={item.slug}>
                      <div className="image-panel round hover-scale">
                        <img
                          src={item.image}
                          alt="category"
                        />
                      </div>
                    </a>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="btn-bottom-panel mt-5">
            <button ref={navigationPrevRef} className="btn px-0 me-5">
              <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
            </button>
            <button ref={navigationNextRef} className="btn px-0">
              <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
            </button>
          </div>
        </div>
      </div>
      {/* End signature section */}
      {/* Start Help section */}
      <CraftingIdea />
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
