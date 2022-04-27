const { Command } = require("sheweny");
const {MessageEmbed} = require("discord.js");

module.exports = class NowPlayingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "current",
      description: "Display the current song playing.",
      type: "SLASH_COMMAND",
      category: "Music",
    });
  }
  async execute(interaction) {
      const queue = await this.client.player.getQueue(interaction.channel.guildId);
      if (!queue) return interaction.reply("There is no music currently playing.");
      const nowPlaying = await queue.nowPlaying;
      const embed = this.createMusicEmbed(interaction.member, nowPlaying);
      interaction.reply({embeds: [embed]});
  }

  createMusicEmbed(author, song){
      let musicEmbed = new MessageEmbed();
      musicEmbed.setTitle(`Now Playing : \n${song.name}`)
        .setURL(song.url)
        .setThumbnail(song.thumbnail)
        .setColor("#ff0000")
        .setDescription(`Musique demandée par <@${author.id}>`)
        .addField("Durée", song.duration, true)
        .addField("Statut", song.isLive ? "En Live" : "Vidéo", true)
        .addField("File d'attente", song.queue.songs.length.toString(), true);
      return musicEmbed;
  }
}
