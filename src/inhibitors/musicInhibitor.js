const { Inhibitor } = require("sheweny");
let inhibitorMessage = "";

module.exports = class MusicInhibitor extends Inhibitor {
  constructor(client) {
    super(client, "music", {
      type: ["ALL"],
    });
  }

  async execute(client, interaction) {
    const commandName = interaction.command.name;
    if (!commandName) return true;
    const musicCommands = Array.from(this.client.managers.commands.commands.filter((command) => command.category === "Music").keys());
    if (musicCommands.includes()) {
      if (interaction.member.voice.channelId === null) {
        this.inhibitorMessage = "You must join a vocal channel to play music.";
        return false;
      }
      const queue = await this.client.player.getQueue(interaction.guildId);
      if (queue){
        if (interaction.member.voice.channel !== queue.data.voiceChannel) {
          this.inhibitorMessage = "You must be in the same voice channel as the bot to do that.";
          return false;
        }
      }
    }
    return true;
  }

  async onFailure(client, interaction) {
    await interaction.reply({content: this.inhibitorMessage, ephemeral: true});
  }
};
