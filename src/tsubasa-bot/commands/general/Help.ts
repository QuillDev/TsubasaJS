import {Message} from "discord.js";
import {TsubasaCommand} from "../../abstract/TsubasaCommand";

export class Help extends TsubasaCommand{
    get name(): string {
        return "help";
    }

    async run(msg: Message, args?: string[]): Promise<any> {
        return msg.channel.send("imagine this is help.")
    }

}