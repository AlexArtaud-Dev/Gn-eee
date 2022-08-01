const { Button } = require("sheweny");

module.exports = class ButtonTest extends Button {
    constructor(client) {
        super(client, ["primary"]);
    }

    async execute() {
        console.log('execute');
    }
};
