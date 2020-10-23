const TsubasaCommand = require("../../tsubasa/TsubasaCommandHandler");

class Help extends TsubasaCommand {
    get name(){
        return "help";
    }

    get usage(){
        return "help";
    }

    get description(){
        return "Gets the help website.";
    }

    async run(msg){
        return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Help",
            `
            Documentation on all commands can be found here!
            http://quilldev.tech/tsubasa
            `));
    }
}

module.exports = Help;