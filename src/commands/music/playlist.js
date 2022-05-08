const { Command } = require("sheweny");

module.exports = class PlaylistCommand extends Command {
    constructor(client) {
        super(client, {
            name: "playlist",
            description: "Play a youtube playlist.",
            type: "SLASH_COMMAND",
            category: "Music",
            options: [
                {
                    name: "url",
                    description: "Youtube playlist url.",
                    type: "STRING",
                }
            ],
        });
    }

    async execute(interaction) {
        let queue;
        const url = interaction.options.getString("url");
        if (!url) return interaction.reply({content: "Please provide a YouTube playlist URL.", ephemeral: true});
        if (!url.includes("https://www.youtube.com/")) return interaction.reply({content: "Please provide a valid YouTube playlist URL.", ephemeral: true});
        const existingQueue = await this.client.player.getQueue(interaction.guildId);

        if (existingQueue && existingQueue.data.isAPICall) {
            queue = existingQueue;
            queue.setData({
                queueInitMessage: interaction,
                voiceChannel: interaction.member.voice.channel,
                messageChannel : interaction.channel,
            })
        }else{
            queue = await this.client.player.createQueue(interaction.guildId, {
                data: {
                    queueInitMessage: interaction,
                    voiceChannel: interaction.member.voice.channel,
                    messageChannel : interaction.channel,
                }
            });
            await queue.join(interaction.member.voice.channel);
        }

        await interaction.reply({content: ":notes: Searching the music ...", ephemeral: false});
        await queue.playlist(url).then(async () => {
            await interaction.deleteReply();
        }).catch(error => {
            interaction.editReply(`An error as occured : ${error.message}`);
        });
    }

}
