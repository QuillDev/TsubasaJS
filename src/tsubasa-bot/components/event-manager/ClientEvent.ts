import {ITsubasaEvent} from "../../abstract/ITsubasaEvent";
import {TsubasaClient} from "../../client/TsubasaClient";

export abstract class ClientEvent implements ITsubasaEvent {

    protected _client: TsubasaClient;

    protected constructor(client: TsubasaClient) {
        this._client = client;
    }

    abstract run(...args: any[]): Promise<any>;

    abstract get trigger(): string;
}