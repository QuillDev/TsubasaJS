import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";
import { getMusicComponents } from "../../helper/musicHelper";

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

        //check if the dispatcher is valid
        const { dispatcher } = await getMusicComponents(msg, this.client);
        if (args.length === 0) {
            return await sendErrorEmbed(msg,
                "Tsubasa - Seek",
                "Seek requires a seconds argument!");
        }

        //save the seekpoint and convert it to MS
        const seconds = Number.parseInt(args[0]);
        if (Number.isNaN(seconds)) {
            return await sendErrorEmbed(msg,
                `Tsubasa - Seek", "Invalid argument \`\`${args[0]}\`\``);
        }

        //calculate the seekpoint & try to seek
        const seekPoint = seconds * 1000;
        //if the seek point is out of the acceptable range
        if (seekPoint > dispatcher.current.info.length || seekPoint < 0) {
            return await sendErrorEmbed(msg,
                "Tsubasa - Seek",
                `Your chosen position was not in the range of valid input.`);
        }

        //seek to the point
        dispatcher.player.seekTo(seekPoint)
            .catch(async () => await sendErrorEmbed(msg,
                "Tsubasa - Seek",
                "There was an error when seeking the track."));

        //send the message to the channel, don't worry about awaiting it
        return await sendEmbed(msg, "Tsubasa Seek", `Seeked to ${seconds} seconds!`);
    }
}