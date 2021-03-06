const { Command } = require("sheweny");

module.exports = class PauseCommand extends Command {
    constructor(client) {
    super(client, {
        name: "pause",
        description: "Pause or restart the current song.",
        type: "SLASH_COMMAND",
        category: "Music",
    });
    }
    async execute(interaction) {
        const queue = await this.client.player.getQueue(interaction.channel.guildId);
        if (!queue) return interaction.reply("There is no music currently playing.");
        switch (queue.paused) {
            case true:
                queue.setPaused(false);
                return interaction.reply(":arrow_forward: Music restarted !");
            case false:
                queue.setPaused(true);
                return interaction.reply(":pause_button: Music paused !");
        }
    }
}
