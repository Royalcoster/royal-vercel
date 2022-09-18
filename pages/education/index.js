import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import Instagram from "../../components/instagram";
import Skeleton from "@mui/material/Skeleton";
import renderHTML from "react-render-html";
import { useRouter } from "next/router";

const educationData = [
  { image: '/img/education/about (1).png', title: "Loose Diamonds" },
  { image: '/img/education/about (2).png', title: "Engagement Rings" },
  { image: '/img/education/about (3).png', title: "Natural Gemstones" },
  { image: '/img/education/about (4).png', title: "Wedding Rings" },
  { image: '/img/education/about (5).png', title: "Fine Jewelry" },
  { image: '/img/education/about (6).png', title: "Watches" },
]

const blogURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/blogs?orderby=id&per_page=6&categories=";
const categoryURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/categories?search=craftsmanship";
const categoryURLNl = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/categories?search=Ambacht";
let localBlog;

export default function Education({ blogData }) {
  const [blog, setBlog] = useState(blogData);
  const { locale } = useRouter();
  useEffect(() => {
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:3002600,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    if (false) {
    } else {
      fetch(locale === "nl" ? categoryURLNl : categoryURL, {
        method: "get"
      }).then(res => res.json()) 
        .then(category => {
          fetch( locale === "nl" ? blogURL + category[0].id + "&lang=nl" : blogURL + category[0].id, {
            method: "get"
          }).then(res => res.json())
            .then(data => {
              localBlog = data;
              setBlog(localBlog)
            })
        })
    }
  }, [])

  return (
    <div className="education_page">
      <Head>
        <title>Education | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title col-lg-4 col-md-6 col-sm-8 text-capitalize mb-5">
            {locale === "nl" ? "Wordt een sieraden" : "Education"} <span>{locale === "nl" ? "expert" : "Center"}</span>
          </h1>
        </div>
      </div>
      {/* End hero section */}

      {/* Start guide section */}
      <div className="guide-section">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">{locale === "nl" ? "laat je door ons leiden" : "let us guide you through"}</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              {locale === "nl" ? "Om de perfecte diamant voor uw verlovingsringen te krijgen, zijn er verschillende factoren waarmee u rekening moet houden. Je hebt gelezen over de 4C's van diamanteducatie, maar laat ons je door onze 7C's leiden om je te helpen die ene te vinden." : "In order to get the perfect diamond for your engagement rings there are several factors to consider. You’ve read about the 4Cs of diamond education but let us guide you through our 7Cs to help you find the one."}</p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start Know About Section */}
      <div className="know-about-section r-container pt-5">
        <h3 className="py-5 title text-center"><span>{locale === "nl" ? "Weten" : "Know"}</span> {locale === "nl" ? "Over" : "About"}</h3>
        {
          blog ?
            <div className="row">
              {
              blog.length ?
                blog.map((item, index) => {
                  return (
                    <div className="col-md-4 col-sm-6 education-item mb-5" key={index}>
                      <div className="image-panel hover-scale round">
                          <a href={"/blog/" + item.slug}><img src={item.acf.featured_image.sizes.large} alt="education-image" /></a>
                      </div>
                        <a href={"/blog/" + item.slug}><h3 className="item-title blue-text my-4">{renderHTML(item.title.rendered)}</h3></a>
                      <Link passHref={true} href={"/blog/" + item.slug}>
                        <a className="text-uppercase btn-read-more">{locale === "nl" ? "Lees verder" : "Read More"}</a>
                      </Link>
                    </div>
                  )
                })
                :<h3 className="empty-text text-center"></h3>
              }
            </div>
            : <div className="row">
              <div className="col-md-4 col-sm-6 mb-5 round">
                <Skeleton variant="rect" height={250} width="100%" />
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={20} width={100} className="mte" />
              </div>
              <div className="col-md-4 col-sm-6 mb-5 round">
                <Skeleton variant="rect" height={250} width="100%" />
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={20} width={100} className="mte" />
              </div>
              <div className="col-md-4 col-sm-6 mb-5 round d-none d-sm-block">
                <Skeleton variant="rect" height={250} width="100%" />
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={20} width={100} className="mte" />
              </div>
              <div className="col-md-4 col-sm-6 mb-5 round d-none d-sm-block">
                <Skeleton variant="rect" height={250} width="100%" />
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={20} width={100} className="mte" />
              </div>
              <div className="col-md-4 col-sm-6 mb-5 round d-none d-md-block">
                <Skeleton variant="rect" height={250} width="100%" />
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={20} width={100} className="mte" />
              </div>
              <div className="col-md-4 col-sm-6 mb-5 round d-none d-md-block">
                <Skeleton variant="rect" height={250} width="100%" />
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={20} width={100} className="mte" />
              </div>
            </div>
        }
      </div>
      {/* Endr Know About Section */}

      {/* Start Instagram section */}
      <Instagram />
      {/* End Instagram section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}

      {/* Start Footer */}
      <Footer />
        <Instagram />
      {/* End Footer */}

    </div >
  );
}
