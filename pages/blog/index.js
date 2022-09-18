import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import router, { useRouter } from "next/router";
import Schedule from "../../components/schedule";
import _ from "lodash";
import SelectSearch, {
  fuzzySearch,
  useSelect,
} from "react-select-search-nextjs";
import { RiSearchLine } from "react-icons/ri";
import renderHTML from "react-render-html";
import head from "next/head";
import Loading from "../../components/loading";
import Skeleton from "@mui/material/Skeleton";

const blogURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/blogs";
const detailBlogURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/acf/v3/blogs";
const categoryURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/categories";
const getResultURLEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/pages/226055";
const getResultURLNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/pages/329517";
const headers = {
  // "Content-Type": "application/json",
};

let tabState = [];
let blogData = [];
let categoryData = [];
let localSticky = 1;
let banner;
let localResult = 0;

export async function getStaticProps() {
  let dataEn = {};
  let dataNl = {};
  const resEn = await fetch(getResultURLEn, {
    method: "get",
  });
  dataEn = await resEn.json();

  const resNl = await fetch(getResultURLNl, {
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

export default function Blog(props) {
  const [categories, setCategories] = useState();
  const [sticky, setSticky] = useState(localSticky);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [result, setResult] = useState();
  const [postItems, setPostItems] = useState([]);
  const [filterCategory, setFilterCategory] = useState(tabState);
  const [filterKey, setFilterKey] = useState("");
  const [options, setOptions] = useState();
  const [notResult, setNotResult] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [excludID, setExcludID] = useState();
  const [loadMoreStatus, setLoadMoreStatus] = useState(false);
  const [bannerData, setBannerData] = useState(banner);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const router = useRouter();
  const { locale } = useRouter();
  let data = {};
  let getResultURL;
  if ( locale === "nl" ) {
    data = props.dataNl;
    getResultURL = getResultURLNl;
  } else {
    data = props.dataEn;
    getResultURL = getResultURLEn;
  }
  const seoData = data.yoast_head_json;

  useEffect(() => {

    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3002600,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    if (categoryData.length == 0) {
      fetch(
        categoryURL + "?exclude=1&orderby=id&per_page=100&hide_empty=true",
        {
          method: "get",
          headers,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
        });
    } else {
      setLoading(false);
      setCategories(categoryData);
      setPostItems(blogData);
    }
    if (false) {
      setResult(localResult);
    } else {
      fetch(getResultURL, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          localResult = +data.content.rendered.split(">")[1].split("Blogs")[0];
          setResult(localResult);
        });
    }
  }, []);

  useEffect(() => {
    if (router.query) {
      if(router.query.tags == 'jobs') {
        setFilterCategory([126]);
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (filterCategory.length && mounted) {
      setLoading(true);
      let postArr = [];
      let url;
      if (excludID) {
        url =
          blogURL +
          "?exclude=325954&orderby=id&per_page=11&exclude=" +
          excludID +
          "&categories=" +
          filterCategory.join() +
          filterKey;
      } else {
        url =
          blogURL +
          "?exclude=325954&orderby=id&per_page=11&categories=" +
          filterCategory.join() +
          filterKey;
      }
      fetch(url, {
        method: "get",
        headers,
      })
        .then((res) => res.json())
        .then(async (data) => {
          await data.map((item) => {
            postArr.push({
              id: item.id,
              title: item.title.rendered,
              slug: item.slug,
              image: item.acf.featured_image.url,
              categories: item.categories,
            });
          });
          if (excludID) {
            setPost([bannerData, ...postArr]);
            setPostItems([bannerData, ...postItems]);
          } else {
            setPost(postArr);
            setPostItems(postArr);
          }
        });
    } else if (!blogData.length) {
      setLoading(true);
      let url;
      let postArr = [];
      if (excludID) {
        url = blogURL + "?exclude=325954&orderby=id&per_page=11&exclude=" + excludID;
        console.log("excludID", url);
      } else {
        url = locale === "nl" ? blogURL + "?exclude=325954&orderby=id&per_page=11&lang=nl" : blogURL + "?exclude=325954&orderby=id&per_page=11";
        console.log("No excludID", url);
      }
      fetch(url, {
        method: "get",
        headers,
      })
        .then((res) => res.json())
        .then(async (data) => {
          await data.map((item) => {
            postArr.push({
              id: item.id,
              title: item.title.rendered,
              slug: item.slug,
              image: item.acf.featured_image.url,
              categories: item.categories,
            });
          });
          if (excludID) {
            setPost([bannerData, ...postArr]);
            setPostItems([bannerData, ...postItems]);
          } else {
            setPost(postArr);
            setPostItems(postArr);
          }
        });
    }
    setMounted(true);
  }, [filterCategory]);

  useEffect(async () => {
    let category = [];
    if (categories) {
      await categories.map((item) => {
        category.push({ name: item.name, value: item.id });
      });
      setOptions(category);
    }
  }, [categories]);

  useEffect(() => {
    if (post) {
      if (post.length != 0) {
        let postArr = [];
        post.map((item, index) => {
          let categoryItems = [];
          item.categories.map((id) => {
            categories &&
              categories.map((cateItem) => {
                if (cateItem.id == id) {
                  categoryItems.push(cateItem.name);
                }
              });
          });
          postArr.push({
            ...item,
            categoryItems: categoryItems,
          });
          if (postArr.length == post.length) {
            setShowLoadMore(postArr.length >= 11);
            postArr.sort((item1, item2) => item2.id - item1.id);
            setPostItems([...postArr]);
            setLoading(false);
            setLoadMoreStatus(false);
          }
        });
      }
    }
  }, [post]);

  useEffect(() => {
    if (postItems.length) {
      categoryData = categories;
      blogData = postItems;
      if (!excludID) {
        banner = postItems[0];
        setExcludID(banner.id);
        setBannerData(banner);
      }
    }
  }, [postItems]);

  useEffect(() => {
    if (filterKey) {
      setLoading(true);
      let postArr = [];
      let url;
      if (filterCategory && filterCategory.length) {
        url =
          blogURL +
          "?orderby=id&per_page=11&exclude=" +
          excludID +
          "&categories=" +
          filterCategory +
          filterKey;
      } else {
        url =
          blogURL + "?orderby=id&per_page=11&exclude=" + excludID + filterKey;
      }
      fetch(url, {
        method: "get",
        headers,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length) {
            data.map((item) => {
              postArr.push({
                id: item.id,
                title: item.title.rendered,
                slug: item.slug,
                image: item.acf.featured_image.url,
                categories: item.categories,
              });
            });
            setPost([post[0], ...postArr]);
            setNotResult(false);
          } else {
            setLoading(false);
            setNotResult(true);
          }
        });
    }
  }, [filterKey]);

  const selectCategory = (key = null) => {
    setPostItems("");
    if (key) {
      if (!tabState.find((item) => item == key)) {
        tabState.push(key);
      } else {
        _.remove(tabState, (n) => n == key);
      }

      if (tabState.length) {
        if (
          document.querySelectorAll(".category-tab.active") &&
          document.querySelectorAll(".category-tab.active").length
        ) {
          document.querySelectorAll(".category-tab.active").forEach((item) => {
            item.classList.remove("active");
          });
        }
        setFilterCategory([...tabState]);
        tabState.map((key) => {
          document
            .querySelector(".category-tab-" + key)
            .classList.add("active");
        });
      } else {
        if (
          document.querySelectorAll(".category-tab.active") &&
          document.querySelectorAll(".category-tab.active").length
        ) {
          document.querySelectorAll(".category-tab.active").forEach((item) => {
            item.classList.remove("active");
          });
        }
        blogData = [];
        setFilterCategory([]);
      }
    } else {
      _.remove(tabState, (n) => n != "");
      if (
        document.querySelectorAll(".category-tab.active") &&
        document.querySelectorAll(".category-tab.active").length
      ) {
        document.querySelectorAll(".category-tab.active").forEach((item) => {
          item.classList.remove("active");
        });
      }
      blogData = [];
      setFilterCategory([]);
      document.querySelector(".category-tab-all") &&
        document.querySelector(".category-tab-all").classList.toggle("active");
    }
  };

  const searchBlog = (value) => {

    if (filterKey != "&search=" + value) {
      setPostItems("");
      setFilterKey("&search=" + value);
    }
  };

  const searchKeyUpHandle = (event) => {

      if (event === undefined) {
        alert(document.getElementById('searchPanel').value)
          searchBlog(document.getElementById('searchPanel').value);
          return;
      }
      if (!loading) {
        if (event.keyCode == 13) {
          searchBlog(event.target.value);
        }
      }
  };

  const loadMore = () => {
    setShowLoadMore(false);
    setSticky(sticky + 1);
    // setFilterCategory([]);
    setLoadMoreStatus(true);
    setFilterKey("");
  };

  useEffect(() => {

    if (loadMoreStatus) {
      localSticky = sticky;
      let url =
        blogURL +
        "?orderby=id&per_page=11&exclude=" +
        excludID +
        (filterCategory && filterCategory.length > 0
          ? "&categories=" + filterCategory.join()
          : "") +
        filterKey +
        "&page=" +
        sticky;
      let postArr = [];

      fetch(url, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          data.map((item) => {
            postArr.push({
              id: item.id,
              title: item.title.rendered,
              slug: item.slug,
              image: item.acf.featured_image.url,
              categories: item.categories,
            });
          });
          setPost([...blogData, ...postArr]);
        });
    }
  }, [sticky]);

  return (
    <div className="blog_page">
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
      {/* Start banner section */}
      {bannerData ? (
        <div className="banner-section">
          <img
            className="cover-image"
            src={bannerData.image}
            alt="blog-image"
          />
          <div className="r-container">
            <div className="row text-panel mb-md-5 mb-0 pb-md-5 pb-0">
              <h1 className="blog__banner--title text-capitalize text-white">
                {renderHTML(bannerData.title)}
              </h1>
              <p style={{minHeight:150,position:"relative", top:"25px"}} className="blog__banner--description text-white mt-sm-5 mt-4">
                {bannerData.categoryItems &&
                  bannerData.categoryItems.map((item, index) => {
                    return (
                      <span key={index}>
                        {index ? ", " + renderHTML(item) : renderHTML(item)}
                      </span>
                    );
                  })}
              </p>
            </div>
            <Link
              passHref={true}
              href={"/blog/" + bannerData.slug}

            >
              <a className="btn text-uppercase mt-sm-5 mt-4 px-5 py-3 btn--read-more pink-btn round-form">
                {locale === "nl" ? "Lees verder" : "Read more"}
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={600}
        />
      )}
      {/* End banner section */}

      {/* Start blog section */}
      <div className="blog-section r-container py-sm-5">
        <div className="top-bar row align-items-center m-0 p-0 mt-sm-5 pt-5 pb-4">
          <div className="title-panel col-md-6 col-12 p-0 pb-md-0 pb-sm-5">
            <h2>{locale === "nl" ? "Onze recente blogs" : "Our Recent Blogs"}</h2>
            {result && <p className="text-uppercase">{result} {locale === "nl" ? "resultaten" : "results"}</p>}
          </div>
          <div className=" col-md-6 col-12 mt-5 mt-md-0 p-0 d-md-flex search-bar justify-content-end align-items-center">
            <input
              className="form-control round-form px-3 py-2"
              id="searchPanel"
              placeholder={locale === "nl" ? "Zoek hier" : "Search Here"}
             onKeyUp={e => {
                $("#searchPanel").val(e.target.value);
               if (e.keyCode == 13) {
                 searchBlog(e.target.value);
               }
            }}
            />
            <input type="hidden" id="searchTerm" />
            <label htmlFor="searchPanel" style={{cusrsor:"pointer"}} onClick={() => {
              searchBlog($("#searchPanel").val());
            }}>
              <RiSearchLine />
            </label>
          </div>
          <div className="col-12 d-md-none d-flex justify-content-end p-0 pt-3 pt-md-0">
            <div className="search-box round-form d-flex align-items-center py-2 pe-2">
              <label htmlFor="selectSearch" className="px-4">
                FITER BY :{" "}
              </label>
              {options && (
                <select
                  className="form-select text-end"
                  onChange={(e) => {
                    if (e.target.value) {
                      setFilterCategory([e.target.value]);
                    } else {
                      blogData = [];
                      setFilterCategory([]);
                    }
                  }}
                  defaultValue=""
                  aria-label="Default select example"
                >
                  <option value="">All</option>
                  {options.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {renderHTML(item.name)}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>
        </div>
        <div className="tab-bar d-md-flex d-none flex-wrap py-4">
          {categories ? (
            <>
              <button
                className="btn btn-tab px-5 py-3 round-form text-capitalize mt-3 me-3 category-tab category-tab-all"
                onClick={() => selectCategory()}
              >
                {locale === "nl" ? "Allemaal" : "All"}
              </button>
              {categories.map((item, index) => {
                return (
                  <button
                    className={
                      "btn btn-tab px-5 py-3 round-form text-capitalize mt-3 me-3 category-tab category-tab-" +
                      item.id +
                      ` ${filterCategory.indexOf(item.id) >= 0 && "active"}`
                    }
                    key={"button" + index}
                    onClick={(e) => selectCategory(item.id)}
                  >
                    {renderHTML(item.name)}
                  </button>
                );
              })}
            </>
          ) : loading ? (
            <Skeleton
              variant="text"
              width="100%"
              height={80}
              animation="wave"
            />
          ) : (
            <></>
          )}
        </div>
        {postItems.length > 1 ? (
          <div className="main-blog-panel row m-0">
            <div className="col-md-8 col-12 p-0">
              {
                <div className="row m-0">
                  <Link
                    passHref={true}
                    href={"/blog/" + postItems[1].slug}
                  
                  >
                    <a>
                      <div className="blog-box main-blog ps-0 pt-5 pe-md-5 pe-0">
                        <div className="round blog-image">
                          {postItems[1].image ? (
                            <img
                              src={postItems[1].image}
                              className="round"
                              alt="blog-image"
                            />
                          ) : loading ? (
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height={250}
                              animation="wave"
                            />
                          ) : (
                            <div className="black-image-panel" />
                          )}
                        </div>
                        <div className="blog-title pt-4 pb-5">
                          <p className="text-uppercase">
                            {postItems[1].categoryItems &&
                              postItems[1].categoryItems.map((item, index) => {
                                return (
                                  <span  key={index}>
                                    {index
                                      ? ", " + renderHTML(item)
                                      : renderHTML(item)}
                                  </span>
                                );
                              })}
                          </p>
                          <h3 className="mb-4">
                            {renderHTML(postItems[1].title)}
                          </h3>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              }
              <div className="row m-0">
                <div className="col-sm-6 col-12 p-0">
                  {postItems.map((item, index) => {
                    if (index != 0 && index % 3 == 0)
                      return (
                        <Link
                          passHref={true}
                          href={"/blog/" + item.slug}
                          key={index}
                        >
                          <a>
                            <div className="blog-box pt-5 pe-sm-5" key={index}>
                              <div className="round blog-image">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    className="round"
                                    alt="blog-image"
                                  />
                                ) : loading ? (
                                  <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={250}
                                    animation="wave"
                                  />
                                ) : (
                                  <div className="black-image-panel" />
                                )}
                              </div>
                              <div className="blog-title pt-4 pb-5">
                                <p style={{display:"none"}} className="text-uppercase">
                                  {item.categoryItems &&
                                    item.categoryItems.length &&
                                    item.categoryItems.map(
                                      (category, index) => {
                                        return (
                                          <span key={index}>
                                            {index
                                              ? ", " + renderHTML(category)
                                              : renderHTML(category)}
                                          </span>
                                        );
                                      }
                                    )}
                                </p>
                                <h3 className="mb-4">
                                  {renderHTML(item.title)}
                                </h3>
                              </div>
                            </div>
                          </a>
                        </Link>
                      );
                  })}
                </div>
                <div className="col-sm-6 col-12 p-0">
                  {postItems.map((item, index) => {
                    if (index != 1 && index % 3 == 1)
                      return (
                        <Link
                          passHref={true}
                          href={"/blog/" + item.slug}
                          key={index}
                        >
                          <a>
                            <div
                              className="blog-box pt-5 pe-md-5 pe-0 ps-md-0 ps-sm-5"
                              key={index}
                            >
                              <div className="round blog-image">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    className="round"
                                    alt="blog-image"
                                  />
                                ) : loading ? (
                                  <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={250}
                                    animation="wave"
                                  />
                                ) : (
                                  <div className="black-image-panel" />
                                )}
                              </div>
                              <div className="blog-title pt-4 pb-5">
                                <p className="text-uppercase" style={{display:"none"}}>
                                  {item.categoryItems &&
                                    item.categoryItems.length &&
                                    item.categoryItems.map(
                                      (category, index) => {
                                        return (
                                          <span key={index}>
                                            {index
                                              ? ", " + renderHTML(category)
                                              : renderHTML(category)}
                                          </span>
                                        );
                                      }
                                    )}
                                </p>
                                <h3 className="mb-4">
                                  {renderHTML(item.title)}
                                </h3>
                              </div>
                            </div>
                          </a>
                        </Link>
                      );
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 p-0">
              <div className="row m-0">
                <div className="col-md-12 col-sm-6 col-12 p-0">
                  {postItems.map((item, index) => {
                    if (
                      (index % 3 == 2) &
                      (Math.ceil((postItems.length - 1) / 3) * 3 - 2 > index)
                    )
                      return (
                        <Link
                          passHref={true}
                          href={"/blog/" + item.slug}
                          key={index}
                        >
                          <a>
                            <div className="blog-box pt-5 pe-md-0 pe-sm-5">
                              <div className="round blog-image">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    className="round"
                                    alt="blog-image"
                                  />
                                ) : loading ? (
                                  <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={250}
                                    animation="wave"
                                  />
                                ) : (
                                  <div className="black-image-panel"></div>
                                )}
                              </div>
                              <div className="blog-title pt-4 pb-5">
                                <p className="text-uppercase" style={{display:"none"}}>
                                  {item.categoryItems &&
                                    item.categoryItems.length &&
                                    item.categoryItems.map(
                                      (category, index) => {
                                        return (
                                          <span key={index}>
                                            {index
                                              ? ", " + renderHTML(category)
                                              : renderHTML(category)}
                                          </span>
                                        );
                                      }
                                    )}
                                </p>
                                <h3 className="mb-4">
                                  {renderHTML(item.title)}
                                </h3>
                              </div>
                            </div>
                          </a>
                        </Link>
                      );
                  })}
                </div>
                <div className="col-md-12 col-sm-6 col-12 p-0">
                  {postItems.map((item, index) => {
                    if (
                      (index % 3 == 2) &
                      (Math.ceil((postItems.length - 1) / 3) * 3 - 2 <= index)
                    )
                      return (
                        <Link
                          passHref={true}
                          href={"/blog/" + item.slug}
                          key={index}
                        >
                          <a>
                            <div className="blog-box pt-5 ps-md-0 ps-sm-5">
                              <div className="round blog-image">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    className="round"
                                    alt="blog-image"
                                  />
                                ) : loading ? (
                                  <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={250}
                                    animation="wave"
                                  />
                                ) : (
                                  <div className="black-image-panel" />
                                )}
                              </div>
                              <div className="blog-title pt-4 pb-5">
                                <p className="text-uppercase">
                                  {item.categoryItems &&
                                    item.categoryItems.length &&
                                    item.categoryItems.map(
                                      (category, index) => {
                                        return (
                                          <span key={index}>
                                            {index
                                              ? ", " + renderHTML(category)
                                              : renderHTML(category)}
                                          </span>
                                        );
                                      }
                                    )}
                                </p>
                                <h3 className="mb-4">
                                  {renderHTML(item.title)}
                                </h3>
                              </div>
                            </div>
                          </a>
                        </Link>
                      );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="main-blog-panel row m-0">
            <div className="col-md-8 col-12 p-0 pe-md-5 pt-5">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={250}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={200}
                height={50}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="100%"
                height={80}
                animation="wave"
              />
            </div>
            <div className="col-md-4 col-12 p-0 ps-md-5 pt-5">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={250}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={200}
                height={50}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="100%"
                height={80}
                animation="wave"
              />
            </div>
          </div>
        ) : (
          <h1 className="not-result-text text-center pt-5"></h1>
        )}
        {loadMoreStatus && (
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <Skeleton variant="rectangular" animation="wave" height={300} />
            </div>
            <div className="col-md-4 col-sm-6 d-sm-block d-none">
              <Skeleton variant="rectangular" animation="wave" height={300} />
            </div>
            <div className="col-md-4 d-md-block d-none">
              <Skeleton variant="rectangular" animation="wave" height={300} />
            </div>
          </div>
        )}
        {showLoadMore && (
          <button
            className="btn btn-more py-3 pink-btn px-5 round-form text-uppercase mt-5"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
      </div>
      {/* End blog section */}
      {/* Schedule */}
      <Schedule />
      {/* Footer */}
      <Footer />
    </div>
  );
}
