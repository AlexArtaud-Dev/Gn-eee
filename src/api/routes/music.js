const bot = require("../middlewares/bot");
const {VoiceChannel} = require("discord.js");
const {isVolumeInvalid} = require("./utils");
const {paginate} = require("../../utils/functions/other/array");
const router = require('express').Router();

/**
 * @swagger
 * /discord/music/join/{guildID}/{channelID}:
 *   post:
 *      description: Join a voice channel for a specific guild
 *      tags:
 *          - Music
 *      parameters:
 *          - in: path
 *            name: guildID
 *            schema:
 *              type: string
 *            required: true
 *          - in: path
 *            name: channelID
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *         '200':
 *           description: Successfull request
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal servor error
 */
router.post('/join/:guildID/:channelID', bot, async(req, res) => {
    const { guildID, channelID } = req.params;
    if (!guildID) res.status(400).send({ error: "Missing guildID" });
    if (!channelID) res.status(400).send({ error: "Missing channelID" });
    try {
        const voiceChannel = res.ShewenyClient.guilds.cache.get(guildID).channels.cache.get(channelID);
        if (!voiceChannel) return res.status(400).send({ error: "Channel not found, wrong guildID or channelID" });
        if (!(voiceChannel instanceof VoiceChannel)) return res.status(400).send({ error: "Channel is not a voice channel" });
        const queue = await res.ShewenyClient.player.createQueue(guildID);
        queue.setData({ isAPICall: true });
        await queue.join(voiceChannel);
        res.status(200).send({ message: `Joined channel : ${voiceChannel.name}` });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

/**
 * @swagger
 * /discord/music/leave/{guildID}/{channelID}:
 *   post:
 *      description: Leave a voice channel for a specific guild
 *      tags:
 *          - Music
 *      parameters:
 *          - in: path
 *            name: guildID
 *            schema:
 *              type: string
 *            required: true
 *          - in: path
 *            name: channelID
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *         '200':
 *           description: Successfull request
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal servor error
 */
router.post('/leave/:guildID/:channelID', bot, async(req, res) => {
    const { guildID, channelID } = req.params;
    if (!guildID) res.status(400).send({ error: "Missing guildID" });
    if (!channelID) res.status(400).send({ error: "Missing channelID" });
    try {
        const voiceChannel = res.ShewenyClient.guilds.cache.get(guildID).channels.cache.get(channelID);
        if (!voiceChannel) return res.status(400).send({ error: "Channel not found, wrong guildID or channelID" });
        if (!(voiceChannel instanceof VoiceChannel)) return res.status(400).send({ error: "Channel is not a voice channel" });
        const queue = await res.ShewenyClient.player.getQueue(guildID);
        if (!queue) return res.status(400).send({ error: "No queue found for this guild" });
        await queue.leave();
        res.status(200).send({ message: `Leaving channel : ${voiceChannel.name}` });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

/**
 * @swagger
 * /discord/music/play/{guildID}/{channelID}:
 *   post:
 *      description: Start the bot playing a song in a voice channel from a specific guild
 *      tags:
 *          - Music
 *      parameters:
 *          - in: path
 *            name: guildID
 *            schema:
 *              type: string
 *            required: true
 *          - in: path
 *            name: channelID
 *            schema:
 *              type: string
 *            required: true
 *          - in: body
 *            name: Search
 *            schema:
 *              type: object
 *              required:
 *                 - searchOrURL
 *              properties:
 *                 searchOrURL:
 *                   type: string
 *      responses:
 *         '200':
 *           description: Successfull request
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal servor error
 */
router.post('/play/:guildID/:channelID', bot, async(req, res) => {
    let queue;
    const { guildID, channelID } = req.params;
    if (!guildID) res.status(400).send({ error: "Missing guildID" });
    if (!channelID) res.status(400).send({ error: "Missing channelID" });
    if (!req.body.searchOrURL) res.status(400).send({ error: "Missing searchOrURL" });
    try {
        const voiceChannel = res.ShewenyClient.guilds.cache.get(guildID).channels.cache.get(channelID);
        if (!voiceChannel) res.status(400).send({ error: "Channel not found, wrong guildID or channelID" });
        if (!(voiceChannel instanceof VoiceChannel)) res.status(400).send({ error: "Channel is not a voice channel" });
        const existingQueue = await res.ShewenyClient.player.getQueue(guildID);
        if (existingQueue) queue = existingQueue;
        if (!existingQueue) queue = await res.ShewenyClient.player.createQueue(guildID);
        queue.data = { isAPICall: true, voiceChannel: voiceChannel, override: queue.data?.override ? queue.data.override : false };
        await queue.join(voiceChannel);
        await queue.play(req.body.searchOrURL).then(song => {
            res.status(200).send({ message: `Playing ${song.name}` });
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

/**
 * @swagger
 * /discord/music/queue/{guildID}:
 *   get:
 *      description: Get the current queue of the guild
 *      tags:
 *          - Music
 *      parameters:
 *          - in: path
 *            name: guildID
 *            schema:
 *              type: string
 *            required: true
 *          - in: query
 *            name: pagination
 *            schema:
 *              type: number
 *            required: false
 *          - in: query
 *            name: page
 *            schema:
 *              type: number
 *            required: false
 *      responses:
 *         '200':
 *           description: Successfull request
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal servor error
 */
router.get('/queue/:guildID', bot, async(req, res) => {
    const { guildID } = req.params;
    const { pagination, page } = req.query;
    if (!guildID) res.status(400).send({ error: "Missing guildID" });
    try {
        let songs = [];
        const guild = res.ShewenyClient.guilds.cache.get(guildID);
        if (!guild) res.status(400).send({ error: "Guild not found in the bot joined guilds or wrong guild id" });
        const queue = await res.ShewenyClient.player.getQueue(guildID);
        if (!queue) return res.status(400).send({ error: "No music currently playing in this guild" });
        queue.songs.forEach(song => {
            songs.push({
                name: song.name,
                author: song.author,
                url: song.url,
                thumbnail: song.thumbnail,
                duration: song.duration
            })
        })
        if (pagination && page) res.status(200).send(paginate(songs, pagination, page));
        else res.status(200).send(songs);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

/**
 * @swagger
 * /discord/music/volume/{guildID}:
 *   get:
 *      description: Get the volume of the bot in a specific guild
 *      tags:
 *          - Music
 *      parameters:
 *          - in: path
 *            name: guildID
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *         '200':
 *           description: Successfull request
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal servor error
 */
router.get('/volume/:guildID', bot, async(req, res) => {
    const { guildID } = req.params;
    if (!guildID) res.status(400).send({ error: "Missing guildID" });
    try {
        const guild = res.ShewenyClient.guilds.cache.get(guildID);
        if (!guild) res.status(400).send({ error: "Guild not found in the bot joined guilds or wrong guild id" });
        const queue = await res.ShewenyClient.player.getQueue(guildID);
        if (!queue) return res.status(400).send({ error: "No music currently playing in this guild" });
        res.status(200).send({ volume: queue.volume });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

/**
 * @swagger
 * /discord/music/volume/{guildID}/{volume}:
 *   patch:
 *      description: Change the volume of the bot
 *      tags:
 *          - Music
 *      parameters:
 *          - in: path
 *            name: guildID
 *            schema:
 *              type: string
 *            required: true
 *          - in: path
 *            name: volume
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *         '200':
 *           description: Successfull request
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal servor error
 */
router.patch('/volume/:guildID/:volume', bot, async(req, res) => {
    let { guildID, volume } = req.params;
    if (!guildID) res.status(400).send({ error: "Missing guildID" });
    if (!volume) res.status(400).send({ error: "Missing volume parameter" });
    volume = Number(volume);
    try {
        const guild = res.ShewenyClient.guilds.cache.get(guildID);
        if (!guild) return res.status(400).send({ error: "Guild not found, wrong guildID or the bot is not in the guild" });
        const queue = await res.ShewenyClient.player.getQueue(guildID);
        if (!queue) return res.status(400).send({ error: "Queue not found, the bot is not currently playing in the guild" });
        if (isVolumeInvalid(volume)) return res.status(400).send({ error: "Invalid volume. Must be between 0 and 100." });
        if (queue.volume === volume) return res.status(200).send({ message: "Volume already set to that value" });
        if (queue.volume < volume) {
            queue.setVolume(volume);
            return res.status(200).send({ message: `The volume has been increased to ${volume}%.` });
        } else {
            queue.setVolume(volume);
            return res.status(200).send({ message: `The volume has been decreased to ${volume}%.` });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

/**
 * @swagger
 * /discord/music/control/override/{guildID}:
 *   patch:
 *      description: Block the music control from the discord channels
 *      tags:
 *          - Music
 *      parameters:
 *          - in: path
 *            name: guildID
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *         '200':
 *           description: Successfull request
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal servor error
 */
router.patch('/control/override/:guildID', bot, async(req, res) => {
    let { guildID } = req.params;
    if (!guildID) res.status(400).send({ error: "Missing guildID" });
    try {
        const queue = await res.ShewenyClient.player.getQueue(guildID);
        if (!queue) return res.status(400).send({ error: "Can't override controls of an empty queue" });
        await queue.setData({ isAPICall: true, voiceChannel: queue.data.voiceChannel, override: !queue.data.override });
        res.status(200).send({ message: "Successfully overrided the music controls" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


module.exports = router;
