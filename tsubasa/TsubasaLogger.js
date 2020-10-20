const chalk = require('chalk');
const Tsubasa = require('./Tsubasa');

//Class for logger that Tsubasa uses
class TsubasaLogger {
    /**
     * Constructor for Tsubasa Logger using the client.
     * @param {Tsubasa} client 
     */
    constructor(client){
        this.client = client;
    }

    /**
     * Logs a message
     * @param {String} message 
     */
    log(message){
        //log the message to the console
        console.log(chalk.blue(`${chalk.bold("[INFO]")} ${message}`));
    }

    /**
    * Log stack traces and error messages
    * @param {Error} error the error to log
    */
    error(error){
        console.error(`${chalk.bold("[ERROR]")} ${chalk.red(chalk.bold(error) + `\n` +error.stack)}`);
    }

    /**
     * Logs a debug message
     * @param {String} constructor
     * @param {String} message
     */
    debug(constructor, message){
        console.log(chalk.blueBright(`${chalk.bold(`[DEBUG] [${constructor}]`)} - ${message}`));
    }
}

//export the logger
module.exports = TsubasaLogger;