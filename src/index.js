const { ShewenyClient } = require("sheweny");
const { API } = require("./API/api");
const { Player } = require("discord-music-player");
const config = require("../config");
const { connect } = require("./database/database");
const argv = require('minimist')(process.argv.slice(2));
const ts = new Date();

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

client.startupArgs = argv;

try{
  client.player = new Player(client, {
    leaveOnEmpty: false,
  });
}catch (error) {
    console.log(`${ts.toLocaleString()} - Error initializing starting music player : ${error}`);
    process.exit(1);
}

connect(client);

try{
  client.login(client.startupArgs.dev ? config.DISCORD_DEV_TOKEN : config.DISCORD_TOKEN);
}catch (error) {
    console.log(`${ts.toLocaleString()} - Error while trying to connect the bot to discord API : ${error}`);
    process.exit(1);
}

API(client);



