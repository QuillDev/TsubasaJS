import {IExecutableCommand} from "../../abstract/IExecutableCommand";

export interface ICommandManager {

    get getCommandMap(): Map<String, IExecutableCommand>;

    loadCommands(): Promise<void>; // Require a load commands method
}