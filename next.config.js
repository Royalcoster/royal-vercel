const path = require('path')
const withTranslateRoutes = require('next-translate-routes/plugin');
module.exports = withTranslateRoutes({
  images: {
    domains: ["cdn.shopify.com","royalcoster.com:81","royal-vercel.vercel.app"]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  i18n: {
    // The locales you want to support in your app
    locales: ["en", "nl"],
    // The default locale you want to be used when visiting a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en",
    localeDetection: false
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}) //I am not sure
