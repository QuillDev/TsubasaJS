import {Message} from "discord.js";

export interface IExecutableCommand {
    get name(): string;

    run(msg: Message, args?: string[]): Promise<any>;
}