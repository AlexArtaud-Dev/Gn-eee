const { Command } = require("sheweny");

module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            description: "Display the current songs in the queue.",
            type: "SLASH_COMMAND",
            category: "Music",
        });
    }

    async execute(interaction) {
        // TODO - Create a queue command.
    }

}
