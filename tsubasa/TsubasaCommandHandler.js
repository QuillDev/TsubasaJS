const glob = require('glob')
const EventEmitter = require("events");
const path = require('path');
const chalk = require('chalk')

class TsubasaCommandHandler extends EventEmitter{
    constructor(client) {
        super()
        this.client = client;
        this.commands = new Map();
        this.built = false;
        this.on('error', error => client.logger.error(error));
    }

    async build(){
        //get the module pattern we're using to match
        const modulePattern = path.join(this.client.location + `/modules/*/*.js`);
        this.client.logger.debug(this.constructor.name, `Loading modules using pattern ${modulePattern}`);

        //use glob to search for modules matching the path pattern of our module
        glob(modulePattern, {}, (err, files) => {
            //log how many files we found
            this.client.logger.debug(this.constructor.name, `Found ${files.length} modules!`);

            //Start loading any files that we found
            for(const file of files){
                const command = new (require(file))(this.client);
                this.commands.set(command.name, command)
                this.client.logger.log(chalk.magenta(`[Command Handler] Loaded command ${chalk.bold(command.name)} from file ${chalk.bold(file)}`), null);
            }
        });

        const bind = this.exec.bind(this);
        this.client.on('message', bind);
        this.client.logger.debug(this.constructor.name, `Loaded ${this.commands.size} client command(s)`);
        this.built = true;
        return this;
    }

    async exec(msg) {
        try {

            //If the message is from a bot or is not from a text channel return
            if (msg.author.bot || msg.channel.type !== 'text') return;

            //if we don't have permission to send messages, return
            if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return;

            //get the config from the client settings
            const config = await this.client.settings.get(msg.guild.id, true);

            //if the message doesn't start with the prefix, return
            if (!msg.content.startsWith(config.prefix)) return;

            //split the command and arguments from the message
            const args = msg.content.split(' ');
            let command = args.shift().slice(config.prefix.length);

            //if we don't have a command that matches the one tried, return
            if (!this.commands.has(command)) return;

            //set the command to the one we found
            command  = this.commands.get(command);

            //check if we have permissions to execute the command
            if (command.permissions && !this.permissions(msg, command.permissions)) {
                await msg.channel.send(`You don't have permission to execute this command.`);
                return;
            }
            await command.run(msg, args, config);
        } catch (error) {
            this.emit('error', error);
        }
    }

    permissions(msg, perms) {
        if (!Array.isArray(perms)) perms = [perms];
        if (perms.includes('OWNER'))
            return config.owners.includes(msg.author.id);
        return msg.channel.permissionsFor(msg.member).has(perms);
    }
}

module.exports = TsubasaCommandHandler;