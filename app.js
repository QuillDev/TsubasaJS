//Load Tsubasa wrapper for discord.js Client
const {Tsubasa} = require('./src/tsubasa/Tsubasa');

//setup dotenv for local vars
require('dotenv').config();

let config = {
    token: (process.env.NODE_ENV === "PRODUCTION") ? process.env.DISCORD_TOKEN_LIVE : process.env.DISCORD_TOKEN_TEST
}

//create the client using the config
new Tsubasa(config);