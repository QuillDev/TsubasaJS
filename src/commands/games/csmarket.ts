import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { createEmbed, sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";
import { getMarketEntries } from "../../helper/steamMarketHelper";

export default class CsMarket extends TsubasaCommand {
    public getName(): string {
        return "csmarket";
    }
    public getUsage(): string {
        return "csmarket [?query]";
    }
    public getDescription(): string {
        return "Gets data from the steam market for CSGO";
    }
    public async run(msg: Message, args: string[]): Promise<any> {
        const query = args.join(" ");

        await getMarketEntries(730, query)
            .then((results) => {
                const marketData = results.slice(Math.min(results.length, 5));
                let embed = createEmbed("Tsubasa - CSMarket", "", null, marketData[0].img);

                marketData.forEach((item) => {
                    embed.addField(item.name, item.price);
                });

                msg.channel.send(embed);
            })
            .catch((err) => sendErrorEmbed(msg, "Tsubasa - CSMarket", err));
    }

}