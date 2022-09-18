var https = require('https')
const { parse } = require('url')
const next = require('next')
var fs = require("fs");
const dev = false
const app = next({ dev })
const handle = app.getRequestHandler()
const axios = require('axios');
var urlo = require('url');
var request = require('request');

/*var options = {
  key: fs.readFileSync('/var/www/certificates/royalcoster.com.key'),
  cert: fs.readFileSync('/var/www/certificates/royalcoster.com.crt')
};*/
var options = {
  cert: fs.readFileSync('/var/www/certificates/royalcoster_com.crt'),
  ca: fs.readFileSync('/var/www/certificates/royalcoster_com.ca-bundle'),
  key: fs.readFileSync('/var/www/certificates/royalcoster.com.key'),
};

app.prepare().then(() => {
  var httpsServer = https.createServer(options, function (req, res) {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
     const url = new URL(req.url, "http://royalcoster.com/");
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
  if (pathname === '/shop') {
      app.render(req, res, '/jewelry-collections', query)
    } else if (pathname === '/startbaan') {
      app.render(req, res, '/', query)
    } else if (pathname === '/b') {
        app.render(req, res, '/b', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(443, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
