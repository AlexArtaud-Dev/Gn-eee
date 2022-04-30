const { ShewenyClient } = require("sheweny");
const { Player } = require("discord-music-player");
const config = require("../config");

const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"],
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
  mode : "production", // Change to production for production bot
});

client.player = new Player(client, {
  leaveOnEmpty: false,
});
client.login(config.DISCORD_TOKEN);



