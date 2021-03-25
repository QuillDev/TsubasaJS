import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { getTop } from "../../helper/doujinHelper";
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";

export default class DoujinTop extends TsubasaCommand {

    nsfw = true; //set this module to be nsfw
    public getName(): string {
        return "doujintop";
    }
    public getUsage(): string {
        return "doujintop [?query]";
    }
    public getDescription(): string {
        return "Get the top doujins today for the given query.";
    }
    public async run(msg: Message, args: string[]): Promise<any> {

        //get the top doujins for the given query
        await getTop(args.join(" "))
            .then(async (doujins) => {
                //create the description for the embed
                let place = 1; let description = "";
                doujins.forEach((dj) => { description += `${(place)}) ${dj.url}\n`; place++ });
                //send the message with all of the doujin data
                await sendEmbed(msg,
                    "Tsubasa - Doujintop",
                    description,
                    doujins[0].imageUrl
                );
            })
            //if there was en error, tell the user
            .catch(async (err) => {
                await sendErrorEmbed(msg,
                    "Tsubasa - Doujintop",
                    err);
            })

    }

}