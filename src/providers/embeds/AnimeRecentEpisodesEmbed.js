const { configuration } = require('../../configurations/embeds/config');
const {AnimeEmbed} = require("./AnimeEmbed");
class AnimeRecentEpisodesEmbed extends AnimeEmbed{
    getEmbed() {
        this.embed
            .setTitle(configuration.Anime.GogoAnime.fetchRecentEpisodes.title)
            .setColor(configuration.Anime.GogoAnime.fetchRecentEpisodes.color)
            .setThumbnail(configuration.Anime.GogoAnime.fetchRecentEpisodes.imageURL)
            .setTimestamp()
            .setFooter(`Page ${this.data.currentPage ? this.data.currentPage : 1}`);

        if (this.data !== null) {
            this.embed.setDescription(`Here are animes with an episode which came out recently.`);
            this.embed.addFields( this.data.results.map(anime => { return { name: anime.title, value: anime.url } }));
        }
        return this.embed;
    }

}

module.exports = {
    AnimeRecentEpisodesEmbed: AnimeRecentEpisodesEmbed
}
