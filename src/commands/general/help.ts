import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";

export default class Help extends TsubasaCommand {
    public getName(): string {
        return "help";
    }
    public getUsage(): string {
        return "help"
    }
    public getDescription(): string {
        return "Gets the help website for all Tsuabsa commands!";
    }
    public run(msg: Message, _args: string[]): Promise<any> {
        return sendEmbed(msg,
            "Help",
            `Need some help? The official Tsubasa website might help!
            https://quilldev.tech/tsubasa
            `,
            null,
            `https://quilldev.tech/logo192.png`
            );
    }
    
}