import { Message } from "discord.js";
import { TsubasaClient } from "../TsubasaClient";

export abstract class TsubasaCommand {
    protected client:TsubasaClient;
    constructor(client:TsubasaClient){
        this.client = client;
    }

    public nsfw = false;
    public abstract getName():string;
    public abstract getUsage():string;
    public abstract getDescription():string;
    public abstract run(msg:Message, args:string[]):Promise<any>;
}