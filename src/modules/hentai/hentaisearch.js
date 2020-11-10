const TsubasaCommand  = require("../../tsubasa-abstract/TsubasaCommand");
const danbooruService = require("../../services/hentai/danbooruservice");

class HentaiSearch extends TsubasaCommand {
    //set this command to be NSFW
    nsfw = true;

    get name(){
        return 'hentai';
    }
    get usage(){
        return 'hentai <query>';
    }

    get description(){
        return 'Searches danbooru for hentai matching the given query!';
    }

    async run(msg, args){
        danbooruService.getImage(args, danbooruService.BooruTypes.NSFW)
            .then(res => {
                msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Hentai", "", res));
            })
            .catch( (err) => msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Hentai", `Error when getting image ${err}`)));
    }

}
//Export the command
module.exports = HentaiSearch;
