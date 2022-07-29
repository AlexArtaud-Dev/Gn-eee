const config = require("../../config");
const { Inhibitor } = require("sheweny");
const {BotInformations} = require("../database/models/BotInformationsModel");

module.exports = class BotActivationInhibitor extends Inhibitor {
    constructor(client) {
        super(client, "botActivation", {
            type: ["ALL"],
            priority: 999,
        });
    }

    async execute(client, interaction) {
        const botInfos = await BotInformations.findOne({botId : (client.startupArgs.dev ? config.CLIENT_DEV_ID : config.CLIENT_ID)});
        if (botInfos === null) return false;
        return !!botInfos.active;
    }

    async onFailure(client, interaction) {
        await interaction.reply({content: "This bot was disabled by an administrator. Contact the administrator for more information.", ephemeral: true});
    }
};
