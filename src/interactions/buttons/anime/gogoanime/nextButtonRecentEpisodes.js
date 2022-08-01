const { Button } = require("sheweny");
const {recentEpisodes} = require("../../../../utils/functions/commands/anime/gogoanime");

module.exports = class NextButtonRecentEpisodes extends Button {
    constructor(client) {
        super(client, ["nextButtonRecentEpisodes"]);
    }

    async execute(interaction) {
        let page = interaction.message.embeds[0].footer.text.split("Page ")[1];
        await recentEpisodes(interaction, parseInt(page) + 1, true);
    }
};
