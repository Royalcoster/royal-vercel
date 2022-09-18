import { useEffect, useState } from "react";
import { RiErrorWarningLine, RiShoppingCart2Fill, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import Client from 'shopify-buy';
import { Skeleton } from "@material-ui/lab";

export default function MyCartList({ showCoupon = true }) {
  const [cartData, setCartData] = useState();
  const [discountCode, setDiscountCode] = useState();
  const [subTotal, setSubTotal] = useState();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [checkoutId, setCheckoutId] = useState();
  const [lineItems, setLineItems] = useState();
  const [showProducts, setShowProducts] = useState(false);
  const [checkoutData, setCheckoutData] = useState();
  const { locale } = useRouter();
  const [isMobile, setIsMobile] = useState();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsMobile((window.innerWidth < 576) ? true : false);
    if (!loaded) {

        setLoaded(true);
        if (localStorage.cart) {
          var cData = JSON.parse(localStorage.cart).cartData;
          setSubTotal(JSON.parse(localStorage.cart).subTotal);
        }
        if(localStorage.discountCode) {
          setDiscountCode(localStorage.discountCode)
        }
        var ww = setInterval(function() {

          if (cData !== undefined) {
            clearInterval(ww);
            generateLineItems();
          }
        }, 100)
     }
  }, [loaded]);
  const generateLineItems = () => {
    setShowProducts(false)
    var  client = Client.buildClient({
      domain: 'costerdiamonds.myshopify.com',
      storefrontAccessToken: '242c01bef37ee0ffbdcef32278b27b9b'
    });
    if (localStorage.cart) {
      var cData = JSON.parse(localStorage.cart).cartData;
      setCartData(JSON.parse(localStorage.cart).cartData);
      setSubTotal(JSON.parse(localStorage.cart).subTotal);
    }
    if(localStorage.discountCode) {
      setDiscountCode(localStorage.discountCode)
    }
    var lItems = [];
    $.each(cData, function() {
      var ths = this;
      var attr = [];
      if (ths.size != "") {
        attr.push({
          key: "Ring size",
          value: ths.size
        })
      }
      if (ths.letter != "") {
        attr.push({
          key: "Letter",
          value: ths.letter
        })
      }

      var obj = {
        variantId: btoa("gid://shopify/ProductVariant/" + ths.variant.variantId),
         quantity: ths.amount,
         customAttributes: attr
      }
      lItems.push(obj);
    })

    $("[ep]").hide();
    if (localStorage.checkoutID === undefined) {

        client.checkout.create().then((checkout) => {
          var checkoutId = checkout.id;
          localStorage.checkoutID = checkout.id;
         client.checkout.addLineItems(checkoutId, lItems).then((checkout) => {
             if (localStorage.discountCode != undefined) {
                if (localStorage.discountCode !== "") {
                   client.checkout.addDiscount(checkoutId, localStorage.discountCode).then(checkout => {
                     try {
                        if (checkout.discountApplications[0].applicable) {
                           $("#codeok").show();
                         } else {
                           $("#codefailed").show();
                         }
                         recalculate(checkout);
                       } catch(err) {
                            $("#codefailed").show();
                         recalculate(checkout);
                       }
                   });
                 }
             } else {
               recalculate(checkout);
             }
              setShowProducts(true);
              console.log(checkout)
          });
        });
      } else {
        var checkoutId = localStorage.checkoutID;
        client.checkout.fetch(checkoutId).then((checkout) => {
            var toDelete = [];
            $.each(checkout.lineItems, function() {
              toDelete.push(btoa(this.id));
            })
            client.checkout.removeDiscount(checkoutId).then(checkout => {

                client.checkout.removeLineItems(checkoutId, toDelete).then((checkout) => {
                  // Do something with the updated checkout

                  client.checkout.addLineItems(checkoutId, lItems).then((checkout) => {
                      if (localStorage.discountCode !== undefined) {
                          if (localStorage.discountCode != "") {
                          client.checkout.addDiscount(checkoutId, localStorage.discountCode).then(checkout => {

                            try {
                               if (checkout.discountApplications[0].applicable) {
                                  $("#codeok").show();
                                } else {
                                  $("#codefailed").show();
                                }
                                recalculate(checkout);
                              } catch(err) {
                                 $("#codefailed").show();
                                  recalculate(checkout);
                              }
                            });
                          } else {
                            recalculate(checkout);
                          }
                            recalculate(checkout);
                      } else {
                        recalculate(checkout);
                      }
                  });
                });
            });
        });

      }

  }
  const handleDiscountCode = (e) => {
    e.preventDefault();
    localStorage.setItem('discountCode', discountCode)
  }
  function recalculate(checkout) {
    var cd = JSON.parse(localStorage.cart).cartData;
    $.each(checkout.lineItems, function(index) {
      var ths = this;
      var iii = index;
      $.each(cd, function() {
        if (this.variant.variantId == ths.variant.id.split("/")[ths.variant.id.split("/").length -1]) {
            this.lineItem = ths;
        }
      })
    })
    if (checkout.discountApplications.length == 0) {
      checkout.discountType = "NONE";
    } else {
        if (checkout.discountApplications[0].targetSelection == "ALL") {
          checkout.discountType = "TOTAL";
        } else {
          checkout.discountType = "ITEM";
        }
    }
    console.log(checkout);

    setCheckoutData(checkout);
    setCartData(cd);
    setShowProducts(true)
  }
  const toggleExpansion = () => {
    setIsOpen(!isOpen);
    document.querySelector('.accordion-content')?.classList.toggle('open');
  }
  const discountRemoveHandlder = () => {
    // setDiscountCode(!discountCode);
    document.querySelector('#codeok')?.classList.add('d-none')
    localStorage.discountCode && localStorage.removeItem('discountCode');
  }
  return (
    <div className="my-cart-list pt-sm-5">
      {isMobile && (<div className="accordion-header d-flex align-items-center justify-content-between py-5 px-4 px-sm-0">
        <div className="accordion-header-left">
          <button className="accordion-btn border-0 bg-transparent w-100 d-flex align-items-center" onClick={toggleExpansion}><RiShoppingCart2Fill />
            <span className="mx-3">{locale === "nl"? "Overzicht winkelwagen" : "Cart Summary"}</span>
            {isOpen ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </button>
        </div>
        <div className="accordion-header-right">
          {checkoutData && (
            <p className="mb-0">
            {
              <NumberFormat
                value={checkoutData.subtotalPrice}
                displayType="text"
                thousandSeparator={true}
                prefix="€ "
              />
            }
          </p>
          )}
        </div>
      </div>)}
      <div className="accordion-content">
        <div className="title-panel align-items-center justify-content-between d-none d-sm-flex pb-5">
          <h3 className="title blue-text mb-0">{locale === "nl" ? "Jouw bestellingsoverzicht" : "Your Order Summary"}</h3>
          <span>{cartData ? cartData.length : 0} item</span>
        </div>

        <div className="myItem-panel position-relative px-4 px-sm-0 mb-4">

          {cartData && showProducts &&
            cartData.map((item, index) => {
              console.log("cartdata", item);
              return (
                <div
                  className="item-detail row m-0 position-relative py-sm-4 pt-4"
                  key={index}
                >
                  <div className="item-info col-sm-7 p-0 d-flex">
                    <div className="position-relative me-4 mt-3">
                      <img loading="lazy"
                        src={item.image}
                        className="cart-image"
                        alt="cart-image"
                      />
                      <span className="badge">{item.amount}</span>
                    </div>
                    <div className="text-panel">
                      <div className="d-flex align-items-center mb-0">
                        <p className="cart-style mb-0 pe-3">
                          <span className="me-3">{item.product_type} </span>
                        </p>
                        {item.maxCount < item.amount ? <span className="badge badge-outstock">{ locale === "nl" ? "Out of Stock" : "Out of Stock" }</span>
                        : <span className="badge-instock">{ locale === "nl" ? "Op voorraad" : "In Stock" }</span>}
                      </div>
                      <h3  url={item.url} className="title mb-3">
                        {item.title}
                      </h3>
                      <p className="cart-variant">
                        <span className="" style={{fontSize: "16"}}>{item.variant.variantTitle}</span>
                      </p>
                    </div>
                  </div>
                  <div className="item-price col-sm-5 p-0 text-end d-flex align-items-end justify-content-center flex-column">
                    <p className="full-price mb-0">
                      <NumberFormat
                        value={(parseFloat(item.amount) * parseFloat(item.fullPrice)).toFixed(2)}
                        displayType="text"
                        thousandSeparator={true}
                        decimaScale="2"
                        fixedDecimalScale={true}
                        prefix="€ "
                      />
                    </p>
                    <NumberFormat
                      value={(parseFloat(item.amount) * parseFloat(item.price)).toFixed(2)}
                      displayType="text"
                      thousandSeparator={true}
                      decimaScale="2"
                      fixedDecimalScale={true}
                      prefix="€ "
                    />
                    <br />
                    {/* {(item.lineItem.discountAllocations !== undefined)  && item.lineItem.discountAllocations.length > 0  && checkoutData.discountType == "ITEM" && (
                      <span style={{marginRight:5}}>{item.lineItem.discountAllocations[0].discountApplication.code}</span>
                    )}
                    {(item.lineItem.discountAllocations !== undefined)  && item.lineItem.discountAllocations.length > 0  && checkoutData.discountType == "ITEM" && (

                      <NumberFormat
                          value={parseFloat(item.lineItem.discountAllocations[0].allocatedAmount.amount).toFixed(2)}
                          displayType="text"
                          decimaScale="2"
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                          prefix="-€ "
                        />

                    )}
                      <br />
                    {(item.lineItem.discountAllocations !== undefined)  && item.lineItem.discountAllocations.length > 0  && checkoutData.discountType == "ITEM" && (

                      <NumberFormat
                          value={((parseFloat(item.price) * parseFloat(item.amount))- parseFloat(item.lineItem.discountAllocations[0].allocatedAmount.amount)).toFixed(2)}
                          displayType="text"
                          decimaScale="2"
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                          prefix="€ "
                        />

                    )} */}
                  </div>

                </div>
              );
            })}
        </div>
        {/* {showProducts && checkoutData  && checkoutData.discountType != "TOTAL" && (
        <div className="sub-price py-4 px-4 px-sm-0 mb-4 mb-sm-0">
          <div className="sub-total d-flex justify-content-between">
            <h3 className="title">{locale === "nl" ? "Subtotaal" : "Subtotal"}</h3>
            <p className="price">
              <NumberFormat
                value={checkoutData.subtotalPrice}
                displayType="text"
                thousandSeparator={true}
                prefix="€ "
              />
            </p>
          </div>

          <div className="shipping-price d-flex justify-content-between">
            <h3 className="total d-flex align-items-center">
              {locale === "nl" ? "Verzenden" : "Shipping"}
              <RiErrorWarningLine className="ms-2" />
            </h3>
            <p className="content">{locale === "nl" ? "Berekend bij de volgende stap" : "Calculated at the next step"}</p>
          </div>
        </div>
        )}
        {showProducts && checkoutData &&  checkoutData.discountType == "TOTAL" && (
          <div className="sub-price py-4 px-4 px-sm-0 mb-4 mb-sm-0">
            <div className="sub-total d-flex justify-content-between">
              <h3 className="title">{locale === "nl" ? "Subtotaal" : "Subtotal"}</h3>
              <p className="price">
                <NumberFormat
                  value={parseFloat(checkoutData.lineItemsSubtotalPrice.amount).toFixed(2)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="€ "
                />
              </p>
            </div>
              <div className="sub-total d-flex justify-content-between">
              <h3 className="title">{"Discount code applied: " + localStorage.discountCode}</h3>
              <p className="price">
                <NumberFormat
                  value={(parseFloat(checkoutData.lineItemsSubtotalPrice.amount) - parseFloat(checkoutData.subtotalPrice)).toFixed(2)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="-€ "
                />
              </p>

            </div>
            <div className="sub-total d-flex justify-content-between">
              <h3 className="title"></h3>
              <p className="price">
                <NumberFormat
                  value={parseFloat(checkoutData.subtotalPrice).toFixed(2)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="€ "
                />
              </p>
            </div>
            <div className="shipping-price d-flex justify-content-between">
              <h3 className="total d-flex align-items-center">
                {locale === "nl" ? "Verzenden" : "Shipping"}
                <RiErrorWarningLine className="ms-2" />
              </h3>
              <p className="content">{locale === "nl" ? "Berekend bij de volgende stap" : "Calculated at the next step"}</p>
            </div>
          </div>
        )} */}
        { showProducts && showCoupon && (
        <div className="discount-panel d-flex py-4 mb-4 px-4 px-sm-0">
          { !isMobile && (
            <input
              type="text"
              className="form-control discount-code px-5 py-3 me-2"
              placeholder={locale === "nl" ? "Heb je een coupon of cadeaubon?" : "Have a coupon or giftcard?"}
              value={discountCode}
              onChange={(e) => { setDiscountCode(e.target.value)}}
              autocomplete="on"
            />
          )}
          {
            isMobile && (
            <input
              type="text"
              className="form-control discount-code px-5 py-3 me-2"
              placeholder={locale === "nl" ? "Coupon" : "Coupon"}
              value={discountCode}
              onChange={(e) => { setDiscountCode(e.target.value)}}
              autocomplete="on"
            />
            )
          }
          <button className="btn blue-btn btn-discount px-5 py-3" onClick={() => {
            localStorage.setItem('discountCode', discountCode);
            generateLineItems();
          }
          }>
            {locale === "nl" ? "apply" : "apply"}
          </button>
        </div>
        )}
        {cartData && !showProducts && (
        <div className="position-relative">
          <Skeleton
            variant="text"
            width="100%"
            height={200}
            className="mb-4"
          />
          <Skeleton
            variant="text"
            width="100%"
            height={80}
            className="mb-4"
          />
          <Skeleton variant="text" height={35} width="100%" />

        </div>

        )}
        {showProducts && showCoupon && (
          <div className="position-relative px-4 px-sm-0">
            <div id="codefailed" ep="1" style={{
              backgroundColor: "#D9D9D9",
              marginBottom: 15,
              padding: 15,
              color: "black",
              fontSzie: 18,
              fontSize: 20,
              display: "none",
            }}>
              <div className="d-flex align-items-center">
                <img className="me-2" src="/img/myCart/warning.svg" alt="discount icon" width={26} height={26} />
                {locale === "nl" ? "Deze code kan niet worden toegepast" : "This code cannot be applied"}
              </div>
            </div>
            <div id="codeok" ep="1" style={{
              marginBottom: 15,
              borderWidth: 3,
              borderStyle: "solid",
              borderColor: "green",
              borderRadius: 5,
              padding: 8,
              color: "black",
              display: "none",
              fontSize: 18,
              maxWidth: 270,
              backgroundColor: "#D9D9D9",
            }}>
                <div className="d-flex align-items-center justify-content-between">
                  <img src="/img/myCart/discount.svg" alt="discount icon" width={26} height={26} />
                  {localStorage.discountCode}
                  <button className="btn btn-remove d-flex align-items-center justify-content-center" onClick={() => {
                      localStorage.removeItem('discountCode');
                      generateLineItems();
                    }
                  }>
                    <img src="/img/myCart/close.svg" alt="remove icon" width={18} height={18} />
                  </button>
                </div>
            </div>
          </div>
        )}
        {showProducts && checkoutData  && checkoutData.discountType != "TOTAL" && (
        <div className="sub-price py-4 px-4 px-sm-0 mb-0">
          <div className="sub-total d-flex justify-content-between">
            <h3 className="title">{locale === "nl" ? "Subtotaal" : "Subtotal"}</h3>
            <p className="price">
              <NumberFormat
                value={checkoutData.subtotalPrice}
                displayType="text"
                thousandSeparator={true}
                prefix="€ "
              />
            </p>
          </div>

          <div className="shipping-price d-flex justify-content-between align-items-center">
            <h3 className="total d-flex align-items-center">
              {locale === "nl" ? "Verzenden" : "Shipping"}
              {/* <RiErrorWarningLine className="ms-2" /> */}
            </h3>
            <p className="content mb-0">{locale === "nl" ? "gratis" : "Free"}</p>
          </div>
        </div>
        )}
        {showProducts && checkoutData &&  checkoutData.discountType == "TOTAL" && (
          <div className="sub-price py-4 px-4 px-sm-0 mb-0">
            <div className="sub-total d-flex justify-content-between">
              <h3 className="title">{locale === "nl" ? "Subtotaal" : "Subtotal"}</h3>
              <p className="price">
                <NumberFormat
                  value={parseFloat(checkoutData.lineItemsSubtotalPrice.amount).toFixed(2)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="€ "
                />
              </p>
            </div>
              <div className="sub-total d-flex justify-content-between">
              {/* <h3 className="title">{ locale === "nl" ? "Kortingscode toegepast: " + localStorage.discountCode : "Discount code applied: " + localStorage.discountCode}</h3> */}
              <h3 className="title">{ locale === "nl" ? "besparingen" : "Savings"}</h3>
              <p className="price">
                <NumberFormat
                  value={(parseFloat(checkoutData.lineItemsSubtotalPrice.amount) - parseFloat(checkoutData.subtotalPrice)).toFixed(2)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="-€ "
                />
              </p>

            </div>
            <div className="sub-total d-flex justify-content-between">
              <h3 className="title"></h3>
              <p className="price">
                <NumberFormat
                  value={parseFloat(checkoutData.subtotalPrice).toFixed(2)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="€ "
                />
              </p>
            </div>
            <div className="shipping-price d-flex justify-content-between">
              <h3 className="total d-flex align-items-center">
                {locale === "nl" ? "Verzenden" : "Shipping"}
                {/* <RiErrorWarningLine className="ms-2" /> */}
              </h3>
              <p className="content mb-0">{locale === "nl" ? "Vrij" : "Free"}</p>
            </div>
          </div>
        )}
        {showProducts && (
        <div className="final-price py-4 px-4 px-sm-0">
          <div className="total-price d-flex justify-content-between">
            <h3 className="title text-capitalize">Total Price</h3>
            <p className="content">
              {
                <NumberFormat
                  value={checkoutData.subtotalPrice}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="€ "
                />
              }
            </p>
          </div>
          {/* <div className="result-panel py-3 px-4 d-flex justify-content-between align-items-center">
            <h3 className="title m-0">To be paid:</h3>
            <p className="content m-0">
              {
                <NumberFormat
                  value={checkoutData.subtotalPrice}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="€ "
                />
              }
            </p>
          </div> */}
        </div>
        )}
      </div>
    </div>

  );
}
