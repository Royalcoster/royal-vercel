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
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { RiArrowRightSFill, RiMailFill, RiPhoneFill, RiWhatsappFill, RiDvdFill } from "react-icons/ri";
import { useRouter } from "next/router";

const descritionDataEn = [
  {
    title: "How we Guarantee Our Diamonds are Untainted",
    image: "/img/responsibility/image-2.png",
    dscription: "Once a blood diamond is cut and polished, its terrible underlying story gets ‘brushed away' and looks exactly like any other (good) diamond. But can a product with such a questionable history, be truly beautiful? We strongly believe it cannot."
  },
  {
    title: "Our In-House Sustainability is a Team Effort",
    image: "/img/responsibility/image-3.png",
    dscription: "Reduce, reuse, recycle and repeat. Of course, it is not only diamonds we work with at Royal Coster Diamonds. Our entire staff works together to make Royal Coster more and more environmentally friendly with various initiatives."
  },
  {
    title: "Interview with CEO Kees Noomen about Corporate Responsibilty",
    image: "/img/responsibility/image-4.png",
    dscription: "Good leadership starts with the leaders themselves. I cannot expect from our staff to become environmental heroes without setting good examples myself. That's why I strive every day to lead the way in our march to create a greener tomorrow."
  }
]

const descritionDataNl = [
  {
    title: "Hoe we garanderen dat onze diamanten onbezoedeld zijn",
    image: "/img/responsibility/image-2.png",
    dscription: "Zodra een bloeddiamant is geslepen en gepolijst, wordt het vreselijke onderliggende verhaal 'weggepoetst' en ziet het er precies uit als elke andere (goede) diamant. Maar kan een product met zo'n twijfelachtige geschiedenis echt mooi zijn? Wij zijn ervan overtuigd dat dit niet kan."
  },
  {
    title: "Onze interne duurzaamheid is een teaminspanning",
    image: "/img/responsibility/image-3.png",
    dscription: "Verminderen, hergebruiken, recyclen en herhalen. Natuurlijk zijn het niet alleen diamanten waar we mee werken bij Royal Coster Diamonds. Met verschillende initiatieven werken al onze medewerkers samen om Royal Coster steeds milieuvriendelijker te maken."
  },
  {
    title: "Interview met CEO Kees Noomen over Corporate Responsibility",
    image: "/img/responsibility/image-4.png",
    dscription: "Goed leiderschap begint bij de leiders zelf. Ik kan niet van onze medewerkers verwachten dat ze milieuhelden worden zonder zelf het goede voorbeeld te geven. Daarom streef ik er elke dag naar om het voortouw te nemen in onze mars om een groenere toekomst te creëren."
  }
]

const sliderDataEn = [
  {
    title: "Ice* Amsterdam",
    description: "Once a blood diamond is cut and polished, its terrible underlying...",
    image: "/img/responsibility/slider.png"
  },
  {
    title: "Ice* Amsterdam",
    description: "Once a blood diamond is cut and polished, its terrible underlying...",
    image: "/img/responsibility/slider.png"
  },
  {
    title: "Ice* Amsterdam",
    description: "Once a blood diamond is cut and polished, its terrible underlying...",
    image: "/img/responsibility/slider.png"
  },
  {
    title: "Ice* Amsterdam",
    description: "Once a blood diamond is cut and polished, its terrible underlying...",
    image: "/img/responsibility/slider.png"
  },
  {
    title: "Ice* Amsterdam",
    description: "Once a blood diamond is cut and polished, its terrible underlying...",
    image: "/img/responsibility/slider.png"
  },
  {
    title: "Ice* Amsterdam",
    description: "Once a blood diamond is cut and polished, its terrible underlying...",
    image: "/img/responsibility/slider.png"
  },
]

const sliderDataNl = [
  {
    title: "IJs* Amsterdam",
    description: "Als een bloeddiamant eenmaal is geslepen en gepolijst, is de verschrikkelijke onderliggende...",
    image: "/img/responsibility/slider.png"
  },
  {
    title: "IJs* Amsterdam",
    description: "Als een bloeddiamant eenmaal is geslepen en gepolijst, is de verschrikkelijke onderliggende...",
    image: "/img/responsibility/slider.png"
  },
  {
    title: "IJs* Amsterdam",
    description: "Als een bloeddiamant eenmaal is geslepen en gepolijst, is de verschrikkelijke onderliggende...",
    image: "/img/responsibility/slider.png"
  },
  {
    title: "IJs* Amsterdam",
    description: "Als een bloeddiamant eenmaal is geslepen en gepolijst, is de verschrikkelijke onderliggende...",
    image: "/img/responsibility/slider.png"
  },
  {
    title: "IJs* Amsterdam",
    description: "Als een bloeddiamant eenmaal is geslepen en gepolijst, is de verschrikkelijke onderliggende...",
    image: "/img/responsibility/slider.png"
  },
  {
    title: "IJs* Amsterdam",
    description: "Als een bloeddiamant eenmaal is geslepen en gepolijst, is de verschrikkelijke onderliggende...",
    image: "/img/responsibility/slider.png"
  },
]

SwiperCore.use([Autoplay, Navigation]);

