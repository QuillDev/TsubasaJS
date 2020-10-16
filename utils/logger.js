const chalk = require('chalk');


/**
 * Log general info messages
 * @param message the message to log
 */
function logInfo(message){
    console.log(chalk.blue(`${chalk.bold("[INFO]")} ${message}`));
}

/**
 * Log stack traces and error messages
 * @param error the error to log
 */
function logError(error){
    console.error(`${chalk.bold("[ERROR]")} ${chalk.red(chalk.bold(error))}`);
}

module.exports = {
    logError: logError,
    logInfo: logInfo
}