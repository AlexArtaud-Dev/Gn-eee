const config = require("../../../config");
const {BotInformations} = require("../models/BotInformationsModel");
const ts = new Date();
const { updateVersion } = require("./update");
const {alreadyInitializedOnce} = require("./validation");

async function initialize(ShewenyClient) {
    if (await alreadyInitializedOnce(ShewenyClient)) {
        const botInformations = new BotInformations({
            botId: (ShewenyClient.startupArgs.dev ? config.CLIENT_DEV_ID : config.CLIENT_ID),
            active: true,
            language: 'en',
        });
        await botInformations.save();
        console.log(`${ts.toLocaleString()} - Bot first initialization done`);
    } else {
        await updateVersion(ShewenyClient);
    }
}

module.exports = {
    initialize: initialize,
}
