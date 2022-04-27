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
        // TODO - Create a progress bar command.
    }

}
