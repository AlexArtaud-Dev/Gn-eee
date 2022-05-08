const bot = require("./middlewares/bot");
const axios = require("axios");
const {DISCORD_API_BASE_URL} = require("../../../config");
const {Channel, VoiceChannel} = require("discord.js");
const {isVolumeInvalid} = require("./utils");
const router = require('express').Router();
const app = require('express')();

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
    const { guildID, channelID } = req.params;
    if (!guildID) res.status(400).send({ error: "Missing guildID" });
    if (!channelID) res.status(400).send({ error: "Missing channelID" });
    if (!req.body.searchOrURL) res.status(400).send({ error: "Missing searchOrURL" });
    try {
        const voiceChannel = res.ShewenyClient.guilds.cache.get(guildID).channels.cache.get(channelID);
        if (!voiceChannel) res.status(400).send({ error: "Channel not found, wrong guildID or channelID" });
        if (!(voiceChannel instanceof VoiceChannel)) res.status(400).send({ error: "Channel is not a voice channel" });

        const queue = await res.ShewenyClient.player.createQueue(guildID);
        queue.setData({ isAPICall: true });
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


module.exports = router;
