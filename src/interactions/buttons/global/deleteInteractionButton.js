const { Button } = require("sheweny");

module.exports = class DeleteInteractionButton extends Button {
    constructor(client) {
        super(client, ["deleteInteractionButton"]);
    }

    async before(interaction) {
        console.log("Before DeleteInteractionButton");
    }

    async execute(interaction) {
        if (interaction) await interaction.message.delete();
    }
};
