const { SelectMenu } = require("sheweny");
const {getAnimeInfos} = require("../../../../utils/functions/commands/anime/gogoanime");

module.exports = class SelectAnimeMenu extends SelectMenu {
    constructor(client) {
        super(client, ["searchAnimeSelector"]);
    }

    async execute(selectMenu) {
        await getAnimeInfos(selectMenu);
    }
};
