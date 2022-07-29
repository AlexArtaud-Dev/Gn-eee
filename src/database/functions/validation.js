const config = require("../../../config");
const {BotInformations} = require("../models/BotInformationsModel");

async function alreadyInitializedOnce(ShewenyClient) {
    const botInformations = await BotInformations.findOne({botId : (ShewenyClient.startupArgs.dev ? config.CLIENT_DEV_ID : config.CLIENT_ID)});
    return botInformations === null;
}

module.exports = {
    alreadyInitializedOnce: alreadyInitializedOnce,
}
