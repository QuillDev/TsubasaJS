import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";

export default class Vote extends TsubasaCommand {
    public getName(): string {
        return "vote";
    }
    public getUsage(): string {
        return "vote";
    }
    public getDescription(): string {
        return "Gets Tsubasa's public voting urls!";
    }
    public run(msg: Message, _args: string[]): Promise<any> {
        return sendEmbed(msg,
            "Tsubasa - Vote",
            `Support Tsubasa by voting on the sites below!
            https://top.gg/bot/753764233484828703/vote
            https://dbots.co/bots/753764233484828703/vote`
        );
    }

}