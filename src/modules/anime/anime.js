const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const danbooruService = require("../../services/hentai/danbooruservice");

class Anime extends TsubasaCommand {
    get name(){
        return "anime";
    }

    get usage(){
        return "anime [?query]"
    }

    get description(){
        return "Sends a (hopefully) sfw anime image";
    }

    async run(msg, args){
        danbooruService.getImage(args, danbooruService.BooruTypes.SFW)
            .then(res => {
                msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Anime", "", res));
            })
            .catch( (err) => msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Anime", `Error when getting image ${err}`)));
    }
}

module.exports = Anime;