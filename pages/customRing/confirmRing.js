import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import NeedHelp from "../../components/needHelp";
import ProductDetail from "../../components/productDetail";
import Customer from "../../components/customer";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import {
  RiHeartFill,
  RiShareLine,
  RiErrorWarningLine,
  RiChat1Line,
  RiCustomerService2Fill,
  RiSubtractFill,
  RiAddFill,
  RiCheckLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { HiOutlineArrowLeft } from "react-icons/hi";


const inscriptions = [
  { title: "Add Engraving" },
  { title: "Add Engraving" },
  { title: "Add Engraving" },
  { title: "Add Engraving" },
];
const sizeList = [
  { size: 5 },
  { size: 6 },
  { size: 7 },
  { size: 8 },
  { size: 9 },
];
const meterials = [
  { meterial: "material-1.png" },
  { meterial: "material-2.png" },
  { meterial: "material-3.png" },
  { meterial: "material-4.png" },
];

const customerSlider = [
  {
    name: "Ayesha",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-1.png",
    description:
      "Finding jewelry that just finishes your outfit.. Isn't that a great feeling? 😍 At Royal Coster Diamonds we have an extensive collection of (diamond) jewelry. If you'd rather choose the diamond and setting yourself, that's also possible.",
  },
  {
    name: "costerdiamondsofficial",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "This 2 carat Royal 201 diamond ring is a must for everyone 😍 Tag the person who you think should have this ring!⁠",
  },
];

const caratList = [
  { carat: 0.47, time: 0.3 },
  { carat: 0.67, time: 0.5 },
  { carat: 0.87, time: 0.7 },
  { carat: 1.17, time: 1 },
];

const informations = [
  { name: "Shape", value: "ROUND" },
  { name: "sYMMETRY", value: "vERY gOOD" },
  { name: "CARAT", value: "1.00" },
  { name: "fLUORESCENCE", value: "nONE" },
  { name: "COLOR", value: "H" },
  { name: "l/w( (MM)", value: "6.31X6.36" },
  { name: "CLARITY", value: "SI1" },
  { name: "l/w rATIO", value: "1.01" },
  { name: "CUT", value: "EXCELLENT" },
  { name: "cERTIFICATE", value: "igi" },
  { name: "POLISH", value: "EXCELLET" },
];
const productID = "SKU 10872957";
const productDescription =
  "This beautiful tapered engagement ring design is channel-set with eight round shaped diamonds. A setting designed to draw the eye to the center diamond or gemstone of your choice. Pair it with the matching wedding band for a contoured look.";
const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
export default function ConfirmRing() {
  const [result, setResult] = useState("878");
  const [size, setSize] = useState(0);
  const [ringStyle, setRingStyle] = useState("");
  const [carat, setCarat] = useState(0);
  const [favorItem, setFavorItem] = useState();
  const [productImages, setProductImages] = useState();
  const [itemAmount, setItemAmount] = useState(1);
  const [itemPrice, setItemPrice] = useState(645);
  const [selectValue, setSelectValue] = useState("POPULAR");
  const [mainImage, setMainImage] = useState();
  const [mainProductImage, setMainProductImage] = useState();
  const [accessToken, setAccessToken] = useState();
  const [productData, setProductData] = useState();
  const [diamondData, setDiamondData] = useState();
  const [categories, setCategories] = useState(["H-Color", "SI1 Clarity", "Excellent Cut"]);
  const [diamondShape, setDiamondShape] = useState();
  const [diamondSKU, setDiamondSKU] = useState();
  const [diamondTitle, setDiamondTitle] = useState();
  const [fullPrice, setFullPrice] = useState();
  const [ringData, setRingData] = useState();

  const router = useRouter();

  const showProduct = (product) => {
    setMainProductImage(product);
  };

  useEffect(() => {
    alert
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
    }

    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
    var ww = setInterval(function() {

      if ($ !== undefined) {
        clearInterval(ww);
        if (localStorage.choosenSetting !== undefined && localStorage.choosenDiamond !== undefined) {

          $("#addtocart").show();
        } else {
          $("#additem").show()
        }
        var ring = $.parseJSON(localStorage.choosenSettingData);
        setRingData(ring);
        $("[ringImage]").attr("src", ring.images[0].src);
        setRingStyle(ring.attributes.Style + " Style");
        var diamond = $.parseJSON(localStorage.choosenDiamondData);
        setDiamondData(diamond);
        let parts = diamond.title.split(" ");
        let dsc = [];
        let dsct = "";
        dsc.push(parts[2] + " Color | ");
        dsct +=  parts[2] + " Color | ";
        dsc.push(parts[3] + " Clarity | ");
        dsct += parts[3] + " Clarity | ";
        dsc.push(parts[4].charAt(0).toUpperCase() + parts[4].slice(1) + " Cut");
        dsct += parts[4].charAt(0).toUpperCase() + parts[4].slice(1) + " Cut";

        diamond.body_html = dsct;
        setCategories(dsc);
        $("[diamondImage]").attr("src", diamond.images[0].src);
        $("#ringTitle").html(ring.title + "<br />" + diamond.title);
        ring.title.replace("()", "")
        ring.images.push(...diamond.images);
        setProductImages(ring.images);
        setMainProductImage(ring.images[0].src);
        setItemPrice(parseInt(ring.variants[0].price) + parseInt(diamond.variants[0].price));
        setDiamondSKU("SKU " + diamond.variants[0].sku)
        setDiamondTitle(diamond.title);
        setDiamondShape(diamond.diamondDetails.fullcut + " Shape");
        console.log(ring)
      }
    }, 100);
  }, []);
  const addRingToCart = (e) => {
    e.preventDefault();
    let cartAmount = 0;
    let currentSize = size ? size : sizeList[0];
    let formData = new FormData();
    var rd = ringData.variants[0].id;
    const graphql = `{productVariant(id: "gid://shopify/ProductVariant/` + rd + `") {id title storefrontId}}`;

    formData.append("graphql", btoa(graphql));
    fetch(graphqlURL, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        let cartItem = {
          shopifyid: ringData.id,
          size: currentSize,
          maxCount: ringData.available,
          description: ringData.body_html,
          title: ringData.title,
          price: ringData.variants[0].price,
          variant: {
            storefrontId: data.data.productVariant.storefrontId,
          },
          image: ringData.image.src.replace(".jpg", "_100x.jpg"),
          amount: 1,
          product_type: "Rings",
        };
        let selectedAmount = itemAmount;

        if (localStorage.cart) {
          let cartData = JSON.parse(localStorage.cart).cartData;
          cartData.map((product) => {
            if (product.shopifyid == ringData.id) {
              cartAmount += product.amount;
            }
          });

          let setItem = cartData.find(
            (item, index) => item.shopifyid == cartItem.shopifyid
          );
          let available = ringData.available - cartAmount;

        /*  if (!available) {
            const variant = "warning";
            enqueueSnackbar("Stock is not enough.", { variant });
            return;
          }

          if (selectedAmount > available) {
            setItemAmount(available);
            selectedAmount = available;
          }*/

          if (setItem) {
            const variantItem = cartData.find(
              (item) => item.variant.variantId == cartItem.variant.variantId
            );
            if (variantItem) {
              variantItem.amount += selectedAmount;
              localStorage.setItem(
                "cart",
                JSON.stringify({ cartData: cartData })
              );
            //  props.setWishList(cartData);
            } else {
              localStorage.setItem(
                "cart",
                JSON.stringify({ cartData: [...cartData, cartItem] })
              );
            //  props.setWishList([...cartData, cartItem]);
            }
          } else {
            localStorage.setItem(
              "cart",
              JSON.stringify({
                cartData: [
                  ...cartData,
                  {
                    ...cartItem,
                    amount: selectedAmount,
                  },
                ],
              })
            );
          }
        } else {
          if (!ringData.available) {
            const variant = "warning";
            enqueueSnackbar("Stock is not enough.", { variant });
            return;
          }

          if (selectedAmount > ringData.available) {
            selectedAmount = ringData.available;
            setItemAmount(ringData.available);
          }

          localStorage.setItem(
            "cart",
            JSON.stringify({
              cartData: [
                {
                  ...cartItem,
                  amount: selectedAmount,
                },
              ],
            })
          );
        }
        addDiamondToCart();
      });
  };

    const addDiamondToCart = () => {
      let cartAmount = 0;
      let currentSize = size ? size : sizeList[0];
      let formData = new FormData();
      var rd = diamondData.variants[0].id;
      const graphql = `{productVariant(id: "gid://shopify/ProductVariant/` + rd + `") {id title storefrontId}}`;

      formData.append("graphql", btoa(graphql));
      fetch(graphqlURL, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          let cartItem = {
            shopifyid: diamondData.id,
            size: currentSize,
            maxCount: diamondData.available,
            description: diamondData.body_html,
            title: diamondData.title,
            price: diamondData.variants[0].price,
            variant: {
              storefrontId: data.data.productVariant.storefrontId,
            },
            image: diamondData.image.src.replace(".jpg", "_100x.jpg"),
            amount: 1,
            product_type: "Diamonds",
          };
          let selectedAmount = itemAmount;

          if (localStorage.cart) {
            let cartData = JSON.parse(localStorage.cart).cartData;
            cartData.map((product) => {
              if (product.shopifyid == diamondData.id) {
                cartAmount += product.amount;
              }
            });

            let setItem = cartData.find(
              (item, index) => item.shopifyid == cartItem.shopifyid
            );
            let available = diamondData.available - cartAmount;

          /*  if (!available) {
              const variant = "warning";
              enqueueSnackbar("Stock is not enough.", { variant });
              return;
            }*/

          /*  if (selectedAmount > available) {
              setItemAmount(available);
              selectedAmount = available;
            }*/

            if (setItem) {
              const variantItem = cartData.find(
                (item) => item.variant.variantId == cartItem.variant.variantId
              );
              if (variantItem) {
                variantItem.amount += selectedAmount;
                localStorage.setItem(
                  "cart",
                  JSON.stringify({ cartData: cartData })
                );
              //  props.setWishList(cartData);
              } else {
                localStorage.setItem(
                  "cart",
                  JSON.stringify({ cartData: [...cartData, cartItem] })
                );
              //  props.setWishList([...cartData, cartItem]);
              }
            } else {
              localStorage.setItem(
                "cart",
                JSON.stringify({
                  cartData: [
                    ...cartData,
                    {
                      ...cartItem,
                      amount: selectedAmount,
                    },
                  ],
                })
              );
            }
          } else {
            if (!diamondData.available) {
              const variant = "warning";
              enqueueSnackbar("Stock is not enough.", { variant });
              return;
            }

            if (selectedAmount > diamondData.available) {
              selectedAmount = diamondData.available;
              setItemAmount(diamondData.available);
            }

            localStorage.setItem(
              "cart",
              JSON.stringify({
                cartData: [
                  {
                    ...cartItem,
                    amount: selectedAmount,
                  },
                ],
              })
            );
          }
            router.push("/cart");
        });
    };
  return (
    <div className="confirmRing_page">
      <Head>
        <title>ConfirmRing | Royal Coster</title>
      </Head>
      <Header />

      {/* Start state section */}
      <div className="state-section">
        <div className="link-panel  r-container py-3 d-sm-flex d-none align-items-center">
          <button
            className="btn back-arrow d-flex me-3 blue-text px-0"
            onClick={() => router.back()}
          >
            <HiOutlineArrowLeft />
          </button>
          <Link passHref={true} href="/">
            <a className="mx-2">HOME</a>
          </Link>
          /
          <Link passHref={true} href="/shop">
            <a className="mx-2">ENGAGEMENT RINGS</a>
          </Link>
          /
          <Link passHref={true} href="#">
            <a className="mx-2">MAKE A RING</a>
          </Link>
          /
          <span className="title ms-2 text-uppercase blue-text">
            COFIRM RING
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
          <Link passHref={true} href="#">
            <a className="mx-2">MAKE A RING</a>
          </Link>
          /
          <span className="title ms-2 text-uppercase blue-text">
            CHOOSE A DIAMONDS
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
                        src="/img/customRing/chooseDiamond/ring.png"
                        width="57"
                        height="57"
                        alt="state-image"
                        style={{ background: "white" }}
                        className="round-form ring-image me-3"
                      />
                      <div className="text-panel" style={{display:"none"}}>
                        <h3 className="m-0">Solitaire</h3>
                        <h4 className="text-capitalize">Metal : Gold (18k)</h4>
                      </div>
                    </div>
                    <div className="cost-panel">
                    <h4 className="blue-text me-3">
                      <NumberFormat
                        value={itemPrice}
                        displayType="text"
                        decimalScale={2}
                        fixedDecimalScale={true}
                        thousandSeparator={true}
                        prefix="€ "
                      />
                    </h4>
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
                  <RiCheckLine />
                </div>
                <div className="title text-uppercase">
                  <p className="mb-1 d-md-block d-none">Choose a</p>
                  <h3 className="m-0">Diamond</h3>
                </div>
              </div>
              <img diamondImage="1"
                src="/img/customRing/confirmRing/confirmDiamond.png"
                width="52"
                height="52"
                alt="state-image"
                className="round-form d-md-block d-none"
              />
            </div>
            <div className="ps-5 py-md-0 py-5 my-md-5 my-0 col-4 setting-state d-flex justify-content-between align-items-center active">
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
                src="/img/customRing/confirmRing/confirmRing_active.png"
                width="52"
                height="52"
                alt="state-image"
                className="round-form d-md-block d-none"
              />
            </div>
          </div>
        </div>
      </div>
      {/* End state section */}

      {/* Start confirm section */}
      <div className="confirm-section py-5 mb-5 row r-container">
        <div className="show-product col-md-6 col-12 p-0 pt-5 pe-md-5">
          <div className="row m-0">
            <div className="tile-product col-md-2 col-12 order-md-first order-last p-0 pe-md-3 d-md-block d-flex">
            {productImages && productImages.map((item, index) => {
              return (
                <button
                  className="btn btn-show-product col-md-12 col-2 mb-3 me-md-0 me-4 p-0 round-form"
                  key={index}
                  onClick={() => showProduct(item.src)}
                >
                  <img
                    src={item.src}
                    alt="product-image"
                  />
                </button>
              );
            })}
            </div>
            <div className="main-product col-md-10 p-0">
              <div className="image-panel round mb-4">
                <div className="image-box">
                  <img src={mainProductImage} alt="main-image" />
                </div>
              </div>
              <div className="btn-panel d-md-flex d-none align-items-center justify-content-between">
                <button className="btn px-4 py-2 blue-text btn-share text-uppercase round-form d-flex align-items-center">
                  <RiShareLine className="me-2" />
                  share
                </button>
                <button
                  className="btn px-4 py-2 blue-text btn-share text-uppercase round-form d-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#dropHint"
                >
                  drop a hint
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="show-setting col-md-6 col-12 p-0 pt-5 ps-md-5">
          <div className="title-panel">
            <h3 className="type pb-4 m-0">{ringStyle}</h3>
            <h3 id="ringTitle" className="title text-capitalize pb-4 m-0">
              Brilliant Cut Diamond Engagement Ring
            </h3>
            <p className="description pb-4 m-0">
              Exude grace with this round Aphrodite band, set with round,
              brilliant diamonds and halo to lend eternal style.
            </p>
            <div className="ring-info pt-3 pb-5 d-flex">
              <img
                src="/img/customRing/confirmRing/diamond-icon.png"
                alt="info-image"
                className="info-image"
                width="35"
                height="30"
              />
              <div className="text-panel ps-md-5 ps-3">
                <h3 className="shape m-0">{diamondShape}</h3>
                <h3 className="ring-name m-0 py-4">{diamondTitle}</h3>
                <p className="ring-id">{diamondSKU}</p>
                <h4 className="categories m-0 pb-4">
                  {categories}
                </h4>
                <Link passHref={true} href="/customRing/chooseSetting">
                  <button className="btn btn-change-setting text-uppercase px-4 py-2">
                    change diamond setting
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="confirm-panel">
            <div className="material-setting-panel py-4 row m-0" style={{display:"none"}}>
              <div className="metal-confirm p-0 col-md-6 col-12 mb-md-0 mb-4">
                <label
                  htmlFor="selectKarat"
                  className="d-flex align-items-center pb-4 text-uppercase"
                >
                  Metal : white Gold 18k  
                  <RiErrorWarningLine className="ms-2" />
                </label>
                <div className="material-box d-flex">
                  {meterials.map((item, index) => {
                    return (
                      <button
                        className="btn btn-material d-flex align-items-center justify-content-center p-2 me-3"
                        key={index}
                      >
                        <img
                          src={"/img/product/" + item.meterial}
                          alt="metarial-image"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="carat-confirm p-0 col-md-6 col-12" style={{display:"none"}}>
                <label
                  htmlFor="caratSelect"
                  className="d-flex align-items-center text-uppercase pb-4"
                >
                  Total Carat Weight
                  <RiErrorWarningLine className="ms-2" />
                </label>
                <select
                  className="form-select blue-text ps-4 round-form py-3"
                  aria-label="Default select example"
                  value={carat}
                  id="caratSelect"
                  onChange={(event) => setCarat(event.target.value)}
                >
                  {caratList.map((item, index) => {
                    return (
                      <option value={index} key={index}>
                        {item.carat + " " + item.time.toFixed(2) + "*"}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="selector-panel row m-0 py-4" style={{display:"none"}}>
              <div className="select-karat col-lg-6 col-md-12 col-sm-6 col-12 p-0 pe-lg-3 pe-md-0 pe-sm-3 pe-0">
                <div className="d-flex justify-content-between pb-4 align-items-center">
                  <h3
                    htmlFor="selectKarat"
                    className="d-flex align-items-center m-0 text-uppercase"
                  >
                    Ring Size
                    <RiErrorWarningLine className="ms-2" />
                  </h3>
                  <button
                    className="btn text-uppercase btn-find-size py-1"
                    onClick={() => setSize(0)}
                  >
                    find my size
                  </button>
                </div>
                <div className="select-box">
                  <select
                    className="form-select blue-text ps-4 round-form py-3"
                    aria-label="Default select example"
                    value={size}
                    onChange={(event) => setSize(event.target.value)}
                  >
                    {sizeList.map((item, index) => {
                      return (
                        <option value={index} key={index}>
                          {item.size}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="select-size col-lg-6 col-md-12 col-sm-6 col-12 p-0 ps-lg-3 ps-md-0 ps-md-3 ps-0">
                <label
                  htmlFor="selectKarat"
                  className="d-flex align-items-center pb-4 text-uppercase"
                >
                  Free Inscription
                  <RiErrorWarningLine className="ms-2" />
                </label>

                <button className="btn btn-add-engraving  d-flex justify-content-between align-items-center text-uppercase round-form p-3">
                  add engraving
                  <RiArrowRightSLine />
                </button>
              </div>
            </div>
            <div className="cost-panel d-flex justify-content-between align-items-center py-4">
              <div className="price-panel">
                <h4 className="text-uppercase">total</h4>
                <h3 className="blue-text">
                <NumberFormat
                  value={itemPrice}
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  prefix="€ "
                />
                </h3>
              </div>
              <div className="amount-panel d-flex align-items-center" style={{visibility:"hidden"}}>
                <button
                  className="btn btn-decrease round-form blue-text d-flex align-items-center justify-content-center p-sm-4 p-3"
                  onClick={() =>
                    itemAmount > 1 && setItemAmount(itemAmount - 1)
                  }
                >
                  <RiSubtractFill />
                </button>
                <span className="mx-4">{itemAmount}</span>
                <button
                  className="btn btn-increase round-form blue-text d-flex align-items-center justify-content-center p-sm-4 p-3"
                  onClick={() => setItemAmount(itemAmount + 1)}
                >
                  <RiAddFill />
                </button>
              </div>
            </div>
            <div className="confirm-box d-flex flex-wrap justify-content-between align-items-start m-0 py-4">
              {accessToken && (
                <button
                  className={
                    "btn favor-btn round-form d-flex align-items-center justify-content-center p-4 me-3 " +
                    favorItem
                  }
                  onClick={() =>
                    favorItem ? setFavorItem() : setFavorItem("favor")
                  }
                >
                  <RiHeartFill />
                </button>
              )}
              <div className="setting-btn-panel d-flex flex-column flex-1 text-end">
                <button id="addtocart"
                  className="btn blue-btn text-uppercase round-form px-5 py-3 mb-4" style={{display:"none",fontSize:18}}
                  onClick={addRingToCart}
                >
                  add to cart
                </button>
                <button id="additems"
                  className="btn blue-btn text-uppercase round-form px-5 py-3 mb-4" style={{display:"none",backgroundColor:"red",fontSize:18}}

                >
                  both setting and diamond have to be selected
                </button>
                <p className="m-0">Price includes VAT</p>
              </div>
            </div>
            <div className="help-panel d-flex justify-content-between py-4">
              <p className="text-uppercase m-0">Need help?</p>
              <div className="link-panel d-flex">
                <Link passHref={true} href="/contact">
                  <a className="text-uppercase me-4 d-flex align-items-center blue-text">
                    <RiCustomerService2Fill className="me-2" />
                    contact
                  </a>
                </Link>

                <Link passHref={true} href="#">
                  <a className="text-uppercase d-flex align-items-center blue-text">
                    <RiChat1Line className="me-2" />
                    chat
                  </a>
                </Link>
              </div>
            </div>
            <div className="schedule-panel d-md-flex d-none align-items-center justify-content-between flex-wrap py-4">
              <p className="m-0 text-uppercase">
                Not ready to purchase online?
              </p>
              <button className="btn btn-schedule text-uppercase blue-text my-3 px-5 py-2">
                Schedule an appointment
              </button>
            </div>
            <div className="btn-panel share-btn-panel mt-5 d-md-none d-flex align-items-center justify-content-between">
              <button className="btn px-5 py-2 blue-text btn-share text-uppercase round-form d-flex align-items-center">
                <RiShareLine className="me-2" />
                share
              </button>
              <button
                className="btn px-5 py-2 blue-text btn-share text-uppercase round-form d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#dropHint"
              >
                drop a hint
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End confirm section */}

      {/* Start product detail section */}
      <ProductDetail
        informations={informations}
        productID={productID}
        productDescription={productDescription}
          productType="Rings"
      />
      {/* End product detail section */}

      {/* Start customer section */}
      <Customer customerSlider={customerSlider} />
      {/* End customer section */}

      {/* Start help section */}
      <NeedHelp />
      {/* End help section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}
