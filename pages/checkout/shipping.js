import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { HiOutlineArrowLeft, HiPencil, RiCheckFill } from "react-icons/hi";
import MyCartList from "../../components/myCartList";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { connect } from "react-redux";
import { creatCheckout } from "../../redux/actions/checkOutAction";
import { SnackbarProvider, useSnackbar } from "notistack";
const payURL = "https://royalcoster.com:81/royalcoster/safepay.php";

const initalOptions = {
  "currency": "USD",
  "locale": "nl_NL",
  "client-id": "ATO6OLl5uD_4CYxAhaGeuONRhLsp3vpQEj5XMVzFf--WgW8j882sJ_WVFkFAlogVZ2K7MctndZZWSIMQ"
};

function Shipping(props) {
  const [storage, setStorage] = useState();
  const [freeShippingMethod, setFreeShippingMethod] = useState(true);
  const router = useRouter();
  const { locale } = useRouter();
  const [isMobile, setIsMobile] = useState();
  const [billingMode, setBillingMode] = useState("same");
  const [saveData, setSaveData] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState([
    "IDEAL",
    "VISA",
    "MASTERCARD",
    "AMEX",
    "PAYPAL",
    "BANCONTACT"
  ]);
  const [orderID, setOrderID] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  var ddd = null;
  const setBillingHandler = () => {
    setBillingMode("");
  }

  const createOrder = async (data, actions) => {
    let lineItems = [];

    JSON.parse(localStorage.cart).cartData.map((cart, index) => {
      var ttl = cart.title;
    /*  if (cart.size != "0") {
        ttl += " (Ring Size: " + cart.size + ")";
      }
      if (cart.letter != "") {
        ttl += " (Letter: " + cart.letter + ")";
      }*/
      lineItems.push({
        variantID: cart.variant.variantId,
        quantity: cart.amount,
        title: ttl
      });
    });

    if (!saveData) {

      localStorage.removeItem("shipping");
      localStorage.removeItem("products");
      localStorage.removeItem("billing");
    } else {
      if (billingMode == "same") {
        localStorage.setItem(
          "billing",
          JSON.stringify(JSON.parse(localStorage.shipping))
        );
      } else {
        if (!surName | !street | !zipCode | !town | !country | !phoneNumber | !apartment) {
        } else {
          localStorage.setItem(
            "billing",
            JSON.stringify(JSON.parse(localStorage.billing))
          );
          setBillingMode("");
        }
      }
    }
    let formData = new FormData();

    let postData = {
      order_data: lineItems,
      discount_code: localStorage.discountCode ? localStorage.discountCode : "",
      shipping: JSON.parse(localStorage.shipping),
      billing: JSON.parse(localStorage.billing),
      customer_info: {
        email: localStorage.customerInfo,
        ...JSON.parse(localStorage.billing).contact,
        address: JSON.parse(localStorage.billing).address,
      },
    //  payment_method: paymentMethod.join(','),
      remember_me: saveData,
      ppp: "1"
    };
    const res = await fetch(payURL, {
      method: "post",
      body: JSON.stringify(postData),
    });
    ddd = await res.json();
    console.log(actions)
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Order: " + ddd.name,
            amount: {
              currency_code: "EUR",
              value: (ddd.amount / 100),
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const payNow = (e) => {
    e.preventDefault();
    let lineItems = [];

    JSON.parse(localStorage.cart).cartData.map((cart, index) => {
      var ttl = cart.title;
    /*  if (cart.size != "0") {
        ttl += " (Ring Size: " + cart.size + ")";
      }
      if (cart.letter != "") {
        ttl += " (Letter: " + cart.letter + ")";
      }*/
      lineItems.push({
        variantID: cart.variant.variantId,
        quantity: cart.amount,
        title: ttl
      });
    });

    if (!saveData) {
      e.preventDefault();
      localStorage.removeItem("shipping");
      localStorage.removeItem("products");
      localStorage.removeItem("billing");
    } else {
      if (billingMode == "same") {
        e.preventDefault();
        localStorage.setItem(
          "billing",
          JSON.stringify(JSON.parse(localStorage.shipping))
        );
      } else {
        if (!surName | !street | !zipCode | !town | !country | !phoneNumber | !apartment) {
          console.log(e);
        } else {
          e.preventDefault();
          localStorage.setItem(
            "billing",
            JSON.stringify(JSON.parse(localStorage.billing))
          );
          setBillingMode("");
        }
      }
    }
    let formData = new FormData();

    let postData = {
      order_data: lineItems,
      discount_code: localStorage.discountCode ? localStorage.discountCode : "",
      shipping: JSON.parse(localStorage.shipping),
      billing: JSON.parse(localStorage.billing),
      customer_info: {
        email: localStorage.customerInfo,
        ...JSON.parse(localStorage.billing).contact,
        address: JSON.parse(localStorage.billing).address,
      },
      payment_method: paymentMethod.join(','),
      remember_me: saveData,
    };
    fetch(payURL, {
      method: "post",
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.body.RedirectUrl) {
          router.push(data.body.RedirectUrl);
          localStorage.setItem("token", data.body.Token);
        } else {
          let variant = "warning";
          enqueueSnackbar("Something went wrong.", { variant });
        }
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      window.location.href = "https://royalcoster.com:81/royalcoster/safepay_response.php?orderid=" + ddd.orderid;
    });
  };

  useEffect(() => {
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3002600,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    setIsMobile((window.innerWidth < 576) ? true : false);
    if (localStorage.shipping) {
      if (JSON.parse(localStorage.shipping).shippingMethod == "free") {
        setFreeShippingMethod(true);
      } else {
        setFreeShippingMethod(false);
      }
    }
    setStorage(localStorage);
    try {
      var cart = $.parseJSON(localStorage.cart);
    } catch(err) {
      window.location.href = "/cart";
    }
    var cItems = $.parseJSON(localStorage.cItems);
    var vl = 0;
    var prds = [];

    $.each(cart.cartData, function() {
      var item = cItems[this.shopifyid];

      if (cItems[this.shopifyid] !== undefined) {
        vl += parseFloat(cItems[this.shopifyid].price) * parseFloat(cItems[this.shopifyid].quantity);
      //  prds.push(cItems[this.shopifyid]);
        var oo = {};
        oo.id = item.id.toString();
        oo.name = item.simpleName;
        oo.price = item.price.toString();
        oo.brand = item.brand;
        oo.variant = this.variant.variantId.toString();
        oo.category = this.product_type;
        oo.dimension1 = this.size.toString();
        oo.quantity = item.quantity.toString();
        prds.push(oo);
      }
    })
  var dll = {
    "event": "checkout",
      "ecommerce": {
        "value": vl.toString(),
        "currencyCode": "EUR",
          "checkout": {
           "actionField": {"step": "2"},
           "products": prds
        }
      }
  }
 dataLayer.push(dll);
  }, []);

  if (storage) {
    if (!JSON.parse(localStorage.cart).subTotal) {
      window.location.href =("/cart");
      return <div></div>;
    } else if (!localStorage.shipping) {
      window.location.href =("/checkout/information");
      return <div></div>;
    } else {
      const shippingData = JSON.parse(localStorage.shipping);
      const billingData = JSON.parse(localStorage.billing);
      return (
        <div className="checkout_page checkout-shipping">
          <Head>
            <title>Checkout Shipping | Royal Coster</title>

          </Head>
          <Header />
          {/* <div className="link-panel py-4">
            <div className="r-container d-flex align-items-center">
              <button
                className="btn back-arrow d-flex me-3 blue-text px-0"
                onClick={() => router.back()}
              >
                <HiOutlineArrowLeft />
              </button>
              <Link passHref={true} href="/cart">
                <a className="mx-2 text-uppercase">{locale === "nl" ? "Winkelwagen" : "Shopping cart"}</a>
              </Link>
              /
              <Link passHref={true} href="/checkout/information">
                <a className="mx-2 text-uppercase">{locale === "nl" ? "informatie" : "information"}</a>
              </Link>
              /
              <span className="title ms-2 text-uppercase blue-text">
              {locale === "nl" ? "Verzenden" : "Shipping"}
              </span>
              /
              <Link passHref={true} href="/checkout/payment">
                <a className="mx-2 text-uppercase">{locale === "nl" ? "Betaling" : "Payment"}</a>
              </Link>
            </div>
          </div> */}
          <div className="link-section">
            <div className="r-container py-3 d-flex align-items-center justify-content-between">
              <Link href="/checkout/information">
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
                  <span className="step m1-2 active">{locale === "nl" ? "uitchecken" : "checkout"}</span>
                </div>
              </div>)}
              {isMobile && (<div className="steps d-flex align-items-end justify-content-center">
                <div className="step active">
                  <span>{locale === "nl" ? "stap" : "step"}</span>
                  3/3
                </div>
              </div>)}
            </div>
          </div>
          <div className="title-panel r-container pt-4 mt-4 pt-sm-5 mt-sm-5 d-none d-sm-block">
            <h3 className="title text-capitalize blue-text mb-4">{locale === "nl" ? "Kassa Overzicht" : "Checkout Summary"}</h3>
          </div>
          <div className="row main-panel r-container pb-5">
            <div className="col-lg-7 col-12 pt-lg-0 pt-sm-5 shipping-panel">
              <div className="shipping-info mb-5">
                <div className="title-panel">
                  <h3 className="mb-3">{locale === "nl" ? "Verzendingsadres" : "Shipping Address"}</h3>
                </div>
                {/* <div className="contact-panel round-panel round-form d-flex justify-content-between py-4 px-5 mt-4 flex-sm-row flex-column">
                  <div className="text-panel d-flex align-items-center">
                    <h3 className="m-0 me-4">{locale === "nl" ? "Contact" : "Contact"}</h3>
                    <p className="m-0">{localStorage.customerInfo}</p>
                  </div>
                  <Link passHref={true} href="/checkout/information">
                    <a className="text-primary text-decoration-underline text-end">
                    {locale === "nl" ? "bewerken" : "modify"}
                    </a>
                  </Link>
                </div> */}
                <div className="address-panel boxed-panel">
                  <div className="text-panel mb-3">
                    <h4 className="m-0">{locale === "nl" ? "Volledige naam" : "Full Name"}</h4>
                    <p className="m-0">
                      {shippingData.contact.firstName +
                        " " +
                        shippingData.contact.surName}
                    </p>
                  </div>
                  <div className="text-panel mb-3">
                    <h4 className="m-0">{locale === "nl" ? "Adres" : "Address"}</h4>
                    <p className="m-0">
                      {shippingData.address.street + " " + shippingData.address.apartment}<br/>
                      {
                        shippingData.address.zipCode +
                        " " +
                        shippingData.address.town}<br/>
                      {shippingData.address.country}
                    </p>
                  </div>
                  <div className="text-panel mb-3">
                    <h4 className="m-0">Email</h4>
                    <p className="m-0">
                      {localStorage.customerInfo}
                    </p>
                  </div>
                  <div className="text-panel pb-3">
                    <h4 className="m-0">{locale === "nl" ? "Telefoonnummer" : "Phone number"}</h4>
                    <p className="m-0">
                      {shippingData.contact.phoneNumber}
                    </p>
                  </div>
                  {/* <hr class="divider" />
                  <div className="form-check d-flex align-items-center pt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckChecked"
                      onClick={setBillingHandler}
                      defaultChecked
                    />
                    <label
                      className="form-check-label text-capitalize"
                      htmlFor="flexCheckChecked"
                    >
                      {locale === "nl" ? "Gefactureerd aan hetzelfde adres" : "Invoiced to same address"}
                    </label>
                  </div> */}
                  <Link passHref={true} href="/checkout/information">
                    <a className="text-decoration-underline text-end link-edit">
                      {locale === "nl" ? "bewerken" : "edit"}
                      <HiPencil />
                    </a>
                  </Link>
                </div>

                {/* <div className={ billingMode === "" ? "h-100 d-block opacity-1 visible billing-panel" : "h-0 d-none opacity-0 invisible billing-panel"}> */}
                { billingData.contact.billingFirstName && (
                  <div className="billing-panel">
                    <div className="title-panel">
                      <h3 className="my-3">{locale === "nl" ? "Facturatie adres" : "Billing Address"}</h3>
                    </div>
                    <div className="boxed-panel">
                      <div className="text-panel mb-3">
                        <h4 className="m-0">{locale === "nl" ? "Volledige naam" : "Full Name"}</h4>
                        <p className="m-0">
                          { billingData.contact.billingFirstName ? billingData.contact.billingFirstName :shippingData.contact.firstName +
                            " " +
                            billingData.contact.billingSurName ? billingData.contact.billingSurName : shippingData.contact.surName }
                        </p>
                      </div>
                      <div className="text-panel mb-3">
                        <h4 className="m-0">{locale === "nl" ? "Adres" : "Address"}</h4>
                        <p className="m-0">
                          {billingData.address.billingStreet ? billingData.address.billingStreet : shippingData.address.street + " " +
                          billingData.address.apartment ? billingData.address.apartment : shippingData.address.apartment }<br/>
                          {
                            billingData.address.billingZipCode ? billingData.address.billingZipCode : shippingData.address.zipCode +
                            " " +
                            billingData.address.billingTown ? billingData.address.billingTown : shippingData.address.town }<br/>
                          {billingData.address.billingCountry ? billingData.address.billingCountry : shippingData.address.country}
                        </p>
                      </div>
                      <div className="text-panel mb-3">
                        <h4 className="m-0">Email</h4>
                        <p className="m-0">
                          {localStorage.billingCustomerInfo !== undefined ? localStorage.billingCustomerInfo : localStorage.customerInfo}
                        </p>
                      </div>
                      <div className="text-panel pb-3">
                        <h4 className="m-0">{locale === "nl" ? "Telefoonnummer" : "Phone number"}</h4>
                        <p className="m-0">
                          {billingData.contact.phoneNumber ? billingData.contact.phoneNumber : shippingData.contact.phoneNumber}
                        </p>
                      </div>
                      <Link passHref={true} href="/checkout/information">
                        <a className="text-decoration-underline text-end link-edit">
                          {locale === "nl" ? "bewerken" : "edit"}
                          <HiPencil />
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="shipping-method mb-5 pb-3">
                <div className="title-panel">
                  <h3 className="mb-3">{locale === "nl" ? "Verzendmethode" : "Shipping method"}</h3>
                </div>
                <div className="boxed-panel">
                  <label
                    className="standard-shipping-panel round-form d-flex justify-content-between"
                    htmlFor="checkbox"
                  >
                    {/* <div className="text-panel d-flex">
                      <input
                        className="form-check-input me-3"
                        type="checkbox"
                        // checked={freeShippingMethod}
                        defaultChecked
                        id="checkbox"
                        onChange={(e) => setFreeShippingMethod(e.target.checked)}
                      />
                      <div>
                        <h3 className="m-0">{locale === "nl" ? "Standaard" : "Standard"}</h3>
                        <p>Secure &amp; insured shipping<br />ships in 1 business day</p>
                      </div>
                    </div> */}
                    <div className="text-panel d-flex">
                      <img src="/img/myCart/DHL.svg" alt="DHL icon" width={43} height={43}/>
                      <div className="ms-4">
                        <h3 className="m-0">{locale === "nl" ? "DHL Grond:" : "DHL Ground"}</h3>
                        <p>{locale === 'nl' ? "Veilige & verzekerde verzending" : "Secure & insured shipping"}<br />{locale === 'nl' ? "verzonden in 1 werkdag" : "ships in 1 business day"}</p>
                      </div>
                    </div>
                    <span className="shipping-type mb-0">{locale === "nl" ? "Vrij" : "Free"}</span>
                  </label>
                </div>
              </div>
              <div className="payment-methods">
                <div className="title-panel">
                  <h3 className="mb-3">{locale === "nl" ? "Available payment options" : "Available payment options" }</h3>
                </div>
                <div className="boxed-panel img-radio">
                  <div style={{width: 290}}>
                    <div className="row mb-3">
                    <div className="col-3">
                        <label>
                          <input type="radio" name="payment-options" checked />
                          <img src="/img/myCart/Amex.svg" alt="payment option" width={70} height={48} />
                        </label>
                      </div>
                      <div className="col-3">
                        <label>
                          <input type="radio" name="payment-options" checked />
                          <img src="/img/myCart/DinersClub.svg" alt="payment option" width={70} height={48} />
                        </label>
                      </div>
                      <div className="col-3">
                        <label>
                          <input type="radio" name="payment-options" checked />
                          <img src="/img/myCart/Discover.svg" alt="payment option" width={70} height={48} />
                        </label>
                      </div>
                      <div className="col-3">
                        <label>
                          <input type="radio" name="payment-options" checked />
                          <img src="/img/myCart/JCB.svg" alt="payment option" width={70} height={48} />
                        </label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-3">
                        <label>
                          <input type="radio" name="payment-options" checked />
                          <img src="/img/myCart/Maestro.svg" alt="payment option" width={70} height={48} />
                        </label>
                      </div>
                      <div className="col-3">
                        <label>
                          <input type="radio" name="payment-options" checked />
                          <img src="/img/myCart/MasterCard.svg" alt="payment option" width={70} height={48} />
                        </label>
                      </div>
                      <div className="col-3">
                        <label>
                          <input type="radio" name="payment-options" checked />
                          <img src="/img/myCart/visa.svg" alt="payment option" width={70} height={48} />
                        </label>
                      </div>
                      <div className="col-3">
                        <label>
                          <input type="radio" name="payment-options" checked />
                          <img src="/img/myCart/bancontact.svg" alt="payment option" width={70} height={48} />
                        </label>
                      </div>
                    </div>
                    <div className="row mb-4 pb-3">
                      <div className="col-3">
                        <label>
                          <input type="radio" name="payment-options" checked />
                          <img src="/img/myCart/union.svg" alt="payment option" width={70} height={48} />
                        </label>
                      </div>
                      <div className="col-3">
                        <label>
                          <input type="radio" name="payment-options" checked />
                          <img src="/img/myCart/deal.svg" alt="payment option" width={70} height={48} />
                        </label>
                      </div>
                      <div className="col-3">
                        <label>
                          <input type="radio" name="payment-options" checked />
                          <img src="/img/myCart/alipay.svg" alt="payment option" width={70} height={48} />
                        </label>
                      </div>
                    </div>
                  </div>
                  <h3 className="payment-txt">{locale === "nl" ? "U kunt uw methode selecteren op de volgende pagina" : "You can select your method on the next page"}</h3>
                </div>
              </div>

            </div>
            <div className="col-lg-5 col-12 ps-lg-5 mb-lg-0 mb-5 order-lg-last order-first cartlist-wrapper">
              <MyCartList showCoupon={ false } />
              <div className="summary-btn px-4 pb-5 d-none d-sm-block">
                <button
                  type="submit"
                  className="btn px-5 py-3 buy-btn me-sm-4 me-0 mb-4"
                  onClick={payNow}
                >
                  {locale === "nl" ? "Ga door naar betaling" : "Proceed to Payment"}
                </button>

                <PayPalScriptProvider options={{"disable-funding": "credit,card,ideal,bancontact","currency": "EUR","client-id": "ATO6OLl5uD_4CYxAhaGeuONRhLsp3vpQEj5XMVzFf--WgW8j882sJ_WVFkFAlogVZ2K7MctndZZWSIMQ" }}>
                <PayPalButtons
                   style={{ layout: "vertical" }}
                   createOrder={createOrder}
                   onApprove={onApprove}
                 />
                </PayPalScriptProvider>

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
                    <span className="ms-2">{locale === "nl" ? "Verzekerde verzending binnen 48 uur" : "Ships fully insured in 48 hours"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row btn-panel summary-btn r-container d-sm-none px-4 pb-5">
            <button
              type="submit"
              className="btn px-5 py-3 buy-btn me-sm-4 me-0 mb-4"
              onClick={payNow}
            >
              {locale === "nl" ? "Ga door naar betaling" : "Proceed to Payment"}
            </button>

            <PayPalScriptProvider options={{ "disable-funding": "credit,card,ideal,bancontact","currency": "EUR","client-id": "ATO6OLl5uD_4CYxAhaGeuONRhLsp3vpQEj5XMVzFf--WgW8j882sJ_WVFkFAlogVZ2K7MctndZZWSIMQ" }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={createOrder}
                onApprove={onApprove}
              />
            </PayPalScriptProvider>

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
                <span className="ms-2">{locale === "nl" ? "Splits uw betaling in 3 termijnen met Klarna" : "Split your payment in 3 installments with Klarna"}</span>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  } else {
    return <></>;
  }
}

const mapStateToProps = state => ({
  checkOut: state.checkOut
});

const mapDispatchToProps = {
  creatCheckout: creatCheckout
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipping)
