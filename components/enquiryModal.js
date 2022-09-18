import { useDebugValue, useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Link from "next/link"
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import "react-calendar/dist/Calendar.css";

const contactMethods = [
  { title: "Google Meet" },
  { title: "Zoom" },
  { title: "Skype" },
  { title: "Phonecall " },
];

export default function EnquiryModal() {
  const [contactMethod, setContactMethod] = useState(0);
  const [language, setLanguage] = useState();
  const [safeMode, setSafeMode] = useState();
  const [errorPhone, setErrorPhone] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [contactInfo, setContactInfo] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();
  const { locale } = useRouter();

  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    getCountries().forEach((country) => {
      if (
        !filteredCountries.some(
          (item) =>
            getCountryCallingCode(item) === getCountryCallingCode(country)
        )
      ) {
        filteredCountries.push(country);
        setFilteredCountries(filteredCountries);
      }
    });
  }, []);

  const sendRequest = () => {
    router.push("/thank-you-contact");
  };

  useEffect(() => {
    setContactInfo(contactMethods[contactMethod]);
  }, [contactMethod]);
  useEffect(() => {
    $.getScript("/jqueryui.js", function() {
      $.getScript("/jquery.validate.js", function() {
          var el = $("#visitDate");
          $(".error").css({
            color: "red"
          })
          el.datepicker({
                dateFormat: "dd-mm-yy",
                onSelect: function(dateText) {
                  el.attr("realdate", moment(el.datepicker("getDate")).format("YYYY-MM-DD HH:mm:ss"))
               }
            });
            el.datepicker("setDate", moment(new Date()).format("DD-MM-YYYY"));
            $("#sendMail").show()
            $("#sendMail").unbind("click");
            $("#sendMail").bind("click", function() {
              $('#contactForm').submit();
            });
          jQuery.validator.addMethod("phone", function(phone_number, element) {
              phone_number = phone_number.replace(/\s+/g, "");
              return this.optional(element) || phone_number.length > 9 &&
              phone_number.match(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/);
          }, "Please specify a valid phone number");

            $("#contactFormEM").validate({
              rules: {
                firstNameEM: {
                    required: true
                },
                lastNameEM: {
                    required: true
                },
                emailEM: {
                  required: true,
                  email: true
                },
                phoneNumberEM: {
                  phone: true,
                  required: true
                },
                moreInformationEM: {
                  required: true
                },
                preferredLanguageEM: {
                  required: true
                }
              },
              submitHandler: function(form) {
                $("#confirm").text("SENDING REQUEST");
                $("#confirm").prop("disabled", true);
                if ($("#contactMethodEM").length > 0) {
                  $("#cMethEM").val($("#contactMethodEM").find("option:selected").text());
                }
                $("#aUrlEM").val(window.location.href);
                $.ajax({
                  url: "https://costercatalog.com/api/index.php?request=enqueryRequest" + "&" + $("#contactFormEM").serialize(),
                  type: "GET",
                  dataType: "json",
                  success:function(res) {
                      var ff = $("#contactFormEM").serialize().split("&");
                      var obj = {};
                      $.each(ff, function() {
                        obj[this.split("=")[0]] = decodeURIComponent(this.split("=")[1]);
                      })
                      console.log(obj);
                      var dll = {
                          event: "send_enquiry_custom_jewerly_bottom",
                          formId: "025",
                          response: [
                              {name: "first_name", value: obj.firstNameEM},
                              {name: "your_email", value: obj.emailEM},
                              {name: "your_phone_number", value: obj.phoneNumberEM},
                              {name: "your_message", value: obj.moreInformationEM.replace(/(?:\r\n|\r|\n)/g, '<br>')},
                              {name: "method_of_contact", value: obj.cMethEM.replace(/\s/g, '_')}
                          ],
                      }
                      dataLayer.push(dll);
                      window.location.href="/thank-you-contact?option=enquiry"
                  }
                })

              }
          })
        })
        })
    }, [firstName])

  return (
    <div
      className="modal fade"
      id="enquiryModal"
      tabIndex="-1"
      s
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable r-container"
        id="enquiryModalDialog"
      >
        <div className="modal-content px-3 py-4 round">
          <div className="modal-header  py-3">
            <h3 className="modal-title">{locale === "nl" ? "Deel uw idee" : "Share Your Idea"}</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body px-3 py-5">
            <div className="row m-0 align-items-start">
              <h3 className="title m-0 mb-4 text-sm-start text-center mt-sm-0 mt-5">
              {locale === "nl" ? "Je contactgegevens" : "Your Contact Details"}
              </h3>
              <form id="contactFormEM" className="form-panel row m-0">
              <input type="hidden" name="aUrlEM" id="aUrlEM" />
              <input type="hidden" name="cMethEM" id="cMethEM" />
                <label
                  htmlFor="contactMethodEM"
                  className="col-sm-6 p-0 pe-sm-3 mt-5"
                >
                  {locale === "nl" ? "Contact mogelijkheden*" : "Method of Contact*"}
                  <select
                    className="form-select blue-text ps-4 mt-3 round-form py-3"
                    aria-label="Default select example"
                    id="contactMethodEM" name="contactMethodEM"
                    value={contactMethod}
                    onChange={(event) => {
                      $("#cMethEM").val($("#contactMethodEM").find("option:selected").text());
                    }}
                  >
                    {contactMethods.map((item, index) => {
                      return (
                        <option value={index} key={index}>
                          {item.title}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label
                  htmlFor="preferredLanguage"
                  className="col-sm-6 mt-5"
                >
                  {locale === "nl" ? "Voorkeurstaal*" : "Preferred Language*"}
                  <input
                    type="text"
                    id="preferredLanguage"
                    name="preferredLanguage"
                    className="form-control px-4 mt-3 py-3 round-form"
                    placeholder={locale === "nl" ? "Voorkeurstaal" : "Preferred Language"}
                    value={language}

                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </label>
                <label htmlFor="firstName" className="col-sm-6 mt-5">
                {locale === "nl" ? "Voornaam*" : "First Name*"}
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control px-4 mt-3 py-3 round-form"
                    placeholder={locale === "nl" ? "Voornaam" : "First Name"}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </label>
                <label htmlFor="lastName" className="col-sm-6 mt-5">
                  {locale === "nl" ? "Achternaam*" : "Last Name*"}
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control px-4 py-3 mt-3 round-form"
                    placeholder={locale === "nl" ? "Achternaam" : "Last Name"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </label>
                <label htmlFor="email" className="col-sm-6 mt-5">
                  Email*
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control px-4 py-3 mt-3 round-form"
                    placeholder={locale === "nl" ? "E-mailadres" : "Email Address"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label htmlFor="phoneNumber" className="col-sm-6 mt-5">
                  {locale === "nl" ? "Telefoonnummer*" : "Telephone*"}
                    <input
                      className="form-control px-4 py-3 me-2 round-form phone-form"
                      placeholder={locale === "nl" ? "Telefoonnummer" : "Phone number"}
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </label>
                <label htmlFor="moreInformation" className="mt-5">
                  {locale === "nl" ? "Meer informatie*" : "More Information*"}
                  <textarea
                    id="moreInformation"
                    name="moreInformation"
                    rows="4"
                    className="form-control px-4 py-3 mt-3 round-form"
                    placeholder={locale === "nl" ? "Meer informatie" : "More Information"}
                    style={{ resize: "none" }}
                  />
                </label>
                <div className="col-12 py-5 safe-panel form-check">
                  <h3 className="m-0 mb-3">{locale === "nl" ? "Uw privacy beschermen" : "Safeguarding Your Privacy"}</h3>
                  <div className="d-flex">
                    <input
                      className="form-check-input me-3 m-0"
                      type="checkbox"
                      value={safeMode}
                      onChange={(e) => setSafeMode(e.target.checked)}
                      id="safeMode"
                      name="safeMode"
                    />
                    <label className="form-check-label" htmlFor="safeMode">
                      {locale === "nl" ? "Door dit vakje aan te vinken, gaat u akkoord met het ontvangen van nieuwsbrieven en marketing-e-mails van Royal Coster Diamonds. Lees voor meer informatie ons privacybeleid en onze algemene voorwaarden." : "By ticking this box you accept to receive newsletters and marketing emails from Royal Coster Diamonds. For further information please read our privacy policy and terms and conditions."}
                    </label>
                  </div>
                </div>
                <button type="submit" id="confirm"
                  className="btn col-12 pink-btn py-3 btn-request round-form"
                >
                  {locale === "nl" ? "Aanvraag versturen" : "SEND REQUEST"}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
