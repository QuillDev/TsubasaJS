const Discord = require("discord.js");

const TsubasaLogger = require("./TsubasaLogger");
const TsubasaEventHandler = require("./TsubasaEventHandler");
const TsubasaQueue = require("../tsubasa-music/TsubasaQueue");
const TsubasaCommandHandler = require("./TsubasaCommandHandler");
const TsubasaMusicHandler = require("../tsubasa-music/TsubasaMusicHandler");
const TsubasaEmbedHelper = require("../utils/TsubasaEmbedHelper");
const ListManager = require("../botlists/ListManager");

const defaults = require("../../config/bot-config.json");

/**
 * Constructor for Tsubasa wrapper on discord.js client
 */
class Tsubasa extends Discord.Client {
    constructor(config) {

        //inherit default discord.client stuff
        super(config.options)

        //Define custom properties
        Object.defineProperty(this, "location", {
            value: process.cwd()
        });
        Object.defineProperty(this, "color", {
            value: "0xc375ff"
        });

        //login the bot using the bot token from the config
        this.login(config.token)
            .catch( (err) => this.logger.error(this.constructor.name, err));

        //get the version
        this.version = config.version;

        //setup command stuff
        this.commands = new Discord.Collection();

        //setup logger
        this.logger = new TsubasaLogger(this);
        this.queue = new TsubasaQueue(this);
        this.musicHandler = new TsubasaMusicHandler(this);
        this.embedHelper = new TsubasaEmbedHelper(this);
        this.listManager = new ListManager(this)
        this.discord = Discord;

        //build the handlers
        new TsubasaEventHandler(this).build();
        new TsubasaCommandHandler(this).build().catch(err => this.logger.error(this.constructor.name, err));
    }

    get getDefaultConfig() {
        return defaults;
    }
}

module.exports = {
    Tsubasa: Tsubasa
}