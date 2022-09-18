import React, { useState, useRef, useEffect } from "react";
import {
  RiArrowRightLine,
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiPinterestFill,
  RiYoutubeFill,
} from "react-icons/ri";
import { SnackbarProvider, useSnackbar } from "notistack";
import Link from "next/link";
import { useRouter } from "next/router";

const postURL =
  "https://costercatalog.com/api/index.php?request=insertOrUpdateACRoyalcoster";

export default function MailList() {
  const { enqueueSnackbar } = useSnackbar();
  const { locale } = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newsletterForm = document.forms.newsletterForm;
    const formData = new FormData(newsletterForm);
    fetch(postURL, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const variant = "success";
        if (data.result_code) {
          enqueueSnackbar(data.result_message, { variant });
          window.location.href = "/thank-you-contact?option=newsletter";
        }
      });
  };

  return (
    <div className="mail-list-panel py-5" id="newsLetter">
      <div className="r-container row py-md-5">
        <div className="left-panel text-panel col-lg-6 px-lg-0 px-md-5 px-4">
          <h3 className="title text-capitalize col-lg-9">
            {locale === "nl" ? "Schrijf U In Voor Onze Nieuwsbrief" : "Join Our"} <span>{locale === "nl" ? "" : "mailing"}</span> {locale === "nl" ? "" : "list"}
          </h3>
          <p className="pt-sm-5 text-capitalize col-lg-9">
            {locale === "nl" ? "De Fascinerende Wereld Van Diamanten Gepresenteerd Door Royal Coster. Wij houden u op de hoogte van onder andere onze producten, rondleidingen en het belangrijkste nieuws." : "The fascinating world of diamonds presented by Royal Coster. Products, tours and news. We won't spam your inbox."}
          </p>
          <div className="px-0 social-links d-flex justify-content-lg-start justify-content-center col-lg-9 mt-5">
            <Link
              passHref={true}
              href="https://www.facebook.com/RoyalCosterDiamonds"
            >
              <a className="me-4">
                <div>
                  <RiFacebookCircleFill />
                </div>
              </a>
            </Link>
            <Link
              passHref={true}
              href="https://www.instagram.com/costerdiamondsofficial/"
            >
              <a className="me-4">
                <div>
                  <RiInstagramFill />
                </div>
              </a>
            </Link>
            <Link
              passHref={true}
              href="https://nl.linkedin.com/company/royalcosterdiamonds"
            >
              <a className="me-4">
                <div>
                  <RiLinkedinFill />
                </div>
              </a>
            </Link>
            <Link
              passHref={true}
              href="https://nl.pinterest.com/costerdiamonds/"
            >
              <a className="me-4">
                <div>
                  <RiPinterestFill />
                </div>
              </a>
            </Link>
            <Link
              passHref={true}
              href="https://www.youtube.com/c/CosterDiamondsAmsterdam"
            >
              <a className="me-4">
                <div>
                  <RiYoutubeFill />
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="form-panel col-lg-6 pe-lg-0 p-md-5 pt-4 px-4">
          <form onSubmit={handleSubmit} name="newsletterForm">
            <input
              type="text"
              name="name"
              className="form-control round-form p-3 mb-3"
              placeholder={locale === "nl" ? "Uw naam" : "Your Name"}
            />
            <input
              type="email"
              name="email"
              className="form-control round-form p-3 mb-4"
              placeholder={locale === "nl" ? "uwnaam@emailadres.com" : "yourname@emailaddress.com"}
            />
            <button className="btn round-form px-5 py-3 blue-btn d-flex justify-content-between align-items-center m-0 ">
              <span>{locale === "nl" ? "ABONNEREN" : "SUBSCRIBE"}</span>
              <RiArrowRightLine />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
