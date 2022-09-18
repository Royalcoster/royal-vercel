import { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import SimilarProducts from "/components/similarProducts";
export default function ProductDetail({
  informations,
  productID,
  productDescription,
  productType,
  reference
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
        setInfoData([...infoData]);
      });
      fetch("https://wp.royalcoster.com/wp-json/wp/v2/collections?slug=why-to-buy", {
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
    <div className="detail-section r-container pb-5 mb-5">


      <div className="pt-5 pb-md-5 text-panel">

        <nav className="info-panel">
          <div className="nav nav-tabs col-md-8 col-xs-12" id="nav-tab" role="tablist">
            <button
              className="nav-link active text-uppercase px-0 me-5"
              id="nav-information-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-information"
              type="button"
              role="tab"
              aria-controls="nav-information"
              aria-selected="true"
            >
              Product Information
            </button>

            <div className="informations row m-0 col-md-8 col-xs-12">
              {infoData.length > 0 &&
                infoData.map((information, index) => {
                  return (
                    <div
                      className={
                        "p-0 px-2 pt-3 " +
                        (infoData.length == 1
                          ? "col-md-12"
                          : infoData.length > 1
                          ? "col-md-" + (12 / infoData.length)
                          : "col-lg-4 col-md-6")
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
                })}

            </div>

              {infoData.length == 0 && (
                  <div className="informations row m-0 col-md-12" style={{minHeight:300,height:300}}>
                      {aItemD && (
                        <div style={{
                          marginTop:20,
                          fontSize: 25,
                          paddingRight: 15
                        }}>
                        {renderHTML(aItemD)}
                        </div>
                      )}
                  </div>
              )}


            </div>


        <div className="nav nav-tabs col-md-4 col-xs-12" id="nav-tab" role="tablist">
              <button
                className="nav-link active text-uppercase px-0 me-5"
                id="nav-information-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-information1"
                type="button"
                role="tab"
                aria-controls="nav-information1"
                aria-selected="false"
              >
                Why to buy?
              </button>
              <div className="informations row m-0 col-md-4 col-xs-12">
                {whyToBuy && (
                  <ul className="description" style={{
                    marginTop: 20,
                    fontSize: 25
                  }}>
                    {whyToBuy.map((item, index) => (
                      <li  key={index}>
                        {renderHTML(item.text)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>


        </nav>





    </div>
      <nav className="info-panel">
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active text-uppercase px-0 me-5"
            id="nav-information-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-information"
            type="button"
            role="tab"
            aria-controls="nav-information"
            aria-selected="true"
          >
            Similar products
          </button>

        </div>
      </nav>
      {handle && (
        <SimilarProducts handle={handle} />
      )}
    </div>

  );
}
