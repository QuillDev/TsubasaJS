const chalk = require('chalk');
const glob = require("glob");
const path = require("path");

class TsubasaCommandHandler {
    /**
     * Constructor for command handler
     * @param {Tsubasa} client
     */
    constructor(client) {
        this.client = client;
        registerDynamic(client);
    }
    /**
     * Function for resolving the command that should be used for the given query
     * @param client - the client to execute the command on
     * @param message - the message send to the channel
     */
    resolve(message){
        //make sure the message is valid (starts with prefix and isn't from a bot)
        if (!message.content.startsWith(process.env.DISCORD_PREFIX) || message.author.bot) return;

        //parse args from the message
        const args = message.content.slice(process.env.DISCORD_PREFIX.length).trim().split(/ +/);

        //get the command.
        const command = args.shift().toLowerCase();

        //switch to find matches for the command
        switch(command){

            //executes the hentai command
            case 'hentai': {
                this.client.commands.get('hentai').execute(message, args)
                    .catch(err => logger.logError(err)); //log the error if one occurs
                break;
            }
            default: message.reply("Fuck man");
        }
    }
}

/**
 * Dynamically register commands for the client
 * @param {Tsubasa} client the Tsubasa client to register to.
 */
function registerDynamic(client) {
    /**
     * Find command files and load them by using glob wildcards
     */
    glob(path.join(__dirname, "../modules/*/*.js"), {}, function(er, files) {
        //iterate though all of the files found
        for(const file of files){

            //require the file and load it as a command
            const command = require(file);

            //get a pretty name to print into the console, purely cosmetic
            const printName = "/modules/" + file.split("/modules/")[1];

            //log that we loaded a new command
            client.logger.log(chalk.magenta(`[Command Handler] Loaded command ${chalk.bold(command.name)} from file ${chalk.bold(printName)}`))

            //add the command to the client
            client.commands.set(command.name, command);
        }
    });
}

module.exports = {
    TsubasaCommandHandler: TsubasaCommandHandler,
}