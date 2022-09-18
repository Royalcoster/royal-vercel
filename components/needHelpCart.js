import {
  RiPhoneLine,
  RiChatSmile2Line,
  RiStore2Line,
  RiUser3Line,
  RiMailLine,
} from "react-icons/ri";

export default function NeedHelpCart() {
  return (
    <div className="help-section r-container">
      <div className="pink-circle" />
      <div className="blue-circle" />
      <div className="row m-0">
        <div className="col-md-4 col-12 title-panel p-0 pe-md-5 pb-md-0 pb-5">
          <h2>Need help completing your order?</h2>
          <p>Please contact our diamond specialists:</p>
        </div>
        <div className="col-md-4 col-12 p-0 ps-md-3 help-items">
          <a href="tel:00310203055555" className="btn px-5 py-4 blue-text mb-4 text-uppercase">
            <RiPhoneLine className="me-4" />
            +31 (0) 203055 555
          </a>
          <button onClick={() => {window.tidioChatApi.open()}} className="btn px-5 py-4 blue-text mb-4 text-uppercase">
            <RiChatSmile2Line className="me-4" />
            Live chat
          </button>
          <button id="findshowroom" className="btn px-5 py-4 blue-text mb-4 text-uppercase"
          onClick={(e) => {
              $("#appointment").modal("show");
              setTimeout(function() {
                $("#appointmentForm").find("#online").val("find_showroom_cart_online");
                $("#appointmentForm").find("#visit").val("find_showroom_cart");
                $("#appointmentForm").find("#idvisit").val("034");
                $("#appointmentForm").find("#idonline").val("035");
          //      alert(  localStorage.setItem("idonline"));
              }, 1500);
          }
        }>
            <RiStore2Line className="me-4" />
            Find a showroom
          </button>
        </div>
        <div className="col-md-4 col-12 p-0 ps-md-3 help-items">
          <button id="onlineconsultation" className="btn px-5 py-4 blue-text mb-4 text-uppercase"
          onClick={(e) => {
              $("#appointment").modal("show");
              setTimeout(function() {
                $("#appointmentForm").find("#online").val("online_consultation_cart_online");
                $("#appointmentForm").find("#visit").val("online_consultation_cart");
                $("#appointmentForm").find("#idvisit").val("030");
                $("#appointmentForm").find("#idonline").val("031");
          //      alert(  localStorage.setItem("idonline"));
              }, 1500);
          }
        }
            >
            <RiStore2Line className="me-4" />
            Online Consultation
          </button>
          <button className="btn px-5 py-4 blue-text mb-4 text-uppercase"
          onClick={(e) => {
              $("#appointment").modal("show");
              setTimeout(function() {
                $("#appointmentForm").find("#online").val("book_appointment_cart_online");
                $("#appointmentForm").find("#visit").val("book_appointment_cart");
                $("#appointmentForm").find("#idvisit").val("032");
                $("#appointmentForm").find("#idonline").val("033");
          //      alert(  localStorage.setItem("idonline"));
              }, 1500);
          }
        }
          >
            <RiUser3Line className="me-4" />
            book an appointment
          </button>
          <a href="mailto:support@costerdiamonds.com" className="btn px-5 py-4 blue-text mb-4 text-uppercase">
            <RiMailLine className="me-4" />
            Send as a email
          </a>
        </div>
      </div>
    </div>
  );
}
