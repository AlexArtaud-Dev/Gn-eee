const { configuration } = require('../../configurations/embeds/config');
const {AnimeEmbed} = require("./AnimeEmbed");
class AnimeTopAiringEmbed extends AnimeEmbed{
    getEmbed() {
        this.embed
            .setTitle(configuration.Anime.GogoAnime.fetchTopAiring.title)
            .setColor(configuration.Anime.GogoAnime.fetchTopAiring.color)
            .setThumbnail(configuration.Anime.GogoAnime.fetchTopAiring.imageURL)
            .setTimestamp()
            .setFooter(`Page ${this.data.currentPage ? this.data.currentPage : 1}`);

        if (this.data !== null) {
            this.embed.setDescription(`Here are the recent top airing animes.`);
            this.embed.addFields( this.data.results.map(anime => { return { name: anime.title, value: anime.url } }));
        }
        return this.embed;
    }

}

module.exports = {
    AnimeTopAiringEmbed: AnimeTopAiringEmbed
}
