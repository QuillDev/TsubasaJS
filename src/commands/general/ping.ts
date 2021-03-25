import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { createEmbed, sendEmbed } from "../../helper/embedHelper";

export default class Ping extends TsubasaCommand {
    public getName(): string {
        return "ping"
    }
    public getUsage(): string {
        return "ping"
    }
    public getDescription(): string {
        return "Gets the current client & gateway ping.";
    }
    public async run(msg: Message, _args: string[]): Promise<any> {
        const sent = await msg.channel.send("Pinging Server!");

        sent.edit(createEmbed(
            "Tsubasa - Ping",
            `Command Delay: **${Math.round(sent.createdTimestamp - msg.createdTimestamp)}ms**
            Gateway Ping: **${Math.round(msg.guild.shard.ping)}ms**`
        ));
    }

}