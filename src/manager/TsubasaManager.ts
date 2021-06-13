import {inject, injectable} from "inversify";
import {TsubasaClient} from "../tsubasa-bot/client/TsubasaClient";
import {TYPES} from "../../types/TsubasaTypes";
import {ITsubasaManager} from "./ITsubasaManager";
import {CommandManager} from "../tsubasa-bot/components/command-manager/CommandManager";
import {ICommandManager} from "../tsubasa-bot/components/command-manager/ICommandManager";
import {EventManager} from "../tsubasa-bot/components/event-manager/EventManager";
import {IEventManager} from "../tsubasa-bot/components/event-manager/IEventManager";


@injectable()
export class TsubasaManager implements ITsubasaManager {

    private readonly _client: TsubasaClient;
    private readonly _commandLoader: ICommandManager;
    private readonly _eventManager: IEventManager;

    constructor(
        @inject(TYPES.ITsubasaClient) client: TsubasaClient,
        @inject(TYPES.ICommandManager) commandLoader: CommandManager,
        @inject(TYPES.IEventManager) eventManager: EventManager,
    ) {
        this._client = client;
        this._commandLoader = commandLoader;
        this._eventManager = eventManager;
    }

    init = async () => {
        await this._commandLoader.loadCommands();
        await this._eventManager.loadEvents();
    }
}