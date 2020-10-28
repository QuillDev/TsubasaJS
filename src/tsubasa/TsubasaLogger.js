const chalk = require("chalk");
const Tsubasa = require("./Tsubasa");
const winston = require("winston");
//Class for logger that Tsubasa uses
class TsubasaLogger {
    /**
     * Constructor for Tsubasa Logger using the client.
     * @param {Tsubasa} client 
     */
    constructor(client){
        this.client = client;

        //Logger that logs to local files
        this.fileLogger = winston.createLogger({
            level: "info",
            format: winston.format.json(),
            transports: [
                new winston.transports.File({filename: "./logs/errors.log", level: "error"}),
                new winston.transports.File({filename: './logs/latest.log'}),
            ],
        });

        //logger for actually logging console stuff uses chalk for readability and prettiness
        this.logger = winston.createLogger({
            level: "debug",
            format: winston.format.json(),
            transports: [
                new winston.transports.Console({format: winston.format.simple()})
            ],
        });
    }

    /**
     * Logs a message
     * @param {String} message 
     */
    log(message){
        //log the message to the console
        this.fileLogger.info(`[INFO]${message}`);
        this.logger.info(chalk.blue(`${chalk.bold("[INFO]")} ${message}`))
    }

    /**
    * Log stack traces and error messages
    * @param {Error} error the error to log
    */
    error(error){
        this.fileLogger.error(`[ERROR]\n${error.stack}`);
        this.logger.error(chalk`{red [ERROR]\n{bold ${error.stack}}}`)
    }

    /**
     * Logs a debug message
     * @param {String} constructor
     * @param {String} message
     */
    debug(constructor, message){
        this.fileLogger.info(`[DEBUG] ${constructor} - ${message}`);
        this.logger.debug(chalk.blueBright(`${chalk.bold(`[DEBUG] [${constructor}]`)} - ${message}`));
    }

    logCommand(constructor, command, guild){
        //this.constructor.name, `Executed command ${command.name} in guild Name: ${msg.channel.guild.name} | ID: ${msg.channel.guild.id}`)
        this.fileLogger.info(`[COMMAND] ${constructor} - Executed command ${command.name}`);
        this.logger.debug(chalk`{blue [${constructor}] [COMMAND] Executed command {bold ${command.name}} in Guild [ Name: {bold ${guild.name}} | ID: {bold ${guild.id}}} ]`);
    }
}

//export the logger
module.exports = TsubasaLogger;