import { Message, MessageReaction, User } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { createEmbed, sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";
import { searchMAL } from "../../helper/malHelper";

const emotes = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣"];

export default class AnimeSearch extends TsubasaCommand {
    public getName(): string {
        return "animesearch"
    }
    public getUsage(): string {
        return "animesearch [query]"
    }
    public getDescription(): string {
        return "Searches for the given anime and provides MAL data on it!"
    }

    public async run(msg: Message, args: string[]): Promise<any> {
        //if there were no arguments
        if (args.length === 0) {
            return await sendErrorEmbed(msg, "Tsubasa - Anime Search", "You didn't specify a query to search for");
        }

        //construct the query by join them using space
        let query = args.join(" ");

        //if the length of the query is 0 then send an error embed
        if (query.length === 0) {
            return await sendErrorEmbed(msg, "Tsubasa - Anime Search", "You didn't specify a query to search for");
        }

        const animeList = await searchMAL(query);

        if (!animeList) {
            return await sendErrorEmbed(msg, "Tsubasa - Anime Search", "Data came back null for the query requested");
        }

        //iterate through the anime lsit and push eacha animes data to the description
        let description = "Select the show to get data for:\n";
        for (const anime of animeList) {
            description += `${animeList.indexOf(anime) + 1}) ${anime.name}\n`;
        }

        //send the message
        const searchMessage = await sendEmbed(msg, "Tsubasa - Anime Search", description);

        //Create a promises array for the emotes
        const reactPromises = [];
        for (const item of animeList) {
            const reactPromise = searchMessage.react(emotes[animeList.indexOf(item)])
                .catch();
            reactPromises.push(reactPromise);
        }

        //await reaction promises
        await Promise.all(reactPromises);

        const filter = (reaction:MessageReaction, user:User) => {
            return emotes.includes(reaction.emoji.name) && user.id === msg.author.id;
        };

        await searchMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();

                const anime = animeList[emotes.indexOf(reaction.emoji.name)];

                const embed = createEmbed()
                    .setTitle("Tsubasa - Anime Search")
                    .setURL(anime.mal_url)
                    .setDescription(anime.description)
                    .addFields(
                        { name: "Title", value: anime.name },
                        { name: "Rating", value: `${anime.rating}` }
                    )
                    .setThumbnail(anime.image_url);

                searchMessage.edit(embed);
            });
    }

}