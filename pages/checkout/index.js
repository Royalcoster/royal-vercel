import React, { useState, useRef, useEffect } from "react";
import Link from 'next-translate-routes/link';
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import NumberFormat from "react-number-format";
import NeedHelpCart from "../../components/needHelpCart";
import renderHTML from "react-render-html";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { creatCheckout } from "../../redux/actions/checkOutAction";
import { setCartData } from "../../redux/actions/cartDataAction";
import {
  RiSubtractFill,
  RiAddFill,
  RiCustomerService2Fill,
  RiChat1Line,
  RiCloseFill,
  RiArrowRightSFill,
  RiCheckFill,
  RiWechatFill,
  RiPhoneFill,
  RiStore2Fill,
} from "react-icons/ri";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { remove } from "lodash";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const cartItems = [
  {
    title: "Brilliant Cut Diamond Engagement Ring",
    image: "item-1.png",
    style: "Halo style",
    description:
      "Exude grace with this round Aphrodite band, set with round, brilliant diamonds and halo to lend eternal style.",
    price: 2895,
    amount: 1,
  },
  {
    title: "Brilliant Cut Diamond Engagement Ring",
    image: "item-2.png",
    style: "Halo style",
    description:
      "Exude grace with this round Aphrodite band, set with round, brilliant diamonds and halo to lend eternal style.",
    price: 2895,
    amount: 1,
  },
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

function MyCart(props) {
  const [items, setItems] = useState();
  const [subTotal, setSubTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [itemAmount, setItemAmount] = useState(1);
  const mesage = 'Your notification here';
  const showProduct = (product) => {
    setMainImage(product);
  };
  const { locale } = useRouter();
  const [isMobile, setIsMobile] = useState();

  function checkItemAmount(amount, available) {

    var message = "At this moment we only have " + available + " product(s) in stock. Would you like to order more than one? Please contact us.";
    const action = key => (
      <div>
        <button className="btn btn-primary btn-lg" onClick={() => { window.location.href='/contact'; }}>
            {locale === "nl" ? 'CONTACT US' : 'CONTACT US'}
        </button>

      </div>
    );
    if (amount > available) {
      enqueueSnackbar(message, {
          variant: 'warning',
          autoHideDuration: 10000,
          action,
      });
    } else {
        setItemAmount(amount);
    }
  }
  const checkOut = (e) => {
    e.preventDefault();

    // const checkoutID = props.checkOut.checkout.id;
    // const lineItemsToAdd = [];

    // JSON.parse(localStorage.cart).cartData.map(cart => {
    //   lineItemsToAdd.push({ variantId: cart.variant.storefrontId, quantity: cart.amount });
    // })
    // props.checkOut.client.checkout.addLineItems(checkoutID, lineItemsToAdd).then((res) => {

  //  window.location.href =("/checkout/information");
    // })
  };
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {

    if (!loaded) {

      $("#appointmentForm").find("#online").val("book_appointment_cart_online");
      $("#appointmentForm").find("#visit").val("book_appointment_cart");
      $("#appointmentForm").find("#idvisit").val("031");
      $("#appointmentForm").find("#idonline").val("030");
      setLoaded(true);
    }
    if (typeof document !== undefined) {
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3002600,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      setIsMobile((window.innerWidth < 576) ? true : false);
      require("bootstrap/dist/js/bootstrap");
      if (localStorage.cart) {
        setItems(JSON.parse(localStorage.cart).cartData);
        console.log(JSON.parse(localStorage.cart).cartData)
      }
    }
  }, []);

  useEffect(() => {
    if (items) {
      console.log(items);
      $.each($("[url]"), function() {
        $(this).css({
          cursor: "pointer"
        })
        $(this).bind("click", function() {
          window.location.href = $(this).attr("url");
        })
      })
      let subTotalPrice = 0;

      if(items.length) {
        console.log(items);
        items.map((item, index) => {

          subTotalPrice += item.price * item.amount;
        })
      } else {
        subTotalPrice = 0;
      }
      setSubTotal(subTotalPrice);
      setTotal(subTotalPrice - vat);
      localStorage.setItem(
        "cart",
        JSON.stringify({ cartData: items, vat: vat, subTotal: subTotalPrice })
      );
    }
  }, [items]);

  return (
    <div className="myCart_page">
      <Head>
        <title>My Cart | Royal Coster</title>
      </Head>
      <Header />
      {/* Start link section */}
      <div className="link-section">
        <div className="r-container py-3 d-flex align-items-center justify-content-between">
          <Link href="/cart">
            <a className="btn back-arrow d-flex align-items-center px-0">
              <HiOutlineArrowLeft className="me-3" />
              {locale === "nl" ? "Doorgaan met winkelen" : "Continue Shopping"}
            </a>
          </Link>
          {!isMobile &&  (<div className="steps d-flex align-items-end justify-content-center">
            <span style={{fontSize: 16}}>{locale === "nl" ? "stappen" : "steps"}</span>
            <div className="pl-5 mb-0 d-flex align-items-center">
              <span className="step mx-2 active">{locale === "nl" ? "kar" : "cart"}</span>
              -
              <span className="step mx-2">{locale === "nl" ? "verzendgegevens" : "shipping details"}</span>
              -
              <span className="step m1-2">{locale === "nl" ? "uitchecken" : "checkout"}</span>
            </div>
          </div>)}
          {isMobile && (<div className="steps d-flex align-items-end justify-content-center">
            <div className="step active">
              <span>{locale === "nl" ? "stap" : "step"}</span>
              1/3
            </div>
          </div>)}
        </div>
      </div>
      {/* End link section */}
      {/* Start my cart section */}
      <div className="my-cart-section r-container mb-sm-3">
        <div className="title-panel">
          <h3 className="title text-capitalize blue-text">{locale === "nl" ? "Mijn winkelwagen" : "My shopping cart"}
            <span className="badge">{items ? items.length : 0}</span>
          </h3>
          <p className="blue-text mb-0">{locale === "nl" ? "Je bestelling komt in aanmerking voor gratis beveiligde verzending binnen de europese unie" : "Your order qualifies for free secured shipping within the european union"}</p>
        </div>
      </div>
      {/* End my cart section */}
      {/* Start total section */}
      <div className="total-section row r-container mb-5">
        <div className="col-lg-8 col-12 p-0 pe-lg-5 pe-0 pb-lg-0 pb-3 pb-sm-5 mb-4 mb-sm-0 left-panel">
          <div className="cart-panel py-sm-5 my-sm-5">
            {items ? (
              items.map((item, index) => {
                return (
                  <div className="cart-info py-5 py-sm-4 d-flex flex-column" key={index}>
                    <div  className="d-flex align-item-center">
                      <div  url={item.url} className="image-panel ms-sm-3 me-4">
                        <img loading="lazy"
                          src={item.image}
                          alt="item-image"
                          className="item-image mb-md-0 mb-4 round"
                          width="200"
                          height="200"
                        />
                        {/* <div className="amount-panel d-md-none ps-lg-5 ps-0">
                          <div className="d-flex justify-content-center align-items-center">
                            <button
                              className="btn btn-decrease round-form blue-text d-flex align-items-center justify-content-center p-2"
                              onClick={() =>
                                item.amount > 1 && setItemAmount(item.amount - 1)
                              }
                            >
                              <RiSubtractFill />
                            </button>
                            <span className="mx-4">{item.amount}</span>
                            <button
                              className="btn btn-increase round-form blue-text d-flex align-items-center justify-content-center p-2"
                              onClick={() =>
                                (1 == 1) &&
                                checkItemAmount(item.amount + 1, item.available)
                              }
                            >
                              <RiAddFill />
                            </button>
                          </div>
                        </div> */}
                      </div>
                      <div className="info-panel">
                        <div className="info_text-panel row mb-0 align-items-center h-100 position-relative">
                          <button
                            className="position-absolute btn btn-remove text-uppercase w-auto"
                            onClick={() => {
                              items.splice(index, 1);
                              setItems([...items]);
                              props.setCartData([...items]);
                            }}
                          >
                            <span className="text-decoration-underline" style={{fontSize: 14}}>{locale === "nl" ? "Verwijderen" : "delete"}</span>
                          </button>
                          <div className="col-lg-7 col-12 text-panel">
                            <div className="d-flex align-items-center mb-3">
                              <p className="cart-style mb-0 pe-3">
                                <span className="me-3">{item.product_type} </span>
                              </p>
                              {item.maxCount < item.amount ? <span className="badge badge-outstock">{ locale === "nl" ? "Out of Stock" : "Out of Stock" }</span>
                              : <span className="badge badge-instock">{ locale === "nl" ? "Op voorraad" : "In Stock" }</span>}
                            </div>
                            <h3  url={item.url} className="title mb-4">
                              {item.title}
                            </h3>
                            <p className="cart-variant">
                              <span className="" style={{fontSize: 16}}>{item.variant.variantTitle}</span>
                            </p>
                            <div className="d-flex align-items-center justify-content-space-between">
                              <h3 className="cart-price d-sm-none me-3 py-2 pe-2">
                                { (parseFloat(item.fullPrice) != parseFloat(item.price)) && (
                                    <p className="full-price me-2">
                                      <NumberFormat
                                        value={item.fullPrice * item.amount}
                                        displayType="text"
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        thousandSeparator={true}
                                        prefix="€ "
                                      />
                                    </p>
                                  )}
                                <NumberFormat
                                  fp="1"
                                  value={item.price * item.amount}
                                  displayType="text"
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  thousandSeparator={true}
                                  prefix="€ "
                                />
                              </h3>
                            </div>
                            {/* <p  className="cart-description m-0">
                              {renderHTML(item.description.split("<p>")[0])}
                            </p> */}
                          </div>
                          <div className="col-lg-5 col-12 cost-panel d-flex justify-content-between flex-sm-row flex-column flex-wrap pe-lg-4 ps-lg-4 pt-lg-0 pt-md-5 pt-3">
                            <div className="mb-0 amount-panel pe-lg-5 pe-0 py-2">
                              <div className="d-flex justify-content-sm-start justify-content-center align-items-center">
                                <button
                                  className="btn btn-decrease d-flex align-items-center justify-content-center p-2"
                                  onClick={() => {
                                    if (item.amount > 1) {
                                      items[index].amount = item.amount - 1;
                                      setItems([...items]);
                                    }
                                  }}
                                >
                                  <RiSubtractFill />
                                </button>
                                <span className="number d-flex align-items-center justify-content-center mx-2">{item.amount}</span>
                                <button
                                  className="btn btn-increase d-flex align-items-center justify-content-center p-2"
                                  onClick={() =>
                                    (1 == 1) &&
                                    checkItemAmount(items[index].amount + 1, item.maxCount)
                                  }
                                >
                                  <RiAddFill />
                                </button>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                            </div>
                            <h3 className="cart-price d-none d-sm-flex flex-column align-items-end">
                              { (parseFloat(item.fullPrice) != parseFloat(item.price)) && (
                              <p className="full-price mb-2">
                                <NumberFormat
                                  value={item.fullPrice * item.amount}
                                  displayType="text"
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  thousandSeparator={true}
                                  prefix="€ "
                                />
                              </p>
                          )}
                              <p>
                                <NumberFormat
                                  value={item.price * item.amount}
                                  displayType="text"
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  thousandSeparator={true}
                                  prefix="€ "
                                />
                              </p>

                            </h3>
                          </div>
                        </div>
                        {/* <div className="link-panel d-none justify-content-between">
                          <Link
                            passHref={true}
                            href={{
                              pathname: item.url,

                            }}
                          >
                            <a className="btn btn-detail d-flex align-items-center text-uppercase">
                              {locale === "nl" ? "Meer details" : "More details"} <RiArrowRightSFill />
                            </a>
                          </Link>
                          <button
                            className="btn btn-remove d-flex align-items-center text-uppercase"
                            onClick={() => {
                              items.splice(index, 1);
                              setItems([...items]);
                              props.setCartData([...items]);
                            }}
                          >
                            <span className="text-underline">{locale === "nl" ? "Verwijderen" : "delete"} <RiCloseFill className="ms-2" /></span>
                          </button>
                        </div> */}
                      </div>
                    </div>
                    {/* <div className="link-panel  d-md-none d-flex align-items-center">
                      <div className="remove-btn-panel me-4">
                        <button
                          className="btn btn-remove d-flex p-0 align-items-center text-uppercase"
                          onClick={() => {
                            items.splice(index, 1);
                            setItems([...items]);
                          }}
                        >
                          <RiCloseFill className="ms-2" />
                        </button>
                      </div>
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
                        <a className="btn btn-detail d-flex align-items-center text-uppercase">
                          more details <RiArrowRightSFill />
                        </a>
                      </Link>
                    </div> */}
                  </div>
                );
              })
            ) : (
              <h3 className="none-text m-0 py-5 text-center">Cart is empty</h3>
            )}
          </div>
          {/* <div className="round need-help-panel px-5 mb-5">
            <div className="title-panel d-flex justify-content-between align-items-center flex-sm-row flex-column py-5">
              <h3 className="text-uppercase m-0 mb-sm-0 mb-5">Need Help?</h3>
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
            <div className="purchase-panel d-flex justify-content-between align-items-center flex-sm-row flex-column py-5">
              <h3 className="text-uppercase m-0 mb-sm-0 mb-5">
                Not ready to purchase online?
              </h3>
              <button
                className="btn btn-schedule text-uppercase blue-text px-4 py-2"
                onClick={(e) => {
                    $("#appointment").modal("show");
                    setTimeout(function() {
                      $("#appointmentForm").find("#online").val("schedule_appointment_cart_online");
                      $("#appointmentForm").find("#visit").val("schedule_appointment_cart");
                      $("#appointmentForm").find("#idvisit").val("028");
                      $("#appointmentForm").find("#idonline").val("029");
                //      alert(  localStorage.setItem("idonline"));

                      $("#appointment").on("hidden.bs.modal", function() {
                        $("#appointmentForm").find("#online").val("online_consultation_cart_online");
                        $("#appointmentForm").find("#visit").val("online_consultation_cart");
                        $("#appointmentForm").find("#idvisit").val("031");
                        $("#appointmentForm").find("#idonline").val("030");
                      })
                    }, 1500);
                }
              }
              >
                Schedule an appointment
              </button>
            </div>
          </div>
          <div className="instruction-panel round px-5 py-5">
            <h3 className="title m-0 pb-5 text-sm-start text-center">
              SPECIAL INSTRUCTIONS FOR US
            </h3>
            <textarea
              className="form-control round p-4"
              placeholder="Write Here..."
              rows="3"
            ></textarea>
          </div> */}
          <div className="title-panel pb-3 pb-lg-5 mb-lg-5 d-none d-lg-block">
            <h3 className="title text-capitalize blue-text mb-3 py-3">{locale === "nl" ? "Nog niet klaar om online te kopen?" : "Not ready to purchase online?"}</h3>
            <p className="mb-5">{locale === "nl" ? "Wij zijn hier om te helpen. In jouw taal." : "We’re here to help. In your language."}</p>
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              className="info-box-wrapper text-center pb-lg-5"
              breakpoints={{
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
            >
              <SwiperSlide>
                <div className="info-box text-center p-4" onClick={() => {window.tidioChatApi.open()}}>
                    <span className="info-box-icon d-flex align-items-center justify-content-center mb-3">
                        {/* <RiWechatFill className="" /> */}
                        <img src="/img/myCart/message.svg" className="" alt="message icon" width="65" height="90" />
                    </span>
                    <div className="info-box-content">
                        <h4 className="info-box-title mb-2">{locale === "nl" ? "Chat met ons" : "Chat with us"}</h4>
                        <p>{locale === "nl" ? "in het Engels, Nederlands, Spaans en 官话" : "in English, Dutch, Spanish and 官话"}</p>
                    </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="info-box text-center p-4" data-bs-toggle="modal" data-bs-target="#appointment">
                    <span className="info-box-icon d-flex align-items-center justify-content-center mb-3">
                        {/* <RiPhoneFill className="" /> */}
                        <img src="/img/myCart/phone.svg" className="" alt="phone icon" width="65" height="90" />
                    </span>
                    <div className="info-box-content">
                        <h4 className="info-box-title mb-2">{locale === "nl" ? "Terugbelverzoek aanvragen" : "Request a call-back"}</h4>
                        <p>{locale === "nl" ? "in het Engels, Nederlands, Spaans en 官话" : "in English, Dutch, Spanish and 官话"}</p>
                    </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="info-box text-center p-4" data-bs-toggle="modal" data-bs-target="#appointment">
                    <span className="info-box-icon d-flex align-items-center justify-content-center mb-3">
                        {/* <RiStore2Fill className="" /> */}
                        <img src="/img/myCart/store.svg" className="" alt="store icon" width="65" height="90" />
                    </span>
                    <div className="info-box-content">
                        <h4 className="info-box-title mb-2">{locale === "nl" ? "Bezoek onze Flagship Store" : "Visit our Flagship Store"}</h4>
                        <p>{locale === "nl" ? "en bekijk uw juweel persoonlijk" : "and review your jewel in person"}</p>
                    </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="col-lg-4 col-12 py-0 ps-lg-5 px-0 px-sm-3 mb-lg-0 mb-5">
          <div className="summary-panel">
            <h3 className="title pb-4 blue-text d-none d-sm-block">{locale === "nl" ? "Jouw bestellingsoverzicht" : "Your Order Summary"}</h3>
            <div className="price-panel pb-4">
              <div className="subtotal-panel d-flex align-items-center justify-content-between pb-3">
                <h3 className="m-0">{locale === "nl" ? "Subtotaal" : "Subtotal"}</h3>
                <p className="m-0">€{subTotal}</p>
              </div>
              <div className="alert alert-info">
                <img src="/img/myCart/info.svg" className="align-middle me-2" width="10" height="10" alt="Info Icon" />
                <span className="align-middle">{locale === "nl" ? "Coupon? Add it on the next page" : "Coupon? Add it on the next page"}</span>
              </div>
            </div>
            <div className="total-panel pt-4">
              <div className="total-price d-flex justify-content-between pb-2 mb-4">
                <h3 className="m-0">{locale === "nl" ? "Totaal" : "Total"}</h3>
                <p className="m-0">€{total}</p>
              </div>
              {/* <div className="round paid-price d-flex justify-content-between p-4 mb-4">
                <h3 className="m-0">To be paid:</h3>
                <p className="m-0">€ {total}</p>
              </div> */}
                <button onClick={() => {
                  window.location.href = ((locale == "en") ? "" : "/" + locale) + "/checkout/information"
                }}
                  className="btn blue-btn"

                  disabled={items ? false : true}
                >
                  {locale === "nl" ? "Ga verder naar Verzendgegevens" : "Proceed to Shipping Details"}
                </button>
            </div>
            <div className="summary-info pt-5">
              <div className="d-flex align-items-center mb-3">
                <img src="/img/myCart/checkicon.svg" alt="check icon" width={20} height={18} />
                <span className="ms-2">{locale === "nl" ? "Je bestelling komt in aanmerking voor gratis verzending binnen de EU" : "Your order qualifies for free shipping within the EU"}</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <img src="/img/myCart/checkicon.svg" alt="check icon" width={20} height={18} />
                <span className="ms-2">{locale === "nl" ? "Veilig & Veilig Betalen met Creditcards of iDeal" : "Safe & Secure Payments with Credit Cards or iDeal"}</span>
              </div>
              <div className="d-flex align-items-center">
                <img src="/img/myCart/checkicon.svg" alt="check icon" width={20} height={18} />
                <span className="ms-2">{locale === "en" ? "Ships fully insured in 48 hours" : "Verzekerde verzending binnen 48 uur"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End total section */}
      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}
      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartData: state.cartData.value,
});

const mapDispatchToProps = {
  setCartData: setCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
