const { Command } = require("sheweny");

module.exports = class PingUserCommand extends Command {
    constructor(client) {
        super(client, {
            name: "restartTemp",
            description: "Reset the commands",
            category: "Misc"
        });
    }

    async execute(message, args) {
        await this.client.managers.commands.deleteAllCommands("727870530040102965");
        await message.reply(`Success.`);
        return process.exit();
    }
};
