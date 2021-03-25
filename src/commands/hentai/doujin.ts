import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { getRandom } from "../../helper/doujinHelper";
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";

export default class Doujin extends TsubasaCommand {
    nsfw = true;
    public getName(): string {
        return "doujin";
    }
    public getUsage(): string {
        return "doujin [?query]";
    }
    public getDescription(): string {
        return "Gets a random doujin for the given query/tag";
    }
    public async run(msg: Message, args: string[]): Promise<any> {
        await getRandom(args.join(" "))
            .then((res) => {
                sendEmbed(msg,
                    "Tsubasa - Doujin",
                    res.url,
                    res.imageUrl
                );
            })
            .catch((err) => sendErrorEmbed(msg, "Tsubasa - Doujin", err));
    }

}