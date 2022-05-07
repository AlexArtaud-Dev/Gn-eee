const ts = new Date();
const fs = require('fs');
const cors = require('cors');
const open = require('open');
const https = require("https");
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express")
const swaggerOptions = require("./utils/swaggerOptions");
const serverKey = fs.readFileSync("./ssl_cert/server.key");
const serverCert = fs.readFileSync("./ssl_cert/server.crt");
const { API_PORT } = require("../../config");


module.exports = function API(ShewenyClient) {
    const app = express();
    // Swagger Docs Route and Options
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/v1/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Middleware
    app.use(express.json());

// Allow Access-Control-Allow-Origin from *
    app.use(cors({ origin: '*' }));


// Import Routes

    // const accountRoute = require('./routes/account');
    // const personRoute = require('./routes/person');

// Route Middlewares

    // app.use('/api/account', accountRoute);
    // app.use('/api/person', personRoute);

// Server Listening
    https.createServer({
        key: serverKey,
        cert: serverCert
    }, app)
      .listen(API_PORT, function () {
          console.clear();
          console.log(`${ts.toLocaleString()} - App listening on port ${API_PORT}! Go to https://localhost:${API_PORT}/v1/swagger`)
          open(`https://localhost:${API_PORT}/v1/swagger`, {app: 'firefox'});
      })

}