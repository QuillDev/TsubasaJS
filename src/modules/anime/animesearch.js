const TsubasaCommand  = require('../../tsubasa-abstract/TsubasaCommand')
const animesearch = require("../../services/anime/malSearchService");

//List of emotes
const emotes = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣"];

class AnimeSearch extends TsubasaCommand {
    get name(){
        return "animesearch";
    }

    get usage(){
        return "animesearch [query]";
    }

    get description(){
        return "Sends an embed to the channel with data on the anime";
    }

    async run(msg, args){

        //if there were no arguments
        if(args.length === 0){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Anime Search", "You didn't specify a query to search for"));
        }

        //construct the query by join them using space
        let query = args.join(" ");

        //if the length of the query is 0 then send an error embed
        if(query.length === 0){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Anime Search", "You didn't specify a query to search for"));
        }

        const animeList = await animesearch.search(query);

        if(!animeList){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Anime Search", "Data came back null for the query requested"));
        }

        //iterate through the anime lsit and push eacha animes data to the description
        let description = "Select the show to get data for:\n";
        for(const anime of animeList){
            description += `${animeList.indexOf(anime)+1}) ${anime.name}\n`;
        }

        //send the message
        const searchMessage = await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Anime Search", description));

        //Create a promises array for the emotes
        const reactPromises = [];
        for(const item of animeList){
            const reactPromise = searchMessage.react(emotes[animeList.indexOf(item)])
                .catch();
            reactPromises.push(reactPromise);
        }

        //await reaction promises
        await Promise.all(reactPromises);

        const filter = (reaction, user) => {
            return emotes.includes(reaction.emoji.name) && user.id === msg.author.id;
        };

        await searchMessage.awaitReactions(filter, {max: 1, time: 60000, errors: ['time']})
            .then(collected => {
                const reaction = collected.first();

                const anime = animeList[emotes.indexOf(reaction.emoji.name)];

                const embed = new this.client.discord.MessageEmbed()
                    .setColor(this.client.color)
                    .setTitle("Tsubasa - Anime Search")
                    .setURL(anime.mal_url)
                    .setAuthor("Tsubasa", this.client.user.displayAvatarURL())
                    .setDescription(anime.description)
                    .addFields(
                        {name: "Title", value: anime.name},
                        { name: "Rating", value: `${anime.rating}` }
                        )
                    .setThumbnail(anime.image_url)
                    .setTimestamp()

                searchMessage.edit(embed);

            });
    }
}

module.exports = AnimeSearch;