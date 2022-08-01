const {AnimeSearchEmbed} = require("./embeds/AnimeSearchEmbed");
const {AnimeInfoEmbed} = require("./embeds/AnimeInfoEmbed");
const {AnimeStreamEmbed} = require("./embeds/AnimeStreamEmbed");
const {AnimeTopAiringEmbed} = require("./embeds/AnimeTopAiringEmbed");
const {AnimeRecentEpisodesEmbed} = require("./embeds/AnimeRecentEpisodesEmbed");

class GneeEmbedProvider {
    constructor() {}

    async generateEmbed(type, data = null, previousEmbed = null) {
        let embed, e = null;
        switch (type) {
            case "AnimeSearch":
                e = new AnimeSearchEmbed(data, previousEmbed);
                embed = await e.getEmbed();
                break;
            case "AnimeInfo":
                e = new AnimeInfoEmbed(data, previousEmbed);
                embed = await e.getEmbed();
                break;
            case "AnimeStream":
                e = new AnimeStreamEmbed(data, previousEmbed);
                embed = await e.getEmbed();
                break;
            case "AnimeTopAiring":
                e = new AnimeTopAiringEmbed(data, previousEmbed);
                embed = await e.getEmbed();
                break;
            case "AnimeRecentEpisodes":
                e = new AnimeRecentEpisodesEmbed(data, previousEmbed);
                embed = await e.getEmbed();
                break;
            default:
                console.log("Unknown embed type");
                break;
        }
        return embed;
    }
}



module.exports = {
    GneeEmbedProvider: GneeEmbedProvider
}
