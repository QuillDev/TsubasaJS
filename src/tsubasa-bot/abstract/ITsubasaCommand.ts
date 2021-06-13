import {Message} from "discord.js";

export interface ITsubasaCommand {
    get name(): string;

    run(msg: Message, args?: string[]): Promise<any>;
}