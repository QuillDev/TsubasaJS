import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";
import { getMusicComponents } from "../../helper/musicHelper";

export default class Pause extends TsubasaCommand {
    public getName(): string {
        return "pause"
    }
    
    public getUsage(): string {
        return "pause";
    }

    public getDescription(): string {
        return "Pauses or resumes the player depending on the state.";
    }

    public async run(msg: Message, _args: string[]): Promise<any> {
        //check if the dispatcher is valid
        const { dispatcher } = await getMusicComponents(msg, this.client);

        const paused = dispatcher.player.paused;

        //invert the pause state of the player
        await dispatcher.player.setPaused(!paused);

        //if the player is paused unpause the player
        if (paused) {
            return await sendEmbed(msg, "Tsubasa - Pause", ":arrow_forward: Unpaused the player!");
        }

        //otherwise pause the player
        return await sendEmbed(msg, "Tsubasa - Pause", ":pause_button:  Paused the player!");
    }

}