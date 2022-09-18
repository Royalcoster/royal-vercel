import { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import SimilarProducts from "/components/similarProducts";
import styles from './productDetails.module.css'
export default function WatchDetail({
  informations,
  productID,
  productDescription,
  productType,
  reference,
  nosimilar
}) {
  const [infoData, setInfoData] = useState([]);
  const [handle, setHandle] = useState();
  const [whyToBuy, setWhyToBuy] = useState();
  const [aItemD, setaItemD] = useState();
  let rsns = [];
  useEffect(() => {
    setHandle(window.location.href.split("/")[window.location.href.split("/").length - 2])
    setTimeout(function() {
      if ($(".description").find("[additionaldescription]").length > 0) {

        setaItemD($(".description").find("[additionaldescription]").html());
      }
    }, 2000);
    informations &&
      informations.map((information, index) => {
        let middleArr = [];
        for (const key in information) {
          if (Object.hasOwnProperty.call(information, key)) {
            const element = information[key];
            middleArr.push({ title: key, value: element });
          }
        }
        infoData.push(middleArr);
        setInfoData([]);
      });
      fetch(process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/collections?slug=why-to-buy", {
        method: "get",

      })
        .then((res) => res.json())
        .then((data) => {
          var urls = window.location.href.substring(window.location.href.indexOf("//") + 2).split("/");
          var why = data[0].acf.url_parts;
          var whyproduct = data[0].acf.products;
          if (whyproduct) {
            $.each(whyproduct, function() {
                if (urls[4] == this.id) {
                  rsns = this.why_to_buy;
                }
            })
            if (rsns.length > 0) {
              setWhyToBuy(rsns);
            }
          }
          if (rsns.length == 0) {
            $.each(why, function() {
              if (urls[3] == this.id) {
                rsns = this.reasons;
              }
            })
            if (rsns.length > 0) {
              setWhyToBuy(rsns);
            }
          }
          if (rsns.length == 0) {
            $.each(why, function() {
              if (urls[2] == this.id) {
                rsns = this.reasons;
              }
            })
            if (rsns.length > 0) {
              setWhyToBuy(rsns);
            }
          }
          if (rsns.length == 0) {
            setWhyToBuy(data[0].acf.general);
          }
      });
  }, []);

  return (

    <div className="detail-section r-container pb-5 mb-5" id="product-details">

      <div className="pt-5 pb-md-5 text-panel">
      <div className="row py-5">
        <nav className="info-panel">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button t="1"
              className="nav-link active px-0 me-5"
              id="nav-details-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-details"
              type="button"
              role="tab"
              aria-controls="nav-details"
              aria-selected="true"
            >
              Description
            </button>
            <button t="1"
              className="nav-link px-0 me-5"
              id="nav-details-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-desc"
              type="button"
              role="tab"
              aria-controls="nav-desc"
              aria-selected="true"
            >
              Specifications
            </button>
            {/* <button
              className="nav-link px-0 me-5"
              id="nav-information-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-information"
              type="button"
              role="tab"
              aria-controls="nav-information"
              aria-selected="false"
            >
              Why buy this?
            </button> */}
          </div>
          <div className="tab-content col-md-8 col-xs-8" style={{display:"inline"}} id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-details"
              role="tabpanel"
              aria-labelledby="nav-details-tab"
            >

              <div className="informations row m-0">
                {infoData.length > 0 &&
                  infoData.map((information, index) => {
                    return (
                      <div
                        className={
                          "p-2 pt-md-5 pe-md-5 ps-0 " +
                          (infoData.length == 1
                            ? ""
                            : infoData.length == 2
                            ? ""
                            : "")
                        }
                        key={index}
                      >
                        {information.length > 0 &&
                          information.map((info, id) => {
                            return (
                              <div
                                key={id}
                                className={
                                  "d-flex align-items-center px-4 py-3 justify-content-between info-title-panel " +
                                  (id % 2 == 0 && "grey-mode")
                                }
                              >
                                <p className="text-uppercase information-name m-0">
                                  {info.title}
                                </p>
                                <p className="text-uppercase m-0">{info.value}</p>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })
                }
                {infoData.length == 0 && (
                  <div className={styles.informations}>
                      {aItemD && (
                        <p style={{
                          marginTop:20,
                          paddingRight: 15
                        }}>
                        {renderHTML(aItemD)}
                        </p>
                      )}
                  </div>
                )}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-desc"
              role="tabpanel"
              aria-labelledby="nav-desc-tab"
            >
              <div className="informations row m-0">
                <p className="description p-2 pe-md-5 pt-md-5 ps-0 ">
                  {productDescription && productDescription.length > 0 &&
                    (renderHTML(productDescription.replace("geelgoud", "yellow gold")))
                  }
                </p>
              </div>
            </div>
            {/* <div
              className="tab-pane fade"
              id="nav-information"
              role="tabpanel"
              aria-labelledby="nav-information-tab"
            >
              <div className="informations row mt-5">
              {whyToBuy && (
                  <ul className={styles.greencheck} >
                    {whyToBuy.map((item, index) => (
                      <li   key={index}>
                        {renderHTML(item.text)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div> */}
          </div>
        </nav>

      </div>
      <div className="row py-5">
        <h3 t="1" className="text-center">Combine with these items</h3>
        <div>
          {handle && !nosimilar && (
            <SimilarProducts handle={handle} />
          )}
        </div>
      </div>
    </div>
  </div>
  );
}
