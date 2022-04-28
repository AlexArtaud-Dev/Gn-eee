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
        const url = interaction.options.getString("url");
        if (!url) return interaction.reply({content: "Please provide a YouTube playlist URL.", ephemeral: true});
        if (!url.includes("https://www.youtube.com/")) return interaction.reply({content: "Please provide a valid YouTube playlist URL.", ephemeral: true});
        const queue = await this.client.player.createQueue(interaction.guildId, {
            data: {
                queueInitMessage: interaction,
                voiceChannel: interaction.member.voice.channel,
                messageChannel: interaction.channel,
                author: interaction.member,
            }
        });
        await queue.join(interaction.member.voice.channel);
        await interaction.reply({content: ":notes: Searching the music ...", ephemeral: true});
        await queue.playlist(url).then(async () => {
            await interaction.delete();
        }).catch(error => {
            interaction.editReply(`An error as occured : ${error.message}`);
        });
    }

}
