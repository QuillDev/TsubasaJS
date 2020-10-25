const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const doujinScraper = require("../../services/hentai/nhentaiscraper");

class DoujinTop extends TsubasaCommand {

    //set nsfw to true for this command
    nsfw = true;

    get name(){
        return "doujintop";
    }

    get usage(){
        return "doujintop [?query]";
    }

    get description(){
        return "Gets top 5 doujins associated with the query";
    }

    async run(msg, args){
        //get the query by joining the args
        const query = args.join(" ");

        //get a random doujin from the first page using the doujin scraper
        const doujins = await doujinScraper.getTop(query);

        //if the doujin is null send an error
        if(!doujins){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Doujins", "There was an error when geting a doujin for your query."));
        }

        //if there are no doujins say that the doujin list is empty
        if(doujins.length === 0){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Doujins", "No doujins found for your query."));
        }

        //create description
        let description = "";

        //iterate and add doujin urls
        for(const doujin of doujins){
            description += `${doujins.indexOf(doujin)+1}) ${doujin.url}\n`;
        }

        return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Doujins", description, doujins[0].image_url));
    }
}

module.exports = DoujinTop;