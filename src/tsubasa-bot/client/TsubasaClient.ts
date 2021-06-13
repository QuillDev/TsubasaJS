import {Client, ClientOptions} from 'discord.js';
import {inject, injectable} from "inversify";
import {ITsubasaClient} from "./ITsubasaClient";
import {TYPES} from "../../../types/TsubasaTypes";
import {ICommandManager} from "../components/ICommandManager";


@injectable()
export class TsubasaClient extends Client implements ITsubasaClient {

    constructor(
        @inject(TYPES.ClientOptions) clientOptions: ClientOptions,
    ) {
        super(clientOptions);

        this.on('ready', () => {
            console.info(`Logged in as ${this.user?.username}!`)
        })
    }
}