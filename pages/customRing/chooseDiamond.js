import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import SelectSearch, { fuzzySearch } from "react-select-search-nextjs";
import { useRouter } from "next/router";
import MRange from "../../components/mRange";
import Range from "../../components/range";
import renderHTML from "react-render-html";
import NumberFormat from "react-number-format";
import { Skeleton } from "@material-ui/lab";
import {
  RiErrorWarningLine,
  RiFunctionLine,
  RiMenuLine,
  RiCheckLine,
  RiFilter3Fill,
  RiArrowRightSLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import { HiOutlineArrowLeft } from "react-icons/hi";
const options = [
  { name: "RELEVANCE", value: "RELEVANCE", reverse: false },
  { name: "PRICE LOW TO HIGH", value: "PRICE A", reverse: false },
  { name: "PRICE HIGH TO LOW", value: "PRICE B", reverse: true },
  { name: "RECENTLY ADDED", value: "CREATED_AT", reverse: true },
  { name: "RECENTLY UPDATED", value: "UPDATED_AT", reverse: true },
  { name: "TITLE A-Z", value: "TITLE A", reverse: false },
  { name: "TITLE Z-A", value: "TITLE B", reverse: true }
];
const shapes = [
  { name: "ROUND", image: "shape-1.png" },
  { name: "PRINCESS", image: "shape-2.png" },
  { name: "CUSHION", image: "shape-3.png" },
  { name: "EMERALD", image: "shape-4.png" },
  { name: "OVAL", image: "shape-5.png" },
  { name: "RADIANT", image: "shape-6.png" },
  { name: "ASSCHER", image: "shape-7.png" },
  { name: "MARQUISE", image: "shape-8.png" },
  { name: "HEART", image: "shape-9.png" },
  { name: "PEAR", image: "shape-10.png" },
];
const getProductURL = process.env.NEXT_PUBLIC_GET_PRODUCT_URL;
const productURL = process.env.NEXT_PUBLIC_PRODUCT_URL;
const productList = [
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  }
];

const openConfirmDiamondPage = (event) => {
 var el = $(event.target);
 localStorage.choosenDiamond = el.closest("[shopifyid]").attr("shopifyid");
 let formData = new FormData();
 formData.append("shopifyid", localStorage.choosenDiamond);
 fetch(getProductURL, {
   method: "post",
   body: formData,
 })
 .then((res) => res.json())
 .then((data) => {
    localStorage.choosenDiamondData = JSON.stringify(data);
    window.location.href = "confirmDiamond";
 });
};

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
const colorMarks = [
  { value: 0, label: "" },
  {
    value: 10,
    label: "M",
  },
  {
    value: 20,
    label: "L",
  },
  {
    value: 30,
    label: "K",
  },
  {
    value: 40,
    label: "J",
  },
  {
    value: 50,
    label: "I",
  },
  {
    value: 60,
    label: "H",
  },
  {
    value: 70,
    label: "G",
  },
  {
    value: 80,
    label: "F",
  },
  {
    value: 90,
    label: "E",
  },
  {
    value: 100,
    label: "D",
  },
];

