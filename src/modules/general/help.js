const TsubasaCommand = require("../../tsubasa/TsubasaCommandHandler");
const embedhelper = require("../../utils/TsubasaEmbedHelper");

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
            https://quilldev.github.io/Tsubasa/
            `));
    }
}

module.exports = Help;