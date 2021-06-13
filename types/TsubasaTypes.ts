import {ClientOptions} from "discord.js";
import {EventManager} from "../src/tsubasa-bot/components/event-manager/EventManager";
import {CommandManager} from "../src/tsubasa-bot/components/command-manager/CommandManager";
import {TsubasaManager} from "../src/manager/TsubasaManager";
import {TsubasaClient} from "../src/tsubasa-bot/client/TsubasaClient";

export const TYPES = {
    ITsubasaManager: Symbol("TsubasaManager"),
    ICommandManager: Symbol("CommandManager"),
    ITsubasaClient: Symbol("TsubasaClient"),
    IEventManager: Symbol("EventManager"),
    ClientOptions: Symbol("ClientOptions")
};