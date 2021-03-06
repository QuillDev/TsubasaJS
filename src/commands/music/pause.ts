import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";
import { handlePlayerErr } from "../../helper/playerErrorHelper";

export default class Pause extends TsubasaCommand {
    public getName(): string {
        return "pause"
    }

    public getUsage(): string {
        return "pause";
    }

    public getDescription(): string {
        return "Pauses the player.";
    }

    public async run(msg: Message, _args: string[]): Promise<any> {


        try {
            const player = this.client.tsubasaPlayer;
            if (player.isPaused(msg)) {
                return await sendErrorEmbed(msg, "Tsubasa - Pause",
                    `This player is already paused!
                to resume use \`\`${process.env.PREFIX}resume\`\``);
            }

            //pause the player
            player.pause(msg);

            return await sendEmbed(msg,
                "Tsubasa - Pause",
                `Paused the player! :pause_button:`
            );
        } catch (err) { handlePlayerErr(err, msg) }

    }

}