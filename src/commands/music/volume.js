const { Command } = require("sheweny");

module.exports = class VolumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "volume",
            description: "Change the input volume of the music.",
            type: "SLASH_COMMAND",
            category: "Music",
            options: [
                {
                    name: "rate",
                    description: "Rate at which to change the volume. Must be between 0 and 100.",
                    type: "STRING",
                }],
        });
    }

    async execute(interaction) {
        const volume = parseInt(interaction.options.getString("rate"));
        const queue = this.client.player.getQueue(interaction.channel.guildId);
        if (!queue) return interaction.reply({content: "There is no music currently playing.", ephemeral: true});
        if (!volume) return interaction.reply({content: `:notes: The current volume is ${queue.volume}%.`});
        if (this.isVolumeInvalid(volume)) return interaction.reply("Invalid volume. Must be between 0 and 100.");
        if (queue.volume < volume) {
            interaction.reply({content: `:loud_sound: The volume has been increased to ${volume}%.`});
        } else {
            interaction.reply({content: `:sound: The volume has been decreased to ${volume}%.`});
        }
        queue.setVolume(volume);
    }

    isVolumeInvalid(volume){
        return (volume < 0 || volume > 100);
    }
}
