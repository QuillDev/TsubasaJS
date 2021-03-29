import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";
import { handlePlayerErr } from "../../helper/playerErrorHelper";

export default class autoplay extends TsubasaCommand {

    public getName(): string {
        return "autoplay"
    }

    public getUsage(): string {
        return "autoplay"
    }

    public getDescription(): string {
        return "autoplay"
    }

    public async run(msg: Message, args: string[]): Promise<any> {
        try {
            const autoPlaying = this.client.tsubasaPlayer.toggleAutoplay(msg);
            const desc = `Auto player is now ${autoPlaying ? "**ON**:white_check_mark:" : "**OFF**:octagonal_sign:"}`;
            sendEmbed(msg, "Tsubasa - AutoPlay", desc);
        } catch (err) { handlePlayerErr(err, msg) }

    }
}