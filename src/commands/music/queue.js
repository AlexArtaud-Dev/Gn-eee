const { Command } = require("sheweny");
const {MessageEmbed} = require("discord.js");

module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            description: "Display the current songs in the queue.",
            type: "SLASH_COMMAND",
            category: "Music",
            options: [
                {
                    name: "number",
                    description: "Display the next ... song queued. (default: 5, max: 15)",
                    type: "NUMBER",
                    minValue: 1,
                    maxValue: 15,
                }
            ],
        });
    }

    async execute(interaction) {
        const queue = this.client.player.getQueue(interaction.channel.guildId);
        if (!queue) return interaction.reply({content: "There is no music playing.", ephemeral: true});
        const embed = this.getQueueEmbed(queue, interaction.options.getNumber("number"));
        interaction.reply({embeds: [embed]});
    }


    getQueueEmbed(queue, size ){
        if (size === null) size = 5;
        if (size > queue.songs.length) size = queue.songs.length;
        let queueEmbed = new MessageEmbed();
        queueEmbed.setTitle(":notes: **Current Queue | " + size + " entries**").setColor("#ff0000");
        let description = "";
        for (let i = 0; i < size; i++) {
            let song = queue.songs[i]
            if (song) {
                if (i === 0) description += `**[${(i + 1).toString()}] ${song.name}**`
                else description += `\n**[${(i + 1).toString()}]** ${song.name}`;
            }
        }
        queueEmbed.setDescription(description);
        return queueEmbed;
    }
}
