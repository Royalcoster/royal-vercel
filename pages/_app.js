import { useState, useEffect } from "react";
import GlobalContext from "../utils/global-context";
import { Provider } from "react-redux";
import store from "../redux/store";
import withRedux from "next-redux-wrapper";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Modal, Button } from "react-bootstrap"
import { RiCloseFill } from "react-icons/ri"
config.autoAddCss = false;
import Router from 'next/router';
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Header from "/components/header.js";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.scss";
import { withTranslateRoutes } from 'next-translate-routes';
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const [show, setShow] = useState(false);
  const { locale } = useRouter();
  useEffect(() => {
    var language = window.navigator.userLanguage || window.navigator.language;
    if (language == "nl") {
      localStorage.language = "nl"
    } else {
      localStorage.language = "en";
    }
    if (localStorage && !localStorage.visited) {
      setTimeout(() => {
        setShow(false)
        localStorage.setItem('visited', true);
      }, 2000)
    }
  }, [])

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [show])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (

    <IntlProvider locale={locale}>
      <Provider store={store}>
        {/* Start discount modal */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          className="discount-modal"
          dialogClassName="modal-90w mx-auto"
          aria-labelledby="contained-modal-title-vcenter"
          keyboard={false}
          size="lg"
          centered
          scrollable
        >
          <Modal.Body className="p-0">
            <div className="row m-0">
              <img src="/img/common/discount-modal_img.png" className="modal-image col-sm-6 p-0" alt="modal-image" />
              <div className="col-sm-6 left-panel d-flex flex-column justify-content-between p-5">
                <div className="text-panel mb-4">
                  <h3 className="blue-text title text-capitalize">Save <span>20%</span> on all <span>jewelries</span> on your next <span>order</span></h3>
                  <p className="m-0">Subscribe to our website’s mailing list and get a special gifts and more, just for you!</p>
                </div>
                <div className="form-panel d-flex round-form">
                  <input type="text" className="form-control px-5 py-3" placeholder="Type Your Email" />
                  <button className="btn">JOIN NOW</button>
                </div>
              </div>
            </div>
            <button className="btn close-btn d-flex p-0 justify-content-center align-items-center" onClick={handleClose}><RiCloseFill /></button>
          </Modal.Body>
        </Modal>
        {/* End discount modal */}
        <SnackbarProvider maxSnack={3}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </Provider>
    </IntlProvider>
  )
}

const makeStore = () => store;

export default withTranslateRoutes(MyApp)   //currently I am running on localhost:3000.
