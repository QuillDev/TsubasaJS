const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");

class Purge extends TsubasaCommand {
    get name(){
        return "purge";
    }

    get usage() {
        return "purge [?user]";
    }

    get description(){
        return "Mass deletes messages from a user";
    }

    async run(msg, args){
        //TODO Implement
    }
}

module.exports = Purge;