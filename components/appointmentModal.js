import { useDebugValue, useEffect, useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { RiAddLine } from "react-icons/ri";
import router, { useRouter } from "next/router";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { RiArrowRightSLine } from "react-icons/ri";
import en from "react-phone-number-input/locale/en.json";
var dateFormat = require("dateformat");

const optionsEn = [
  "I’m interested in purchasing a diamond jewel. ",
  "I’d like to know more about engagement rings.",
  "I’m interested in a diamond tour.",
  "I’d like to have my diamond jewelry examined/ cleaned.",
  "Something else.",
];

const optionsNl = [
  "Ik ben geïnteresseerd in het aanschaffen van een sieraad",
  "Ik wil graag meer weten over verlovingsringen.",
  "Ik heb interesse in een diamanttour",
  "Ik wil mijn diamanten juwelen laten bekijken/reinigen.",
  "Iets anders.",
];

const times = [
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
];

const languages = [{ language: "English" }, { language: "Dutch" }];

const contactMethods = [
  { title: "Google Meet" },
  { title: "Zoom" },
  { title: "Skype" },
  { title: "Phonecall " },
];

const toggleDatePicker = (e) => {
  console.log("toggle!");
  e.target.closest("#timeDate").classList.toggle("visible");
};

export default function AppointmentModal() {
  const [contactMethod, setContactMethod] = useState(0);
  const [language, setLanguage] = useState();
  const [safeMode, setSafeMode] = useState();
  const [country, setCountry] = useState("NP");
  const [visit, setVisit] = useState(false);
  const [errorPhone, setErrorPhone] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [countryNumberPrefix, setCountryNumberPrefix] = useState();
  const [preDate, setPreDate] = useState(new Date());
  const [disDate, setDisDate] = useState();
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(true);
  const [step3, setStep3] = useState(true);
  const [step4, setStep4] = useState(true);
  const [location, setLocation] = useState();
  const [service, setService] = useState([]);
  const [time, setTime] = useState();
  const [contactInfo, setContactInfo] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { locale } = useRouter();

  let options = {};
  if (locale === "nl") {
    options = optionsNl
  } else {
    options = optionsEn
  }

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

  const CountrySelect = ({ value, onChange, ...rest }) => (
    <div className="phoneNumber-prefix p-0 pe-2">
      <select
        {...rest}
        value={value}
        onChange={(event) => {
          console.log(event.target);
          setCountryNumberPrefix(
            getCountryCallingCode(event.target.value || undefined)
          );
          onChange(event.target.value || undefined);
        }}
      >
        {filteredCountries &&
          filteredCountries.map((country) => (
            <option key={country} value={country}>
              {getCountryCallingCode(country)}
            </option>
          ))}
      </select>
      <RiAddLine className="symbol" />
    </div>
  );

  CountrySelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  useEffect(() => {
    if (preDate) {
      console.log(preDate);
      setDisDate(dateFormat(preDate, "dddd  d,  mmmm  yyyy"));
      if (mounted) {
        document.querySelector("#timeDate").classList.remove("visible");
      }
      setMounted(true);
    }
  }, [preDate]);

  const handleTime = (e) => {
    setTime(e.target.innerText);
    $("#visitTime").val(e.target.innerText);
    document.querySelectorAll(".time-item").forEach((item) => {
      if (item.classList.contains("active")) item.classList.remove("active");
    });
    if (!e.target.closest(".time-item").classList.contains("active"))
      e.target.closest(".time-item").classList.add("active");
    if (step4) setStep4(false);
    document.querySelector("#timeDate").classList.remove("show", "active");
    document.querySelector("#contactDetails").classList.add("show", "active");
    document.querySelector("#timeDate-tab").classList.remove("active");
    document.querySelector("#contactDetails-tab").classList.add("active");
  };

  const checkingLocation = (e) => {
    e.preventDefault();
    setStep2(false);
    setLocation(e.target.innerText);
    document.querySelector("#location-tab").classList.remove("active");
    document.querySelector("#service-tab").classList.add("active");
    document.querySelector("#location").classList.remove("show", "active");
    document.querySelector("#service").classList.add("show", "active");
  };

  const checkingService = (e) => {
    const value = e.target.innerText;
    $("#requestedService").val(e.target.innerText);
    document.querySelectorAll(".option-item").forEach((item) => {
      if (item.classList.contains("active")) item.classList.remove("active");
    });
    if (!e.target.closest(".option-item").classList.contains("active"))
      e.target.closest(".option-item").classList.toggle("active");
    if (step3) setStep3(false);
    if (!service.find((item) => item == value)) {
      setService([...service, value]);
    } else {
      service.splice(service.indexOf(value), 1);
      setService([...service]);
    }
    document.querySelector("#service").classList.remove("show", "active");
    document.querySelector("#timeDate").classList.add("show", "active");
    document.querySelector("#service-tab").classList.remove("active");
    document.querySelector("#timeDate-tab").classList.add("active");
  };

  const sendRequest = () => {
    e.preventDefault();
    alert(time);
//      window.location.href =("/thank-you-contact?option=consultation");
  };

  useEffect(() => {
    setContactInfo(contactMethods[contactMethod]);
  }, [contactMethod]);
  useEffect(() => {

    $.getScript("/jqueryui.js", function() {
      $.getScript("/jquery.validate.js", function() {

             jQuery.validator.addMethod("phone", function(phone_number, element) {
                 phone_number = phone_number.replace(/\s+/g, "");
                 return this.optional(element) || phone_number.length > 9 &&
                 phone_number.match(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/);
             }, "Please specify a valid phone number");

              jQuery.validator.addMethod("ischecked", function(smode, element) {
                return smode[0].checked
              }, "This is mandatory to be checked.");
               $("#appointmentForm").validate({
                 rules: {
                   firstName: {
                       required: true
                   },
                   lastName: {
                       required: true
                   },
                   email: {
                     required: true,
                     email: true
                   },
                   phoneNumber: {
                     phone: true,
                     required: true
                   },
                   moreInformation: {
                     required: true
                   },
                   preferredLanguage: {
                     required: true
                   }
                 },
                 submitHandler: function(form) {
                     if ($("#contactMethod").length > 0) {
                       $("#cMeth").val($("#contactMethod").find("option:selected").text());
                     }
                     $("#sap").text("SENDING REQUEST");
                     $("#sap").prop("disabled", true);
                     $("#aUrl").val(window.location.href);
                     $.ajax({
                       url: "https://costercatalog.com/api/index.php?request=appointmentRequest" + "&" + $("#appointmentForm").serialize(),
                       type: "GET",
                       dataType: "json",
                       success:function(res) {

                         console.log($("#appointmentForm").serialize())

                         if ($("#visittype").val() == "visit") {
                             var rsp = [
                              {name: "first_name", value: $("#firstName").val()},
                              {name: "last_name", value: $("#lastName").val()},
                              {name: "country", value: $("#country1").val()},
                              {name: "your_email", value: $("#email").val()},
                              {name: "your_phone_number", value: $("#phoneNumber").val()},
                              {name: "date", value: $("#visitDate").val()},
                              {name: "time", value: $("#visitTime").val()},
                              {name: "service_type", value: $("#requestedService").val()},
                              {name: "your_message", value: $("#moreInformation").val().replace(/(?:\r\n|\r|\n)/g, '<br>')},

                             ];

                             var dll = {
                              event: $("#appointmentForm").find("#visit").val(),
                               formId:  $("#appointmentForm").find("#idvisit").val(),
                               response: rsp,


                             }
                           } else {
                             var rsp = [
                              {name: "first_name", value: $("#firstName").val()},
                              {name: "last_name", value: $("#lastName").val()},
                              {name: "country", value: $("#country1").val()},
                              {name: "your_email", value: $("#email").val()},
                              {name: "your_phone_number", value: $("#phoneNumber").val()},
                              {name: "date", value: $("#visitDate").val()},
                                {name: "time", value: $("#visitTime").val()},
                              {name: "service_type", value: $("#requestedService").val()},
                              {name: "your_message", value: $("#moreInformation").val().replace(/(?:\r\n|\r|\n)/g, '<br>')},
                              {name: "method_of_contact", value: $("#contactMethod").val()}
                             ];

                             var dll = {
                               event: $("#appointmentForm").find("#online").val(),
                               formId: $("#appointmentForm").find("#idonline").val(),
                               response: rsp,

                             }
                           }
                          console.log(dll)
                         dataLayer.push(dll);
                        router.push("/thank-you-contact?option=consultation");
                       }
                   })

                 }
             })
         })
       })
  })



  return (
    <div
      className="modal fade"
      id="appointment"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable r-container"
        id="appointmentModal"
      >
        <div className="modal-content px-3 py-4 round">
          <div className="modal-header  py-3">
            <h3 className="modal-title">{locale === "nl" ? "Plan een afpsraak in" : "Request an Appointment"}</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body px-3 py-5">
            <div className="row m-0 align-items-start">
              <div
                className="nav flex-column nav-pills col-sm-3 col-12"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className="nav-link active mb-4 text-uppercase"
                  id="location-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#location"
                  type="button"
                  role="tab"
                  aria-controls="location"
                  aria-selected="true"
                  disabled={step1}
                >
                  {locale === "nl" ? "Plaats" : "Location"}
                </button>
                <button
                  className="nav-link mb-4 text-uppercase"
                  id="service-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#service"
                  type="button"
                  role="tab"
                  aria-controls="service"
                  aria-selected="false"
                  disabled={step2}
                >
                  {locale === "nl" ? "Service" : "Service"}
                </button>
                <button
                  className="nav-link mb-4 text-uppercase"
                  id="timeDate-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#timeDate"
                  type="button"
                  role="tab"
                  aria-controls="timeDate"
                  aria-selected="false"
                  disabled={step3}
                >
                  {locale === "nl" ? "Tijd & datum" : "time & date"}
                </button>
                <button
                  className="nav-link mb-4 text-uppercase"
                  id="contactDetails-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#contactDetails"
                  type="button"
                  role="tab"
                  aria-controls="contactDetails"
                  aria-selected="false"
                  disabled={step4}
                >
                  {locale === "nl" ? "contactgegevens" : "contact Details"}
                </button>
              </div>
              <div
                className="tab-content col-sm-9  col-12 p-0 ps-sm-5"
                id="v-pills-tabContent"
              >
                <div
                  className="tab-pane text-sm-start text-center fade show active"
                  id="location"
                  role="tabpanel"
                  aria-labelledby="location-tab"
                >
                  <h3 className="title m-0 mb-4 mt-sm-0 mt-5">
                  {locale === "nl" ? "Selecteer uw afspraak" : "Select Appointment"}
                  </h3>
                  <p className="description">
                  {locale === "nl" ? "Wilt u onze monumentale villa's in Amsterdam bezoeken of een online afspraak inplannen?" : "Would you like to visit our monumental villas in Amsterdam or schedule an online appointment?"}
                  </p>
                  <button
                    className="btn btn-unavailable pink-btn text-start px-5 mt-5 py-3 text-sm-start text-center round-form"
                    onClick={(e) => {
                      checkingLocation(e);
                      setVisit(true);
                    }}
                  >
                    {locale === "nl" ? "Bezoek ons in Amsterdam" : "Visit us in Amsterdam"}
                  </button>
                  <button
                    className="btn btn-consultation d-flex py-3 blue-btn round-form px-5 mt-4 justify-content-between align-items-center"
                    onClick={(e) => {
                      checkingLocation(e);
                      setVisit(false);
                    }}
                  >
                    <span>{locale === "nl" ? "Plan een online diamantconsult" : "Schedule an online diamond consult"}</span>
                    <RiArrowRightLine />
                  </button>
                </div>
                <div
                  className="tab-pane text-sm-start text-center fade"
                  id="service"
                  role="tabpanel"
                  aria-labelledby="service-tab"
                >
                  <h3 className="title m-0 mb-4 mt-sm-0 mt-5">
                  {locale === "nl" ? "Welke service heeft u nodig?" : "Which service do you require?"}
                  </h3>
                  <div className="row options-panel m-0">
                    {options.map((item, index) => {
                      return (
                        <div
                          className={"p-0 " + (index % 2 ? "" : "pe-sm-3")}
                          key={index}
                        >
                          <nav
                            className="option-item  px-5 py-3 mt-4 round-form "
                            onClick={checkingService}
                          >
                            {item}
                          </nav>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className="tab-pane text-sm-start text-center fade visible"
                  id="timeDate"
                  role="tabpanel"
                  aria-labelledby="timeDate-tab"
                >
                  <div className="date-panel active">
                    <h3 className="title mb-5 mt-sm-0 mt-5">
                      {locale === "nl" ? "Selecteer een datum" : "Select a Preferred Date"}
                    </h3>
                    <div className="calendar-panel round">
                      <div
                        className="date-title-panel p-4 d-flex align-items-center justify-content-between"
                        onClick={toggleDatePicker}
                      >
                        <span className="text-uppercase">{disDate}</span>
                        <RiArrowRightSLine />
                      </div>
                      <Calendar
                        onChange={(val) => {
                          setPreDate(val);
                          $("#visitDate").val(moment(val).format("DD.MM.YYYY"));
                        }}
                        minDate={new Date()}
                        value={preDate}
                      />
                    </div>
                  </div>
                  <div className="time-panel mt-5">
                    <h3 className="title mb-5">{locale === "nl" ? "Selecteer een tijd" : "Select a Preferred time"}</h3>
                    <div className="row">
                      {times.map((item, index) => {
                        return (
                          <div
                            className="col-md-2 col-sm-3 col-4 mb-4"
                            key={index}
                          >
                            <nav
                              className="py-3 time-item text-center round-form"
                              onClick={handleTime}
                            >
                              {item}
                            </nav>
                          </div>
                        );
                      })}
                    </div>
                    <p className="bottom-text">Local time in (GMT)</p>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="contactDetails"
                  role="tabpanel"
                  aria-labelledby="contactDetails-tab"
                >
                  <h3 className="title m-0 mb-4 text-sm-start text-center mt-sm-0 mt-5">
                    {locale === "nl" ? "Je contactgegevens" : "Your Contact Details"}
                  </h3>
                  <form className="form-panel row" id="appointmentForm">
                  <input type="hidden" name="online" id="online"  />
                  <input type="hidden" name="online" id="idonline"  />
                  <input type="hidden" name="online" id="visit"  />
                  <input type="hidden" name="online" id="idvisit"  />
                  <input type="hidden" name="visittype" id="visittype"  />
                  <input type="hidden" name="visitTime" id="visitTime" />
                  <input type="hidden" name="visitDate" id="visitDate" />
                  <input type="hidden" name="country1" id="country1" />
                  <input type="hidden" name="requestedService" id="requestedService" />
                    <input type="hidden" name="aUrl" id="aUrl" />
                    {!visit && (
                      <input type="hidden" name="cMeth" id="cMeth" />
                    )}
                    {!visit && (
                      <label htmlFor="contactMethod" className="col-sm-6 mt-5">
                        Method of Contact*
                        <select
                          className="form-select blue-text ps-4 mt-3 round-form py-3"
                          aria-label="Default select example"
                          id="contactMethod"
                          name="contactMethod"
                          value={contactMethod}
                          onChange={(event) =>
                            setContactMethod(event.target.value)
                          }
                        >
                          {contactMethods.map((item, index) => {
                            return (
                              <option value={item.title.toLowerCase().replace(/\s/g, '_')} key={index}>
                                {item.title}
                              </option>
                            );
                          })}
                        </select>
                      </label>
                    )}
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
                        placeholder="Email Address"
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
                    <div className="btn-panel">
                      <button id="sap" className="btn col-12 pink-btn py-3 btn-request round-form">
                        {locale === "nl" ? "Afspraakverzoek versturen" : "SEND APPOINTMENT REQUEST"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
