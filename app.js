const Discord = require('discord.js');
const glob = require('glob');
const chalk = require('chalk');


//include the custom logger
const logger = require('./utils/logger');

//setup dotenv for local vars
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

/**
 * Find command files and load them by using glob wildcards
 */
glob("modules/*/*.js", {}, function(er, files) {

    //iterate though all of the files found
    for(const file of files){
        const command = require(`./${file}`);

        //log that we loaded a new command
        console.log(chalk.magenta(`[Command Handler] Loaded command ${chalk.bold(command.name)} from file ${chalk.bold(file)}`));

        //add the command to the client
        client.commands.set(command.name, command);
    }
});



/**
 * Triggers when the bot successfully logs in to discord.
 */
client.on('ready', () => {
    logger.logInfo(`Client logged in as ${client.user.username}`);
});

/**
 * Message handler
 */
client.on('message', (message) => {

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
            client.commands.get('hentai').execute(message, args)
                .catch(err => logger.logError(err)); //log the error if one occurs
            break;
        }
        default: message.reply("Fuck man");
    }
});

//try to log the client in, catch errors if they occur
client.login(process.env.DISCORD_TOKEN)
    .catch(err => logger.logError(`Error while logging in!\n${err}`));