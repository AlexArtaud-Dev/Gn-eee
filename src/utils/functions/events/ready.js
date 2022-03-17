function displayBotInfos (client) {
    let information = getBotInformations(client);
    console.log("═════════════════ Watching ═════════════════");
    console.log("════════════════════════════════════════════");
    console.log(`▶ ${information.servers} ${information.servers > 1 ? "servers" : "server"}`);
    console.log(`\t⬤ ${information.textChannels} text ${information.textChannels > 1 ? "channels" : "channel"}`);
    console.log(`\t⬤ ${information.voiceChannels} voice ${information.voiceChannels > 1 ? "channels" : "channel"}`);
    console.log(`▶ ${information.users} ${information.users > 1 ? "users" : "user"}`);
    console.log(`\t⬤ ${information.usersNotBot} ${information.usersNotBot > 1 ? "real users" : "real user"}`);
    console.log(`\t⬤ ${information.bots} ${information.bots > 1 ? "bots" : "bot"}`);
    console.log("════════════════════════════════════════════");
}
function getBotInformations(client) {
    return {
        servers: client.guilds.cache.size,
        users: client.users.cache.size,
        voiceChannels: client.channels.cache.filter(c => !c.isText()).size,
        textChannels: client.channels.cache.filter(c => c.isText()).size,
        usersNotBot: client.users.cache.filter(u => !u.bot).size,
        bots: client.users.cache.filter(u => u.bot).size
    }
}

module.exports = {
    displayBotInfos,
    getBotInformations
}
