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
function setMusicPlayerEvents(player){
    player.on('songAdd',  (queue, song) => {
        queue.data.messageChannel.send(`:notes: **${song.name}** Added to the queue (\`${song.duration}\`)!`)
    });
    player.on('songChanged', (queue, newSong, oldSong) => {
        queue.data.messageChannel.send(`:notes: **${newSong.name}** Added to the queue (\`${newSong.duration}\`)!`)
    });
    player.on('playlistAdd',  (queue, playlist) => {
        queue.data.messageChannel.send(`:notes: Playlist ${playlist} was added to the queue (${playlist.songs.length} songs)!`)
    });
    player.on('queueDestroyed',  (queue) => {
        queue.data.messageChannel.send(`:notes: The player has stopped and the queue has been cleared.`)
    });
    player.on('queueEnd',  (queue) => {
        queue.data.messageChannel.send(`:notes: The queue has ended, disconnecting.`)
    });
    player.on('channelEmpty',  (queue) => {
        queue.data.messageChannel.send(`:notes: Everyone left the Voice Channel, queue ended, disconnecting.`)
    });
    player.on('clientDisconnect', (queue) => {
        queue.data.messageChannel.send(`:notes: I was kicked from the Voice Channel, queue ended.`)
    });
    player.on('error', (error, queue) => {
        queue.data.messageChannel.send(`:notes: An error occured : ${error.message}`);
    });
}

module.exports = {
    displayBotInfos,
    getBotInformations,
    setMusicPlayerEvents
}
