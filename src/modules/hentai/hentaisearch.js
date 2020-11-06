const got = require('got');
const TsubasaCommand  = require('../../tsubasa-abstract/TsubasaCommand')


//The base URL for danbooru
const base = "https://danbooru.donmai.us";

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

    async run(message, args){
        let response = await this.hentaiSearch(message, args);
        message.channel.send(response)
            .catch(err => this.client.logger.error(this.constructor.name, err));
    }
    /**
     * Returns an embed with hentai from danbooru
     * @param {Message} message - the discord message object
     * @param {String[]} args - the argument array
     */
    async hentaiSearch(message, args) {

        //Create the query to search tags for
        const query = args.join(" ");

        let tagName = "";

        //if no query was given, make this the search url
        if(!query){

        }
        else {
            //get tags from danbooru for the given query
            const tagData = await got.get(`${base}/tags.json?search[name_matches]=${query}*&search[order]=count`)
                .then(function(res) {

                    //if res is null return null
                    if(res == null){
                        return null;
                    }

                    //get the body of the response
                    const body = res.body;

                    //if the body length is 0 return null
                    if(body.length === 0) {
                        return null;
                    }

                    return JSON.parse(body);
                });

            //check if the tag data came back as null
            if(tagData === null){
                return this.client.embedHelper.createErrorEmbed("Tsubasa - Hentai", `An error occurred while getting tags for query ${query}.`);
            }

            //if the length of the data is 0 return an embed saying there was an error
            if(tagData.length === 0){
                return this.client.embedHelper.createErrorEmbed("Tsubasa - Hentai", `No tags found for query ${query}.`);
            }

            tagName = tagData[0].name;
        }

        //Request for actual images from the tags we found.
        const imageData = await got.get(`${base}/posts.json?tags= -rating:safe -rating:questionable ${tagName} &random=true`)
            .then(function(res) {
                //if res is null return null
                if(res == null){
                    return null;
                }

                //get the body of the response
                const body = res.body;

                //if the body length is 0 return null
                if(body.length === 0) {
                    return null;
                }
                return JSON.parse(body);
            });
        //check if the tag data came back as null
        if(imageData === null){
            return this.client.embedHelper.createErrorEmbed("Tsubasa - Hentai", `An error occurred while getting images for query ${query}.`);
        }

        //if the length of the data is 0 return an embed saying there was an error
        if(imageData.length === 0){
            return this.client.embedHelper.createErrorEmbed("Tsubasa - Hentai", `No valid images found for query ${query}. Check danbooru for tags matching your query!`);
        }

        //get a random url
        const url = imageData[Math.floor(Math.random() * imageData.length)]['large_file_url'];

        //if the url is invalid send an error message
        if(url === undefined){
            return this.client.embedHelper.createErrorEmbed("Tsubasa - Hentai", "There was an error in the acquired image, please try again!");
        }

        //if the url is a video, just send it
        if(url.includes("mp4") || url.includes("webm")){
            return `**Tsubasa - Hentai**\n${url}`;
        }

        //create the embed and return it
        return this.client.embedHelper.createEmbed("Tsubasa - Hentai","", url);
    }

}
//Export the command
module.exports = HentaiSearch;
