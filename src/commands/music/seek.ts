import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";
import { getMusicComponents } from "../../helper/musicHelper";
import { handlePlayerErr } from "../../helper/playerErrorHelper";

export default class Seek extends TsubasaCommand {
    public getName(): string {
        return "seek";
    }
    public getUsage(): string {
        return "seek";
    }
    public getDescription(): string {
        return "seek [time:seconds]"
    }
    public async run(msg: Message, args: string[]): Promise<any> {
        //if we got no args, or bad args
        if (!args || args.length === 0) {
            return await sendErrorEmbed(msg, "Tsubasa - Seek", "You did not supply a time to seek to!");
        }
        const seconds = Number.parseInt(args[0]);
        if (Number.isNaN(seconds)) {
            return await sendErrorEmbed(msg, "Tsubasa - Seek", "The time you supplied was invalid.");
        }

        try {
            this.client.tsubasaPlayer.seek(msg, seconds * 1000);
        } catch (err) { handlePlayerErr(err, msg) }


    }
}