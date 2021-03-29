import { Message } from "discord.js";
import { sendErrorEmbed } from "./embedHelper";

export const handlePlayerErr = (err: any, msg: Message) => {
    switch (err.message) {
        case "NotPlaying": sendErrorEmbed(msg, "Tsubasa - Music", "This guild is not playing anything!"); break;
        case "NoSong": sendErrorEmbed(msg, "Tsubasa - Music", "No song to skip to!"); break;
        default: sendErrorEmbed(msg, "Tsubasa - Music", `Error occured! ${err.message}`); break;
    }
}
