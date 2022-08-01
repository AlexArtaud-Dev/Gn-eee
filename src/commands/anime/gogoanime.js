const { Command } = require("sheweny");
const {search, stream, topAiring, recentEpisodes} = require("../../utils/functions/commands/anime/gogoanime");

module.exports = class TestCommand extends Command {
    constructor(client) {
        super(client, {
            name: "gogoanime",
            description: "Command base to execute any gogoanime sub command.",
            type: "SLASH_COMMAND",
            category: "Anime",
            options: [
                {
                    type: "SUB_COMMAND",
                    name: "search",
                    description: "Search for anime on gogoanime.",
                    options: [
                        {
                            name: "name",
                            description: "Anime name.",
                            type: "STRING",
                        },
                        {
                            name: "page",
                            description: "Page number.",
                            type: "STRING",
                            default: 1,
                        }
                    ],
                },
                {
                    type: "SUB_COMMAND",
                    name: "stream",
                    description: "Give streaming link for the given anime episode.",
                    options: [
                        {
                            name: "name",
                            description: "Anime name.",
                            type: "STRING",
                        },
                        {
                            name: "episode",
                            description: "Anime episode number.",
                            type: "STRING",
                            default: 1,
                        }
                    ],
                },
                {
                    type: "SUB_COMMAND",
                    name: "topairing",
                    description: "Give a list of the top airing anime.",
                    options: [
                        {
                            name: "page",
                            description: "Top airing anime page number.",
                            type: "STRING",
                            default: 1,
                        }
                    ],
                },
                {
                    type: "SUB_COMMAND",
                    name: "recent",
                    description: "Give a list of the recent anime episodes.",
                    options: [
                        {
                            name: "page",
                            description: "Recent anime episode page number.",
                            type: "STRING",
                            default: 1,
                        }
                    ],
                }
            ]}
        );
    }
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "search":
                await search(interaction, interaction.options.getString("name"), interaction.options.getString("page") ? interaction.options.getString("page") : 1);
                break;
            case "stream":
                await stream(interaction, `${interaction.options.getString("name")}-episode-${interaction.options.getString("episode")}`);
                break;
            case "topairing":
                await topAiring(interaction, interaction.options.getString("page") ? interaction.options.getString("page") : 1);
                break;
            case "recent":
                await recentEpisodes(interaction, interaction.options.getString("page") ? interaction.options.getString("page") : 1);
                break;
            default:
                interaction.reply("Unknown sub command");
                break;
        }
    }


}
