import { useDebugValue, useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Link from "next/link"
import Head from "next/head";;
import {
  RiArrowRightLine,
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiPinterestFill,
  RiYoutubeFill,
} from "react-icons/ri";
import { SnackbarProvider, useSnackbar } from "notistack";
import Header from "./header.js";
import MailList from "./mailList.js";

export default function NewsLetterModal() {
    const { enqueueSnackbar } = useSnackbar();
  const [fullName, setName] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();
  const postURL =
    "https://costercatalog.com/api/index.php?request=insertOrUpdateACRoyalcoster";

  const sendRequest = () => {
    window.location.href =("/thank-you-contact");
  };


useEffect(() => {
  try {
      $("#subscribe").unbind("click");
      $("#subscribe").bind("click", function() {

        $.ajax({
          url: "https://costercatalog.com/api/index.php?request=newsletterMail" + "&email=" + $("#email1").val() + "&name=" + $("#name1").val() + "&aUrl=" + window.location.href,
          type: "GET",
          dataType: "json",
          success:function(res) {
            dataLayer.push({
              event: "newsletter_footer",
              formId: "013",
              response: [
                {name: "your_name", value: $("#name1").val()},
                {name: "your_email", value: $("#email1").val()},
              ],
              })
            window.location.href="/thank-you-contact?option=newsletter"
          }
        })
      })
    } catch(err) {
      //window.location.reload();
    }
})
  return (

    <div
      className="modal"
      id="newsLetterModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable r-container"
        id="newsLetterModalDialog"
      >
      <div className="modal-content" style={{borderRadius:"15px"}}>
        <div className="schedule" style={{zIndex:200000,height:"auto",minWidth:"100%",display:"flex",justifyContent:"center",backgroundColor: "white",borderRadius:"10px"}} >


          <div className="mail-list-panel py-5" id="newsLetter" >
            <div className="r-container row py-md-5">
              <div className="left-panel text-panel col-lg-6 px-lg-0 px-md-5 px-4">
                <h3 className="title text-capitalize col-lg-9">
                  Join Our <span>mailing</span> list
                </h3>
                <p className="pt-sm-5 text-capitalize col-lg-9">
                  The fascinating world of diamonds presented by Royal Coster.
                  Products, tours and news. We won't spam your inbox.
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
                <form  name="newsletterForm1" id="nsf">
                  <input
                    type="text"
                    id="name1"
                    name="name1"
                    className="form-control round-form p-3 mb-3"
                    placeholder="Your Name"
                  />
                  <input
                    type="email"
                    name="email1"
                    id="email1"
                    className="form-control round-form p-3 mb-4"
                    placeholder="yourname@emailaddress.com "
                  />

                </form>
                <button id="subscribe" className="btn round-form px-5 py-3 blue-btn d-flex justify-content-between align-items-center m-0 ">
                  <span>SUBSCRIBE</span>
                  <RiArrowRightLine />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  );
}
