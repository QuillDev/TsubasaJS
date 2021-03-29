import DisTube = require("distube");
import Queue = require("distube/typings/Queue");
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";
import { TsubasaClient } from "../../TsubasaClient";

export class TsubasaPlayer extends DisTube {
    constructor(client: TsubasaClient) {
        super(client, { searchSongs: true, emitNewSongOnly: true });
        this.init();
    }

    private init() {
        const status = (queue: Queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
        this
            .on("playSong", (msg, queue, song) => {
                sendEmbed(msg,
                    "Tsubasa - Play",
                    `Now Playing: \`\`${song.name}\`\`- \`\`${song.formattedDuration}\`\`
                    ${status(queue)}`
                );
            })
            .on("addSong", (msg, _queue, song) => {
                sendEmbed(msg,
                    "Tsubasa - Play",
                    `Queued: \`\`${song.name}\`\`- \`\`${song.formattedDuration}\`\``
                );
            })
            .on("playList", (msg, queue, playlist, song) => {
                sendEmbed(msg,
                    "Tsubasa - Play",
                    `Playing Playlist: **${playlist.name}** - ${playlist.songs.length} songs.
                    Now Playing: **${song.name}** - **${song.formattedDuration}**
                    ${status(queue)}`
                );
            })
            .on("addList", (msg, _queue, playlist) => {
                sendEmbed(msg,
                    "Tsubasa - Play",
                    `Added Playlist: **${playlist.name}** - ${playlist.songs.length} songs.`
                );
            })
            .on("searchResult", (msg, result) => {
                let i = 0;
                result = result.slice(0, Math.min(result.length, 5));

                let resultString = result.map((song) => {
                    return `**${++i}**. ${song.name} - \`${song.formattedDuration}\``;
                }).join("\n");

                sendEmbed(msg,
                    "Tsubasa - Search",
                    `*Choose which song to play*:
                    ${resultString}`);
            })
            .on("searchCancel", (msg) => {
                sendEmbed(msg, "Tsubasa - Search", `Canceled Search!`);
            })
            .on("error", (msg, e) => {
                console.error(e)
                sendErrorEmbed(msg, "Tsuabsa - Music", `An error occured!\n${e.message}`);
            });
    }
}