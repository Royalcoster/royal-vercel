import React, { useState, useRef, useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
export default function DropHintModal() {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    try {
          $("#addFriends").unbind("click");
          $("#addFriends").bind("click", function() {
            var el = $("#friends").find("div").eq(0).clone();    
            el.find("label").remove();
            el.find("input").val("");
            el.css({
              marginTop: -10,
              paddingTop:0,
              paddingBottom: 0
            })
            el.attr("added", 1);
            el.appendTo($("#friends"));
          })

          $("#sendHint").unbind("click");
          $("#sendHint").bind("click", function() {
              var mm = [];
              $.each($("[mail]"), function() {
                mm.push($(this).val());
              })

              if ($("#message").val().indexOf(window.location.href) == - 1) {
                $("#message").val($("#message").val() + "<br />" + "Sent from: " + window.location.href);
              }
              $.ajax({
                url: "https://costercatalog.com/api/index.php?request=dropHintMail",
                type: "POST",
                dataType: "json",
                data: {
                  email: mm.join(","),
                  message: $("#message").val().replace(/(?:\r\n|\r|\n)/g, '<br>'),
                  sender: $("#sender").val()
                },
                success:function(res) {
                  let variant = (res.status != "success") ? "error" : "success";
                  enqueueSnackbar((res.status != "success") ? "Hint sending failed." : "Hint sent successfuly" , { variant });
                  if (res.status == "success") {
                    $("#dropHintModal").find("input").val("");
                    $("#dropHintModal").find("textarea").val("");
                    $("[added]").remove();
                  }
                  setTimeout(function() {
                    $("#dropHintModal").modal("hide");
                  }, 2000);
                }
              })
          });
        } catch(err) {

        }
  });

  return (
    <div
      className="modal fade"
      id="dropHint"
      tabIndex="-1"
      aria-labelledby="dropHintModal"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable r-container"
        id="dropHintModal"
      >
        <div className="modal-content px-sm-5 px-4 py-4 round-form" style={{overflowY:"auto"}}>
          <div className="modal-header  py-3 px-0">
            <h3 className="modal-title">DROP A HINT</h3>
            <button
              type="button"
              className="btn-close d-sm-none d-block"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{position:"absolute", right: 30}}
            ></button>
          </div>
          <div id="friendsContainer">
            <div id="friends">
                  <div friend="1" className="modal-body px-0">
                    <div className="friend-info row m-0  pt-2 pb-4">
                      <div className="friend-name col-sm-6 col-12 px-0 pe-sm-3 pe-0">
                        <label htmlFor="friendName">Friend's Name</label>
                        <input
                          type="text"

                          className="form-control px-4 py-3"
                          placeholder="Name"
                        />
                      </div>
                      <div className="friend-name col-sm-6 col-12 px-0 ps-sm-3 ps-0">
                        <label htmlFor="friendName">Friend's Email</label>
                        <input mail="1"
                          type="text"

                          className="form-control px-4 py-3"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                </div>
            </div>
            <button id="addFriends"  className="btn pink-btn py-3 btn-add-friend round-form text-uppercase mt-2 mb-5">
              Add another friend
            </button>
            <label className="messge-label mb-3" htmlFor="messageBox">
              Message
            </label>
            <textarea id="message"
              className="form-control p-4"
              rows={4}
              placeholder="Something Here..."
            ></textarea>
            <div className="your-info row m-0 pt-5 py-4">
              <div className="your-name col-sm-6 col-12 px-0 pe-sm-3 pe-0">
                <label htmlFor="yourName">Your Name</label>
                <input
                  type="text"

                  className="form-control px-4 py-3"
                  placeholder="Name"
                />
              </div>
              <div className="your-name col-sm-6 col-12 px-0 ps-sm-3 ps-0">
                <label htmlFor="yourName">Your Email</label>
                <input id="sender"
                  type="text"

                  className="form-control px-4 py-3"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="check-panel d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label ms-3 text-capitalize"
                htmlFor="flexCheckDefault"
              >
                Sign up for special offers
              </label>
            </div>
            <p className="description pt-4 pb-5">
              By signing up you confirm that you have read the Privacy Policy
              and agree that your email and gender will be collected and used by
              Royal Coster for the purposes of sending news, promotions and
              updates via email. You can withdraw your consent at any time by
              unsubscribing or contacting us via
            </p>
            <button  id="sendHint" className="btn blue-btn btn-send text-uppercase round-form py-3">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
