const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");


class Test extends TsubasaCommand {
    get name(){
        return "test";
    }

    get usage(){
        return "test";
    }

    get description(){
        return "none";
    }

    async run (msg){
        return await msg.channel.send(`<a:alewd:585959741591650304>`);
    }
}

module.exports = Test;