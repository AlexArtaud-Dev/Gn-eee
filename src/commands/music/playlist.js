const { Command } = require("sheweny");

module.exports = class PlaylistCommand extends Command {
    constructor(client) {
        super(client, {
            name: "playlist",
            description: "Play a youtube playlist.",
            type: "SLASH_COMMAND",
            category: "Music",
        });
    }

    async execute(interaction) {
        // TODO - Create a playlist command.
    }

}
