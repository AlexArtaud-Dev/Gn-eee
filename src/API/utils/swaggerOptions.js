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
            UserToken : {
                in: "header",
                name: "Bearer",
                description: "This token is needed to use user discord api",
                required: true,
                type: "apiKey",
            },
            Bot: {
                in: "header",
                name: "Bot",
                description: "This token is needed to use bot discord api",
                required: true,
                type: "apiKey",
            }
        },
        tags: [
            {
                name: "Oauth2",
            },
            {
                name: "Channels",
            },
            {
                name: "Guild",
            },
            {
                name: "Music",
            },
        ],
    },
    apis: ["./src/API/app.js", './src/API/routes/*.js']
};
module.exports = swaggerOptions;
