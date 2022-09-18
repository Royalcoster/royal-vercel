import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import SelectSearch, { fuzzySearch } from "react-select-search-nextjs";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import Range from "../../components/range";
import { useRouter } from "next/router";
import renderHTML from "react-render-html";
import NumberFormat from "react-number-format";
import {
  RiHeartLine,
  RiHeartFill,
  RiFilter3Fill,
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiErrorWarningLine,
} from "react-icons/ri";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Ee } from "react-flags-select";
let products = [];
const options = [
  { name: "RELEVANCE", value: "RELEVANCE", reverse: false },
  { name: "PRICE LOW TO HIGH", value: "PRICE A", reverse: false },
  { name: "PRICE HIGH TO LOW", value: "PRICE B", reverse: true },
  { name: "RECENTLY ADDED", value: "CREATED_AT", reverse: true },
  { name: "RECENTLY UPDATED", value: "UPDATED_AT", reverse: true },
  { name: "TITLE A-Z", value: "TITLE A", reverse: false },
  { name: "TITLE Z-A", value: "TITLE B", reverse: true }

];

var styles = {
  btn_primary: {
    backgroundColor: "#d3d3d3",
    marginRight: 10,
    borderColor: "#c4a060",
    color: "#000",
    fontWeight: 400,
    fontSize: "1.4rem",
    border: "2px solid #f6f6f6"
  }

}
const getProductURL = process.env.NEXT_PUBLIC_GET_PRODUCT_URL;
const productURL = process.env.NEXT_PUBLIC_PRODUCT_URL;
const productList = [
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    href: "#",
    url: "#",
  }
];
const filterItems = [
  { img: "filter-1.png", text: "SOLITAIRE" },
  { img: "filter-2.png", text: "PAVE" },
  { img: "filter-3.png", text: "CHANNEL SET" },
  { img: "filter-4.png", text: "SIDE-STONE" },
  { img: "filter-5.png", text: "THREE-STONE" },
  { img: "filter-6.png", text: "TENSION" },
  { img: "filter-7.png", text: "HALO" },
  { img: "filter-8.png", text: "VINTAGE" },
];

