const { MessageEmbed } = require('discord.js');
class AnimeEmbed {
    constructor(data = null, embed = null) {
        this.data = data;
        if (embed !== null) this.setEmbed(embed);
        else this.setEmbed(new MessageEmbed());
    }
    getEmbed() {return this.embed;}
    setEmbed(embed) {this.embed = embed;}
}

module.exports = {
    AnimeEmbed: AnimeEmbed
}
