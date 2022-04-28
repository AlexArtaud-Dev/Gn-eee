const { Command } = require("sheweny");

module.exports = class ProgressCommand extends Command {
    constructor(client) {
        super(client, {
            name: "progress",
            description: "Displays the progress of the current song.",
            type: "SLASH_COMMAND",
            category: "Music",
        });
    }

    async execute(interaction) {
        const queue = this.client.player.getQueue(interaction.channel.guildId);
        if (!queue) return interaction.reply({content: "There is no music currently playing.", ephemeral: true});
        const progressBar = queue.createProgressBar({size: 50});
        interaction.reply(`:notes: **Progression de la musique: ** ${progressBar.prettier}`)
    }

}
