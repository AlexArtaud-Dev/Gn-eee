const { ShewenyClient } = require("sheweny");
const { API } = require("./API/api");
const { Player } = require("discord-music-player");
const config = require("../config");
const argv = require('minimist')(process.argv.slice(2));

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

client.startupArgs = argv;

client.login(client.startupArgs.dev ? config.DISCORD_DEV_TOKEN : config.DISCORD_TOKEN);

API(client);