export default function Responsibility() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const { locale } = useRouter();
  let descritionData;
  let sliderData;
  if ( locale === "nl" ) {
    descritionData = descritionDataNl;
    sliderData = sliderDataNl;
  } else {
    descritionData = descritionDataEn;
    sliderData = sliderDataEn;
  }
  return (
    <div className="responsibility_page">
      <Head>
        <title>{locale === "nl" ? "Maatschappelijk verantwoord ondernemen | Royal Coster" : "Corporate Responsibility | Royal Coster"}</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-white col-lg-6 col-sm-8 text-capitalize mb-5">
            {locale === "nl" ? "Zakelijk" : "Corporate"} <span>{locale === "nl" ? "Verantwoordelijkheid" : "Responsibility"}</span> & <span>{locale === "nl" ? "Sponsoring" : "Sponsorships"}</span>
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section py-5">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">{locale === "nl" ? "Voor planeet en voor mensen" : "For planet and for people"}</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              {locale === "nl" ? "In de afgelopen eeuwen groeiden en bloeiden Royal Coster en Amsterdam naast elkaar. We houden van onze stad en we helpen onze stad graag" : "Over the past centuries, Royal Coster and Amsterdam grew and flourished side by side. We love our city and we love to help our city"}</p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start Description section */}
      <div className="description-section r-container py-5 my-5 d-flex align-items-center flex-column">
        <div className="main-panel row m-0 mb-5 align-items-center">
          <div className="image-panel col-lg-7 pe-lg-4 p-0 round mb-5 mb-lg-0">
            <img src="/img/responsibility/image-1.png" />
          </div>
          <div className="col-lg-5 p-0 ps-lg-4 text-panel">
            <h3 className="title blue-text mb-md-5 mb-4">{locale === "nl" ? "De meest briljante schittering is een verantwoordelijke" : "The most brilliant sparkle is a responsible one"}</h3>
            <p className="mb-4">{locale === "nl" ? "Diamanten zijn een product van de natuur en een product van mensen. De kleine stukjes koolstof worden samengeperst door Moeder Natuur die door mensen worden gedolven en gepolijst. Het resultaat zijn sprankelende diamanten. Deze edelstenen zijn al honderden en honderden jaren geliefd en aanbeden door miljoenen mensen. hoe lief ze ook zijn. We moesten ervoor zorgen dat al onze diamanten op een verantwoorde manier worden verkregen en dat iedereen die bij het proces betrokken is, goed wordt behandeld." : "Diamonds are a product of nature and a product of people. The little pieces of carbon are pressed together by Mother Nature that are mined and polished by people. The results are sparkling diamonds. These precious stones have been loved and adored by millions of people for hundreds and hundreds of years. however lovely they may be. We needed to make sure all of our diamonds are obtained in a responsible way and that everyone who is included in the process is treated well."}
              <br />{locale === "nl" ? "Dus dat deden we." : "So we did."}<br/>
            {locale === "nl" ? "Maar we proberen natuurlijk meer te doen om een betere en groenere toekomst te creëren." : "But of course, we try to do more to create a better and greener tomorrow."}
          </p>
        </div>
      </div>
      <div className="sub-panel row pb-lg-5" style={{display:"none"}}>
        {
          descritionData.map((item, index) => {
            return (
              <div className="col-lg-4 col-md-6 mb-lg-0 mb-5" key={index}>
                <div className="hover-scale round mb-4">
                  <img src={item.image} alt="description-image" />
                </div>
                <h3 className="mb-4 title blue-text">{item.title}</h3>
                <p>{item.dscription}</p>
                <Link href="#">
                  <a className="more-detail text-uppercase mb-5 d-flex">{locale === "nl" ? "Meer details" : "More Details"} <RiArrowRightSFill className="ms-2" /></a>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
      {/* End Description section */ }

  {/* Start sponsorship section */ }
  <div className="sponsorship-section" style={{display:"none"}}>
    <div className="title-panel">
      <div className="r-container py-5 d-flex align-items-center flex-column text-center">
        <h3 className="title  mt-lg-5 mb-4 pt-5 blue-text col-lg-5 col-md-6">{locale === "nl" ? "Sponsoring" : "Sponsorships"}</h3>
        <p className="col-lg-4 col-md-6 text-capitalize">{locale === "nl" ? "In de afgelopen eeuwen groeiden en bloeiden Royal Coster en Amsterdam naast elkaar. We houden van onze stad en we helpen onze stad graag" : "Over the past centuries, Royal Coster and Amsterdam grew and flourished side by side. We love our city and we love to help our city"}</p>
      </div>
    </div>
    <div className="tours-panel">
      <div className="row r-container">
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
            996: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 3,
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
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
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
          {
            sliderData.map((slider, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="tour-item px-3 mb-5">
                    <div className="image-panel hover-scale round mb-4">
                      <img src={slider.image} className="tour-image" alt="tour-image" />
                    </div>
                    <h3 className="title mb-4 blue-text">{slider.title}</h3>
                    <p className="description mb-5">{slider.description}</p>
                    <Link href="#">
                      <a className="more-detail text-uppercase mb-5 d-flex">More Details <RiArrowRightSFill className="ms-2" /></a>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <div className="btn-bottom-panel mt-5 pt-md-5 text-center">
          <button ref={navigationPrevRef} className="btn px-0 me-5">
            <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
          </button>
          <button ref={navigationNextRef} className="btn px-0">
            <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* End more tour section */ }

  {/* Start Schedule section */ }
  <Schedule />
  {/* End Schedule section */ }

  {/* Start Footer */ }
  <Footer />
  {/* End Footer */ }

  <AppointmentModal />

    </div >
  );
}
