import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";
import { handlePlayerErr } from "../../helper/playerErrorHelper";

export default class Resume extends TsubasaCommand {
    public getName(): string {
        return "resume"
    }

    public getUsage(): string {
        return "resume";
    }

    public getDescription(): string {
        return "Resumes a paused player.";
    }

    public async run(msg: Message, _args: string[]): Promise<any> {

        try {
            const player = this.client.tsubasaPlayer;

            if (!player.isPaused(msg)) {
                return await sendErrorEmbed(msg, "Tsubasa - Resume",
                    `This player is already playing!
                    to pause use \`\`${process.env.PREFIX}pause\`\`.`);
            }

            //pause the player
            player.resume(msg);

            return await sendEmbed(msg,
                "Tsubasa - Resume",
                `Resumed the player! :arrow_forward:`
            );
        } catch (err) { handlePlayerErr(err, msg) }

    }

}