const clarityMarks = [
  { value: 0, label: "" },
  {
    value: 11.111,
    label: "L1",
  },
  {
    value: 22.222,
    label: "S12",
  },
  {
    value: 33.333,
    label: "SL1",
  },
  {
    value: 44.444,
    label: "VS2",
  },
  {
    value: 55.555,
    label: "VS1",
  },
  {
    value: 66.666,
    label: "VVS2",
  },
  {
    value: 77.777,
    label: "VVS1",
  },
  {
    value: 88.888,
    label: "IF",
  },
  {
    value: 99.999,
    label: "FL",
  },
];
const cutMarks = [
  {
    value: 0,
    label: "",
  },
  {
    value: 25,
    label: "FAIR",
  },
  {
    value: 50,
    label: "GOOD",
  },
  {
    value: 75,
    label: "VERY GOOD",
  },
  {
    value: 100,
    label: "EXCELLET",
  },
];
let sortRuleUpdated = "sortKey:RELEVANCE,reverse:false";
export default function ChooseDiamond() {
  const [formData, setFormData] = useState();
  const [result, setResult] = useState("878");
  const [selectValue, setSelectValue] = useState({name:"RELEVANCE",value:"RELEVANCE",reverse:false});
  const [sortRule, setSortRule] = useState("sortKey:RELEVANCE,reverse:false");
  const [productList, setProductData] = useState([]);

  const [color, setColor] = useState("white");
  const [selectShape, setSelectShape] = useState([]);
  const [lastProduct, setLastProduct] = useState();
  const [loadMoreStatus, setLoadMoreStatus] = useState(false);
  const [load, setLoad] = useState(false);
  const router = useRouter();
  let lastProductStatus,
      ringImage ="",
      productStore = [];
  useEffect(() => {

    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
    }
    var ww = setTimeout(function() {

        var ring = $.parseJSON(localStorage.choosenSettingData)
        $("[ringImage]").attr("src", ring.image.src);

    }, 1000);

  }, []);

  const loadMore = (isFirstPage = false) => {

        setLoadMoreStatus(true);
        let formData = new FormData();
        if (typeof isFirstPage === 'object') {
          formData.append("position", `first:9, after:"${lastProduct}"`);
        } else {
          formData.append("position", `first:9`);
        }
        formData.append("query", "status:active AND -tag:drafted AND product_type:Diamonds");
        formData.append("sort", sortRuleUpdated);
        if (formData && lastProduct) {

          fetch(productURL, {
            method: "post",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              data.hasNextPage == "Yes"
                ? setLastProduct(data.last)
                : setLastProduct(false);
                if (typeof isFirstPage === 'object') {
                  setProductData([...productList, ...data.data]);
                } else {
                  setProductData(data.data);

                }

              setLoadMoreStatus(false);
            });
        }

  };

  const shapeHandle = (event, index) => {

    let target = event.target.closest(".btn-shape");
    if (target.classList.contains("active")) {
      let removeItem = selectShape.indexOf(shapes[index].name);
      if (removeItem != 0) {
        selectShape.splice(removeItem, 1);
        setSelectShape([...selectShape]);
      } else {
        selectShape.splice(-1, 1);
      }
      target.classList.remove("active");
    } else {
      target.classList.add("active");
      setSelectShape([...selectShape, shapes[index].name]);
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
  useEffect(() => {

    let formData = new FormData();
    formData.append("position", "first:12");
    formData.append("query", "status:active AND product_type:Diamonds");
    formData.append("sort", sortRuleUpdated);
    if (formData) {

      fetch(productURL, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          //setLoad(false);

          if (data.hasNextPage == "Yes") {
            setLastProduct(data.last);
            lastProductStatus = data.last;
          } else {
            setLastProduct(false);
            lastProductStatus = false;
          }
          setProductData(data.data);
      //    setProducts([...products, ...productData]);

          productStore = data.data;
        });
    }
  }, [formData]);
  return (
    <div className="chooseDiamond_page">
      <Head>
        <title>chooseSetting | Royal Coster</title>
      </Head>
      <Header />
      {/* Start state section */}
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
            <div className="pe-5 py-md-0 selected-ring-panel py-5 my-md-5 my-0 col-4 setting-state d-flex justify-content-between align-items-center active">
              <div className="text-panel d-flex align-items-center">
                <div className="number me-3 d-flex justify-content-center align-items-center">
                  <RiCheckLine />
                </div>
                <div className="title text-uppercase">
                  <p className="mb-1 d-md-block d-none">Choose a</p>
                  <h3 className="m-0">Setting</h3>
                </div>
              </div>
              <div className="hover-panel d-md-none d-block">
                <div className="r-container  py-4">
                  <div className="ring-info-panel d-flex justify-content-between align-items-center">
                    <div className="ring-title-panel d-flex align-items-center">
                      <img ringImage="1"
                        src={ringImage}
                        width="57"
                        height="57"
                        alt="state-image"
                        style={{ background: "white" }}
                        className="round-form ring-image me-3"
                      />
                      <div className="text-panel">
                        <h3 className="m-0">Solitaire</h3>
                        <h4 className="text-capitalize">Metal : Gold (18k)</h4>
                      </div>
                    </div>
                    <div className="cost-panel">
                      <h3 className="m-0">€ 645.00</h3>
                      <h4 className="text-end">(ex VAT)</h4>
                    </div>
                  </div>
                  <div className="btn-panel row mt-4 m-0">
                    <div className="col-6 pe-2 p-0">
                      <button className="btn round-form btn-view py-2 text-uppercase">
                        view
                      </button>
                    </div>
                    <div className="col-6 ps-2 p-0">
                      <button className="btn round-form btn-change py-2 text-uppercase">
                        change
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <img ringImage="1"
                src="/img/customRing/chooseDiamond/ring.png"
                width="52"
                height="52"
                alt="state-image"
                style={{ background: "white" }}
                className="round-form d-md-block d-none"
              />
            </div>
            <div className="px-5 py-md-0 py-5 my-md-5 my-0 col-4 setting-state d-flex justify-content-between align-items-center active">
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
                src="/img/customRing/chooseDiamond/diamond.png"
                className="d-md-block d-none"
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
      </div>
      {/* End state section */}
      {/* Start choose section */}
      <div className="choose-section d-sm-block d-none r-container py-5">
        <div className="shapes-panel">
          <div className="title-panel py-4">
            <h2 className="blue-text text-uppercase d-flex align-items-center">
              SHAPES
              <RiErrorWarningLine className="ms-2 warning-icon" />
            </h2>
          </div>
          <div className="shapes-box py-4 d-flex align-items-center d-flex flex-wrap">
            {shapes.map((item, index) => {
              return (
                <button
                  className="btn btn-shape me-3 round mb-3"
                  key={index}
                  onClick={(event) => shapeHandle(event, index)}
                >
                  <div className="image-box pb-3">
                    <img src={"/img/customRing/chooseDiamond/" + item.image} />
                  </div>
                  <p className="m-0">{item.name}</p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="silder-panel row m-0">
          <div className="color-filter col-lg-4 col-md-6 col-12 p-0 pe-5 mb-5 pb-5">
            <h3 className="text-uppercase blue-text d-flex align-items-center mb-4">
              carat
              <RiErrorWarningLine className="ms-2" />
            </h3>
            <Range max={8} min={0} unit={""} />
          </div>
          <div className="color-filter col-lg-4 col-md-6 col-12 p-0 pe-5 mb-5 pb-5">
            <h3 className="text-uppercase blue-text d-flex align-items-center">
              colour
              <RiErrorWarningLine className="ms-2" />
            </h3>
            <MRange marks={colorMarks} step={10} />
          </div>
          <div className="clarity-filter col-lg-4 col-md-6 col-12 p-0 pe-5 mb-5 pb-5">
            <h3 className="text-uppercase blue-text d-flex align-items-center">
              clarity
              <RiErrorWarningLine className="ms-2" />
            </h3>
            <MRange marks={clarityMarks} step={11.111} />
          </div>
          <div className="cut-filter col-lg-4 col-md-6 col-12 p-0 pe-5 mb-5 pb-5">
            <h3 className="text-uppercase blue-text d-flex align-items-center">
              cut
              <RiErrorWarningLine className="ms-2" />
            </h3>
            <MRange marks={cutMarks} step={25} />
          </div>
          <div className="price-filter col-lg-4 col-md-6 col-12 p-0 pe-5 mb-5 pb-5">
            <h3 className="text-uppercase blue-text d-flex align-items-center mb-4">
              price
              <RiErrorWarningLine className="ms-2" />
            </h3>
            <Range max={109000} min={0} unit={"$"} />
          </div>
        </div>
      </div>
      {/* End choose section */}
      {/* Start products section */}
      <div className="product-section r-container mb-5 pb-5">
        <div className="top-bar row align-items-center m-0 py-3">
          <div className="title-panel col-md-6 col-12 p-0 pb-md-0 pb-3">
            <h2>Choose Diamond</h2>
            <p className="text-uppercase mb-0" style={{display: "none"}}>
              Certified Diamonds ({result} items)
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
            <div className="search-box round-form d-flex align-items-center py-2 pe-sm-0 pe-2 mb-sm-0 mb-2">
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
        <div className="list-bar d-flex justify-content-between align-items-center py-sm-0 py-3">
          <div className="tab-group d-sm-block d-none">
            <button className="btn py-4 px-0 me-4">NATURAL</button>
            <button className="btn py-4 px-0 me-4">COLOURED</button>
            <button className="btn py-4 px-0">GEMSTONES</button>
          </div>
          <select
            className="form-select select-display-mode blue-text d-sm-none py-3 round-form px-4 me-3"
            aria-label="Default select example"
          >
            <option>NATURAL</option>
            <option>COLOURED</option>
            <option>GEMSTONES</option>
          </select>
          <div className="order-btn-group d-flex">
            <button className="btn btn-show-content d-flex round-form py-3 px-3 me-sm-5 me-3">
              <RiMenuLine />
            </button>
            <button className="btn btn-show-list d-flex round-form py-3 px-3">
              <RiFunctionLine />
            </button>
          </div>
        </div>
        {!load && productList && productList.length > 0 ? (
          <div className="col-lg-12 col-md-8 col-sm-7 col-12 p-0 product-panel m-0" >
            <div className="row m-0">
              {productList.map((item, index) => {
                return (
                  <div
                    shopifyid={item.shopifyid}
                    className="product-item col-lg-3 col-md-6 col-sm-12 mb-4"
                    key={index}
                    onClick={(event) => openConfirmDiamondPage(event)}
                  >

                        <div className="product-image hover-scale d-flex justify-content-center align-items-center round">
                          <img src={item.image} alt="product-image" />
                        </div>
                        <h3 className="text-uppercase blue-text my-4 m-0">
                          {item.title}
                        </h3>
                        {+item.Fullprice > +item.price ? (
                          <div className="d-flex price-panel">
                            <h4 className="blue-text me-3">
                              <NumberFormat
                                value={item.price}
                                displayType="text"
                                decimalScale={2}
                                fixedDecimalScale={true}
                                thousandSeparator={true}
                                prefix="€ "
                              />
                            </h4>
                            <h4 className="full-price text-decoration-line-through">
                              <NumberFormat
                                value={item.Fullprice}
                                displayType="text"
                                decimalScale={2}
                                fixedDecimalScale={true}
                                thousandSeparator={true}
                                prefix="€ "
                              />
                            </h4>
                          </div>
                        ) : (
                          <div className="price-panel">
                            <h4 className="blue-text me-3">
                              <NumberFormat
                                value={item.price}
                                displayType="text"
                                decimalScale={2}
                                fixedDecimalScale={true}
                                thousandSeparator={true}
                                prefix="€ "
                              />
                            </h4>
                          </div>
                        )}

                  </div>
                );
              })}
            </div>
            {loadMoreStatus && (
              <div className="mt-4 row m-0">
                <div className="col-lg-4 col-md-6 col-12">
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width="100%"
                    height={300}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={100}
                    height={20}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width="100%"
                    height={40}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width="100%"
                    height={300}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={100}
                    height={20}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width="100%"
                    height={40}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-12 d-lg-block d-none">
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width="100%"
                    height={300}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={100}
                    height={20}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width="100%"
                    height={40}
                  />
                </div>
              </div>
            )}
            {lastProduct && (
              <button
                className="btn load-more-btn text-uppercase py-3 px-5 mt-3 round-form"
                onClick={loadMore}
              >
                Load More
              </button>
            )}
          </div>
        ) : !load ? (
          <h3 className="none-text text-center flex-fill p-0">No product</h3>
        ) : (
          <div className="col-lg-9 col-md-8 col-sm-7 col-12 p-0 row m-0">
            <div className="col-lg-4 col-md-6 col-12">
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height={300}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="100%"
                height={40}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height={300}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="100%"
                height={40}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12 d-lg-block d-none">
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height={300}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="100%"
                height={40}
              />
            </div>
          </div>
        )}
      </div>
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
            data-bs-target="#shapeMenu"
            aria-controls="shapeMenu"
            onClick={handleMenuBtn}
          >
            shape
            <RiArrowRightSLine />
          </button>
          <button
            className="btn btn-price text-uppercase mt-3 round-form d-flex justify-content-between align-items-center px-4 py-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#caratMenu"
            aria-controls="caratMenu"
            onClick={handleMenuBtn}
          >
            carat
            <RiArrowRightSLine />
          </button>
          <button
            className="btn btn-price text-uppercase mt-3 round-form d-flex justify-content-between align-items-center px-4 py-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#colourMenu"
            aria-controls="colourMenu"
            onClick={handleMenuBtn}
          >
            COLOUR
            <RiArrowRightSLine />
          </button>
          <button
            className="btn btn-price text-uppercase mt-3 round-form d-flex justify-content-between align-items-center px-4 py-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#clarityMenu"
            aria-controls="clarityMenu"
            onClick={handleMenuBtn}
          >
            CLARIty
            <RiArrowRightSLine />
          </button>
          <button
            className="btn btn-price text-uppercase mt-3 round-form d-flex justify-content-between align-items-center px-4 py-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#cutMenu"
            aria-controls="cutMenu"
            onClick={handleMenuBtn}
          >
            CUT
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
        id="shapeMenu"
        aria-labelledby="shapeMenuLabel"
      >
        <div className="offcanvas-header py-4 p-0">
          <div className="r-container d-flex justify-content-between align-items-center py-2">
            <h3
              id="shapeMenuLabel"
              className="text-uppercase mb-0 d-flex align-items-center"
            >
              shape <RiErrorWarningLine className="ms-2" />
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
            {shapes.map((item, index) => {
              return (
                <div className="col-4 shape-item pb-3" key={index}>
                  <button
                    className="btn btn-shape me-3 round mb-3"
                    onClick={(event) => shapeHandle(event, index)}
                  >
                    <div className="image-box pb-3">
                      <img
                        src={"/img/customRing/chooseDiamond/" + item.image}
                      />
                    </div>
                    <p className="m-0">{item.name}</p>
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
        id="caratMenu"
        aria-labelledby="caratMenuLabel"
      >
        <div className="offcanvas-header py-4 p-0">
          <div className="r-container d-flex justify-content-between align-items-center py-2">
            <h3
              id="caratMenuLabel"
              className="text-uppercase mb-0 d-flex align-items-center"
            >
              carat <RiErrorWarningLine className="ms-2" />
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
            <Range max={8} min={0} unit={""} />
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
        id="colourMenu"
        aria-labelledby="colourMenuLabel"
      >
        <div className="offcanvas-header py-4 p-0">
          <div className="r-container d-flex justify-content-between align-items-center py-2">
            <h3
              id="colourMenuLabel"
              className="text-uppercase mb-0 d-flex align-items-center"
            >
              colour <RiErrorWarningLine className="ms-2" />
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
            <MRange marks={colorMarks} step={10} />
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
        id="clarityMenu"
        aria-labelledby="clarityMenuLabel"
      >
        <div className="offcanvas-header py-4 p-0">
          <div className="r-container d-flex justify-content-between align-items-center py-2">
            <h3
              id="clarityMenuLabel"
              className="text-uppercase mb-0 d-flex align-items-center"
            >
              clarity <RiErrorWarningLine className="ms-2" />
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
            <MRange marks={clarityMarks} step={11.111} />
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
        id="cutMenu"
        aria-labelledby="cutMenuLabel"
      >
        <div className="offcanvas-header py-4 p-0">
          <div className="r-container d-flex justify-content-between align-items-center py-2">
            <h3
              id="cutMenuLabel"
              className="text-uppercase mb-0 d-flex align-items-center"
            >
              cut <RiErrorWarningLine className="ms-2" />
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
            <MRange marks={cutMarks} step={25} />
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

      {/* End products section */}
    </div>
  );
}
