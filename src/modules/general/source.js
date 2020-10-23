const TsubasaCommand = require("../../tsubasa/TsubasaCommandHandler");

class Source extends TsubasaCommand {
    get name(){
        return "source";
    }

    get usage(){
        return "source";
    }

    get description(){
        return "source";
    }

    async run(msg){
        return await msg.channel.send(
            this.client.embedHelper.createEmbed("Tsubasa - Source",
                `
                You can view Tsubasa's Source here!
                https://quilldev.tech/tsubasa/helper/source
                `
            )
        );
    }
}

module.exports = Source;