import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
              dangerouslySetInnerHTML={{
                __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-5XRL4VQ');
                delete localStorage.mainBackHref;
                delete localStorage.referrer;
            `,
              }}
            />

                <script async src="/jQuery.js"></script>

                <script async src="/bootstrap.min.js"></script>
               <link rel="stylesheet" href="//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css" />
               <script async src="/jqueryui.js"></script>
               <script async src="/jquery.validate.js"></script>
               <link href="/magiczoom.css" rel="stylesheet" type="text/css" media="screen"/>
          
               <script async src="/moment.js"></script>


                  <script
                      dangerouslySetInnerHTML={{
                        __html: `

                        setTimeout(function () {
                            var tidioScript = document.createElement('script');
                            tidioScript.src = '//code.tidio.co/ycarrpqpxbolzhqy4sheikxbbi0eysba.js';
                            document.body.appendChild(tidioScript);

                        }, 5 * 1000);

                    `,
                      }}
                    />


                      <script async defer  src="https://connect.facebook.net/en_US/sdk.js"></script>
                      <meta name="google-site-verification" content="hwNV3ftbYggFmrsM0q70QuGWFm08JnRT65JIiqM_r7Q" />
        </Head>
        <body>
        <div id="fb-root"></div>
        <script
            dangerouslySetInnerHTML={{
              __html: `
              const fbDiv = document.createElement("div");
                fbDiv.id = "fb-root";
                document.body.appendChild(fbDiv);
                // Run any script after sdk is loaded
                window.fbAsyncInit = () => {
                  FB.init({
                      appId            : '362991595876147',
                      autoLogAppEvents : true,
                      xfbml            : true,
                      version          : 'v13.0'
                    });
                };
                // inject sdk.js
                (function(d, script) {
                  script = d.createElement("script");
                  script.type = "text/javascript";
                  script.async = true;
                  script.src =
                    "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v13.0&appId=362991595876147" +
                    "&autoLogAppEvents=1";
                  d.getElementsByTagName("head")[0].appendChild(script);
                })(document);
          `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
