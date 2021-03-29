import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand"
import { handlePlayerErr } from "../../helper/playerErrorHelper";

export default class Stop extends TsubasaCommand {
    public getName(): string {
        return "stop";
    }
    public getUsage(): string {
        return "stop";
    }
    public getDescription(): string {
        return "Stops the player and disconnects it";
    }
    public async run(msg: Message, _args: string[]): Promise<any> {
        try {
            this.client.tsubasaPlayer.stop(msg);
        } catch (err) { handlePlayerErr(err, msg) }
    }

}