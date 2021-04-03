import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";
import { handlePlayerErr } from "../../helper/playerErrorHelper";

export default class Playing extends TsubasaCommand {
    public getName(): string {
        return "playing"
    }
    public getUsage(): string {
        return "playing";
    }
    public getDescription(): string {
        return "Gets the currently playing song."
    }
    public async run(msg: Message, _args: string[]): Promise<any> {
        try {
            const queue = this.client.tsubasaPlayer.getQueue(msg);
            if (!queue || queue.songs.length === 0) { throw new Error("No songs in the queue!") }
            const song = queue.songs[0];
            sendEmbed(msg, "Tsubasa - Playing", `**${song.name}** - *${song.formattedDuration}*`, song.thumbnail);
        } catch (err) { handlePlayerErr(err, msg) };

    }

}