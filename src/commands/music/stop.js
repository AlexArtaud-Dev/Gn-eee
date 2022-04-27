const { Command } = require("sheweny");

module.exports = class StopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      description: "Stop the queue and disconnect the bot.",
      type: "SLASH_COMMAND",
      category: "Music",
    });
  }
  async execute(interaction) {
      const queue = await this.client.player.getQueue(interaction.channel.guildId);
      await queue.stop();
      await interaction.reply({content: ":stop_button: Stopped the queue and disconnected."});
    }
}
