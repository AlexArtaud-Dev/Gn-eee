const mongoose = require('mongoose');

const botInformationSchema = new mongoose.Schema({
    botId: {
        type: String,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    shewenyDevMode: {
        type: Boolean,
        default: true,
    },
    language: {
        type: String,
        default: 'en',
        required: true
    },
    appVersion: {
        type: String,
        default: '1.0.0',
    }
})


module.exports = {
    BotInformations: mongoose.model('BotInformations', botInformationSchema),
}
