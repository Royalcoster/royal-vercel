import React, { useState, useRef, useEffect } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "swiper/css";
import NumberFormat from "react-number-format";

const mainURL = process.env.NEXT_PUBLIC_PRODUCT_URL;

SwiperCore.use([Autoplay, Navigation]);

export default function CollectionDetails({collectionHandle, shopifyTag, basicPath}) {
  const [sliderData, setSliderData] = useState([]);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  useEffect(() => {

    var formData = new FormData();
    formData.append("position", "first: 20");
    formData.append("query", "tag:" + shopifyTag);
    fetch(mainURL, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setSliderData(data.data)
      });
  }, []);

  return (
    <div className="collections pt-5">
      {sliderData.length > 0 && (
        <div className="r-container">
          <div className="row m-0 p-0 top-panel align-items-center">
          </div>
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
          {sliderData.map((item, index) => {
            if (item.title != "") {
              return (
                <SwiperSlide key={index}>
                <Link
                  passHref={true}
                  href={{
                    pathname: "/shop/[master]/[collection]/[slug]",
                    query: {
                      master:  basicPath,
                       collection:  collectionHandle,
                      slug:
                        item.handle.split("/")[item.handle.split("/").length - 1] + "-" + item.shopifyid,
                    },
                  }}
                >
                    <a>
                      <img
                        src={item.image}
                        alt="category"
                        className="round"
                      />

                      <p className="mt-3">{item.title}</p>
                      <h4 className="blue-text me-3">
                        <NumberFormat
                          style={{fontSize: 20}}
                          value={item.price}
                          displayType="text"
                          decimalScale={2}
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                          prefix="€ "
                        />
                      </h4>
                    </a>
                  </Link>
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
              <div className="col-12 text-end"><button style={{fontSize:17,marginTop:-10}} id="more" className="btn blue-btn px-5 py-3 round-form text-uppercase">view more</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
