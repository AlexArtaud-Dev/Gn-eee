const ts = new Date();
const fs = require('fs');
const cors = require('cors');
const open = require('open');
const https = require("https");
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express")
const swaggerOptions = require("./configuration/swaggerOptions");
const { API_PORT } = require("../../config");

function API(ShewenyClient) {
    let API_CONFIG = null;
    if (ShewenyClient.startupArgs.dev){
        API_CONFIG = {
            key: fs.readFileSync("./src/api/ssl_cert/server.key"),
            cert: fs.readFileSync("./src/api/ssl_cert/server.cert")
        }
    }else {
        API_CONFIG = {
            key: fs.readFileSync('/etc/letsencrypt/live/manganimes-api.westeurope.cloudapp.azure.com/privkey.pem', 'utf8'),
            cert: fs.readFileSync('/etc/letsencrypt/live/manganimes-api.westeurope.cloudapp.azure.com/cert.pem', 'utf8'),
            ca: fs.readFileSync('/etc/letsencrypt/live/manganimes-api.westeurope.cloudapp.azure.com/chain.pem', 'utf8')
        }
    }

    const app = express();
    app.use(function(req, res, next) {
        res.ShewenyClient = ShewenyClient;
        next();
    });
    // Swagger Docs Route and Options
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/v1/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

    // Middleware
    app.use(express.json());

    // Allow Access-Control-Allow-Origin from *
    app.use(cors({ origin: '*' }));

    // Import Routes
    const oauthRoute = require('./routes/oauth');
    const channels = require('./routes/channels');
    const music = require('./routes/music');

    // Route Middlewares
    app.use('/api/auth/discord', oauthRoute);
    app.use('/api/discord/guild', channels);
    app.use('/api/discord/music', music);

    // Server Listening
    try {
        https.createServer(API_CONFIG , app)
          .listen(API_PORT, function () {
              console.clear();
              console.log(`${ts.toLocaleString()} - App listening on port ${API_PORT}! Go to https://localhost:${API_PORT}/v1/swagger`)
              // open(`https://localhost:${API_PORT}/v1/swagger`, {app: 'firefox'});
          })
    }catch (error) {
        console.log(`${ts.toLocaleString()} - Error starting API: ${error}`);
        process.exit(1);
    }
}

module.exports = {
    API
}
