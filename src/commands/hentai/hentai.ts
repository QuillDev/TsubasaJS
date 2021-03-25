import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { BooruType, getImage } from "../../helper/danbooruHelper";
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";

export default class Hentai extends TsubasaCommand {

    nsfw = true;
    public getName(): string {
        return "hentai";
    }
    public getUsage(): string {
        return "hentai [?query]";
    }
    public getDescription(): string {
        return "Gets a hentai image matching the given query.";
    }
    public async run(msg: Message, args: string[]): Promise<any> {
        return await getImage(args, BooruType.NSFW)
        .then(res => {
            sendEmbed(msg, "Tsubasa - Hentai", "", res);
        })
        .catch((err) => sendErrorEmbed(msg, "Tsubasa - NSFW", `Error when getting image ${err}`));
    }

}