const config = require("../../../config");
const {BotInformations} = require("../models/BotInformationsModel");
const ts = new Date();

async function updateVersion(ShewenyClient){
    const pjson = require('../../../package.json');
    const botInformations = await BotInformations.findOne({botId : (ShewenyClient.startupArgs.dev ? config.CLIENT_DEV_ID : config.CLIENT_ID)});
    if (botInformations.appVersion !== pjson.version) {
        botInformations.appVersion = pjson.version;
        await botInformations.save();
        console.log(`${ts.toLocaleString()} - Bot version updated to ${pjson.version}`);
    }
}

module.exports = {
    updateVersion: updateVersion,
}
