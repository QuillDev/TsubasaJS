import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { createEmbed } from "../../helper/embedHelper";

export default class Invite extends TsubasaCommand {
    public getName(): string {
        return "invite";
    }
    public getUsage(): string {
        return "invite";
    }
    public getDescription(): string {
        return "Gets Tsubasa's invite url.";
    }
    public async run(msg: Message, _args: string[]): Promise<any> {

        const baseEmbed = createEmbed();
        baseEmbed.author.name = "Invite Tsubasa!";
        baseEmbed.author.url = "https://discord.com/oauth2/authorize?client_id=753764233484828703&permissions=2147483639&scope=bot";
        msg.channel.send(baseEmbed);
    }
}