import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { RiCustomerService2Fill, RiChat1Line } from "react-icons/ri";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
var dateFormat = require("dateformat");

export default function OrderDetail({ data, setData }) {
  const { locale } = useRouter();
  return (
    <div className="order-detail-panel">
      <h3 className="title">
      {locale === "nl" ? "Mijn aankopen " : "My Purchases "} <span>{locale === "nl" ? "(Bestelgeschiedenis)" : "(Order History)"}</span>
      </h3>
      <button
        className="btn btn-back d-flex align-items-center mt-4 mb-5 p-0"
        onClick={() => setData()}
      >
        <HiOutlineArrowLeft className="me-3" />
        <span>{locale === "nl" ? "TERUG NAAR BESTELGESCHIEDENIS" : "BACK TO ORDER HISTORY"}</span>
      </button>
      <div className="order-panel p-5 bordered round d-sm-flex mb-4">
        <div className="detail-panel flex-fill">
          <div className="status-panel mb-4">
            <span>{locale === "nl" ? "Bestelstatus" : "Order Status"}</span>
            <p className="mb-3">{locale === "nl" ? "Verzonden" : "Shipped"}</p>
          </div>
          <div className="number-panel mb-4">
            <span>{locale === "nl" ? "Bestellingsnummer:" : "Order number:"}</span>
            <p className="mb-3">{data?.order_number}</p>
          </div>
          <div className="place-panel mb-4">
            <span>{locale === "nl" ? "Bestelling geplaatst op:" : "Order placed on:"}</span>
            <p className="mb-3">
              {dateFormat(data?.created_at, "mmmm d, yyyy")}
            </p>
          </div>
          <div className="track-panel">
            {data?.order_status_url && (
              <Link href={data.order_status_url}>
                <a className="text-decoration-underline p-0">
                {locale === "nl" ? "Track & Trace-URL" : "Track & Trace URL"}
                </a>
              </Link>
            )}
          </div>
        </div>
        {/* <div className="btn-panel">
          <button className="btn btn-reorder text-uppercase blue-btn round-form px-4 py-3">
            reorder
          </button>
        </div>*/}
      </div>
      {data?.billing_address && (
        <div className="other-panel round bordered p-5 mb-4">
          <h3 className="sub-title mb-4">{locale === "nl" ? "Facturatie adres" : "Billing Address"}</h3>
          <p className="mb-3">{data.billing_address.name}</p>
          <p className="mb-3">{data.billing_address.address1}</p>
          <p className="mb-3">
            {data.billing_address.zip + ", " + data.billing_address.city}
          </p>
          <p className="mb-3">{data.billing_address.country}</p>
          <p className="mb-0">{locale === "nl" ? "Telefoonnummer:" : "Telefoonnummer: "}{data.billing_address.phone}</p>
        </div>
      )}
      {data?.payment_details && (
        <div className="other-panel round bordered p-5 mb-4">
          <h3 className="sub-title mb-4">{locale === "nl" ? "Betalingswijze" : "Payment Method"}</h3>
          <p className="m-0">
          {locale === "nl" ? "Betaalmethodes:" : "Payment methods:"} {data.payment_details.credit_card_company}
          </p>
        </div>
      )}
      <div className="product-panel round bordered p-5 pb-2 mb-5">
        <h3 className="sub-title mb-0">{locale === "nl" ? "Producten" : "Products"}</h3>
        {data?.line_items.map((item, index) => (
          <div className="item-panel row m-0 py-4" key={index}>
            <div className="image-panel round-form hover-scale col-md-4 mb-md-0 mb-3 p-0">
              <img
                src={data.lineItems[index].image.src.replace(
                  ".jpg",
                  "_300x.jpg"
                )}
                alt="product-image"
              />
            </div>
            <div className="text-panel col-md-8 d-flex flex-column justify-content-between p-0 ps-md-3">
              <h3 className="product-title mb-3">
              {locale === "nl" ? "" : ""}Brilliant Cut Diamond Engagement Ring
              </h3>
              <div className="detail-panel">
                {item.total_discount_set.shop_money && (
                  <p className="mb-3">
                    -{" "}
                    {item.total_discount_set.shop_money.amount +
                      " " +
                      item.total_discount_set.shop_money.currency_code}{" "}
                    {locale === "nl" ? "korting" : "discount"}
                  </p>
                )}
                {item.variant_title && (
                  <p className="mb-3">- {item.variant_title}</p>
                )}
                {item.quantity && (
                  <p className="mb-3">{locale === "nl" ? "- Hoeveelheid:" : "- Quantity:"} {item.quantity}</p>
                )}
              </div>
              <p className="product-price m-0">
                <NumberFormat
                  value={item.price}
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  prefix="€ "
                />
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="paid-panel round p-5 mb-4">
        <h3 className="sub-title pb-4 mb-0">{locale === "nl" ? "Betaald" : "Paid"}</h3>
        <div className="price-panel py-3">
          <div className="sub-total d-flex justify-content-between align-items-center">
            <span className="mb-3">{locale === "nl" ? "Subtotaal:" : "Subtotal:"}</span>
            <span>
              <NumberFormat
                value={data?.subtotal_price}
                displayType="text"
                decimalScale={2}
                fixedDecimalScale={true}
                thousandSeparator={true}
                prefix="€ "
              />
            </span>
          </div>
          {/*<div className="exclude-vat d-flex justify-content-between align-items-center">
            <span>Excluding VAT:</span>
            <span>
              <NumberFormat
                value={data?.total_tax}
                displayType="text"
                decimalScale={2}
                fixedDecimalScale={true}
                thousandSeparator={true}
                prefix="€ "
              />
            </span>
          </div>*/}
        </div>
        <div className="total-panel pt-3 d-flex align-items-center justify-content-between">
          <span>{locale === "nl" ? "Totaal" : "Total"}</span>
          <span>
            <NumberFormat
              value={data?.total_price}
              displayType="text"
              decimalScale={2}
              fixedDecimalScale={true}
              thousandSeparator={true}
              prefix="€ "
            />
          </span>
        </div>
      </div>
      <div className="round need-help-panel px-5 mb-5">
        <div className="title-panel d-flex justify-content-between align-items-center flex-sm-row flex-column py-5">
          <h3 className="text-uppercase m-0 mb-sm-0 mb-5">{locale === "nl" ? "Hulp nodig?" : "Need help?"}</h3>
          <div className="link-panel d-flex">
            <Link passHref={true} href="/contact">
              <a className="text-uppercase me-4 d-flex align-items-center blue-text">
                <RiCustomerService2Fill className="me-2" />
                {locale === "nl" ? "contact" : "contact"}
              </a>
            </Link>

            <Link passHref={true} href="#">
              <a className="text-uppercase d-flex align-items-center blue-text">
                <RiChat1Line className="me-2" />
                {locale === "nl" ? "chatten" : "chat"}
              </a>
            </Link>
          </div>
        </div>
        <div className="purchase-panel d-flex justify-content-between align-items-center flex-sm-row flex-column py-5">
          <h3 className="text-uppercase m-0 mb-sm-0 mb-5">
          {locale === "nl" ? "Nog niet klaar om online te kopen?" : "Not ready to purchase online?"}
          </h3>
          <button
            className="btn btn-schedule text-uppercase blue-text px-4 py-2"
            data-bs-toggle="modal"
            data-bs-target="#appointment"
          >
            {locale === "nl" ? "Maak een afspraak" : "Schedule an appointment"}
          </button>
        </div>
      </div>
    </div>
  );
}
