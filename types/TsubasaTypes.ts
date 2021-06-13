import {ClientOptions} from "discord.js";
import {CommandManager} from "../src/tsubasa-bot/components/CommandManager";
import {TsubasaManager} from "../src/manager/TsubasaManager";
import {TsubasaClient} from "../src/tsubasa-bot/client/TsubasaClient";

export const TYPES = {
    ITsubasaManager: Symbol("TsubasaManager"),
    ICommandManager: Symbol("CommandManager"),
    ITsubasaClient: Symbol("TsubasaClient"),
    ClientOptions: Symbol("ClientOptions")
};