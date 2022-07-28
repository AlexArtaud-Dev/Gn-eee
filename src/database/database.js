const mongoose = require("mongoose");
const config = require("../../config");
const {BotInformations} = require("./models/BotInformationsModel");
const ts = new Date();

async function connect(ShewenyClient) {
    try {
        await mongoose.connect(ShewenyClient.startupArgs.dev ? config.MONGO_DEV_STRING : config.MONGO_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            minPoolSize: 10,
        });
    } catch (error) {
        console.log(`${ts.toLocaleString()} - Error connecting to database: ${error}`);
        process.exit(1);
    }
    console.log(`${ts.toLocaleString()} - App connected to mongoDB cluster ${mongoose.connections[0].host}`)
    await initializeBot(ShewenyClient);
}

async function initializeBot(ShewenyClient) {
    if (await alreadyInitializedOnce(ShewenyClient)) {
        const botInformations = new BotInformations({
            botId: (ShewenyClient.startupArgs.dev ? config.CLIENT_DEV_ID : config.CLIENT_ID),
            active: true,
            language: 'en',
        });
        await botInformations.save();
        console.log(`${ts.toLocaleString()} - Bot first initialization done`);
    }

}

async function alreadyInitializedOnce(ShewenyClient) {
    const botInformations = await BotInformations.findOne({botId : (ShewenyClient.startupArgs.dev ? config.CLIENT_DEV_ID : config.CLIENT_ID)});
    return botInformations === null;
}

module.exports = connect;
