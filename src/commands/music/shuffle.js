const { Command } = require("sheweny");

module.exports = class ShuffleCommand extends Command {
    constructor(client) {
    super(client, {
        name: "shuffle",
        description: "Shuffles the current queue.",
        type: "SLASH_COMMAND",
        category: "Music",
    });
    }
    async execute(interaction) {
        const queue = await this.client.player.getQueue(interaction.channel.guildId);
        if (!queue) return interaction.reply({content: "There is no music currently playing.", ephemeral: true});
        if (queue.songs.length < 2) return interaction.reply({content: "There is not enough songs in the queue to shuffle.", ephemeral: true});
        queue.shuffle();
        interaction.reply({content: ":twisted_rightwards_arrows: The queue has been shuffled."});
    }
}
