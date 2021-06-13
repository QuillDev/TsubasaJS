import {ITsubasaEvent} from "../abstract/ITsubasaEvent";

export class Message implements ITsubasaEvent {
    run = async (...args: any[]): Promise<any> => {
        console.info("AHHH");
    }

    get trigger(): string {
        return "message";
    }

}