import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand"
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";

export default class Queue extends TsubasaCommand {
    public getName(): string {
        return "queue"
    }
    public getUsage(): string {
        return "queue"
    }
    public getDescription(): string {
        return "Gets the queue for the current player."
    }
    public async run(msg: Message, _args: string[]): Promise<any> {
        const player = this.client.tsubasaPlayer;

        const queue = player.getQueue(msg);
        if (!queue || queue.songs.length === 0) {
            return await sendErrorEmbed(msg, "Tsubasa - Queue", "This guildis not playing anything!");
        }

        const printQueue = queue.songs.slice(0, Math.min(6, queue.songs.length));
        const playing = printQueue.shift();
        let description = `Now Playing: **${playing.name}** - *${playing.formattedDuration}*\n`;
        let i = 1;
        printQueue.forEach((song) => {
            let maxLength = 10;
            let songName = song.name;
            if(songName.length > maxLength + 3) {
                songName = (songName.substring(0, 25) + "...");
            }
            description += `**${i}.** **${songName}** - *${song.formattedDuration}*\n`;
            i++;
        });

        if(queue.songs.length > 6){
            description += `and **${queue.songs.length - 6}** more!`;
        }
        sendEmbed(msg, "Tsubasa - Queue", description);
    }

}