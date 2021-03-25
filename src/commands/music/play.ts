import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand"
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";
import { checkUrl } from "../../helper/urlHelper";
import { getFirstUrl } from "../../helper/youtubeHelperv2";
import { TsubasaDispatcher } from "../../tsubasa-components/music/TsubasaDispatcher";

export default class Play extends TsubasaCommand {
    public getName(): string {
        return "play";
    }
    public getUsage(): string {
        return "play [song]"
    }
    public getDescription(): string {
        return "Plays the given song"
    }
    public async run(msg: Message, args: string[]): Promise<any> {
        if (!msg.member.voice.channelID) {
            return await sendErrorEmbed(msg, "Tsubasa - Play", "You're not in a voice channel!");
        }

        if (!args[0]) {
            return await sendErrorEmbed(msg, "Tsubasa - Play", "You did not specify a link or query!");
        }

        const query = args.join(" "); //get a query we'll use for searching.
        const socket = this.client.musicHandler.getNode();
        let socketQuery = checkUrl(query) ? query : await getFirstUrl(query);

        const result = await socket.rest.resolve(socketQuery); //get the resolt for the query

        //if the result was bad or invalid
        if (!result) {
            return await sendErrorEmbed(msg, "Tsubasa - Play", `Couldn't find anything for the query ${query}`);
        }

        const { type, tracks, playlistName } = result; //deconstruct our playlist result
        const isPlaylist = type === "PLAYLIST"; //check if the track is a playlist

        if (tracks.length === 0) return await sendErrorEmbed(msg, "Tsubasa - Play", "No tracks found!");

        let dispatcher: TsubasaDispatcher = null;
        for (const track of tracks) {
            const res = await this.client.musicQueue.handle(socket, track, msg); //handle this track in the queue
            if (!dispatcher) dispatcher = res;
        }

        //Send the message saying that we added the playlist
        await sendEmbed(msg, "Tsubasa - Play",
            isPlaylist ?
                `Added the playlist **${playlistName}** to the queue!` :
                `Added the song **${tracks[0].info.title}** to the queue!`
        ).catch(() => null);

        //if we have a dispatcher play the song!
        if (dispatcher) {
            await dispatcher.play();
        }

        return;
    }

}