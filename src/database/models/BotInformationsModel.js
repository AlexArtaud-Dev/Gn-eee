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
    }
})


module.exports = {
    BotInformations: mongoose.model('BotInformations', botInformationSchema),
}
