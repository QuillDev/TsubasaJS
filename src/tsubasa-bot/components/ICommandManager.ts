import {ITsubasaCommand} from "../abstract/ITsubasaCommand";

export interface ICommandManager {

    get getCommandMap(): Map<String, ITsubasaCommand>;

    loadCommands(): Promise<void>; // Require a load commands method
}