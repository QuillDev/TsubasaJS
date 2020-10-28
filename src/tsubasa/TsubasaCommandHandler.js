const glob = require("glob");
const EventEmitter = require("events");
const path = require("path");
const chalk = require("chalk");
const config = require("../../config/config.json");

class TsubasaCommandHandler extends EventEmitter{
    constructor(client) {
        super()
        this.client = client;
        this.commands = new Map();
        this.built = false;
        this.on("error", error => client.logger.error(error));
    }

    async build(){
        //get the module pattern we"re using to match
        const modulePattern = path.join(this.client.location + `/src/modules/*/*.js`);

        //log that we"re loading modules
        this.client.logger.debug(this.constructor.name, `Loading modules using pattern ${modulePattern}`);

        //use glob to search for modules matching the path pattern of our module
        glob(modulePattern, {}, (err, files) => {
            //log how many files we found
            this.client.logger.debug(this.constructor.name, `Found ${files.length} modules!`);

            //Start loading any files that we found
            for(const file of files){

                //load the command from the file
                const command = new (require(file))(this.client);

                //get a prettified name for the file
                const prettyName = file.split("/modules/")[1];

                //add the command
                this.commands.set(command.name, command);

                //get a prettier name for the file
                this.client.logger.fileLogger.info(`[${this.constructor.name}] Loaded command ${command.name}} from ${prettyName}`);
                this.client.logger.logger.info(chalk`{magenta {bold [${this.constructor.name}]} Loaded command {bold ${command.name}} from {bold ${prettyName}}}`)
            }

            //log the amount of commands that we loaded
            this.client.logger.debug(this.constructor.name, `Loaded ${this.commands.size} client command(s)`);
        });

        const bind = this.exec.bind(this);
        this.client.on("message", bind);
        this.built = true;
        return this;
    }

    async exec(msg) {
        try {
            //If the message is from a bot or is not from a text channel return
            if (msg.author.bot || msg.channel.type !== "text") return;

            //if we don"t have permission to send messages, return
            if (!msg.channel.permissionsFor(msg.guild.me).has("SEND_MESSAGES")) return;

            //get the config from the client settings
            const config = await this.client.settings.get(msg.guild.id, true);

            //if the message doesn"t start with the prefix, return
            if (!msg.content.startsWith(config.prefix)) return;

            //split the command and arguments from the message
            const args = msg.content.split(" ");
            let command = args.shift().slice(config.prefix.length);

            //if we don"t have a command that matches the one tried, return
            if (!this.commands.has(command)) return;

            //set the command to the one we found
            command  = this.commands.get(command);

            //check if the command is nsfw and not in an nsfw channel
            if(command.nsfw){
                if(!msg.channel.nsfw){
                    return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - NSFW", "The channel must be set to NSFW to use NSFW commands! To do this look here\nhttps://support.discord.com/hc/en-us/articles/115000084051-NSFW-Channels-and-Content"))
                }
            }

            this.client.logger.logCommand(this.constructor.name, command, msg.channel.guild);
            await command.run(msg, args, config);
        } catch (error) {
            this.emit("error", error);
        }
    }

    //TODO why it mad at dis?
    permissions(msg, perms) {
        if (!Array.isArray(perms)) perms = [perms];
        if (perms.includes("OWNER")){
            return config.owners.includes(msg.author.id);
        }

        return msg.channel.permissionsFor(msg.member).has(perms);
    }
}

module.exports = TsubasaCommandHandler;