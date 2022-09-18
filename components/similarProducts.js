import React, { useState, useRef, useEffect } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "swiper/css";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import Image from "next/image";
const mainURL = process.env.NEXT_PUBLIC_PRODUCT_URL;

SwiperCore.use([Autoplay, Navigation]);
const handleImageLoad = (id) => {
  $("#" + id).css({
    backgroundImage: "none"
  })
};
export default function SimilarProducts({handle}) {
  const [sliderData, setSliderData] = useState();
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const { locale } = useRouter();

  const [collectionDetails, setCollectionDetails] = useState();
  let products = [];
  function getFilterValue(str = "") {

    str = str.toLowerCase();
    var toReplace = ['"', "'", "\\", "(", ")", "[", "]"];
    // For the old browsers
    for (var i = 0; i < toReplace.length; ++i) {
      str = str.replace(toReplace[i], "");
    }
    str = str.replace(/\W+/g, "-");
    if (str.charAt(str.length - 1) == "-") {
      str = str.replace(/-+\z/, "");
    }
    if (str.charAt(0) == "-") {
      str = str.replace(/\A-+/, "");
    }
    return str;
  }

  useEffect(() => {

  if (!loaded) {
    let detailURL = "https://wp.royalcoster.com/wp-json/wp/v2/collections?slug=" + handle + "&lang=" + locale;

    let formData = new FormData();
    formData.append(
      "handle",
      handle
    );
    // Get detail main data
    setTimeout(function() {
          fetch(detailURL, {
            method: "get",

          })
            .then((res) => res.json())
            .then((data) => {
                    setLoaded(true);

                    let productURL = "https://royalcoster.com:81/royalcoster/getCollectionProducts.php";
                    let formData = new FormData();

                    formData.append("handle", data[0].acf.shopify_collection_handle)
                    formData.append("after", "");
                    formData.append("language", locale);
                    fetch(productURL, {
                      method: "post",
                      body: formData,
                    })
                      .then((res) => res.json())
                      .then((data) => {

                        $.each(data.data, function() {
                          this.locale = (locale == "en") ? "/" : "/nl/";
                          this.hndl = getFilterValue(this.title);
                          products.push(this)
                        });
                        console.log(products);
                        setSliderData(products);
                      });
                })
            }, 2000);
      }
  },[loaded]);

  return (
    <div>

      {sliderData && (
        <div className="py-5">
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

                    <a href={item.locale + window.location.href.split("/")[window.location.href.split("/").length - 4] + "/" + window.location.href.split("/")[window.location.href.split("/").length - 3] + "/" + handle + "/" + item.hndl + "-" + item.shopifyid}>
                    <div id={"image_" + index} className="image-box"  style={{
                        position: "relative",
                        width:"300px",
                        height: "300px",
                          backgroundImage:
                             "url(https://royalcoster.com/loadingimage.gif)",
                             backgroundSize: "50px 50px",
                             backgroundRepeat: "no-repeat",
                             backgroundPosition: "center center"
                      }} >
                      <Image
                          onLoadingComplete={() => {
                            handleImageLoad("image_" + index);
                          }}

                          alt={item.title}
                          src={item.image}
                          layout="fill"
                          objectFit="contain"
                          quality={100}

                      />
                      </div>
                      <p className="mt-3" style={{fontSize:14}}>{item.title}</p>
                      <h4 className="me-3">
                        <NumberFormat
                          style={{fontSize: 10}}
                          value={item.price}
                          displayType="text"
                          decimalScale={2}
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                          prefix="€ "
                        />
                      </h4>
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
          </div>
        </div>
      )}
      {collectionDetails && sliderData && (
        <div className="position-relative">
          <div style={{
            width: "100%",
            maxHeight: 500,
            overflow: "hidden"
          }}>
            <img style={{width:"100%",height:"auto",minHeight:300,objectFit: "cover"}} src={collectionDetails.acf.image} />
          </div>

          <div style={{position: "absolute", right: 20, bottom: 20, }}>
            <a href={"https://royalcoster.com/" + window.location.href.split("/")[window.location.href.split("/").length - 3] + "/" + window.location.href.split("/")[window.location.href.split("/").length - 2]}
            >
              <button className='btn btn-primary btn-lg'
                style={{
                  paddingLeft: 40,
                  paddingRight: 40,
                  border:"none",
                  color:"white",
                  backgroundColor:"#000000cc",
                  fontSize: 12,
                  height: 45
                }}>See {collectionDetails.title.rendered}
              </button>
            </a>
          </div>
        </div>
      )}
    </div>

  );
}
