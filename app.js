//Load Tsubasa wrapper for discord.js Client
const {Tsubasa} = require('./tsubasa/Tsubasa');

//setup dotenv for local vars
require('dotenv').config();

//TODO Maybe load this from a local file
let config = {
    token: process.env.DISCORD_TOKEN
}

//create the client using the config
new Tsubasa(config);