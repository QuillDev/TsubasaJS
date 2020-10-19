const Discord = require('discord.js');
const {
    TsubasaCommandHandler
} = require('./TsubasaCommandHandler')
const {
    TsubasaLogger
} = require("./TsubasaLogger");
const {
    TsubasaEventHandler
} = require("./TsubasaEventHandler")

/**
 * Constructor for Tsubasa wrapper on discord.js client
 */
class Tsubasa extends Discord.Client {
    constructor(config) {

        //inherit default discord.client stuff
        super()

        //login the bot using the bot token from the config
        this.login(config.token)
            .catch(err => console.log(err));

        //setup command stuff
        this.commands = new Discord.Collection();

        //setup logger
        this.logger = new TsubasaLogger(this);
        //setup handlers for the client
        new TsubasaEventHandler(this);
        new TsubasaCommandHandler(this);


    }
}

module.exports = {
    Tsubasa: Tsubasa
}