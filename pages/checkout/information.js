import Head from "next/head";
import Link from 'next-translate-routes/link';
import { HiOutlineArrowLeft, RiCheckFill } from "react-icons/hi";
import MyCartList from "../../components/myCartList";
import { useRouter } from "next/router";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { CountryDropdown } from "react-country-region-selector";
import { useEffect, useState } from "react";
export async function getServerSideProps(context) {

 var lcl = context.locale;
 if (lcl == "en") {
   lcl = "nl"
 }
  let data = {};
  let datae = {};
 if (lcl == "en") {
    const res = await fetch("https://royal-vercel.vercel.app/translations/informations_" + "nl" + ".json");
    data = await res.json();
    const rese = await fetch("https://royal-vercel.vercel.app/translations/errors_" + "nl" + ".json");
    datae = await rese.json();
  } else {
    const res = await fetch("https://royal-vercel.vercel.app/translations/informations_" + lcl + ".json");
    data = await res.json();
    const rese = await fetch("https://royal-vercel.vercel.app/translations/errors_" + lcl + ".json");
    datae = await rese.json();
  }
  return {
    props: {
      translation: data || {},
      errors: datae || {},
      ppp: "https://royal-vercel.vercel.app/translations/errors_" + lcl + ".json"
    },
  };
}

