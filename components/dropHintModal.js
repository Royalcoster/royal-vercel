import React, { useState, useRef, useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useRouter } from "next/router";
export default function DropHintModal() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { locale } = useRouter();
  let message1 = '';
  let sender1 = '';
  let sendername1 = '';
  useEffect(() => {

    $("#messageDH").bind("change", function(e) {
      message1= (e.target.value)
    })
    $("#sender").bind("change", function(e) {
      sender1 = (e.target.value)
    })
    $("#sendername").bind("change", function(e) {
      sendername1 = (e.target.value)
    })
  })
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
              var nn = [];
              $.each($("[fname]"), function() {
                nn.push($(this).val());
              })

              var uu = window.location.href.split("-");
              var shopifyid = uu[uu.length - 1];

              $("#sendHint").text("SENDING YOUR HINT");
              $("#sendHint").prop("disabled", true);
              $.ajax({
                url: "https://costercatalog.com/api/index.php?request=dropHintMail",
                type: "POST",
                dataType: "json",
                data: {
                  names: nn.join(","),
                  email: mm.join(","),
                  sendername:  sendername1,
                  message: message1.replace(/(?:\r\n|\r|\n)/g, '<br>'),
                  sender: sender1,
                  shopifyid: shopifyid,
                  url: window.location.href
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
                    var rsp = [
                      {name: "your_name", value: sendername1},
                      {name: "your_email", value: sender1},
                      {name: "your_message", value: message1.replace(/(?:\r\n|\r|\n)/g, '<br>')}
                    ];
                    var dll = {
                      event: "drop_a_hint",
                      formId: "001",
                      response: rsp
                    }
                    console.log(dll);
                    dataLayer.push(dll);
                    $("#dropHint").modal("hide");
                  }, 2000);
                }
              })
          });


        } catch(err) {

        }
  }, [loaded]);

  return (
    <div
      className="modal fade"
      id="dropHint"
      tabIndex="-1"
      aria-labelledby="dropHint"

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
              style={{zIndex:10,position:"absolute", right: 30}}
              onClick={() => {
                  $("#dropHintModal").modal("hide");
              }}
            ></button>
          </div>
          <div id="friendsContainer">
            <div id="friends">
                  <div friend="1" className="modal-body px-0">
                    <div className="friend-info row m-0  pt-2 pb-4">
                      <div className="friend-name col-sm-6 col-12 px-0 pe-sm-3 pe-0">
                        <label tc="Friends name" htmlFor="friendName">Friend's Name</label>
                        <input
                          type="text"
                          fname="1"
                          className="form-control px-4 py-3"
                          placeholder="Name"
                        />
                      </div>
                      <div className="friend-name col-sm-6 col-12 px-0 ps-sm-3 ps-0">
                        <label tc="Friends email" htmlFor="friendName">Friend's Email</label>
                        <input mail="1"
                          type="text"

                          className="form-control px-4 py-3"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                </div>
            </div>
            <button id="addFriends"  tc="1" className="btn pink-btn py-3 btn-add-friend round-form text-uppercase mt-2 mb-5">
              Add another friend
            </button>
            <label tc="1" className="messge-label mb-3" htmlFor="messageBox">
              Message
            </label>
            <textarea id="messageDH"
              className="form-control p-4"
              rows={4}

            ></textarea>
            <div className="your-info row m-0 pt-5 py-4">
              <div className="your-name col-sm-6 col-12 px-0 pe-sm-3 pe-0">
                <label tc="1" htmlFor="yourName">Your Name</label>
                <input id="sendername"
                  type="text"

                  className="form-control px-4 py-3"
                  placeholder="Name"
                />
              </div>
              <div className="your-name col-sm-6 col-12 px-0 ps-sm-3 ps-0">
                <label tc="1" htmlFor="yourName">Your Email</label>
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
              <label tc="1"
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
            <button  tc="1" id="sendHint" className="btn blue-btn btn-send text-uppercase round-form py-3">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
