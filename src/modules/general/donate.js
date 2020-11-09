const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");

class Donate extends TsubasaCommand {

    get name(){
        return "donate";
    }

    get usage(){
        return "donate";
    }

    get description(){
        return "Gets donation url for Tsubasa";
    }

    async run(msg){
        return await msg.channel.send(this.client.embedHelper.createEmbed(
            "Tsubasa - Donate",
            `Donate to QuillDev on Ko-Fi!
            https://ko-fi.com/quilldev`,
            "https://avatars1.githubusercontent.com/u/29633071"));
    }
}

module.exports = Donate;