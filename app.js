//Load Tsubasa wrapper for discord.js Client
const {Tsubasa} = require('./src/tsubasa/Tsubasa');
//setup dotenv for local vars
require('dotenv').config();

//get the version
const version = process.env.npm_package_version;

//TODO Setup all logging of errors to print the constructor they're from!
//TODO Clean up the play.js file and make it a bit more extendable?
//TODO Change this to use JSON maybe?
let config = {
    //determine which token to use
    token: (process.env.NODE_ENV === "PRODUCTION") ? process.env.DISCORD_TOKEN_LIVE : process.env.DISCORD_TOKEN_TEST,

    //client options to use
    options: {
        shardCount: 1,
    },

    //the version of the bot we're using
    version: version,
}


console.log(process.env.VERSION)
//create the client using the config
new Tsubasa(config);