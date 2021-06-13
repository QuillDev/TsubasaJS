import {inject, injectable} from "inversify";
import {TsubasaClient} from "../tsubasa-bot/client/TsubasaClient";
import {TYPES} from "../../types/TsubasaTypes";
import {ITsubasaManager} from "./ITsubasaManager";
import {CommandManager} from "../tsubasa-bot/components/CommandManager";
import {ICommandManager} from "../tsubasa-bot/components/ICommandManager";


@injectable()
export class TsubasaManager implements ITsubasaManager {

    private readonly _client: TsubasaClient;
    private readonly _commandLoader: ICommandManager;

    constructor(
        @inject(TYPES.ITsubasaClient) client: TsubasaClient,
        @inject(TYPES.ICommandManager) commandLoader: CommandManager
    ) {
        this._client = client;
        this._commandLoader = commandLoader;
    }

    init = async () => {
        await this._commandLoader.loadCommands();
    }
}