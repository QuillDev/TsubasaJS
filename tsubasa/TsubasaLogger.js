const chalk = require('chalk');
const Tsubasa = require('../tsubasa/Tsubasa');

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
    * @param error the error to log
    */
    error(error){
        console.error(`${chalk.bold("[ERROR]")} ${chalk.red(chalk.bold(error))}`);
    }
}

//export the logger
module.exports = {
    TsubasaLogger: TsubasaLogger
}