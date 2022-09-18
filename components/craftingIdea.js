import EnquiryModal from "./enquiryModal";
import React, { useState, useRef, useEffect } from "react";
import renderHTML from "react-render-html";
import { useRouter } from "next/router";
const mainPageUrlEn = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/components?slug=crafting-idea";
const mainPageUrlNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/components?slug=crafting-idea&lang=nl";
export default function CraftingIdea() {
  const [loaded, setLoaded] = useState(false);
  const [componentData, setComponentData] = useState(false);
  const { locale } = useRouter();
  let mainPageUrl;
  if ( locale === "nl" ) {
    mainPageUrl = mainPageUrlNl;
  } else {
    mainPageUrl = mainPageUrlEn;
  }
  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      fetch(mainPageUrl, {
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        setComponentData(data[0].acf)
        $("#hero_idea").css({
          backgroundImage: "url(" + data[0].acf.image.link + ")"
        })
        $("em").css({
          fontStyle: "italic"
        })
      })
    }
  })
  return (
    <div className="crafting-idea-section">
      <div className="bg-panel d-sm-none d-block">
        <div className="pink-box" />
        <div className="blue-box" />
      </div>
      {componentData && (
      <div className="r-container" >
        <div className="row crafting_main-panel mx-0 justify-content-end" id="hero_idea">
          <div className="col-lg-6 col-md-8 col-sm-10 col-12 text-sm-start py-sm-0 py-5 px-0">
            <h2 className="title text-capitalize blue-text m-0 mb-5">
              {renderHTML(componentData.title)}
            </h2>
              {renderHTML(componentData.text)}
            <div className="btn-panel mt-5 d-sm-block d-flex flex-column align-items-center">
              <button className="btn blue-btn px-5 py-3 text-uppercase round-form me-sm-4 me-0 mb-sm-0 mb-4" data-bs-toggle="modal"
                data-bs-target="#enquiryModal"
              >
                {locale === "nl" ? "Stuur een aanvraag" : "Send an enquiry"}
              </button>
              <button className="btn pink-btn px-5 py-3 text-uppercase round-form" data-bs-toggle="modal"
                data-bs-target="#appointment">
                {locale === "nl" ? "Maak een afspraak" : "Book Appointment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
      <EnquiryModal />
    </div>
  );
}
