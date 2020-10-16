//Load Tsubasa wrapper for discord.js Client
const {Tsubasa} = require('./Tsubasa');

//include the custom logger
const logger = require('./utils/logger');

//setup dotenv for local vars
require('dotenv').config();

//TODO Maybe load this from a local file
let config = {
    token: process.env.DISCORD_TOKEN
}

//create the client using the config
const client = new Tsubasa(config);