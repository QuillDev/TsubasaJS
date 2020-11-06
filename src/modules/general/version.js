const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");

class version extends TsubasaCommand {
    get name(){
        return "version";
    }

    get usage() {
        return "version"
    }

    get description(){
        return "Gets the bots patch notes"
    }

    async run(msg){
        return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Version", "Tsubasa patches and updates can be found here!\nhttps://quilldev.tech/tsubasa/changes"))
    }
}

module.exports = version;