const karats = [
  { karat: "14k", title: "14K White", key: "white" },
  { karat: "18k", title: "18K White", key: "white" },
  { karat: "14k", title: "14K Yellow", key: "yellow" },
  { karat: "18k", title: "18K Yellow", key: "yellow" },
  { karat: "PT", title: "PLATINIUM", key: "platinium" },
  { karat: "RG", title: "ROSE GOLD", key: "rose-gold" },
  { karat: "18k", title: "18K White", key: "white" },
  { karat: "14k", title: "14K Yellow", key: "yellow" },
  { karat: "18k", title: "18K Yellow", key: "yellow" },
];
const settingType = [
  { title: "Exclusive Ring Settings", key: "exclusiveringsettings" },
  { title: "Ring Settings", key: "ringssettings" }

];
let filtersUpdated = "tag:ringssettings";
let sortRuleUpdated = "sortKey:BEST_SELLING,reverse:false";
export default function ChooseSetting() {
  const [formData, setFormData] = useState();
  const [result, setResult] = useState("878");

  const [value, setValue] = useState({ min: 5, max: 25 });
  const [selectRingType, setSelectRingType] = useState([]);
  const [accessToken, setAccessToken] = useState();
  const [selectKarat, setSelectKarat] = useState([]);
  const [productList, setProductData] = useState([]);
  const [lastProduct, setLastProduct] = useState();
  const [loadMoreStatus, setLoadMoreStatus] = useState(false);
  const [productsLoaded,setProductsLoaded] = useState(false);
  const [selectValue, setSelectValue] = useState({name:"RELEVANCE",value:"RELEVANCE",reverse:false});
  const [sortRule, setSortRule] = useState("sortKey:RELEVANCE,reverse:false");
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);

  const router = useRouter();
  const [products, setProducts] = useState();
  const setFavor = (event) => {
    event.target.closest(".favor-icon").classList.toggle("favor");
  };
  let products_temp = [];

  const openConfirmSettingPage = (event) => {
   var el = $(event.target);
   localStorage.choosenSetting = el.closest("[shopifyid]").attr("shopifyid");
   let formData = new FormData();
   formData.append("shopifyid", localStorage.choosenSetting);
   formData.append("sort", sortRuleUpdated);
   fetch(getProductURL, {
     method: "post",
     body: formData,
   })
   .then((res) => res.json())
   .then((data) => {
      localStorage.choosenSettingData = JSON.stringify(data);
      window.location.href = "confirmSetting";
   });

  };
  let lastProductStatus,
      productStore = [],
      filtersUpdated = "tag:ringssettings";

  useEffect(() => {

    getCollection("rings-settings");
  });
  const settingTypeChangedHndle = (event, item) => {
    filtersUpdated = "tag:" + $(event.target).attr("value");

    loadMore(true);
  };
  const getCollection = (hndl, after = "") => {
            let productURL = "https://royalcoster.com:81/royalcoster/getCollectionProducts.php";
            let formData = new FormData();
            setLoading(true);

            formData.append("handle", hndl)
            formData.append("after", after)

            fetch(productURL, {
              method: "post",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (after == "") {
                  products_temp = [];
                  setProducts(products_temp);
                  setProductsLoaded(true);
                }
                setProductsLoaded(false);
                $.each(data.data, function() {
                  products_temp.push(this)
                });
                console.log(products_temp);
                setProducts(products_temp);
                var pd = $.parseJSON(localStorage.pageData)
                setProductsLoaded(true);

              $.each($(".product-item"), function(ind) {
                $(this).attr("position", ind + 1);
                $(this).unbind("click");
                $(this).bind("click", function() {

                  pushClickEvent($(this));
                });
              })

                if (data.hasNextPage != "Yes") {

                  setLoading(false);
                } else {
                  getCollection(hndl,",after:\"" + data.last + "\"");
                }
              });

  };


  useEffect(() => {
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
    }
    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
  }, []);


  const ringTypeHandle = (event, index) => {
    let target = event.target.closest(".filter-item");
    if (target.classList.contains("active")) {
      let removeItem = selectRingType.indexOf(filterItems[index].text);
      if (removeItem != 0) {
        selectRingType.splice(removeItem, 1);
        setSelectRingType([...selectRingType]);
      } else {
        selectRingType.splice(-1, 1);
      }
      target.classList.remove("active");
    } else {
      target.classList.add("active");
      setSelectRingType([...selectRingType, filterItems[index].text]);
    }
  };

  const karatItemHandle = (event, index) => {
    let target = event.target.closest(".karat-item");
    if (target.classList.contains("active")) {
      let removeItem = selectKarat.indexOf(karats[index].title);
      if (removeItem != 0) {
        selectKarat.splice(removeItem, 1);
        setSelectKarat([...selectKarat]);
      } else {
        selectKarat.splice(-1, 1);
      }
      target.classList.remove("active");
    } else {
      target.classList.add("active");
      setSelectKarat([...selectKarat, karats[index].title]);
    }
  };

  const handleMenuBtn = (e) => {
    e.target
      .closest(".offcanvas-body")
      .querySelectorAll("button")
      .forEach((element) => {
        if (element.classList.contains("active")) {
          element.classList.remove("active");
        }
      });
    e.target.closest("button").classList.add("active");
  };

  return (
    <div className="chooseSetting_page">
      <Head>
        <title>chooseSetting | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="state-section">
        <div className="link-panel r-container py-3 d-sm-flex d-none align-items-center">
          <button
            className="btn back-arrow d-flex me-3 blue-text px-0"
            onClick={() => router.back()}
          >
            <HiOutlineArrowLeft />
          </button>
          <Link passHref={true}  href="/">
            <a className="mx-2">HOME</a>
          </Link>
          /
          <Link passHref={true}  href="/shop">
            <a className="mx-2">ENGAGEMENT RINGS</a>
          </Link>
          /
          <Link passHref={true}  href="#">
            <a className="mx-2">MAKE A RING</a>
          </Link>
          /
          <span className="title ms-2 text-uppercase blue-text">
            CHOOSE A SETTING
          </span>
        </div>
        <div className="link-panel r-container py-3 mb-md-5 mb-0 d-sm-none d-flex align-items-center">
          <button
            className="btn back-arrow d-flex me-3 blue-text px-0"
            onClick={() => router.back()}
          >
            <HiOutlineArrowLeft />
          </button>
          ...
          <Link passHref={true}  href="#">
            <a className="mx-2">MAKE A RING</a>
          </Link>
          /
          <span className="title ms-2 text-uppercase blue-text">
            CHOOSE A SETTING
          </span>
        </div>

        <div className="setting-state-panel">
          <div className="r-container  py-md-3  row">
            <div className="pe-5 py-md-0 py-5 my-md-5 my-0 col-4 setting-state d-flex justify-content-between align-items-center active">
              <div className="text-panel d-flex align-items-center">
                <div className="number me-3 d-flex justify-content-center align-items-center">
                  1
                </div>
                <div className="title text-uppercase">
                  <p className="mb-1 d-md-block d-none">Choose a</p>
                  <h3 className="m-0">Setting</h3>
                </div>
              </div>
              <img
                className="d-md-block d-none"
                src="/img/customRing/chooseSetting/choose.png"
                width="52"
                height="52"
                alt="state-image"
              />
            </div>
            <div className="px-5 py-md-0 py-5 my-md-5 my-0 col-4 setting-state d-flex justify-content-between align-items-center">
              <div className="text-panel d-flex align-items-center">
                <div className="number me-3 d-flex justify-content-center align-items-center">
                  2
                </div>
                <div className="title text-uppercase">
                  <p className="mb-1 d-md-block d-none">Choose a</p>
                  <h3 className="m-0">Diamond</h3>
                </div>
              </div>
              <img
                className="d-md-block d-none"
                src="/img/customRing/chooseSetting/diamond.png"
                width="52"
                height="52"
                alt="state-image"
              />
            </div>
            <div className="ps-5 py-md-0 py-5 my-md-5 my-0 col-4 setting-state d-flex justify-content-between align-items-center">
              <div className="text-panel d-flex align-items-center">
                <div className="number me-3 d-flex justify-content-center align-items-center">
                  3
                </div>
                <div className="title text-uppercase">
                  <p className="mb-1 d-md-block d-none">Choose a</p>
                  <h3 className="m-0">Ring</h3>
                </div>
              </div>
              <img
                className="d-md-block d-none"
                src="/img/customRing/chooseSetting/complete.png"
                width="52"
                height="52"
                alt="state-image"
              />
            </div>
          </div>
        </div>
        <div className="r-container d-sm-block d-none">
          <div className="ring-types d-flex justify-content-between align-items-center flex-wrap py-5">
            {filterItems.map((item, index) => {
              return (
                <button
                  className="btn filter-item round-form mt-3"
                  key={index}
                  onClick={(event) => ringTypeHandle(event, index)}
                >
                  <div className="image-panel text-center mb-3">
                    <img
                      src={"/img/customRing/chooseSetting/" + item.img}
                      alt="filter-image"
                    />
                  </div>
                  <h3 className="blue-text text-uppercase">{item.text}</h3>
                </button>
              );
            })}
          </div>
          <div className="setting-karat row m-0">
            <div className="karat-panel col-lg-8 col-12 pe-5">
              <h3 className="title text-uppercase pb-3">setting type</h3>
              {settingType.map((item, index) => {
                return (
                  <button variant="outlined"  style={styles.btn_primary}
                    key={item.key}
                    value={item.key}
                    onClick={(event) => settingTypeChangedHndle(event, index)}
                  >
                  {item.title}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="setting-karat row m-0">
            <div className="karat-panel col-lg-8 col-12 pe-5">
              <h3 className="title text-uppercase pb-3">material</h3>
              <div className="d-flex karat-list flex-wrap py-4 justify-content-between m-0">
                {karats.map((item, index) => {
                  return (
                    <button
                      className="btn p-0 karat-item"
                      key={index}
                      onClick={(event) => karatItemHandle(event, index)}
                    >
                      <div
                        className={
                          "round-form karat px-lg-4 px-5 py-2 " + item.key
                        }
                      >
                        {item.karat}
                      </div>
                      <p className="pt-2">{item.title}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="cost-panel col-lg-4 col-12 px-5">
              <h3 className="title text-uppercase blue-text m-0 pb-4">Cost</h3>
              <div className="range-panel d-flex align-items-center mt-4">
                <div className="range-min-pointer range-pointer" />
                <div className="range-max-pointer range-pointer" />
                <Range min={0} max={109000} unit={"$"} />
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* End Hero section */}

      {/* Start product section */}

      <div className="product-section r-container pt-5 pb-sm-5 ">

        <div className="top-bar row align-items-center m-0 py-3">
          <div className="title-panel col-md-6 col-12 p-0 pb-md-0 pb-3">
            <h2>Choose Setting</h2>
            <p className="text-uppercase" style={{ display: "none"}}>
              Engagement Rings <span>(Solitaire) ({result} items)</span>
            </p>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end flex-sm-row flex-column p-0 pt-3 pt-md-0">
            <button
              className="btn d-sm-none d-flex btn-filter round-form justify-content-between align-items-center px-4 py-3 mb-4"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterMenu"
              aria-controls="filterMenu"
            >
              <div className="text-uppercase d-flex align-items-center">
                <RiFilter3Fill className="me-3" />
                Filter
              </div>
              <RiArrowRightSLine />
            </button>
            <div className="search-box round-form d-flex align-items-center py-2 pe-sm-0 pe-2">
              <label htmlFor="selectSearch" className="px-4">
              SORT BY :{" "}
              </label>
              <SelectSearch
                id="selectSearch"
                options={options}
                value={selectValue}
                onChange={(name,value) => {
                  sortRuleUpdated = "sortKey:" + value.value.split(" ")[0] + ",reverse:" + value.reverse.toString();
                  loadMore(true);
                }}
                filterOptions={fuzzySearch}
                emptyMessage="Not found"
                search
              />

            </div>
          </div>
        </div>
        <div className="main-panel pt-5 pb-sm-5">
          {products && products.map((item, index) => {
            if (true) {
              var itemid =  item.shopifyid;

              return (

                <div className="mb-5 p-0 product-item" shopifyid={item.shopifyid}
                    onClick={(event) => openConfirmSettingPage(event)}
                >
                        <div className="product-image d-flex justify-content-center align-items-center round">
                        <img
                          src={item.image}
                          alt="product-image"
                        />
                      </div>
                      <h3 className="text-uppercase blue-text py-4 m-0">
                        {item.title}
                      </h3>

                      <h4 className="blue-text">{item.price}</h4>

                  <div className="color-panel py-4 mb-4">
                    <button className="btn white me-3"></button>
                    <button className="btn yellow me-3"></button>
                    <button className="btn platinium me-3"></button>
                    <button className="btn rose-gold me-3"></button>
                  </div>
                 {accessToken && <button className="favor-icon btn" onClick={setFavor}>
                    <RiHeartLine className="unfavor" />
                    <RiHeartFill className="favor" />
                  </button>}
                </div>
              );
          }  else {
              return (
                <div className="image-panel round" key={index}>
                  <img src={"/img/customRing/chooseSetting/" + item.img} />
                </div>
              );
          }})}
        </div>
      </div>
      {/* End product section */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="filterMenu"
        aria-labelledby="filterMenuLabel"
      >
        <div className="offcanvas-header py-4 p-0">
          <div className="r-container d-flex justify-content-between align-items-center">
            <h3 id="filterMenuLabel" className="text-uppercase mb-0 py-2">
              Filter
            </h3>
            <button
              type="button"
              className="btn btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div className="offcanvas-body r-container pt-2 p-0">
          <button
            className="btn btn-price text-uppercase mt-3 round-form d-flex justify-content-between align-items-center px-4 py-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#priceMenu"
            aria-controls="priceMenu"
            onClick={handleMenuBtn}
          >
            price
            <RiArrowRightSLine />
          </button>
          <button
            className="btn btn-style text-uppercase mt-3 round-form d-flex justify-content-between align-items-center px-4 py-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#styleMenu"
            aria-controls="styleMenu"
            onClick={handleMenuBtn}
          >
            style
            <RiArrowRightSLine />
          </button>
          <button
            className="btn btn-price text-uppercase mt-3 round-form d-flex justify-content-between align-items-center px-4 py-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#karatMenu"
            aria-controls="karatMenu"
            onClick={handleMenuBtn}
          >
            karat
            <RiArrowRightSLine />
          </button>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="priceMenu"
        aria-labelledby="priceMenuLabel"
      >
        <div className="offcanvas-header py-4 p-0">
          <div className="r-container d-flex justify-content-between align-items-center py-2">
            <h3
              id="filterMenuLabel"
              className="text-uppercase mb-0 d-flex align-items-center"
            >
              price <RiErrorWarningLine className="ms-2" />
            </h3>
            <button
              type="button"
              className="btn btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div className="offcanvas-body p-0 d-flsex flex-column justify-content-between">
          <button
            className="btn btn-back text-uppercase d-flex justify-content-between align-items-center px-4 py-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#filterMenu"
            aria-controls="filterMenu"
          >
            <RiArrowLeftSLine />
            Reset Filter
          </button>
          <div className="r-container">
            <div className="range-panel d-flex align-items-center mt-4 pt-4 pdx-5">
              <div className="range-min-pointer range-pointer" />
              <div className="range-max-pointer range-pointer" />
              <Range min={0} max={109000} unit={"$"} />
            </div>
          </div>
        </div>
        <div className="offcanvas-footer text-center pb-5">
          <button
            className="btn btn-apply blue-btn text-uppercase py-3 round-form r-container"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#filterMenu"
            aria-controls="filterMenu"
          >
            apply
          </button>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="styleMenu"
        aria-labelledby="styleMenuLabel"
      >
        <div className="offcanvas-header py-4 p-0">
          <div className="r-container d-flex justify-content-between align-items-center py-2">
            <h3
              id="styleMenuLabel"
              className="text-uppercase mb-0 d-flex align-items-center"
            >
              style <RiErrorWarningLine className="ms-2" />
            </h3>
            <button
              type="button"
              className="btn btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div className="offcanvas-body p-0 d-flsex flex-column justify-content-between">
          <button
            className="btn btn-back text-uppercase d-flex justify-content-between align-items-center px-4 py-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#filterMenu"
            aria-controls="filterMenu"
          >
            <RiArrowLeftSLine />
            Reset Filter
          </button>
          <div className="r-container row pt-4">
            {filterItems.map((item, index) => {
              return (
                <div className="col-4 style-item pb-3" key={index}>
                  <button
                    className="btn px-3 py-3 filter-item round-form"
                    onClick={(event) => ringTypeHandle(event, index)}
                  >
                    <div className="image-panel text-center mb-3">
                      <img
                        src={"/img/customRing/chooseSetting/" + item.img}
                        alt="filter-image"
                      />
                    </div>
                    <h3 className="blue-text text-uppercase">{item.text}</h3>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="offcanvas-footer text-center pb-5">
          <button
            className="btn btn-apply blue-btn text-uppercase py-3 round-form r-container"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#filterMenu"
            aria-controls="filterMenu"
          >
            apply
          </button>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="karatMenu"
        aria-labelledby="karatMenuLabel"
      >
        <div className="offcanvas-header py-4 p-0">
          <div className="r-container d-flex justify-content-between align-items-center py-2">
            <h3
              id="karatMenuLabel"
              className="text-uppercase mb-0 d-flex align-items-center"
            >
              karat <RiErrorWarningLine className="ms-2" />
            </h3>
            <button
              type="button"
              className="btn btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div className="offcanvas-body p-0 d-flsex flex-column justify-content-between">
          <button
            className="btn btn-back text-uppercase d-flex justify-content-between align-items-center px-4 py-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#filterMenu"
            aria-controls="filterMenu"
          >
            <RiArrowLeftSLine />
            Reset Filter
          </button>
          <div className="r-container row pt-4">
            {karats.map((item, index) => {
              return (
                <div className="karat-panel col-4" key={index}>
                  <button
                    className="btn p-0 karat-item"
                    onClick={(event) => karatItemHandle(event, index)}
                  >
                    <div
                      className={
                        "round-form karat px-lg-4 px-5 py-2 " + item.key
                      }
                    >
                      {item.karat}
                    </div>
                    <p className="pt-2">{item.title}</p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="offcanvas-footer text-center pb-5">
          <button
            className="btn btn-apply blue-btn text-uppercase py-3 round-form r-container"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#filterMenu"
            aria-controls="filterMenu"
          >
            apply
          </button>
        </div>
      </div>

      {/* Start Schedule section */}
      <Schedule normalMode="normal-mode" />
      {/* End Schedule section */}
      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );

}
