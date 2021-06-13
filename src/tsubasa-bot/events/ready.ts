import {ITsubasaCommand} from "../abstract/ITsubasaCommand";
import {Message} from "discord.js";
import {ITsubasaEvent} from "../abstract/ITsubasaEvent";

export class Ready implements ITsubasaEvent {

    get trigger(): string {
        return "ready";
    }

    run = async (): Promise<any> => {
        console.info("ran ready cmd");
    }

}