import Link from "next/link";
import router, { useRouter } from "next/router";

export default function Help() {
  const { locale } = useRouter();
  return (
    <div className="help">
      <div className="r-container">
        <div className="row mx-0 justify-content-end">
          {/* <div className="col-6 px-0 img-panel"></div> */}
          <div className="col-lg-6 col-md-8 col-sm-10 col-12 px-0">
            <div className="text-panel">
              <h2 className="title text-capitalize">
                {locale === "nl" ? "Laat ons" : "Let us"} <span>{locale === "nl" ? "je helpen!" : "help you!"}</span>
              </h2>
              <p>{locale === "nl" ? "Laat ons u op de juiste weg helpen." : "Help you to get started."}</p>
            </div>
            <div className="service_panel round p-5">
              <h3 className="title mb-4">{locale === "nl" ? "Stel uw eigen ring samen!" : "Ring Recommender"}</h3>
              <p className="mb-5 pb-4">
                {locale === "nl" ? "Vertel ons uw budget en voorkeuren en wij vinden de juiste diamant en zetting." : "Tell us your budget and preferences and we’ll find you the right diamond and setting."}
              </p>
              <Link  passHref={true} href="/custom-jewelry">
                <a className="design-service pink-btn round-form text-uppercase py-4 px-5">
                  {locale === "nl" ? "Bekijk de mogelijkheden" : "Custom Design Services"}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
