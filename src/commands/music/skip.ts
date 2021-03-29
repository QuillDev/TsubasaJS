import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";
import { handlePlayerErr } from "../../helper/playerErrorHelper";

export default class Skip extends TsubasaCommand {
    public getName(): string {
        return "skip";
    }
    public getUsage(): string {
        return "skip";
    }
    public getDescription(): string {
        return "Skips the currently playing song.";
    }
    public async run(msg: Message, _args: string[]): Promise<any> {
        try {
            const playing = this.client.tsubasaPlayer.getQueue(msg).songs[0];
            this.client.tsubasaPlayer.skip(msg);
            sendEmbed(msg, "Tsubasa - Skip", `Skipped \`\`${playing.name}\`\`!`);
        }
        catch (err) { handlePlayerErr(err, msg)}

    }
}