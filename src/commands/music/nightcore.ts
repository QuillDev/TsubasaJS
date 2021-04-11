import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";
import { handlePlayerErr } from "../../helper/playerErrorHelper";

export default class nightcore extends TsubasaCommand {

    public getName(): string {
        return "nightcore"
    }

    public getUsage(): string {
        return "nightcore"
    }

    public getDescription(): string {
        return "nightcore"
    }

    public async run(msg: Message, _args: string[]): Promise<any> {
        try {
            let filter = this.client.tsubasaPlayer.setFilter(msg, "nightcore");
            await sendEmbed(msg, `Tsubasa - Nightcore", "Applied the \`\`${filter}\`\` filters.`);
        } catch (err) { handlePlayerErr(err, msg) }

    }
}