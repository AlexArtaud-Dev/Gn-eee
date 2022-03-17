const { ShewenyClient } = require("sheweny");
const config = require("../config");

const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  admins: ["259741670323650571"],
  managers: {
    commands: {
      directory: "./commands",
      loadAll: true,
      autoRegisterApplicationCommands: true,
      prefix: "!",
    },
    events: {
      directory: "./events",
    },
    buttons: {
      directory: "./interactions/buttons",
    },
    selectMenus: {
      directory: "./interactions/selectmenus",
    },
    inhibitors: {
      directory: "./inhibitors",
    },
  },
  mode : "development", // Change to production for production bot
});

client.login(config.DISCORD_TOKEN);
