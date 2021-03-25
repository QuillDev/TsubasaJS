import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";
import { getMusicComponents } from "../../helper/musicHelper";

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
        const { dispatcher } = await getMusicComponents(msg, this.client);
        sendEmbed(msg, "Tsubasa - Skip", `Skipping ${dispatcher.current.info.title}!`);
        await dispatcher.player.stopTrack(); //stop the current track (which essentially skips it)
        
    }
}