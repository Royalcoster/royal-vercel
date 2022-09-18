import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { CountryDropdown } from "react-country-region-selector";
import MyCartList from "../../components/myCartList";
import { connect } from "react-redux";
import { creatCheckout } from "../../redux/actions/checkOutAction";
import { SnackbarProvider, useSnackbar } from "notistack";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const payURL = process.env.NEXT_PUBLIC_PAY_URL;
// import { Context } from "/lib/Context";
function Payment(props) {
  const [storage, setStorage] = useState();
  const [saveData, setSaveData] = useState(true);
  const router = useRouter();
  const [firstName, setFirstName] = useState();
  const [surName, setSurName] = useState();
  const [street, setStreet] = useState();
  const [apartment, setApartment] = useState();
  const [zipCode, setZipCode] = useState();
  const [town, setTown] = useState();
  const [country, setCountry] = useState("Netherlands");
  const [phoneNumber, setPhoneNumber] = useState();
  const [errorPhone, setErrorPhone] = useState();
  const [billingMode, setBillingMode] = useState("same");
  const [show, setShow] = useState(false);
 const [success, setSuccess] = useState(false);
 const [ErrorMessage, setErrorMessage] = useState("");
 const [orderID, setOrderID] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState([
    "IDEAL",
    "VISA",
    "MASTERCARD",
    "AMEX",
    "PAYPAL",
    "BANCONTACT"
  ]);
  const { enqueueSnackbar } = useSnackbar();
  var ddd = null;

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
        if (!surName | !street | !zipCode | !town | !country | !phoneNumber) {
        } else {
          if (typeof phoneNumber !== "undefined") {
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(phoneNumber)) {
              setErrorPhone("Please enter only number.");
            } else if (phoneNumber.length < 10 || phoneNumber.length > 12) {
              setErrorPhone("Please enter valid phone number.");
            } else {
              setErrorPhone("");
              localStorage.setItem(
                "billing",
                JSON.stringify({
                  contact: {
                    firstName: firstName,
                    surName: surName,
                    phoneNumber: phoneNumber,
                  },
                  address: {
                    street: street,
                    apartment: apartment,
                    zipCode: zipCode,
                    town: town,
                    country: country,
                  },
                })
              );
              setBillingMode("");
            }
          }
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
  const createOrderData = async () => {

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
        if (!surName | !street | !zipCode | !town | !country | !phoneNumber) {
        } else {
          if (typeof phoneNumber !== "undefined") {
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(phoneNumber)) {
              setErrorPhone("Please enter only number.");
            } else if (phoneNumber.length < 10 || phoneNumber.length > 12) {
              setErrorPhone("Please enter valid phone number.");
            } else {
              setErrorPhone("");
              localStorage.setItem(
                "billing",
                JSON.stringify({
                  contact: {
                    firstName: firstName,
                    surName: surName,
                    phoneNumber: phoneNumber,
                  },
                  address: {
                    street: street,
                    apartment: apartment,
                    zipCode: zipCode,
                    town: town,
                    country: country,
                  },
                })
              );
              setBillingMode("");
            }
          }
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

    fetch(payURL, {
      method: "post",
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data1) => {
        ddd = data1;
      });
  };

  const onApprove = (data, actions) => {
   return actions.order.capture().then(function (details) {
     window.location.href = "https://royalcoster.com:81/royalcoster/safepay_response.php?orderid=" + ddd.orderid;
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
        if (!surName | !street | !zipCode | !town | !country | !phoneNumber) {
          console.log(e);
        } else {
          e.preventDefault();
          if (typeof phoneNumber !== "undefined") {
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(phoneNumber)) {
              setErrorPhone("Please enter only number.");
            } else if (phoneNumber.length < 10 || phoneNumber.length > 12) {
              setErrorPhone("Please enter valid phone number.");
            } else {
              setErrorPhone("");
              localStorage.setItem(
                "billing",
                JSON.stringify({
                  contact: {
                    firstName: firstName,
                    surName: surName,
                    phoneNumber: phoneNumber,
                  },
                  address: {
                    street: street,
                    apartment: apartment,
                    zipCode: zipCode,
                    town: town,
                    country: country,
                  },
                })
              );
              setBillingMode("");
            }
          }
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

  useEffect(() => {
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:3002600,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    try {
      var cccc = $.parseJSON(localStorage.cart);
    } catch(err) {
      window.location.href = "/cart";
    }
    setStorage(localStorage);
    let personInfo;
    let address;
    var cart = $.parseJSON(localStorage.cart);
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
           "actionField": {"step": "3"},
           "products": prds
        }
      }
  }
 dataLayer.push(dll);
    if (localStorage.billing) {
      address = JSON.parse(localStorage.billing).address;
      personInfo = JSON.parse(localStorage.billing).contact;
    } else {
      address = JSON.parse(localStorage.shipping).address;
      personInfo = JSON.parse(localStorage.shipping).contact;
    }
    setFirstName(personInfo.firstName);
    setSurName(personInfo.surName);
    setPhoneNumber(personInfo.phoneNumber);
    setStreet(address.street);
    setApartment(address.apartment);
    setCountry(address.country);
    setTown(address.town);
    setZipCode(address.zipCode);
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
      return (
        <div className="checkout_page checkout-payment">
          <Head>
            <title>Checkout Payment | Royal Coster</title>

                <script async src="/jQuery.js"></script>
                  <script async src="/bootstrap.min.js"></script>
          </Head>
          <Header />
          <div className="link-panel py-4">
            <div className="r-container d-flex align-items-center">
              <button
                className="btn back-arrow d-flex me-3 blue-text px-0"
                onClick={() => router.back()}
              >
                <HiOutlineArrowLeft />
              </button>
              <Link passHref={true} href="/myCart">
                <a className="mx-2 text-uppercase">Shopping cart</a>
              </Link>
              /
              <Link passHref={true} href="/checkout/information">
                <a className="mx-2 text-uppercase">information</a>
              </Link>
              /
              <Link passHref={true} href="/checkout/shipping">
                <a className="mx-2 text-uppercase">Shipping</a>
              </Link>
              /
              <span className="title ms-2 text-uppercase blue-text">
                Payment
              </span>
            </div>
          </div>
          <div className="row main-panel r-container py-5">
            <div className="col-lg-6 col-12 pt-lg-0 pt-sm-5 shipping-panel">
              <div className="pay-info">
                <div className="contact-panel round-panel round-form d-flex justify-content-between py-4 px-5 flex-sm-row flex-column">
                  <div className="text-panel d-flex align-items-center">
                    <h3 className="m-0 me-4">Contact</h3>
                    <p className="m-0">{localStorage.customerInfo}</p>
                  </div>
                  <Link passHref={true} href="/checkout/information">
                    <a className="text-primary text-decoration-underline text-end">
                      modify
                    </a>
                  </Link>
                </div>
                <div className="address-panel round-panel round-form d-flex justify-content-between py-4 px-5 mt-4 flex-sm-row flex-column">
                  <div className="text-panel d-flex">
                    <h3 className="m-0 me-4">Send To</h3>
                    <p className="m-0">
                      {shippingData.address.street +
                        ", " +
                        shippingData.address.zipCode +
                        ", " +
                        shippingData.address.town +
                        ", " +
                        shippingData.address.country}
                    </p>
                  </div>
                  <Link passHref={true} href="/checkout/information">
                    <a className="text-primary text-decoration-underline text-end">
                      modify
                    </a>
                  </Link>
                </div>
                <div className="address-panel round-panel round-form d-flex justify-content-between py-4 px-5 mt-4 flex-sm-row flex-column">
                  <div className="text-panel d-flex">
                    <h3 className="m-0 me-4">Manner</h3>
                    <p className="m-0">
                      Standard :{" "}
                      {shippingData.shippingMethod == "free" ? "Free" : "None"}
                    </p>
                  </div>
                  <Link passHref={true} href="/checkout/shipping">
                    <a className="text-primary text-decoration-underline text-end">
                      modify
                    </a>
                  </Link>
                </div>
              </div>
              <div className="payment-method mt-sm-5 py-5">
                <div className="title-panel py-4">
                  <h3>Payment</h3>
                  <p className="m-0">
                    All transactions are secured and encrypted.
                  </p>
                </div>
                <div className="payment-checkout-panel payment-panel round-form mt-4 px-4">
                  <div className="form-check">
                    <label
                      className="form-check-label py-4 d-flex align-items-center"
                      htmlFor="paymentMethod-1"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="paymentMethod-1"
                        onChange={() => setPaymentMethod(["IDEAL"])}
                      />
                      <img loading="lazy"  src="/img/myCart/payment-1.png" className="ms-3" />
                    </label>
                  </div>
                  <div className="form-check">
                    <label
                      className="form-check-label d-flex align-items-center justify-content-between py-4"
                      htmlFor="paymentMethod-2"
                    >
                      <div className="left-panel  d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="paymentMethod-2"
                          onChange={() =>
                            setPaymentMethod(["VISA", "MASTERCARD", "AMEX"])
                          }
                          defaultChecked
                        />
                        <img loading="lazy"  src="/img/myCart/payment-2.png" className="ms-3" />
                        <img loading="lazy"  src="/img/myCart/payment-3.png" className="ms-3" />
                        <img loading="lazy"  src="/img/myCart/payment-4.png" className="ms-3" />
                      </div>
                      <h3 className="m-0 payment-label">Credit Card</h3>
                    </label>
                  </div>
                {/*  <div className="form-check">
                    <label
                      className="form-check-label py-4 d-flex align-items-center"
                      htmlFor="paymentMethod-3"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="paymentMethod-3"
                        onChange={() => setPaymentMethod(["PAYPAL"])}
                      />
                      <img loading="lazy"  src="/img/myCart/payment-5.png" className="ms-3" />
                    </label>
                  </div>
                  */}

                  <div className="form-check">
                    <label
                      className="form-check-label py-4 d-flex align-items-center"
                      htmlFor="paymentMethod-4"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="paymentMethod-4"
                        onChange={() => setPaymentMethod(["BANCONTACT"])}
                      />
                      <img loading="lazy"  src="/img/myCart/payment-6.png" className="ms-3" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-check">
                <PayPalScriptProvider options={{ "disable-funding": "credit,card,ideal,bancontact","currency": "EUR","client-id": "ATO6OLl5uD_4CYxAhaGeuONRhLsp3vpQEj5XMVzFf--WgW8j882sJ_WVFkFAlogVZ2K7MctndZZWSIMQ" }}>
                <PayPalButtons
                   style={{ layout: "vertical" }}
                   createOrder={createOrder}
                   onApprove={onApprove}
                 />
                </PayPalScriptProvider>
              </div>

              <form className="form-control ">
                <div className="billing-address-panel mt-sm-5 py-sm-5">
                  <div className="title-panel py-4">
                    <h3>Billing address</h3>
                    <p className="m-0">
                      Select the address that corresponds to your card or
                      payment method.
                    </p>
                  </div>
                  <div className="billing-checkout-panel payment-panel round-form mt-4 px-4">
                    <div className="form-check">
                      <label
                        className="form-check-label py-4 d-flex align-items-center"
                        htmlFor="defaultAddress"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="billingRadio"
                          id="defaultAddress"
                          onChange={(e) =>
                            e.target.checked && setBillingMode("same")
                          }
                          defaultChecked
                        />
                        <h3 className="m-0 ms-3">Same as delivery address</h3>
                      </label>
                    </div>
                    <div className="form-check different-address-panel">
                      <label
                        className="form-check-label d-flex align-items-center py-4"
                        htmlFor="differentAddress"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="billingRadio"
                          id="differentAddress"
                          onChange={(e) =>
                            e.target.checked && setBillingMode("different")
                          }
                        />
                        <h3 className="m-0 ms-3">
                          Use a different billing address
                        </h3>
                      </label>
                      <div
                        className={
                          "col-12 form-panel address-panel pt-lg-0 " +
                          billingMode
                        }
                      >
                        <div className="delivery-panel py-4">
                          <div className="title-panel py-4">
                            <h3 className="blue-text m-0">Billing address</h3>
                          </div>
                          <div className="input-panel pt-3">
                            <div className="name-input row m-0 pt-4">
                              <div className="p-0 pe-md-3 pe-0 col-md-6 ">
                                <input
                                  type="text"
                                  className="form-control col-12 px-4 py-3 me-2 round-form first-name-form"
                                  placeholder="First Name (Optional)"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                />
                              </div>
                              <div className="p-0 ps-md-3 ps-0 pt-md-0 pt-4 col-md-6">
                                <input
                                  type="text"
                                  className="form-control col-12 px-4 py-3 round-form surname-name-form"
                                  placeholder="Surname"
                                  value={surName}
                                  onChange={(e) => setSurName(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                            <input
                              type="text"
                              className="form-control px-4 py-3 me-2 round-form street-form mt-4"
                              placeholder="Street and  house number"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                              required
                            />

                            <input
                              type="text"
                              className="form-control px-4 py-3 me-2 round-form apartment-form mt-4"
                              placeholder="Apartment no. etc... (Optional)"
                              value={apartment}
                              onChange={(e) => setApartment(e.target.value)}
                            />
                            <div className="zipCode-input row m-0 mt-4">
                              <div className="p-0 pe-md-3 pe-0 col-md-6 ">
                                <input
                                  type="text"
                                  className="form-control px-4 py-3 me-2 round-form zipCode-form"
                                  placeholder="Zip Code"
                                  value={zipCode}
                                  onChange={(e) => setZipCode(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="p-0 ps-md-3 ps-0 pt-md-0 pt-4 col-md-6">
                                <input
                                  type="text"
                                  className="form-control px-4 py-3 round-form town-form"
                                  placeholder="Town"
                                  value={town}
                                  onChange={(e) => setTown(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                            <CountryDropdown
                              className="form-control px-4 py-3 round-form country-form mt-4"
                              value={country}
                              onChange={(e) => setCountry(e)}
                              required
                            />
                            <input
                              className="form-control px-4 py-3 me-2 round-form phone-form mt-4"
                              placeholder="Telephone Number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              required
                            />
                            <div className="invalid-feedback">{errorPhone}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="remember-panel mt-sm-5 py-5">
                  <div className="title-panel py-4">
                    <h3 className="m-0 remember-label">Remember me</h3>
                  </div>
                  <div className="remember-checkout-panel payment-panel round-form mt-4 px-4">
                    <div className="form-check">
                      <label
                        className="form-check-label py-4 d-flex align-items-center"
                        htmlFor="saveData"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="rememberRadio"
                          id="saveData"
                          checked={saveData}
                          onChange={(e) => setSaveData(e.target.checked)}
                        />
                        <h3 className="m-0 ms-3">Save my data to pay faster</h3>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="btn-panel pt-sm-5 d-flex flex-sm-row flex-column">
                  <button
                    type="submit"
                    className="btn round-form blue-btn px-5 py-3 next-btn text-uppercase me-sm-4 mb-sm-0 mb-4"
                    onClick={payNow}
                  >
                    Pay Now
                  </button>
                  <button
                    className="btn round-form px-4 py-3 back-btn text-uppercase"
                    onClick={() => window.location.href =("/checkout/shipping")}
                  >
                    Back to shipment
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-6 col-12 ps-lg-5 mb-lg-0 mb-5 order-lg-last order-first">
              <MyCartList />
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

const mapStateToProps = (state) => ({
  checkOut: state.checkOut,
});

const mapDispatchToProps = {
  creatCheckout: creatCheckout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
