import { Client } from "discord.js";
import { Shoukaku } from "shoukaku";
import * as LavalinkServers from "../../../config/lavalink-servers.json";
import * as ShoukakuOptions from "../../../config/shoukaku-options.json";

export class TsubasaMusicHandler extends Shoukaku {
    constructor(client: Client) {
        super(client, LavalinkServers, ShoukakuOptions);
        this.client = client;
    }

    init() {
        this.on('ready', (name) => console.log(`Lavalink ${name}: Ready!`));
        this.on('error', (name, error) => console.error(`Lavalink ${name}: Error Caught,`, error));
        this.on('close', (name, code, reason) => console.warn(`Lavalink ${name}: Closed, Code ${code}, Reason ${reason || 'No reason'}`));
        this.on('disconnected', (name, reason) => console.warn(`Lavalink ${name}: Disconnected, Reason ${reason || 'No reason'}`));
    }
}