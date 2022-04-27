const { Command } = require("sheweny");

module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            description: "Set the volume to 0 or unmute the bot.",
            type: "SLASH_COMMAND",
            category: "Music",
        });
    }

    async execute(interaction) {
        const queue = this.client.player.getQueue(interaction.channel.guildId);
        if (!queue) return interaction.reply({content: "There is no music currently playing.", ephemeral: true});
        if (queue.volume !== 0) {
            queue.setVolume(0);
            interaction.reply({content: ":mute: The bot has been muted."});
        } else {
            queue.setVolume(100);
            interaction.reply({content: `:speaker: The bot has been demuted (100%).`});
        }
    }
}
