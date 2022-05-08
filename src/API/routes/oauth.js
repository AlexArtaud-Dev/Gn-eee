const axios = require("axios");
const router = require('express').Router();
const url = require('url');
const { CLIENT_ID, CLIENT_SECRET } = require('../../../config');

/**
 * @swagger
 * /auth/discord/redirect:
 *   get:
 *      description: Redirect to the OAuth provider (Can't be accessed directly)
 *      tags:
 *          - Oauth2
 *      responses:
 *         '200':
 *           description: Successfull Redirect
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal servor error
 */
router.get('/redirect', async(req, res) => {
    const { code } = req.query;
    if (code) {
        try {
            const formData = new url.URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code.toString(),
                redirect_uri: 'https://localhost:5000/api/auth/discord/redirect'
            })
            const response = await axios.post(
              'https://discord.com/api/v8/oauth2/token',
              formData.toString(),
              {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  }
              }
            )
            res.status(200).send(response.data);
        }catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    } else {
        res.status(400).json({
            message: 'Code is required'
        })
    }
})

/**
 * @swagger
 * /auth/discord/redirect:
 *   get:
 *      description: Redirect to the OAuth provider (Can't be accessed directly)
 *      tags:
 *          - Oauth2
 *      responses:
 *         '200':
 *           description: Successfull Redirect
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal servor error
 */
router.get('/revoke', async(req, res) => {
    const { code } = req.query;
    if (code) {
        try {
            const formData = new url.URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code.toString(),
                redirect_uri: 'https://localhost:5000/api/auth/discord/redirect'
            })
            const response = await axios.post(
              'https://discord.com/api/v8/oauth2/token',
              formData.toString(),
              {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  }
              }
            )
            res.status(200).send(response.data);
        }catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    } else {
        res.status(400).json({
            message: 'Code is required'
        })
    }
})


module.exports = router;
