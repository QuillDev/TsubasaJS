import { Client, ClientOptions } from "discord.js";
import { Shoukaku } from "shoukaku";
import { setClient } from "./helper/embedHelper";
import { MessageHandler } from "./tsubasa-components/MessageHandler";
import { TsubasaMusicHandler } from "./tsubasa-components/music/TsubasaMusicHandler";
import { TsubasaQueue } from "./tsubasa-components/music/TsubasaQueue";


export class TsubasaClient extends Client {

    public shoukaku: Shoukaku;
    public messageHandler: MessageHandler;
    public musicQueue: TsubasaQueue;
    public musicHandler: TsubasaMusicHandler;

    constructor(opts: ClientOptions) {
        super(opts);
        this.messageHandler = new MessageHandler(this);
        this.musicQueue = new TsubasaQueue(this);
        this.musicHandler = new TsubasaMusicHandler(this);

        this.on("ready", () => {
            this._logGuildCount();
            setInterval(() => { this._logGuildCount(); }, 1000 * 60 * 30);
        })
    }

    login(token: string) {
        const loginRes = super.login(token);
        this._setupClientEvents();
        return loginRes;
    }

    _logGuildCount = () => {
        console.log(`[${Date.now()}] [GUILDS]: ${this.guilds.cache.size}`);
    }

    _setupClientEvents = () => {
        setClient(this);
        this.messageHandler.init();
        this.musicHandler.init();
    }
}