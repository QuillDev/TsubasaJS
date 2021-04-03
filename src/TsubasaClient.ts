import { Client, ClientOptions } from "discord.js";
import { setClient } from "./helper/embedHelper";
import { MessageHandler } from "./tsubasa-components/MessageHandler";
import { VoiceStateHandler } from "./tsubasa-components/VoiceStateHandler";
import { TsubasaPlayer } from "./tsubasa-components/Music/TsubasaPlayer";
import { setDefaultStatus } from "./shared/status/setDefaultClientPresence";

export class TsubasaClient extends Client {

    public messageHandler: MessageHandler;
    public tsubasaPlayer: TsubasaPlayer;

    constructor(opts: ClientOptions) {
        super(opts);

        // event handlers
        // TODO: Break these out into their own file
        this.messageHandler = new MessageHandler(this);
        new VoiceStateHandler(this);
        this.tsubasaPlayer = new TsubasaPlayer(this);
        this.on("ready", () => {
            this._logGuildCount();
            setDefaultStatus(this);
            setInterval(async () => { this._logGuildCount(); await setDefaultStatus(this); }, 1000 * 60 * 30);
        });

        this.on("shardResume", async () => {
            await setDefaultStatus(this);
        });
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