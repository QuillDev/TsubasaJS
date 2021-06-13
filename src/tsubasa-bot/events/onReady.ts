import {ClientEvent} from "../components/event-manager/ClientEvent";
import {TsubasaClient} from "../client/TsubasaClient";

export class OnReady extends ClientEvent {
    get trigger(): string {
        return "ready";
    }

    run = async (): Promise<any> => {
        console.info(`Logged in as ${this._client.user?.username}`);
    }

}