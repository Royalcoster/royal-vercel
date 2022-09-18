import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import renderHTML from "react-render-html";
import Link from "next/link";
import Head from "next/head";
import router, { useRouter } from "next/router";
import Header from "../../components/header";
import Footer from "../../components/footer";
import NumberFormat from "react-number-format";
import Schedule from "../../components/schedule";
//import { getAllPostsWithSlug } from "../../lib/wordpressGraphqlApi";
import Skeleton from "@mui/material/Skeleton";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { connect } from "react-redux";
import { setWishList } from "../../redux/actions/wishListAction";

var dateFormat = require("dateformat");
import {
  RiFacebookCircleFill,
  RiTwitterFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiWhatsappFill,
  RiFacebookLine,
  RiTwitterLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiWhatsappLine,
  RiHeartFill,
  RiHeartLine,
} from "react-icons/ri";
import "swiper/css";

SwiperCore.use([Autoplay, Navigation]);

const ReadingProgress = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  useEffect(() => {
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:3002600,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    const header = document.querySelector("#header");
    const aboutSection = document.querySelector(".about-section");
    const restHeight = aboutSection.clientHeight + header.clientHeight;
    const scrollListener = () => {
      if (!target.current) {
        return;
      }
      const element = target.current;
      const totalHeight = element.clientHeight - window.innerHeight;
      const windowScrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (windowScrollTop - restHeight <= 0) {
        return setReadingProgress(0);
      }

      if (windowScrollTop - restHeight > totalHeight) {
        return setReadingProgress(100);
      }

      setReadingProgress(((windowScrollTop - restHeight) / totalHeight) * 100);
    };
    $(document).ready(function() {
      $.each($("img"), function() {
          $(this).removeAttr("srcset")
          $(this).attr("src", $(this).attr("src").replace("www.costerdiamonds.com", "royalcoster.com:81/wordpress").replace("royalcoster.nl","royalcoster.com:81"));
          $(".article-panel").css({
            paddingRight: 0
          })
          $(".article-panel > p").css({
            minWidth: "100%",
            width: "100%"
          })
      })
    });
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });

  return (
    <div
      className={`reading-progress-bar`}
      style={{ width: `${readingProgress}%` }}
    />
  );
};

const blogURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/blogs";
const insideURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/inside-coster";
const authorURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/users";
const tagsURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/tags";
const categoryURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/categories";
const productURL = process.env.NEXT_PUBLIC_PRODUCT_URL;
const headers = {
  "Content-Type": "application/json",
};

const insideArr = [
  "brief-history-of-diamonds",
  "our-royal-legacy",
  "the-story-of-sisi",
  "how-we-created-queen-julianas-diamond-watch",
];

