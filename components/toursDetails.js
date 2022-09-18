import React, { useState, useRef, useEffect } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "swiper/css";
import NumberFormat from "react-number-format";

const mainURL = process.env.NEXT_PUBLIC_PRODUCT_URL;
const tourURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/tours?order=desc&orderby=modified";

SwiperCore.use([Autoplay, Navigation]);

export default function ToursDetails() {
  const [sliderData, setSliderData] = useState([]);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [tours, setTours] = useState([]);
  useEffect(() => {
    fetch(tourURL + "&per_page=" + "15" + "&page=1", {
      method: 'get'
    }).then(res => res.json()).
      then(data => {
        var oo = [];
        $.each(data, function() {
            console.log(this)
          var obj = {
            title: this.acf.landing.title,
            slug: this.slug,
            image: this.acf.landing.image.url
          }
          oo.push(obj);
        })
        setTours(oo);
      })
  }, []);

  return (
    <div className="collections pt-5">
      {tours && (
        <div className="r-container">
          <div className="row m-0 p-0 top-panel align-items-center">
          </div>
          <Swiper
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            className="mySwiper"
            breakpoints={{
              996: {
                slidesPerView: 3,
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
          {tours.map((item, index) => {
            if (item.title != "") {
              return (
                <SwiperSlide key={index}>

                    <a href={"/tour/" + item.slug} >
                      <img
                        src={item.image}
                        alt="category"
                        className="round"
                      />

                      <p className="mt-3">{item.title}</p>

                    </a>
                </SwiperSlide>
              );
            }
          })}
          </Swiper>
          <div className="btn-bottom-panel mt-5">
            <button ref={navigationPrevRef} className="btn px-0 me-5">
              <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
            </button>
            <button ref={navigationNextRef} className="btn px-0">
              <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
            </button>
            <div className="overview-section r-container row pt-5">
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
