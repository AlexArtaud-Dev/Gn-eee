const { Command } = require("sheweny");

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      description: "Skip the current song.",
      type: "SLASH_COMMAND",
      category: "Music",
    });
  }
  async execute(interaction) {
      const queue = await this.client.player.getQueue(interaction.channel.guildId);
      await queue.skip();
      await interaction.reply({content: ":next_track: Skipped ...", ephemeral: true});
    }
}
