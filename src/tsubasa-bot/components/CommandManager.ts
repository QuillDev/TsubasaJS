import {inject, injectable} from "inversify";
import {TsubasaClient} from "../client/TsubasaClient";
import {TYPES} from "../../../types/TsubasaTypes";
import {ICommandManager} from "./ICommandManager";
import {join} from "path";
import * as fg from "fast-glob";
import {ITsubasaCommand} from "../abstract/ITsubasaCommand";

@injectable()
export class CommandManager implements ICommandManager {

    private _client: TsubasaClient; //get the tsubasa-bot client
    private readonly _commandMap: Map<String, ITsubasaCommand>;

    constructor(
        @inject(TYPES.ITsubasaClient) client: TsubasaClient
    ) {
        this._client = client;
        this._commandMap = new Map<String, ITsubasaCommand>();
    }

    loadCommands = async (): Promise<void> => {
        //Patterns for loading commands
        const entries = await fg(`src/tsubasa-bot/commands/*/*.ts`,
            {onlyFiles: true}
        );

        //Iterate through all of the entries we loaded
        for (const entry of entries) {

            const path = join(process.cwd(), entry);

            import(path).then((module) => {
                if (module == null) return;

                //Iterate through all the keys in the module
                for (const key of Object.keys(module)) {
                    const entry = module[key]; //get the command
                    const command: ITsubasaCommand = new entry(); //create an instance of the command
                    if (entry == null || command.name == null) return;
                    this._commandMap.set(command.name, command); //add the cmd to the map
                    console.info(`Added command ${command.name}`);
                }
            }).catch();
        }
    }

    get getCommandMap(): Map<String, ITsubasaCommand> {
        return this._commandMap;
    }

}