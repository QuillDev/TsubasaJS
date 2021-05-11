import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";
import { handlePlayerErr } from "../../helper/playerErrorHelper";

export default class vaporwave extends TsubasaCommand {

    public getName(): string {
        return "vaporwave"
    }

    public getUsage(): string {
        return "vaporwave"
    }

    public getDescription(): string {
        return "vaporwave"
    }

    public async run(msg: Message, _args: string[]): Promise<any> {
        try {
            let filter = this.client.tsubasaPlayer.setFilter(msg, "vaporwave");
            await sendEmbed(msg, "Tsubasa - Vaporwave", `Applied the \`\`${filter}\`\` filters.`);
        } catch (err) { handlePlayerErr(err, msg) }

    }
}