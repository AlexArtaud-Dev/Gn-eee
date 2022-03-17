const { Command } = require("sheweny");

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            type: "SLASH_COMMAND",
            description: "Ping the bot",
            category: "Misc",
            options: [
                {
                    name: "name",
                    description: "description",
                    type: "STRING",
                    autocomplete: true,
                },
                {
                    name: "theme",
                    description: "description",
                    type: "STRING",
                    autocomplete: true,
                },
            ],
        });
    }
    execute(interaction) {
        interaction.reply({ content: "Pong !" });

    }

    onAutocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);

        let choices;

        if (focusedOption.name === "name") {
            choices = ["faq", "install", "collection", "promise", "debug", "nadinemouk"];
        }

        if (focusedOption.name === "theme") {
            choices = ["halloween", "christmas", "summer"];
        }

        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedOption.value)
        );
        interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })))
    }
};
