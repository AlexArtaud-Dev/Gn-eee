const { MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const { configuration } = require('../../configurations/embeds/config');
const {AnimeEmbed} = require("./AnimeEmbed");
class AnimeSearchEmbed extends AnimeEmbed{
    getEmbed() {
        this.embed
            .setTitle(configuration.Anime.GogoAnime.search.title)
            .setColor(configuration.Anime.GogoAnime.search.color)
            .setThumbnail(configuration.Anime.GogoAnime.search.imageURL)
            .setTimestamp()
            .setFooter(`Page ${this.data.currentPage ? this.data.currentPage : 1}`);

        if (this.data !== null) {
            this.embed.setDescription(`Result for page ${this.data.currentPage ? this.data.currentPage : 1} of : **${this.data.searchName}**\n\n`)
            this.embed.addFields( this.data.results.map(anime => { return { name: anime.title, value: anime.url } }));
        }
        return this.embed;
    }

}

module.exports = {
    AnimeSearchEmbed: AnimeSearchEmbed
}
