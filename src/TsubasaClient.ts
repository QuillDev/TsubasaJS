import { Client, ClientOptions } from "discord.js";
import { Shoukaku } from "shoukaku";
import { setClient } from "./helper/embedHelper";
import { MessageHandler } from "./tsubasa-components/MessageHandler";
import { VoiceStateHandler } from "./tsubasa-components/VoiceStateHandler";
import DisTube = require("distube");
import { TsubasaPlayer } from "./tsubasa-components/Music/TsubasaPlayer";

export class TsubasaClient extends Client {

    public shoukaku: Shoukaku;
    public messageHandler: MessageHandler;
    public tsubasaPlayer: TsubasaPlayer;

    constructor(opts: ClientOptions) {
        super(opts);

        // envent handlers
        // TODO: Break these out into their own file
        this.messageHandler = new MessageHandler(this);
        new VoiceStateHandler(this);
        this.tsubasaPlayer = new TsubasaPlayer(this);
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
    }
}