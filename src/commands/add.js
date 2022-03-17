const { Command } = require("sheweny");
const {createNewMemberCard} = require("../utils/functions/events/guildMemberAdd");

module.exports = class AddCommand extends Command {
  constructor(client) {
    super(client, {
      name: "add",
      description: "Get the member card for a new member.",
      type: "SLASH_COMMAND",
      category: "Admin",
      adminsOnly: true,
    });
  }
  async execute(interaction) {
    interaction.channel.send({
      content: null,
      files: [await createNewMemberCard(interaction.member)],
    })
  }
}
