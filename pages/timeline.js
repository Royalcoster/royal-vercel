import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import AppointmentModal from "../components/appointmentModal";
import Instagram from "../components/instagram";


export default function Timeline() {
  const [docHeight,setDocHeight] = useState();

  useEffect(() => {

    setDocHeight($(window).height() - 10);
  }, []);
  return (
    <div className="warranty_page">
      <Head>
        <title>Timeline | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      {docHeight && (
        <div>
            <iframe src="/html/timeline.html"  height={docHeight} style={{width: "100%",overflow:"hiddent"}}></iframe>
        </div>
      )}
      {/* Start guide section */}
      <div className="guide-section">
        <div className="row r-container py-5">

        </div>
      </div>




      {/* Start Footer */}
      <Footer />
      {/* End Footer */}

      <AppointmentModal />

    </div >
  );
}
