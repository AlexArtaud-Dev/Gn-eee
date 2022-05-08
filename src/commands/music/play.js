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
      let queue;
      const urlORsearch = interaction.options.getString("url");
      if (!urlORsearch) return interaction.reply({content: "Please provide a YouTube URL or search words.", ephemeral: true});
      const existingQueue = await this.client.player.getQueue(interaction.guildId);
      if (existingQueue && existingQueue.data.isAPICall) {
          queue = existingQueue;
          queue.setData({
              queueInitMessage: interaction,
              voiceChannel: interaction.member.voice.channel,
              messageChannel : interaction.channel,
          })
      }else{
          queue = await this.client.player.createQueue(interaction.guildId, {
              data: {
                  queueInitMessage: interaction,
                  voiceChannel: interaction.member.voice.channel,
                  messageChannel : interaction.channel,
              }
          });
      }
      await queue.join(interaction.member.voice.channel);
      await interaction.reply({content: ":notes: Searching the music ...", ephemeral: true});
      console.log(queue);
      await queue.play(urlORsearch).then(async () => {
          console.log("Playing");
      }).catch(error => {
        interaction.editReply(`An error as occured : ${error.message}`);
      });
    }
}
