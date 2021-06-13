import {IEventManager} from "./IEventManager";
import * as fg from "fast-glob";
import {join} from "path";
import {inject, injectable} from "inversify";
import {TsubasaClient} from "../../client/TsubasaClient";
import {TYPES} from "../../../../types/TsubasaTypes";
import {ITsubasaEvent} from "../../abstract/ITsubasaEvent";
import {ClientEvent} from "./ClientEvent";

@injectable()
export class EventManager implements IEventManager {

    private _client: TsubasaClient;

    constructor(
        @inject(TYPES.ITsubasaClient) client: TsubasaClient
    ) {
        this._client = client;
    }


    loadEvents = async () => {
        //Patterns for loading commands
        const entries = await fg(`src/tsubasa-bot/events/*.ts`,
            {onlyFiles: true}
        );

        console.info(entries.length)
        //Iterate through all of the entries we loaded
        for (const entry of entries) {

            const path = join(process.cwd(), entry);

            import(path).then((module) => {
                if (module == null) return;

                //Iterate through all the keys in the module
                for (const key of Object.keys(module)) {
                    const entry = module[key]; //get the command

                    //If we're handling a client event, we want to inject the client
                    //into the instructor
                    let command: ITsubasaEvent;
                    if (entry.prototype instanceof ClientEvent) {
                        command = new entry(this._client);
                    } else {
                        command = new entry(); //create an instance of the command
                    }
                    if (command == null) return;

                    //Dynamic event registry
                    console.info(`Added event ${command.trigger}`);
                    this._client.on(command.trigger, (args) => command.run(args));
                }
            }).catch();
        }

    }
}