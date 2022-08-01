const { Button } = require("sheweny");

module.exports = class DeleteInteractionButton extends Button {
    constructor(client) {
        super(client, ["deleteInteractionButton"]);
    }

    async execute(interaction) {
        if (interaction) await interaction.message.delete();
    }
};
