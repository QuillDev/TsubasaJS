//Load Tsubasa wrapper for discord.js Client
const {Tsubasa} = require('./src/tsubasa/Tsubasa');

//setup dotenv for local vars
require('dotenv').config();

let config = {
    //determine which token to use
    token: (process.env.NODE_ENV === "PRODUCTION") ? process.env.DISCORD_TOKEN_LIVE : process.env.DISCORD_TOKEN_TEST,

    //client options to use
    options: {
        shardCount: 1,
    }
}

//create the client using the config
new Tsubasa(config);