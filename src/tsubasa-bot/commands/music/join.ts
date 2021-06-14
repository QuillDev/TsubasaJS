import {Message} from "discord.js";
import {TsubasaCommand} from "../../abstract/TsubasaCommand";

export class Join extends TsubasaCommand {
    get name(): string {
        return "join";
    }

    run = async (msg: Message, _args?: string[]): Promise<any> => {
        if (!msg.member?.voice.channel) return;
        const connection = await msg.member.voice.channel.join();
    }

}