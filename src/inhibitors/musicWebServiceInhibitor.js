const { Inhibitor } = require("sheweny");
let inhibitorMessage = "";

module.exports = class MusicWebServiceInhibitor extends Inhibitor {
  constructor(client) {
    super(client, "webServiceMusic", {
      type: ["ALL"],
      priority: 10,
    });
  }

  async execute(client, interaction) {
      console.log("Music inhibitor triggered");
      const commandName = interaction.command.name;
      if (!commandName) return true;
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue) return true;
      const musicOverridenCommands = ["play", "stop", "loop", "pause", "playlist", "skip", "volume"];
      if (queue.data.override && musicOverridenCommands.includes(commandName)){
        this.inhibitorMessage = "This command is blocked by the web service override.";
        return false;
      }
      return true;
  }

  async onFailure(client, interaction) {
    await interaction.reply({content: this.inhibitorMessage, ephemeral: true});
  }
};
