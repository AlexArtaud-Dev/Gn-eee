const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "GNéééee API",
            contact : {
                name: "|Alex|#3227"
            },
            version: "1.0.0",
            servers: ["https://localhost:5000"]
        },
        basePath: "/api",
        paths : {},
        securityDefinitions: {
            Bearer: {
                in: "header",
                name: "Bearer",
                description: "This token is needed to use discord api",
                required: true,
                type: "apiKey",
            }
        },
        tags: [
            {
                name: "Oauth2",
            },
            {
                name: "Guild",
            },
        ],
    },
    apis: ["app.js", './routes/*.js']
};
module.exports = swaggerOptions;
