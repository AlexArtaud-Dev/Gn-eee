const { Event } = require("sheweny");
const { displayBotInfos } = require("../utils/functions/events/ready");
const ts = new Date();

module.exports = class ReadyEvent extends Event {
  constructor(client) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
      emitter: client,
    });
  }

  execute() {
    this.client.user.setPresence({ activities: [{name: "my creation", type: "WATCHING"}], status:"dnd"});
    console.log("════════════════════════════════════════════");
    console.log(` ${ts.toLocaleString()} - ${this.client.user.tag} started!`);
    console.log("════════════════════════════════════════════");
    displayBotInfos(this.client);
  }
};