function getFilterValue(str) {
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

const products1 = [
  {
    img: "product-1.png",
    type: "Bracelets",
    id: "Sku: 1342343",
    title: "The Rose Cut Diamond",
    cost: "$1.200",
  },
  {
    img: "product-2.png",
    type: "Rings",
    id: "Sku: 1342343",
    title: "The Rose Cut Diamond",
    cost: "$1.200",
  },
  {
    img: "product-3.png",
    type: "Rings",
    id: "Sku: 1342343",
    title: "The Rose Cut Diamond",
    cost: "$1.200",
  },
];

/*export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/education/${node.slug}`) || [],
    fallback: "blocking",
  };
}*/

export async function getServerSideProps(context) {
  const { params } = context;
  console.log(params);
  const resNl = await fetch(blogURL + "?slug=" + params.slug + "&lang=" + context.locale);
  const dataNl = await resNl.json();

  return {
    props: {

      dataNl: dataNl[0].acf || {},
      seoDataNl: dataNl[0].yoast_head_json || {},
    },
  };
}

function Brief(props) {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [time, setTime] = useState();
  const [authorData, setAuthorData] = useState();
  const [title, setTitle] = useState();
  const [tags, setTags] = useState("Rings");
  const [coverBg, setCoverBg] = useState();
  const [content, setContent] = useState();
  const [dateTime, setDateTime] = useState();
  const [facebookLink, setFacebookLink] = useState();
  const [linkdinLink, setLinkdinLink] = useState();
  const [twitterLink, setTwitterLink] = useState();
  const [whatsAppLink, setWhatsAppLink] = useState();
  const [accessToken, setAccessToken] = useState();
  const [products, setProducts] = useState();
  const target = React.createRef();
  const [tagProps, setTagProps] = useState();
  const router = useRouter();
  const { locale } = useRouter();

  let data = {};
  let seoData = {};

  if ( true ) {
    data = props.dataNl;
    seoData = props.seoDataNl;
  } else {
    data = props.dataEn;
    seoData = props.seoDataEn;
  }

  const setFavor = (event, product) => {
    let target = event.target.closest(".favor-icon");
    if (target.classList.contains("favor")) {
      let localProducts = props.wishList;
      let removeProduct = localProducts.find(
        (item) => item.shopifyid == product.shopifyid
      );
      if (removeProduct) {
        localProducts.splice(localProducts.indexOf(removeProduct), 1);
        props.setWishList(localProducts);
      }
    } else {
      if (localStorage.wishList) {
        props.setWishList([
          ...props.wishList,
          { ...product, amount: 1, product_type: tags },
        ]);
      } else {
        localStorage.setItem(
          "wishList",
          JSON.stringify([{ ...product, amount: 1, product_type: tags }])
        );
        props.setWishList([{ ...product, amount: 1, product_type: tags }]);
      }
    }
  };

  const openShareWindow = (link) => {
    var left = (screen.width/2)-(300);
    var top = (screen.height/2)-(300);
    window.open(link, "MsgWindow", "top=" + top + ", left=" + left + ",width=600,height=600");
  };
  function fireShare(media, cid, artsearch) {
    var dd = window.location.href.split("/");
    var uu = dd[dd.length -1];

    if (media == "facebook") {
      FB.ui({
          method: 'share',
          href: "share.royalcoster.com/shareBlog.php?url=" + window.location.href + "&id=" + (new Date()).getTime() + "&folder=" + blogURL + "&slug=" + uu + "&scrape=yes",
      }, function(response){});
      return
    }

    $("#" + media + "_share").trigger("click");
  }
  useEffect(() => {

    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
  }, []);
  useEffect(() => {
    $(document).ready(function() {
      $.each($("img"), function() {
          $(this).removeAttr("srcset")
          $(this).attr("src", $(this).attr("src").replace("www.costerdiamonds.com", "royalcoster.com:81/wordpress").replace("royalcoster.nl","royalcoster.com:81"));
          $(".article-panel").css({
            paddingRight: 0
          })
          $(".article-panel > p").css({
            minWidth: "100%",
            width: "100%"
          })

            $(".col-md-6").removeClass("col-md-6");
      })
      $(".alignnone").css({
        objectFit: "contain"
      });
      $(".alignnone").wrap("<center></center>");
      $(".wp-caption aligncenter").find("img").wrap("<center></center>");

      $(".alignnone").parent().find("em").css({
        fontStyle: "italic",
        width: "100%",
        textAlign: "center"
      })
        $(".alignnone").parent().find("em").wrap("<center></center>");
    })
  });

  useEffect(() => {
    if (content) {
      const text = document.querySelector(".article-panel").innerText;
      const wpm = 225;
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil(words / wpm);
      setTime(time);
    }
  }, [content]);

  useEffect(() => {

    if (router.query.slug) {
      const currentURL = document.location.href;
      setFacebookLink("https://www.facebook.com/sharer.php?u=" + currentURL + "&scrape=yes");
      setLinkdinLink(
          "https://www.linkedin.com/shareArticle?mini=true&url=" + currentURL
        );
        setTwitterLink("https://twitter.com/share?url=" + currentURL);
        setWhatsAppLink('https://api.whatsapp.com/send?text=I wanted to share this with you: ' + encodeURI(window.location.href));
      let urlEn = blogURL + "?slug=" + router.query.slug;
      let urlNl = blogURL + "?slug=" + router.query.slug + "&lang=nl";
      if (insideArr.find((item) => item == router.query.slug)) {
        urlEn = insideURL + "?slug=" + router.query.slug;
        urlNl = insideURL + "?slug=" + router.query.slug + "&lang=nl";
      }
      console.log(urlNl);
      // Get blog data by slug
      fetch(locale === "nl" ? urlNl : urlEn, {
        method: "get",
        headers,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length) {
            data = data[0];
            setDateTime(dateFormat(data.date, "mmmm d, yyyy"));
            setTitle(data.title.rendered);
            setContent(data.acf.content.main_content);
            setCoverBg(data.acf.featured_image.sizes["2048x2048"]);

            // Get tags of blog
            fetch(tagsURL + "?post=" + data.id, {
              method: "get",
            })
              .then((res) => res.json())
              .then((tags) => {
                if (tags.length) {
                  setTagProps(tags);
                  let formData = new FormData();
                  let getProductQuery =
                    tags.length > 0
                      ? (
                          tags.map((tag, index) =>
                            index == 0
                              ? " AND (tag:" + tag.slug
                              : " OR tag:" + tag.slug
                          ) + ")"
                        ).replaceAll(",", "")
                      : "";
                  formData.append("position", "first: 10");
                  formData.append("query", "status:active" + getProductQuery);
                  fetch(productURL, {
                    method: "post",
                    body: formData,
                  })
                    .then((res) => res.json())
                    .then((product) => {
                      setProducts(product.data);
                    });
                }
              });

            // Get author data by author ID of blog
            fetch(authorURL + "/" + data.author, {
              method: "get",
              headers,
            })
              .then((res) => res.json())
              .then((author) => {
                setAuthorData({
                  name: author.name,
                  avatar: author.avatar["48"],
                  description: author.description,
                });
              });
          }
        });
    }
  }, [router.query]);

  return (
    <div className="brief_page">
      {/* <Head>
      <title>{props.data.title?.rendered} | Royal Coster</title>

      <meta name="description" content={props.data.acf?.content.intro} />
      <meta
        itemProp="name"
        content={props.data.title?.rendered + " | Royal Coster"}
      />
      <meta itemProp="description" content={props.data.acf?.content.intro} />
      <meta itemProp="image" content={props.data.acf?.featured_image.sizes["2048x2048"]} />

      <meta property="fb:app_id" content="362991595876147" />
      <meta
        property="og:url"
        content={process.env.NEXT_PUBLIC_APP_URL + router.asPath}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={props.data.title?.rendered + " | Royal Coster"}
      />
      <meta
        property="og:description"
        content={props.data.acf?.content.intro}
      />
      <meta
        property="og:image"
        content={props.data.acf?.featured_image.sizes["2048x2048"].replace("www.costerdiamonds.com", "https://royalcoster.com:81/wordpress")}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={props.data.title?.rendered + " | Royal Coster"}
      />
      <meta
        name="twitter:description"
        content={props.data.acf?.content.intro}
      />
      <meta
        name="twitter:image"
        content={props.data.acf?.featured_image.sizes["2048x2048"].replace("www.costerdiamonds.com", "https://royalcoster.com:81/wordpress")}
      />

      </Head> */}
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
      {/*Header */}
      <Header />
      {/* <div className="progress-bar"></div> */}
      {/* Start about section */}
      <div className="about-section pt-md-5 pt-0 mb-5x">
        <div className="link-panel r-container px-5 py-3 mb-md-5 mb-0 round-form d-flex align-items-center">
          <button
            className="btn back-arrow d-flex me-3 blue-text px-0"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            <HiOutlineArrowLeft />
          </button>
          <Link passHref={true} href="/">
            <a className="mx-2">HOME</a>
          </Link>
          /
          <Link passHref={true} href="/blog">
            <a className="mx-2">BLOG</a>
          </Link>
          /
          <span className="title ms-2 text-uppercase blue-text">
            {router.query && router.query.slug}
          </span>
        </div>
        <div className="r-container">
          <h1 className="py-5 product-title blue-text text-capitalize">
            {title ? (
              renderHTML(title)
            ) : (
              <Skeleton variant="text" animation="wave" />
            )}
          </h1>
          <div className="about-panel row m-0 pb-5">
            <div className="col-md-9 col-12 p-0 image-panel pe-md-5 pe-0 ">
              {coverBg ? (
                <img src={coverBg} className="round" alt="about-image" />
              ) : (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={400}
                />
              )}
            </div>
            <div className="col-md-3 col-12 p-0 text-panel mb-5 ps-md-5 ps-0 pt-md-0 pt-5 d-flex flex-column justify-content-between">
              <div className="reporter-info">
                {authorData ? (
                  <img
                    src={authorData.avatar}
                    className="reporter-avatar rounded-circle"
                    alt="reporterAvatar"
                    width="50"
                    height="50"
                  />
                ) : (
                  <Skeleton
                    variant="circular"
                    width={50}
                    height={50}
                    animation="wave"
                  />
                )}
                <h3 className="reporter-name py-4">
                  {authorData ? (
                    renderHTML(authorData.name)
                  ) : (
                    <Skeleton variant="text" animation="wave" />
                  )}
                </h3>
                <p className="reporter-description">
                  {authorData ? (
                    renderHTML(authorData.description)
                  ) : (
                    <Skeleton
                      variant="text"
                      width="100%"
                      height={200}
                      animation="wave"
                    />
                  )}
                </p>
                <p className="reporter-date pt-4">
                  <span className="text-uppercase me-2">
                    {dateTime && dateTime}
                  </span>
                  ·<span className="ms-2">{time ? time : 0}</span> {locale === "nl" ? "min lezen" : "min read"}
                </p>
              </div>
              <div className="share-panel">
                <h3 className="blue-text text-uppercase mb-4">{locale == "nl" ? "Artikel delen" : "Share article"}</h3>
                <hr className="line" />
                <div className="links-panel mt-4 d-flex justify-content-between">
                  {facebookLink && (
                    <button id="facebookLink1"
                      className="btn"
                       onClick={() => openShareWindow(facebookLink)}
                    >
                      <RiFacebookCircleFill />
                    </button>
                  )}
                  {twitterLink && (
                    <button
                      className="btn"
                      onClick={() => openShareWindow(twitterLink)}
                    >
                      <RiTwitterFill />
                    </button>
                  )}
                  <button className="btn" onClick={() => openShareWindow('https://instagram.com/costerdiamondsofficial/')}>
                    <RiInstagramFill />
                  </button>
                  {false && (
                    <button
                      className="btn"
                      onClick={() => openShareWindow(linkdinLink)}
                    >
                      <RiLinkedinFill />
                    </button>
                  )}
                  <button className="btn" onClick={() => openShareWindow(whatsAppLink)}>
                    <RiWhatsappFill />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End about section */}
      {/* Start article section */}
      <ReadingProgress target={target} />
      <div ref={target} className="article-section pb-5  r-container">
        {content && (
          <div className="link-panel-cover d-md-block d-none">
            <div className="link-panel">
              {facebookLink && (
                <button id="facebookLink"
                  className="btn link-item d-flex align-items-center justify-content-center mb-3"
                  onClick={() => openShareWindow(facebookLink)}
                >
                  <RiFacebookLine />
                </button>
              )}
              {twitterLink && (
                <button
                  className="btn link-item d-flex align-items-center justify-content-center mb-3"
                  onClick={() => openShareWindow(twitterLink)}
                >
                  <RiTwitterLine />
                </button>
              )}
              <button className="btn link-item d-flex align-items-center justify-content-center mb-3"
                  onClick={() => openShareWindow('https://instagram.com/costerdiamondsofficial/')}
              >
                <RiInstagramLine />
              </button>
              {false && (
                <button
                  className="btn link-item d-flex align-items-center justify-content-center mb-3"
                  onClick={() => openShareWindow(linkdinLink)}
                >
                  <RiLinkedinLine />
                </button>
              )}
              <button className="btn link-item d-flex align-items-center justify-content-center">
                <RiWhatsappLine />
              </button>
            </div>
          </div>
        )}
        <div className="article-panel py-5">
          {content && renderHTML(content)}
        </div>
      </div>
      {/* End article section */}
      {/* Start select product section */}
      {products && (
        <div className="select-product-section py-5 r-container">
          <div className="title-panel row m-0 my-5">
            <div className="col-md-6 col-12 p-0">
              <h3 className="text-capitalize blue-text">Liked the article?</h3>
              <h2 className="text-capitalize blue-text">
                You'll love the products
              </h2>
            </div>
            <div className="col-6 p-0 justify-content-end d-md-flex d-none align-items-end">
              {tagProps && (
                <Link
                  passHref={true}
                  href={{
                    pathname: "/shop",
                    query: {
                      tags: tagProps.map((tag, index) => tag.slug).join(),
                    },
                  }}
                >
                  <a>VIEW ALL</a>
                </Link>
              )}
            </div>
          </div>
          <div className="product-panel row m-0">
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
                1100: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 2,
                },
                590: {
                  slidesPerView: 1.4,
                },
                350: {
                  slidesPerView: 1.4,
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
              {products.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="product-image round">
                      <img src={item.image} alt="product-image" />
                    </div>
                    <div className="product-info py-4">
                      {/* <div className="product-id">
                      <span className="me-2">{item.type}</span>|
                      <span className="ms-2">{item.id}</span>
                    </div> */}
                      <h3 className="product-title my-4 blue-text">
                        {item.title}
                      </h3>
                      <p className="product-cost blue-text">
                        <NumberFormat
                          value={item.price}
                          displayType="text"
                          decimalScale={2}
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                          prefix="€ "
                        />
                      </p>
                    </div>
                    {accessToken && (
                      <button
                        className={
                          "btn favor-icon " +
                          `${
                            props.wishList &&
                            props.wishList.find(
                              (product) => product.shopifyid == item.shopifyid
                            )
                              ? "favor"
                              : ""
                          }`
                        }
                        onClick={(e) => setFavor(e, item)}
                      >
                        <RiHeartLine className="unfavor" />
                        <RiHeartFill className="favor" />
                      </button>
                    )}

                    <div className="btn-panel">
                      {/* <button className="btn btn-cart pink-btn px-md-5 px-3 py-3 me-3 round-form">
                      ADD TO CART
                    </button> */}
                      <Link
                        passHref={true}
                        href={{
                          pathname: "/shop/[slug]",
                          query: {
                            slug:
                              getFilterValue(item.title) + "-" + item.shopifyid,
                          },
                        }}
                      >
                        <a className="btn btn-more-info px-md-5 px-3 py-3 blue-text round-form">
                          MORE INFO
                        </a>
                      </Link>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="btn-bottom-panel d-md-none d-block mt-5">
              <button ref={navigationPrevRef} className="btn px-0 me-5">
                <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
              </button>
              <button ref={navigationNextRef} className="btn px-0">
                <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* End select product section */}
      {/* Schedule section */}
      <Schedule />
      {/* Footer */}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  wishList: state.wishList.value,
});

const mapDispatchToProps = {
  setWishList: setWishList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Brief);
