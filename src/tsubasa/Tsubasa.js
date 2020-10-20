const Discord = require('discord.js');

const TsubasaLogger = require("./TsubasaLogger");
const TsubasaEventHandler = require("./TsubasaEventHandler");
const TsubasaQueue = require('../tsubasa-music/TsubasaQueue');
const TsubasaCommandHandler = require('./TsubasaCommandHandler');
const TsubasaSettingsManager = require('./TsubasaSettingsManager');
const TsubasaMusicHandler = require('../tsubasa-music/TsubasaMusicHandler');

const defaults = require('../../config/bot-config.json');

/**
 * Constructor for Tsubasa wrapper on discord.js client
 */
class Tsubasa extends Discord.Client {
    constructor(config) {

        //inherit default discord.client stuff
        super()

        //TODO custom set color
        Object.defineProperty(this, 'location', { value: process.cwd() });
        Object.defineProperty(this, 'color', { value: 0x7E686C });

        //login the bot using the bot token from the config
        this.login(config.token)
            .catch(err => console.log(err));

        //setup command stuff
        this.commands = new Discord.Collection();

        //setup logger
        this.logger = new TsubasaLogger(this);
        this.queue = new TsubasaQueue(this);
        this.settings = new TsubasaSettingsManager(this);
        this.musicHandler = new TsubasaMusicHandler(this);

        //setup handlers for the client
        new TsubasaEventHandler(this).build();
        new TsubasaCommandHandler(this).build();
    }

    get getDefaultConfig(){
        return defaults;
    }
}

module.exports = {
    Tsubasa: Tsubasa
}