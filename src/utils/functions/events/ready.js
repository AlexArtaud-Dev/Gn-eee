const {MessageEmbed} = require("discord.js");
const moment = require("moment");
const {getFajrDateTimeUtc, getDhuhrDateTimeUtc, getAsrDateTimeUtc, getMaghribDateTimeUtc, getIshaaDateTimeUtc} = require("salahtimes");

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
        if (!queue.data.isAPICall)
            queue.data.messageChannel.send(`:notes: **${song.name}** Added to the queue (\`${song.duration}\`)!`)
    });
    player.on('songChanged', (queue, newSong, oldSong) => {
        if (!queue.data.isAPICall)
            queue.data.messageChannel.send(`:notes: **${newSong.name}** Added to the queue (\`${newSong.duration}\`)!`)
    });
    player.on('playlistAdd',  (queue, playlist) => {
        if (!queue.data.isAPICall) {
            const embed = getPlaylistEmbed(playlist, queue.data.author);
            queue.data.messageChannel.send({embeds: [embed]});
        }
    });
    player.on('queueDestroyed',  (queue) => {
        if (!queue.data.isAPICall)
            queue.data.messageChannel.send(`:notes: The player has stopped and the queue has been cleared.`)
    });
    player.on('queueEnd',  (queue) => {
        if (!queue.data.isAPICall)
            queue.data.messageChannel.send(`:notes: The queue has ended, disconnecting.`)
    });
    player.on('channelEmpty',  (queue) => {
        if (!queue.data.isAPICall)
            queue.data.messageChannel.send(`:notes: Everyone left the Voice Channel, queue ended, disconnecting.`)
    });
    player.on('clientDisconnect', (queue) => {
        if (!queue.data.isAPICall)
            queue.data.messageChannel.send(`:notes: I was kicked from the Voice Channel, queue ended.`)
    });
    player.on('error', (error, queue) => {
        if (!queue.data.isAPICall) {
            queue.data.messageChannel.send(`:notes: An error occured : ${error.message}`);
        }else{
            console.log(`[API] An error occured : ${error.message}`);
        }
    });
}

async function setArabicPrayer(client){
    let Fajr = getFajrDateTimeUtc(new Date(), 48.856614, 2.3522219);
    let Dhur = getDhuhrDateTimeUtc(new Date(), 48.856614);
    let Asr = getAsrDateTimeUtc(new Date(), 48.856614, 2.3522219);
    let Maghrib = getMaghribDateTimeUtc(new Date(), 48.856614, 2.3522219);
    let Isha = getIshaaDateTimeUtc(new Date(), 48.856614, 2.3522219);
    let currentTime = new Date();
    let diffFajr = new Date(Fajr).getTime() - currentTime.getTime();
    let diffDhur = new Date(Dhur).getTime() - currentTime.getTime();
    let diffAsr = new Date(Asr).getTime() - currentTime.getTime();
    let diffMaghrib = new Date(Maghrib).getTime() - currentTime.getTime();
    let diffIsha = new Date(Isha).getTime() - currentTime.getTime();
    if (diffFajr >= 0) {
        setTimeout(() => {
            chantForPrayer(client);
            writeMessageForPrayer(client, "Fajr");
        }, diffFajr);
    }
    if (diffDhur >= 0) {
        setTimeout(() => {
            chantForPrayer(client);
            writeMessageForPrayer(client, "Dhur");
        }, diffDhur);
    }
    if (diffMaghrib >= 0) {
        setTimeout(() => {
            chantForPrayer(client);
            writeMessageForPrayer(client, "Maghrib");
        }, diffMaghrib);
    }
    if (diffAsr >= 0) {
        setTimeout(() => {
            chantForPrayer(client);
            writeMessageForPrayer(client, "Asr");
        }, diffAsr);
    }
    if (diffIsha >= 0) {
        setTimeout(() => {
            chantForPrayer(client);
            writeMessageForPrayer(client, "Isha");
        }, diffIsha);
    }
}

async function chantForPrayer(client){
    client.channels.fetch("806610035248463882").then(async voiceChannel => {
        let queue = await client.player.createQueue("806610035248463878", {
            data: {
                queueInitMessage: null,
                voiceChannel: voiceChannel,
                isAPICall: true,
                override: false,
            }
        });
        await queue.join(voiceChannel);
        await queue.play("https://www.youtube.com/watch?v=yjhf8EnUFSI");
    });
}

async function writeMessageForPrayer(client, prayerType){
    client.channels.fetch("806619127958732820").then(async channel => {
        await channel.send(`:pray: **${prayerType} تعالوا صلوا إخواني المسلمين :**`);
    });
}

function getPlaylistEmbed(playlist, author){
    let playlistEmbed = new MessageEmbed();
    playlistEmbed.setTitle(playlist.name)
      .setURL(playlist.url)
      .setThumbnail(playlist.songs[0].thumbnail)
      .setColor("#ff0000")
      .setDescription(`Playlist asked by <@${author.id}>`)
      .addField("Playlist Duration", getPlaylistDuration(playlist), true)
      .addField("Queue length", playlist.songs.length.toString(), true);
    return playlistEmbed;
}

function getPlaylistDuration(playlist){
    let h = 0;
    let m = 0;
    let s = 0;
    playlist.songs.forEach(song => {
        const time = song.duration.split(":");
        if (time.length === 3) {
            h += parseInt(time[0]);
            m += parseInt(time[1]);
            s += parseInt(time[2]);
        }
        if (time.length === 2) {
            m += parseInt(time[0]);
            s += parseInt(time[1]);
        }
        if (time.length === 1) {
            s += parseInt(time[0]);
        }
    });
    const secQuotient = Math.floor(s / 60);
    m = m + secQuotient;
    s = s%60;
    const minQuotient = Math.floor(m / 60);
    h = h + minQuotient;
    m = m%60;

    return `${h}:${m}:${s}`;
}

module.exports = {
    displayBotInfos,
    setArabicPrayer,
    getBotInformations,
    setMusicPlayerEvents
}
