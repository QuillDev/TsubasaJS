import { DMChannel, Guild, NewsChannel, TextChannel, User } from "discord.js";
import { PlayerClosedEvent, ShoukakuError, ShoukakuPlayer, ShoukakuTrack } from "shoukaku";
import { sendEmbedToChannel } from "../../helper/embedHelper";
import { TsubasaClient } from "../../TsubasaClient";

interface TsubasaDispatcherOptions {
    client: TsubasaClient;
    guild: Guild;
    channel: TextChannel | DMChannel | NewsChannel;
    player: ShoukakuPlayer;
    master: User;
}

export class TsubasaDispatcher {

    private client: TsubasaClient;
    public guild: Guild;
    public channel: TextChannel | DMChannel | NewsChannel;
    public player: ShoukakuPlayer;
    public master: User;
    public queue: ShoukakuTrack[];
    public radio: boolean;
    public current: ShoukakuTrack;

    constructor(options: TsubasaDispatcherOptions) {
        this.client = options.client;
        this.guild = options.guild;
        this.channel = options.channel;
        this.player = options.player;
        this.master = options.master;
        this.queue = [];
        this.radio = false;
        this.current = null;

        this.player.on("start", () => {
            sendEmbedToChannel(this.channel, "Tsubasa - Music", `Now Playing: **${this.current.info.title}**`)
                .catch(() => null);
        });

        this.player.on("end", async () => {
            this.play()
                .catch((_err) => {
                    this.queue.length = 0;
                    this.destroy("Next song failed to play");
                    //TODO: Log the error here!
                });
        });

        this.player.on("error", (d) => this.handleErrorEvent(d));
        this.player.on("closed", (d) => this.handleErrorEvent(d));
        this.player.on("nodeDisconnect", (d) => this.handleErrorEvent(d));
    }

    private handleErrorEvent = (data: ShoukakuError | Error | PlayerClosedEvent) => {
        //TODO: Log the error
        this.queue.length = 0;
        this.destroy();
    }

    //get whether this dispatcher exists
    get exists() {
        return this.client.musicQueue.has(this.guild.id);
    }

    play = async () => {
        //if the player does not exist, destroy it!
        if (!this.exists) {
            return this.destroy("Player does not exist");
        }

        this.current = this.queue.shift(); //move to the next song in the queue

        //if the current is null, destroy the player
        if (!this.current) {
            this.destroy("No valid songs!");
            return;
        }

        //play the current track
        await this.player.playTrack(this.current.track);
    }

    destroy = (reason?: string) => {
        console.debug(this.constructor.name, `Destroyed the player dispatcher for guild ${this.guild.name}: ID: "${this.guild.id} | Reason: ${reason}"`);

        //set back to defaults
        this.queue.length = 0;
        this.player.disconnect();

        //log that we disconnected
        console.debug(this.player.constructor.name, `Destroyed the player dispatcher for guild ${this.guild.name}: ID: "${this.guild.id}"`);

        //remove this guild from the queueing system
        this.client.musicQueue.delete(this.guild.id);

        //if there was a reason, log that reason
        if (reason) {
            console.debug(this.constructor.name, `Destroyed the player dispatcher for guild ${this.guild.name}: ID: "${this.guild.id}"`);
            //send a message to the channel about leaving due to the queue
            sendEmbedToChannel(this.channel, "Tsubasa - Music", `Left voice channel\n Reason: ${reason}`)
                .catch(() => null);
            return;
        }

        //send a message to the channel about leaving due to the queue
        sendEmbedToChannel(this.channel, "Tsubasa - Music", "Left the channel because the queue has been emptied!")
            .catch(() => null);
    }
}