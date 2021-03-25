import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";

export default class Source extends TsubasaCommand {
    public getName(): string {
        return "source"
    }
    public getUsage(): string {
        return "source";
    }
    public getDescription(): string {
        return "Gets the source code for Tsubasa!";
    }
    public run(msg: Message, _args: string[]): Promise<any> {
        return sendEmbed(msg,
            "Tsubasa - Source!",
            `You can view Tsubasa's Source code here!
            https://github.com/quilldev/tsubasajs`,
        );
    }

}