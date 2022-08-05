const { configuration } = require('../../configurations/embeds/config');
const {AnimeEmbed} = require("./AnimeEmbed");
class AnimeInfoEmbed extends AnimeEmbed{
    getEmbed() {
        this.embed
            .setTitle(configuration.Anime.GogoAnime.fetchAnimeInfo.title)
            .setColor(configuration.Anime.GogoAnime.fetchAnimeInfo.color)
            .setTimestamp()

        if (this.data !== null) {
            let command = "/gogoanime stream name:" + this.data.id + ` episode:${this.data.totalEpisodes > 1 ? "<Episode Number>": "1"}`;
            this.embed.setDescription(`**▸ Title :** ${this.data.title}\n**▸ Genres :** ${this.data.genres.join(", ")}\n**▸ Status:** ${this.data.status}\n**▸ Release Date:** ${this.data.releaseDate}\n**▸ Description:** \n${this.data.description}\n\n**▸ Last Episode Number:** ${this.data.totalEpisodes}\n----------------------\n**To get an episode copy paste this command:**\n\`\`\`${command}\`\`\``)
            this.embed.setThumbnail(this.data.image)
        }
        return this.embed;
    }
}

module.exports = {
    AnimeInfoEmbed: AnimeInfoEmbed
}
