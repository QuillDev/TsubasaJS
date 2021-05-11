import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand"

export default class Play extends TsubasaCommand {
    public getName(): string {
        return "play";
    }
    public getUsage(): string {
        return "play [song]"
    }
    public getDescription(): string {
        return "Plays the given song"
    }
    public async run(msg: Message, args: string[]): Promise<any> {
        this.client.tsubasaPlayer.play(msg, args.join(" "));
    }

}