export default function Information(props) {
  const [firstName, setFirstName] = useState();
  const [surName, setSurName] = useState();
  const [email, setEmail] = useState();
  const [street, setStreet] = useState();
  const [apartment, setApartment] = useState();
  const [addition, setAddtion] = useState();
  const [zipCode, setZipCode] = useState();
  const [town, setTown] = useState();
  // const [country, setCountry] = useState('Netherlands');
  const [country, setCountry] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [billingFirstName, setBillingFirstName] = useState();
  const [billingSurName, setBillingSurName] = useState();
  const [billingEmail, setBillingEmail] = useState();
  const [billingStreet, setBillingStreet] = useState();
  const [billingApartment, setBillingApartment] = useState();
  const [billingAddition, setBillingAddtion] = useState();
  const [billingZipCode, setBillingZipCode] = useState();
  const [billingTown, setBillingTown] = useState();
  // const [billingCountry, setBillingCountry] = useState('Netherlands');
  const [billingCountry, setBillingCountry] = useState();
  const [billingPhoneNumber, setBillingPhoneNumber] = useState();
  const [localStore, setLocalStore] = useState();
  const [errorPhone, setErrorPhone] = useState();
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const { locale } = useRouter();
  const [isMobile, setIsMobile] = useState();
  const [invoiceForm, setInvoiceForm] = useState(false);

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
    setLocalStore(localStorage);
    try  {
      var cart = $.parseJSON(localStorage.cart);
    } catch(err) {
      var cart = {};
    }
    var tt = {};
    if (locale == "en") {

          for (var key in props.translation) {
            tt[key.toLowerCase()] = key;
          }

        } else {
          for (var key in props.translation) {
            tt[key.toLowerCase()] = props.translation[key];
          }
        }

        var ww = setInterval(function() {
          if ($("[t]").length > 0) {
            clearInterval(ww);
            $.each($("[t]"), function() {
              var kk = $(this).html().toLowerCase();
              if (tt[kk] !== undefined) {
                $(this).html(tt[kk]);
              }
            })
          }
        }, 100);

    var cItems = $.parseJSON(localStorage.cItems);
    var vl = 0;
    var prds = [];
    $.each(cart.cartData, function() {
      var item = cItems[this.shopifyid];

      if (cItems[this.shopifyid] !== undefined) {
        vl += parseFloat(cItems[this.shopifyid].price) * parseFloat(cItems[this.shopifyid].quantity);
      //  prds.push(cItems[this.shopifyid]);
        var oo = {};
        oo.id = item.id;
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
           "actionField": {"step": "1"},
           "products": prds
        }
      }
  }
  console.log(dll)
dataLayer.push(dll);
    if (localStorage.shipping) {
      let personInfo = JSON.parse(localStorage.shipping).contact;
      let address = JSON.parse(localStorage.shipping).address;
      setFirstName(personInfo.firstName);
      setSurName((personInfo.surName !== undefined) ? personInfo.surName : "");
      setEmail(localStorage.customerInfo);
      setPhoneNumber(personInfo.phoneNumber);
      setStreet(address.street);
      setApartment(address.apartment);
      // setCountry("Netherlands");
      setCountry(address.country);
      setTown(address.town);
      setZipCode(address.zipCode);
      setAddtion(address.addition);
    }
    if (localStorage.billing) {
      let personInfo = JSON.parse(localStorage.billing).contact;
      let address = JSON.parse(localStorage.shipping).address;
      setBillingFirstName(personInfo.billingFirstName);
      setBillingSurName((personInfo.billingSurName !== undefined) ? personInfo.billingSurName : "");
      setBillingEmail(localStorage.billingCustomerInfo);
      setBillingPhoneNumber(personInfo.billingPhoneNumber);
      setBillingStreet(address.billingStreet);
      setBillingApartment(address.billingApartment);
      // setBillingCountry("Netherlands");
      setBillingCountry(address.billingCountry);
      setBillingTown(address.billingTown);
      setBillingZipCode(address.billingZipCode);
      setBillingAddtion(address.billingAddition);
    }
  }, []);
  const checkForm = (obj) => {

    console.log(obj);
  }
  useEffect(() => {
    if (!loaded) {
    $.getScript("/jqueryui.js", function() {
      $.getScript("/jquery.validate.js", function() {

            var errs = {};
      if (locale == "en") {
          for (var key in props.errors) {
            errs[key] = key;
          }
        } else {
            for (var key in props.errors) {
              errs[key] = props.errors[key];
            }
        }

        var ww = setInterval(function() {
          if ($("#nextStep, #nextStepMobile").length > 0) {

              clearInterval(ww);
              $("#nextStep, #nextStepMobile").bind("click", function() {
                $("#shippingForm").submit();
                $("#billingForm").submit();
                return false;
              })
            }
          }, 100);
          jQuery.validator.addMethod("phone", function(phone_number, element) {
              phone_number = phone_number.replace(/\s+/g, "");
              return this.optional(element) || phone_number.length > 9 &&
              phone_number.match(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/);
          }, "Please specify a valid phone number");

        setTimeout(function() {
          $("#shippingForm, #billingForm").validate({
            rules: {
              surName: {
                  required: true
              },
              street: {
                  required: true
              },
              address: {
                  required: true
              },
              zipCode: {
                  required: true
              },
              town: {
                  required: true
              },
              email: {
                required: true,
                email: true,

              },
              phoneNumber: {
                phone: true,
                required: true
              },

            },
            messages: {
              surName: {
                required: errs["This field is required"]
              },
              street: {
                required: errs["This field is required"]
              },
              town: {
                required: errs["This field is required"]
              },
              address: {
                required: errs["This field is required"]
              },
              zipCode: {
                required: errs["This field is required"]
              },
              email: {
                required: errs["This field is required"],
                email: errs["Please enter valid email"]
              },
              phoneNumber: {
                required: errs["This field is required"],
                phone: errs["Please enter valid phone number"]
              },
            },
            invalidHandler: function(event, validator) {
              localStorage.setItem(
                "shipping",
                JSON.stringify({
                  contact: {
                    firstName: localStorage.firstName,
                    surName: localStorage.surName,
                    phoneNumber: localStorage.phoneNumber,
                  },
                  address: {
                    street: localStorage.street,
                    apartment: localStorage.apartment,
                    zipCode: localStorage.zipCode,
                    town: localStorage.town,
                    // country: "Netherlands",
                    country: localStorage.country,
                    phoneNumber: localStorage.phoneNumber,
                  },
                })
              );
              localStorage.setItem(
                "billing",
                JSON.stringify({
                  contact: {
                    billingFirstName: localStorage.billingFirstName,
                    billingSurName: localStorage.billingSurName,
                    billingPhoneNumber: localStorage.billingPhoneNumber,
                  },
                  address: {
                    billingStreet: localStorage.billingStreet,
                    billingApartment: localStorage.billingApartment,
                    billingZipCode: localStorage.billingZipCode,
                    billingTown: localStorage.billingTown,
                    // billingCountry: "Netherlands",
                    billingCountry: localStorage.billingCountry,
                    billingPhoneNumber: localStorage.billingPhoneNumber,
                  },
                })
              );
              localStorage.setItem('customerInfo', localStorage.email);
              localStorage.setItem('billingCustomerInfo', localStorage.billingEmail);
            },
            submitHandler: function(form) {
              localStorage.setItem(
                "shipping",
                JSON.stringify({
                  contact: {
                    firstName: localStorage.firstName,
                    surName: localStorage.surName,
                    phoneNumber: localStorage.phoneNumber,
                  },
                  address: {
                    street: localStorage.street,
                    apartment: localStorage.apartment,
                    zipCode: localStorage.zipCode,
                    town: localStorage.town,
                    // country: "Netherlands",
                    country: localStorage.country,
                    phoneNumber: localStorage.phoneNumber,
                  },
                })
              );
              localStorage.setItem(
                "billing",
                JSON.stringify({
                  contact: {
                    billingFirstName: localStorage.billingFirstName,
                    billingSurName: localStorage.billingSurName,
                    billingPhoneNumber: localStorage.billingPhoneNumber,
                  },
                  address: {
                    billingStreet: localStorage.billingStreet,
                    billingApartment: localStorage.billingApartment,
                    billingZipCode: localStorage.billingZipCode,
                    billingTown: localStorage.billingTown,
                    // billingCountry: "Netherlands",
                    billingCountry: localStorage.billingCountry,
                    billingPhoneNumber: localStorage.billingPhoneNumber,
                  },
                })
              );
              localStorage.setItem('customerInfo', localStorage.email);
              localStorage.setItem('billingCustomerInfo', localStorage.billingEmail);
              window.location.href = ((locale == "en") ? "" : "/" + locale) + "/checkout/shipping";

            }
          })
        }, 2000);
    })
  })
}
}, [loaded, router]);
  const nextStep = () => {

    if (
      !surName |
      !email |
      !street |
      !zipCode |
      !town |
      !country |
      !phoneNumber
    ) {
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
            "shipping",
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
                // country:"Netherlands",
                country: country,
              },
            })
          );
          localStorage.setItem(
            "billing",
            JSON.stringify({
              contact: {
                billingFirstName: billingFirstName,
                billingSurName: billingSurName,
                billingPhoneNumber: billingPhoneNumber,
              },
              address: {
                billingStreet: billingStreet,
                billingApartment: billingApartment,
                billingZipCode: billingZipCode,
                billingTown: billingTown,
                // billingCountry:"Netherlands",
                billingCountry: billingCountry,
              },
            })
          );
          localStorage.setItem('customerInfo', email);
          localStorage.setItem('billingCustomerInfo', billingEmail);
          window.location.href =("/checkout/shipping");
        }
      }
    }
  };

  const setInvoiceFormHandler = () => {
    setInvoiceForm(!invoiceForm);
  }

  if (localStore) {
    try {
      var cccc = $.parseJSON(localStorage.cart);
    } catch(err) {
      window.location.href = "/cart";
    }
    if (!JSON.parse(localStore.cart).subTotal) {
      window.location.href =("/cart");
      return <></>;
    } else
      return (
        <div className="checkout_page checkout-information">
          <Head>
            <title>Checkout Information | Royal Coster</title>

                <script async src="/jQuery.js"></script>
                  <script async src="/bootstrap.min.js"></script>
          </Head>
          <Header/>
          {/* <div className="link-panel py-4">
            <div className="r-container d-flex align-items-center">
              <button
                className="btn back-arrow d-flex me-3 blue-text px-0"
                onClick={() => router.back()}
              >
                <HiOutlineArrowLeft />
              </button>
              <Link passHref={true}  href="/cart">
                <a className="mx-2 text-uppercase">{locale === "nl" ? "Winkelwagen" : "Shopping cart"}</a>
              </Link>
              /
              <span className="title ms-2 text-uppercase blue-text">
              {locale === "nl" ? "informatie" : "information"}
              </span>
              /
              <Link passHref={true}  href="/checkout/shipping">
                <a className="mx-2 text-uppercase">{locale === "nl" ? "Verzenden" : "Shipping"}</a>
              </Link>
              /
              <Link passHref={true}  href="/checkout/payment">
                <a className="mx-2 text-uppercase">{locale === "nl" ? "Betaling" : "Payment"}</a>
              </Link>
            </div>
          </div> */}
          <div className="link-section">
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
                  <span className="step mx-2 active">{locale === "nl" ? "verzendgegevens" : "shipping details"}</span>
                  -
                  <span className="step m1-2">{locale === "nl" ? "uitchecken" : "checkout"}</span>
                </div>
              </div>)}
              {isMobile && (<div className="steps d-flex align-items-end justify-content-center">
                <div className="step active">
                  <span>{locale === "nl" ? "stap" : "step"}</span>
                  2/3
                </div>
              </div>)}
            </div>
          </div>
          <div className="title-panel r-container d-none d-sm-block">
            <h3 className="title text-capitalize blue-text mb-0">{locale === "nl" ? "Mijn winkelgegevens" : "My Shopping Details"}</h3>
          </div>
          <div className="row main-panel r-container">
            <div className="col-lg-7 col-12 form-panel pt-lg-0 pt-5 pb-5">
              <form className="form" id="shippingForm" style={{marginBottom: 68}}>
                <div className="form-group mb-5">
                  <label t="1" htmlFor="email" className="ps-1 mb-3">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder=""
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      localStorage.email = e.target.value;
                    }}
                    autocomplete="on"
                  />
                </div>

                <div className="form-group mb-5 pb-3">
                  <label t="1" className="ps-1 mb-3">Gender</label>
                  <div className="form-row">
                    <div className="col-4">
                      <input type="radio" className="btn-check" name="gender" id="male1" autocomplete="off" />
                      <label t="1"  className="btn btn-secondary" for="male1">Male</label>
                    </div>
                    <div className="col-4">
                      <input type="radio" className="btn-check" name="gender" id="female1" autocomplete="off" />
                      <label t="1" className="btn btn-secondary" for="female1">Female</label>
                    </div>
                    <div className="col-4">
                      <input type="radio" className="btn-check" name="gender" id="other1" autocomplete="off" />
                      <label t="1" className="btn btn-secondary" for="other1">Other</label>
                    </div>
                  </div>
                </div>

                <div className="form-row mb-5">
                  <div className="form-group col-6">
                    <label t="1" htmlFor="first-name" className="ps-1 mb-3">First Name</label>
                    <input
                      type="text"
                      className="form-control first-name-form"
                      placeholder=""
                      id="first-name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        localStorage.firstName = e.target.value;
                      }}
                      autocomplete="on"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label t="1"  htmlFor="last-name" className="ps-1 mb-3">Last Name</label>
                    <input
                      type="text"
                      name="surName"
                      id="surName"
                      className="form-control"
                      placeholder=""
                      value={surName}
                      onChange={(e) => {
                        setSurName(e.target.value);
                        localStorage.surName = e.target.value;
                      }}
                      autocomplete="on"
                    />
                  </div>
                </div>

                <div className="form-group pb-2 mb-5">
                  <label t="1" htmlFor="country" className="ps-1 mb-3">Country</label>
                  <CountryDropdown
                    className="form-control"
                    name="country"
                    id="country"
                    value={country}
                    // onChange={(e) => setCountry(e)}      ////????original
                    onChange={(val) => {
                      alert(val);
                      setCountry(val);
                      localStorage.country = val;
                    }}
                    required
                  />
                </div>

                <div className="form-group pb-2 mb-5">
                  <label t="1" htmlFor="address" className="ps-1 mb-3">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="address"
                    id="address"
                    value={street}
                    onChange={(e) => {
                      setStreet(e.target.value);
                      localStorage.street = e.target.value;
                    }}
                    autocomplete="on"
                  />
                </div>

                <div className="form-row mb-4">
                  <div className="form-group col-6">
                    <label t="1" htmlFor="housenumber" className="ps-1 mb-3">Housenumber</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      id="housenumber"
                      name="housenumber"
                      value={apartment}
                      onChange={(e) => {
                        setApartment(e.target.value);
                        localStorage.apartment = e.target.value;
                      }}
                      autocomplete="on"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label t="1" htmlFor="addition" className="ps-1 mb-3">Addition</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      id="addition"
                      name="housenumber"
                      value={addition}
                      onChange={(e) => {
                        setAddtion(e.target.value);
                        localStorage.addition = e.target.value;
                      }}
                      autocomplete="on"
                    />
                  </div>
                </div>

                <div className="form-row mb-5">
                  <div className="form-group col-6">
                    <label t="1" htmlFor="zipcode" className="ps-1 mb-3">Postalcode</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="zipCode"
                      id="zipCode"
                      value={zipCode}
                      onChange={(e) => {
                        setZipCode(e.target.value);
                        localStorage.zipCode = e.target.value;
                      }}
                      required
                      autocomplete="on"
                    />
                  </div>
                  <div className="form-group col-6">
                  </div>
                </div>

                <div className="form-group mb-5">
                  <label t="1" htmlFor="city" className="ps-1 mb-3">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="city"
                    name="town"
                    value={town}
                    onChange={(e) => {
                      setTown(e.target.value)
                      localStorage.town = e.target.value;
                    }}
                    autocomplete="on"
                    required
                  />
                </div>

                <div className="form-group mb-5 pb-3 pb-sm-4">
                  <label t="1" htmlFor="phoneNumber" className="ps-1 mb-3">Phone Number</label>
                  <input
                    className="form-control"
                    placeholder=""
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      localStorage.phoneNumber = e.target.value;
                    }}
                    autocomplete="on"
                  />
                </div>

                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input me-4"
                    type="checkbox"
                    id="flexCheckChecked"
                    onClick={setInvoiceFormHandler}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    {locale === "nl" ? "Use an alternative address for my invoice" : "Use an alternative address for my invoice"}
                  </label>
                </div>
              </form>
              <form className={invoiceForm ? "h-100 d-block opacity-1 visible" : "h-0 d-none opacity-0 invisible"} id="billingForm">
                <div className="form-group mb-5">
                  <label htmlFor="email" className="ps-1 mb-3">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder=""
                    value={billingEmail}
                    onChange={(e) => {
                      setBillingEmail(e.target.value);
                      localStorage.billingEmail = e.target.value;
                    }}
                    autocomplete="on"
                  />
                </div>

                <div className="form-group mb-5 pb-3">
                  <label className="ps-1 mb-3">Gender</label>
                  <div className="form-row">
                    <div className="col-4">
                      <input type="radio" className="btn-check" name="gender" id="male2" autocomplete="off" />
                      <label className="btn btn-secondary" for="male2">Male</label>
                    </div>
                    <div className="col-4">
                      <input type="radio" className="btn-check" name="gender" id="female2" autocomplete="off" />
                      <label className="btn btn-secondary" for="female2">Female</label>
                    </div>
                    <div className="col-4">
                      <input type="radio" className="btn-check" name="gender" id="other2" autocomplete="off" />
                      <label className="btn btn-secondary" for="other2">Other</label>
                    </div>
                  </div>
                </div>

                <div className="form-row mb-5">
                  <div className="form-group col-6">
                    <label htmlFor="first-name" className="ps-1 mb-3">First Name</label>
                    <input
                      type="text"
                      className="form-control first-name-form"
                      placeholder=""
                      id="first-name"
                      value={billingFirstName}
                      onChange={(e) => {
                        setBillingFirstName(e.target.value);
                        localStorage.billingFirstName = e.target.value;
                      }}
                      autocomplete="on"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="last-name" className="ps-1 mb-3">Last Name</label>
                    <input
                      type="text"
                      name="surName"
                      id="surName"
                      className="form-control"
                      placeholder=""
                      value={billingSurName}
                      onChange={(e) => {
                        setBillingSurName(e.target.value);
                        localStorage.billingSurName = e.target.value;
                      }}
                      autocomplete="on"
                    />
                  </div>
                </div>

                <div className="form-group pb-2 mb-5">
                  <label htmlFor="country" className="ps-1 mb-3">Country</label>
                  <CountryDropdown
                    className="form-control"
                    name="country"
                    id="country"
                    value={billingCountry}
                    // onChange={(e) => setBillingCountry(e)}     ///???original
                    onChange={(val) => {
                      setBillingCountry(val);
                      localStorage.billingCountry = val;
                    }}
                    required
                  />
                </div>

                <div className="form-group pb-2 mb-5">
                  <label htmlFor="address" className="ps-1 mb-3">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="address"
                    id="address"
                    value={billingStreet}
                    onChange={(e) => {
                      setBillingStreet(e.target.value);
                      localStorage.billingStreet = e.target.value;
                    }}
                    autocomplete="on"
                  />
                </div>

                <div className="form-row mb-4">
                  <div className="form-group col-6">
                    <label htmlFor="housenumber" className="ps-1 mb-3">Housenumber</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      id="housenumber"
                      name="housenumber"
                      value={billingApartment}
                      onChange={(e) => {
                        setBillingApartment(e.target.value);
                        localStorage.billingApartment = e.target.value;
                      }}
                      autocomplete="on"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="addition" className="ps-1 mb-3">Addition</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      id="addition"
                      name="housenumber"
                      value={billingAddition}
                      onChange={(e) => {
                        setBillingAddtion(e.target.value);
                        localStorage.billingAddition = e.target.value;
                      }}
                      autocomplete="on"
                    />
                  </div>
                </div>

                <div className="form-row mb-5">
                  <div className="form-group col-6">
                    <label htmlFor="zipcode" className="ps-1 mb-3">Postalcode</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="zipCode"
                      id="zipCode"
                      value={billingZipCode}
                      onChange={(e) => {
                        setBillingZipCode(e.target.value);
                        localStorage.billingZipCode = e.target.value;
                      }}
                      required
                      autocomplete="on"
                    />
                  </div>
                  <div className="form-group col-6">
                  </div>
                </div>

                <div className="form-group mb-5">
                  <label htmlFor="city" className="ps-1 mb-3">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="city"
                    name="town"
                    value={billingTown}
                    onChange={(e) => {
                      setBillingTown(e.target.value)
                      localStorage.billingTown = e.target.value;
                    }}
                    autocomplete="on"
                    required
                  />
                </div>

                <div className="form-group mb-5 pb-3 pb-sm-4">
                  <label htmlFor="phoneNumber" className="ps-1 mb-3">Phone Number</label>
                  <input
                    className="form-control"
                    placeholder=""
                    name="phoneNumber"
                    id="phoneNumber"
                    value={billingPhoneNumber}
                    onChange={(e) => {
                      setBillingPhoneNumber(e.target.value);
                      localStorage.billingPhoneNumber = e.target.value;
                    }}
                    autocomplete="on"
                  />
                </div>

              </form>
            </div>
            <div className="col-lg-5 col-12 ps-lg-5 order-lg-last order-first cartlist-wrapper">
              <MyCartList />
              <div className="summary-btn px-4 pb-5 d-none d-sm-block">
                <button
                  className="btn blue-btn px-5 py-3 next-btn me-0 mb-sm-0 mb-4"
                   id="nextStep"
                >
                  {locale === "nl" ? "Ga verder naar Verzendgegevens" : "Proceed to Checkout"}
                </button>

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
          <div className="row btn-panel r-container d-sm-none px-4 pb-5">
            <button
              className="btn blue-btn px-5 py-3 next-btn me-0 mb-sm-0 mb-4"
                id="nextStepMobile"
            >
              {locale === "nl" ? "Ga verder naar Verzendgegevens" : "Proceed to Checkout"}
            </button>

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
                <span className="ms-2">{locale === "nl" ? "Ships fully insured in 48 hours" : "Verzekerde verzending binnen 48 uur"}</span>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      );
  } else {
    return <></>;
  }
}
