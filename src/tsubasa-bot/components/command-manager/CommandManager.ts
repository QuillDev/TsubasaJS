import {inject, injectable} from "inversify";
import {TsubasaClient} from "../../client/TsubasaClient";
import {TYPES} from "../../../../types/TsubasaTypes";
import {ICommandManager} from "./ICommandManager";
import {join} from "path";
import * as fg from "fast-glob";
import {IExecutableCommand} from "../../abstract/IExecutableCommand";
import {Message} from "discord.js";
import {ITsubasaEvent} from "../../abstract/ITsubasaEvent";
import {ClientEvent} from "../event-manager/ClientEvent";
import {TsubasaCommand} from "../../abstract/TsubasaCommand";

@injectable()
export class CommandManager implements ICommandManager {

    private _client: TsubasaClient; //get the tsubasa-bot client
    private readonly _commandMap: Map<String, IExecutableCommand>;
    private readonly prefix = process.env.PREFIX;

    constructor(
        @inject(TYPES.ITsubasaClient) client: TsubasaClient
    ) {
        this._client = client;
        this._commandMap = new Map<String, IExecutableCommand>();

        this._client.on('message', (msg) => this.listener(msg));
    }

    listener = async (msg: Message) => {
        const author = msg.author; //get the author of the msg
        const rawContent = msg.content; //get the content of the message

        //check invalid cases
        if (author.bot) return; //if the author is a bot, return
        if (rawContent.length == 0) return; //if the message has no length, return
        if (this.prefix == null) return; // if the prefix is null, return
        if (!rawContent.startsWith(this.prefix)) return; //if the msg doesnt start with the prefix

        //Parse the text content
        const content = rawContent.substr(this.prefix.length); //adjust the content
        const args = content.split(" "); //get the command args
        const commandKey = args.shift(); //get the command name
        if (commandKey == null) return; //if there is no name, return out
        const command = this._commandMap.get(commandKey); //get the command

        //run the command
        if (command == null) return;
        await command.run(msg, args); //run the command asynchronously
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

                    let command: IExecutableCommand;
                    if (entry.prototype instanceof TsubasaCommand) {
                        command = new entry(this._client);
                    } else {
                        command = new entry(); //create an instance of the command
                    }
                    if (command == null) return;
                    this._commandMap.set(command.name, command); //add the cmd to the map
                    console.info(`Added command ${command.name}`);
                }
            }).catch();
        }
    }

    get getCommandMap(): Map<String, IExecutableCommand> {
        return this._commandMap;
    }

}