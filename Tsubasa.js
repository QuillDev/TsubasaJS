const Discord = require('discord.js');
const {CommandHandler} = require('./utils/CommandHandler')
const logger = require("./utils/logger");

/**
 * Constructor for Tsubasa wrapper on discord.js client
 */
class Tsubasa extends Discord.Client{
    constructor(config) {

        //inherit default discord.client stuff
        super()

        //login the bot using the bot token from the config
        this.login(config.token)
            .catch(err => console.log(err));

        //create commands collection
        this.commands = new Discord.Collection();

        //dynamically load commands for the bot
        this.commandHandler = new CommandHandler(this);

        //ready event
        this.on('ready', () => {
            logger.logInfo(`Client logged in as ${this.user.username}`);
        });

        //message handler
        this.on('message', (msg) => this.commandHandler.resolve(msg));
    }
}

module.exports = {
    Tsubasa : Tsubasa
}