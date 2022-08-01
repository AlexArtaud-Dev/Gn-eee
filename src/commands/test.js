const { Command } = require("sheweny");
const { MessageButton, MessageActionRow} = require('discord.js');

module.exports = class TestCommand extends Command {
    constructor(client) {
        super(client, {
            name: "test",
            description: "Test command to fast execute a code.",
            type: "SLASH_COMMAND",
            category: "Admin",
            adminsOnly: true,
        });
    }
    async execute(interaction) {
        const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId("primary")
              .setLabel("Primary")
              .setStyle("PRIMARY")
          )
        interaction.reply({ content: "Test the buttons", components: [row] });
    }
}
