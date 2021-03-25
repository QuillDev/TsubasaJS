import { Guild, Message } from "discord.js";
import { ShoukakuSocket, ShoukakuTrack } from "shoukaku";
import { TsubasaClient } from "../../TsubasaClient";
import { TsubasaDispatcher } from "./TsubasaDispatcher";

export class TsubasaQueue extends Map<string, TsubasaDispatcher> {

    private client: TsubasaClient;
    constructor(client: TsubasaClient) {
        super();
        this.client = client;
    }

    handle = async (socket: ShoukakuSocket, track: ShoukakuTrack, msg: Message) => {
        //check if we have an existing player in this guild
        const existing = await this.dispatcherExists(msg.guild);

        //if it does not already exist, create it
        if (!existing) {
            const player = await socket.joinVoiceChannel({
                guildID: msg.guild.id,
                voiceChannelID: msg.member.voice.channelID
            });

            //TODO: Add join log message here
            const dispatcher = new TsubasaDispatcher({
                client: this.client,
                guild: msg.guild,
                channel: msg.channel,
                master: msg.author,
                player
            });

            if (track) {
                dispatcher.queue.push(track); //add the track to that dispatcher's queue
            }
            
            this.set(msg.guild.id, dispatcher); //create an entry for this dispatcher & guild
            return dispatcher;
        }

        existing.queue.push(track);
        return null;

    }

    /**
     * Get whether the current dispatcher exists or not
     * @param guild to check in
     * @returns the dispatcher
     */
    dispatcherExists = async (guild: Guild) => {
        return this.get(guild.id);
    }
}