//Load Tsubasa wrapper for discord.js Client
const {Tsubasa} = require('./tsubasa/Tsubasa');

//setup dotenv for local vars
require('dotenv').config();

//TODO Maybe load this from a local file


let live = false;

let config = {
    token: live ? process.env.DISCORD_TOKEN_LIVE : process.env.DISCORD_TOKEN_TEST
}

//create the client using the config
new Tsubasa(config);