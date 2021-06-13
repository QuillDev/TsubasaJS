import {ITsubasaCommand} from "../../abstract/ITsubasaCommand";
import {Message} from "discord.js";

export class Help implements ITsubasaCommand {
    get name(): string {
        return "help";
    }

    async run(msg: Message, args?: string[]): Promise<any> {
        return msg.channel.send("imagine this is help.")
    }

}