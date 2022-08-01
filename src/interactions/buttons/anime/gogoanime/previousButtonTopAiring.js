const { Button } = require("sheweny");
const {topAiring} = require("../../../../utils/functions/commands/anime/gogoanime");

module.exports = class PreviousButtonTopAiring extends Button {
    constructor(client) {
        super(client, ["previousButtonTopAiring"]);
    }

    async execute(interaction) {
        let page = interaction.message.embeds[0].footer.text.split("Page ")[1];
        await topAiring(interaction, parseInt(page) - 1, true);
    }
};
