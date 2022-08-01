const { configuration } = require('../../configurations/embeds/config');
const {AnimeEmbed} = require("./AnimeEmbed");
class AnimeStreamEmbed extends AnimeEmbed{
    getEmbed() {
        this.embed
            .setTitle(configuration.Anime.GogoAnime.fetchEpisodeServers.title)
            .setDescription("Here are the servers that have the episode you are looking for.\n Please select one of them to watch the episode.")
            .setColor(configuration.Anime.GogoAnime.fetchEpisodeServers.color)
            .setThumbnail(configuration.Anime.GogoAnime.fetchEpisodeServers.imageURL)
            .setTimestamp();

        return this.embed;
    }

}

module.exports = {
    AnimeStreamEmbed: AnimeStreamEmbed
}
