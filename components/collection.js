import React, { useState, useRef, useEffect } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "swiper/css";
import Image from "next/image";
import router, { useRouter } from "next/router";
const urlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/pages/225800";
const urlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/pages/325937";

SwiperCore.use([Autoplay, Navigation]);

export default function Collection() {
  const [sliderData, setSliderData] = useState([]);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const { locale } = useRouter();
  useEffect(() => {
  //  alert(urlNl)
    fetch(locale === "nl" ? urlNl : urlEn, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        var cdata= [];
        $.each(data.acf.collection_slider, function() {
          console.log(data)
          var ths = this;

            ths.collectionImage = ths.collectionImage;
            cdata.push(ths);

        })
        var ww = setInterval(function() {
          if (cdata.length == data.acf.collection_slider.length) {
            console.log(cdata)
            clearInterval(ww);
            setSliderData(cdata);
          }
        }, 100)
      });

  }, []);

  return (
    <div className="collections">
      {sliderData.length > 0 && (
        <div className="r-container">
          <div className="row m-0 p-0 top-panel align-items-center">
            <h2 className="col-12 text-center text-lg-start p-0 pb-5 mt-5">{locale === "nl" ? "Onze collecties" : "Our Collections"}</h2>
          </div>
          <Swiper
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            className="mySwiper text-center"
            breakpoints={{
              1204: {
                slidesPerView: 4,
              },
              992: {
                slidesPerView: 3,
              },
              768: {
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
          {sliderData.map((item, index) => {
            if (item.collection_item_img_title != "") {
              return (
                <SwiperSlide key={index}>
                  <Link
                    passHref={true}
                    href={item.collection_item_url}
                  >
                    <a>
                      <img style={{width: 300}}
                        src={item.collection_item_img.link}
                        alt="category"
                        className="round"
                      />

                      <p className="mt-3">{item.collection_item_img_title}</p>
                    </a>
                  </Link>
                </SwiperSlide>
              );
            }
            })}
          </Swiper>
          <div className="btn-bottom-panel mt-5 text-center text-md-start">
            <button ref={navigationPrevRef} className="btn px-0 me-5">
              <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
            </button>
            <button ref={navigationNextRef} className="btn px-0">
              <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
