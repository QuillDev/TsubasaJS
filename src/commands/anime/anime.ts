import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";
import { getImage, BooruType } from "../../helper/danbooruHelper";

export default class Anime extends TsubasaCommand {
    public getName(): string {
        return "anime";
    }
    
    public getUsage(): string {
        return "anime";
    }

    public getDescription(): string {
        return "Get a booru image mathching the given query!";
    }

    public async run(msg: Message, args: string[]): Promise<any> {
        return await getImage(args, BooruType.SFW)
            .then(res => {
                sendEmbed(msg, "Tsubasa - Anime", "", res);
            })
            .catch((err) => sendErrorEmbed(msg, "Tsubasa - Anime", `Error when getting image ${err}`));
    }

}