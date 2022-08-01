const { SelectMenu } = require("sheweny");
const {getAnimeInfos} = require("../../../../utils/functions/commands/anime/gogoanime");
const {GneeEmbedProvider} = require("../../../../providers/EmbedProvider");
const {MessageActionRow, MessageSelectMenu} = require("discord.js");

module.exports = class SelectTest extends SelectMenu {
    constructor(client) {
        super(client, ["searchAnimeSelector"]);
    }

    async execute(selectMenu) {
        await getAnimeInfos(selectMenu);
    }
};
