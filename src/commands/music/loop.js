const { Command } = require("sheweny");

module.exports = class LoopCommand extends Command {
    constructor(client) {
        super(client, {
            name: "loop",
            description: "Loop the current song or the whole queue.",
            type: "SLASH_COMMAND",
            category: "Music",
            options: [
                {
                    name: "type",
                    description: "Type of loop (queue, current, off)",
                    type: "STRING",
                    autocomplete: true,
                }],
        });
    }

    async execute(interaction) {
        const type = interaction.options.getString("type");
        if (!["queue", "current", "off"].includes(type)) return interaction.reply({content: "Invalid type of loop.", ephemeral: true});
        const queue = await this.client.player.getQueue(interaction.channel.guildId);
        switch (type){
            case "queue":
                queue.setRepeatMode(2);
                interaction.reply({content: `:repeat: Looping on queue.`});
                break;
            case "current":
                queue.setRepeatMode(1);
                interaction.reply({content: `:repeat_one: Looping on the current song.`});
                break;
            case "off":
                queue.setRepeatMode(0);
                interaction.reply({content: `:notes: Loop stopped.`});
                break;
        }

    }

    onAutocomplete(interaction) {
        let choices;
        const focusedOption = interaction.options.getFocused(true);
        if (focusedOption.name === "type") choices = ["queue", "current", "off"];
        const filtered = choices.filter((choice) => choice.startsWith(focusedOption.value));
        interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })))
    }
}
