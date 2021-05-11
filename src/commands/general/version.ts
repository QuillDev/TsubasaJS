import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";

export default class Version extends TsubasaCommand {
    public getName(): string {
        return "version";
    }
    
    public getUsage(): string {
        return "version";
    }

    public getDescription(): string {
        return "Gets the current active version of Tsubasa!";
    }

    public run(msg: Message, _args: string[]): Promise<any> {
        return sendEmbed(msg,
            `Tsubasa - v${process.env.npm_package_version}`,
            `Tsubasa patches and updates can be found here!
            https://quill.moe/tsubasa/changes`
        );
    }

}