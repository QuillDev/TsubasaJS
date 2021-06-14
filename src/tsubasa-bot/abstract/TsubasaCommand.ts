import {IExecutableCommand} from "./IExecutableCommand";
import {Message} from "discord.js";
import {TsubasaClient} from "../client/TsubasaClient";

export abstract class TsubasaCommand implements IExecutableCommand {

    protected _client: TsubasaClient;

    protected constructor(client: TsubasaClient) {
        this._client = client;
    }

    abstract get name(): string;

    abstract run(msg: Message, args?: string[]): Promise<any>;
}
