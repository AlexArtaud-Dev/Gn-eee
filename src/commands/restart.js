const { Command } = require("sheweny");

module.exports = class RestartCommand extends Command {
  constructor(client) {
    super(client, {
      name: "restart",
      description: "Allow to restart the bot",
      type: "SLASH_COMMAND",
      category: "Admin",
      adminsOnly: true,
      channel: "DM",
    });
  }
  async execute(interaction) {
    await this.client.managers.commands.deleteAllCommands("727870530040102965");
    await interaction.reply(`Success.`);
    return process.exit();
  }
}
