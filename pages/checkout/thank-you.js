import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import renderHTML from "react-render-html";
import NumberFormat from "react-number-format";
import ReactFlagsSelect from "react-flags-select";
import router, { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { HiOutlineArrowLeft, RiCheckFill } from "react-icons/hi";

const orderDetailURL = process.env.NEXT_PUBLIC_ORDER_DETAIL_URL;

export default function ThankYou() {
  const [selected, setSelected] = useState("LU");
  const [cartData, setCartData] = useState([]);
  const [currencyCode, setCurrencyCode] = useState();
  const [orderData, setOrderData] = useState();
  const router = useRouter();
  const { locale } = useRouter(); 
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    setTimeout(function() {
      (function(h,o,t,j,a,r){

          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:3002600,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      setIsMobile((window.innerWidth < 576) ? true : false);
        var cart = $.parseJSON(localStorage.cart);
        var cItems = $.parseJSON(localStorage.cItems);
        var vl = 0;
        var prds = [];
        $.each(cart.cartData, function() {
          if (cItems[this.shopifyid] !== undefined) {
            vl += parseFloat(cItems[this.shopifyid].price) * parseFloat(cItems[this.shopifyid].quantity);
            prds.push(cItems[this.shopifyid]);
          }
        })
      // var dll = {
      //   "event": "purchase",
      //   "value": vl,
      //   "currencyCode": "EUR",
      //   "purchase": {
      //     "actionField": {
      //       "affiliation": "Shop",
      //       "revenue": vl,
      //     },
      //     "products": prds
      //   }
      // }

      var dll = {
        "event": "purchase",
        "ecommerce": {
          "value": vl,
          "currencyCode": "EUR",
          "purchase": {
            "actionField": {
              "affiliation": "Shop",
              "revenue": vl,
            },
            "products": prds
          }
        }
      }
      dataLayer.push(dll);
    //  localStorage.removeItem('cart');
    //  localStorage.removeItem('cItems');
    }, 3000);
  })
  useEffect(() => {
    console.log(localStorage);
    setCartData(JSON.parse(localStorage.cart).cartData)
    let orderID = router.asPath.split('orderid=')[1];
    let formData = new FormData();
    formData.append('orderid', orderID);
    formData.append('token', localStorage.token);


  /*  localStorage.removeItem('shipping');
    localStorage.removeItem('token');
    localStorage.removeItem('customerInfo');
    localStorage.removeItem('discountCode');
    localStorage.removeItem('billing');*/

    fetch(orderDetailURL, {
      method: 'post',
      body: formData
    }).then(res => res.json())
      .then(data => {
        if (data) {
          setOrderData(data)
          setCurrencyCode(data.currency);
        }
      })
  }, [])

  return (
    <div className="thank-you_page">
      <Head>
        <title>Thank You Page | Royal Coster</title>
        <script async src="/jQuery.js"></script>
      </Head>
      <Header />
      {/* <div className="thank-you_header">
        <div className="top-bar px-5 py-3">
          <div className="r-container d-flex justify-content-between align-items-center">
            <Link passHref={true} href="#">
              <a>{locale === "nl" ? "WAAROM KONINKLIJKE COSTER?" : "WHY ROYAL COSTER ?"}</a>
            </Link>
            <ReactFlagsSelect
              showSelectedLabel={false}
              showSecondarySelectedLabel={false}
              showOptionLabel={false}
              showSecondaryOptionLabel={false}
              selectedSize={14}
              optionsSize={14}
              fullWidth={false}
              selected={selected}
              onSelect={(code) => setSelected(code)}
              placeholder=" "
              className="flag-select pb-0"
            />
          </div>
        </div >
        <div className="logo-bar text-center py-5">
          <Link href="/">
            <a>
              <img loading="lazy"  src="/img/common/thank-you_logo.png" alt="logo-img" />
            </a>
          </Link>
        </div>
      </div > */}
      <div className="link-section" style={{marginBottom: 55}}>
        <div className="r-container py-3 d-flex align-items-center justify-content-between">
          <Link href="/cart">
            <a className="btn back-arrow d-flex align-items-center px-0">
              <HiOutlineArrowLeft className="me-3" />
              {locale === "nl" ? "Terug naar winkelwagen" : "Back to Shopping Cart"}
            </a>
          </Link>
          {!isMobile &&  (<div className="steps d-flex align-items-end justify-content-center">
            <span style={{fontSize: 16}}>{locale === "nl" ? "stappen" : "steps"}</span>
            <div className="pl-5 mb-0 d-flex align-items-center">
              <span className="step mx-2">{locale === "nl" ? "kar" : "cart"}</span>
              -
              <span className="step mx-2">{locale === "nl" ? "verzendgegevens" : "shipping details"}</span>
              -
              <span className="step m1-2">{locale === "nl" ? "uitchecken" : "checkout"}</span>
            </div>
          </div>)}
          {isMobile && (<div className="steps d-flex align-items-end justify-content-center">
            <div className="step active">
              <span>{locale === "nl" ? "stap" : "step"}</span>
              */3
            </div>
          </div>)}
        </div>
      </div>
      <div className="text-panel text-center r-container mx-auto mb-5">
        <img loading="lazy"  src="/img/common/diamond.svg" alt="logo-img" width={155} height={129} style={{marginBottom: 50}} />
        <h1 className="title text-capitalize">{locale === "nl" ? "Bedankt voor je bestelling" : "Thank you for your order"}</h1>
        {/* <p className="description dark-text pb-5">{locale === "nl" ? "Je hebt onlangs een via onze website besteld. Bedankt voor je bestelling. Controleer alstublieft uw mail. De bezorgdienst zal de bestelling zo snel mogelijk uitvoeren. In de tussentijd leest u hier de zorgregels!" : "Your recently ordered an from our website. Thank you for your order. Please check your mail. The delivery service will fulfill the order as soon as possible. In the mean time, here you can read the rules of care!"}</p> */}
        <p className="description">
          {locale === "nl" ? "We hebben uw bestelling succesvol ontvangen." : "We have succesfully received your order."}
          <br/>
          {locale === "nl" ? "Uw bestel-ID is" : "Your order ID is"} 
          {/* { formData.orderID } */}
          <br/>
          {locale === "nl" ? "We houden je via e-mail op de hoogte van de status van je bestelling." : "We will keep you informed on the status of your order via email."}
          <br/>
          {locale === "nl" ? "Als je vragen hebt, neem dan gerust contact met ons op via shop@costerdiamonds.com" : "If you have any quesions, please don’t hasitate to contact us via shop@costerdiamonds.com"}
        </p>
      </div>
      {/* {
        orderData
          ? <div className="list-panel round p-4 mx-auto row justify-content-end">
            <div className="d-flex justify-content-between booking-panel mb-3">
              <p className="m-0">{locale === "nl" ? "Bestel Details" : "Order Details"}</p>
            </div>
            {
              orderData.line_items.map((product, index) => {
                return (
                  <div className="experience-panel d-flex justify-content-between align-items-center mt-3 border-bottom" key={index}>
                    <div className="experience-box">
                      <h3 className="blue-text">{product.title}</h3>
                    </div>
                    <div className="text-end">
                      <h3 className="blue-text text-end">
                        {currencyCode && <NumberFormat
                          value={product.price}
                          displayType="text"
                          decimalScale={2}
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                          suffix={" " + currencyCode}
                        />}</h3>
                      <p>x {product.quantity}</p>
                    </div>
                  </div>
                )
              })
            }
            <div className="price-panel col-6 pt-3">
              <div className="total-tax-panel pt-3 d-flex justify-content-between">
                <h3 className="blue-text">{locale === "nl" ? "Korting" : "Discount"}</h3>
                <h3> {<NumberFormat
                  value={orderData.total_discounts}
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  suffix={" " + currencyCode}
                />}</h3>
              </div>
              <div className="total-tax-panel pt-3 d-flex justify-content-between">
                <h3 className="blue-text">{locale === "nl" ? "Verzenden" : "Shipping"}</h3>
                <h3> {<NumberFormat
                  value={orderData.total_shipping_price_set.shop_money.amount}
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  suffix={" " + currencyCode}
                />}</h3>
              </div>
              <div className="total-tax-panel pt-3 d-flex justify-content-between border-bottom">
                <h3 className="blue-text">Tax</h3>
                <h3> {<NumberFormat
                  value={orderData.total_tax}
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  suffix={" " + currencyCode}
                />}</h3>
              </div>
              <div className="total-tax-panel pt-3 d-flex justify-content-between">
                <h3 className="blue-text">Total</h3>
                <h3> {<NumberFormat
                  value={orderData.total_price}
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  suffix={" " + currencyCode}
                />}</h3>
              </div>
            </div>
          </div>
          : <Skeleton variant="rect" className="list-panel-skeleton mx-auto round" width="100%" height={100} />
      } */}
      {/* <div className="btn-panel d-flex py-5 mb-5  justify-content-center">
        <Link href="/">
          <a className="btn blue-btn px-5 py-3 btn-home text-uppercase me-4 round-form">
          {locale === "nl" ? "terug naar huis" : "back to home"}
          </a>
        </Link>
        <button className="btn btn-subscribe text-uppercase round-form px-5 py-3">
        {locale === "nl" ? "Abonneren" : "Subscribe"}
        </button>
      </div>
      <div className="top-pink-panel" />
      <div className="bottom-blue-panel" />
      <div className="bottom-pink-panel" /> */}
      <Footer />
    </div>
  );
}
