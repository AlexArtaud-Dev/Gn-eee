const { Inhibitor } = require("sheweny");

module.exports = class BlackListInhibitor extends Inhibitor {
  constructor(client) {
    super(client, "blacklist", {
      type: ["ALL"],
    });
  }

  execute(client, interaction) {
    return true;
    return interaction.channelId !== "727870530040102968";
  }

  async onFailure(client, interaction) {
    await interaction.reply("Your channel is blacklisted.");
  }
};
