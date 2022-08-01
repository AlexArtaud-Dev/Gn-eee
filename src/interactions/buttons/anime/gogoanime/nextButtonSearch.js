const { Button } = require("sheweny");
const {search} = require("../../../../utils/functions/commands/anime/gogoanime");

module.exports = class NextButtonSearch extends Button {
    constructor(client) {
        super(client, ["nextButtonSearch"]);
    }

    async execute(interaction) {
        let searchName = interaction.message.embeds[0].description.split("**")[1];
        let page = interaction.message.embeds[0].footer.text.split("Page ")[1];
        await search(interaction, searchName, parseInt(page) + 1, true);
    }
};
