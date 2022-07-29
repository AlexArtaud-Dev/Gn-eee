const mongoose = require("mongoose");
const config = require("../../../config");
const ts = new Date();
const { initialize } = require("./initialization");

async function connect(ShewenyClient) {
    try {
        await mongoose.connect(ShewenyClient.startupArgs.dev ? config.MONGO_DEV_STRING : config.MONGO_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            minPoolSize: 10,
        });
    } catch (error) {
        console.log(`${ts.toLocaleString()} - Error connecting to database: ${error}`);
        process.exit(1);
    }
    console.log(`${ts.toLocaleString()} - App connected to mongoDB cluster ${mongoose.connections[0].host}`)
    await initialize(ShewenyClient);
}

module.exports = {
    connect: connect,
}
