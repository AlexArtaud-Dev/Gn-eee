const bot = require("../middlewares/bot");
const axios = require("axios");
const {DISCORD_API_BASE_URL} = require("../../../config");
const router = require('express').Router();

/**
 * @swagger
 * /discord/guild/{guildID}/channels:
 *   get:
 *      description: Get all the channels of a guild by its id
 *      tags:
 *          - Channels
 *      security:
 *          - Bot: []
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
router.get('/:guildID/channels', bot,async(req, res) => {
    const { guildID } = req.params;
    if (!guildID) res.status(400).send({ error: "Missing guildID" });
    try {
        const response = await axios.get(
          DISCORD_API_BASE_URL + `/guilds/${guildID}/channels`,
          {
              headers: {
                  Authorization: `Bot ${req.header("Bot")}`
              }
          }
        )
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})




module.exports = router;
