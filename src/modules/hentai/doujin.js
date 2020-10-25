const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const doujinScraper = require("../../services/hentai/nhentaiscraper");

class Doujin extends TsubasaCommand {

    //set nsfw to true for this command
    nsfw = true;

    get name(){
        return "doujin";
    }

    get usage(){
        return "doujin [?query]";
    }

    get description(){
        return "Gets a doujin associated with the query";
    }

    async run(msg, args){
        //get the query by joining the args
        const query = args.join(" ");

        //get a random doujin from the first page using the doujin scraper
        const doujin = await doujinScraper.getRandom(query);

        //if the doujin is null send an error
        if(!doujin){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Doujins", "There was an error when geting a doujin for your query."));
        }

        return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Doujin", doujin.url, doujin.image_url));
    }
}

module.exports = Doujin;