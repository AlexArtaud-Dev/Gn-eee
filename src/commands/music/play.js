const { Command } = require("sheweny");

module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      description: "Play a song from YouTube.",
      type: "SLASH_COMMAND",
      category: "Music",
      options: [
        {
          name: "url",
          description: "Use youtube URL or search terms.",
          type: "STRING",
        }
      ],
    });
  }
  async execute(interaction) {
      const urlORsearch = interaction.options.getString("url");
      if (!urlORsearch) return interaction.reply({content: "Please provide a YouTube URL or search words.", ephemeral: true});
      const queue = await this.client.player.createQueue(interaction.guildId, {
        data: {
          queueInitMessage: interaction,
          voiceChannel: interaction.member.voice.channel,
          messageChannel : interaction.channel,
        }
      });
      await queue.join(interaction.member.voice.channel);
      await interaction.reply({content: ":notes: Searching the music ...", ephemeral: true});
      await queue.play(urlORsearch).then(async () => {
          if (interaction !== null){
              await interaction.delete();
          }
      }).catch(error => {
        interaction.editReply(`An error as occured : ${error.message}`);
      });
    }
}
