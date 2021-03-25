import { Message } from "discord.js";
import { ShoukakuSocket } from "shoukaku";
import { TsubasaDispatcher } from "../tsubasa-components/music/TsubasaDispatcher";
import { TsubasaClient } from "../TsubasaClient";
import { sendErrorEmbed } from "./embedHelper";

interface MusicComponents {
    socket:ShoukakuSocket;
    dispatcher:TsubasaDispatcher;
}

export const getMusicComponents = async (msg:Message, client:TsubasaClient):Promise<MusicComponents> => {
        //Get the socket
        const socket = client.musicHandler.getNode();
        if(!socket){
            await sendErrorEmbed(msg, "Tsubasa - Queue", "Music server currently unavailable..");
            throw new Error("Music server not available!");
        }

        //Get the dispatcher
        const dispatcher = await client.musicQueue.dispatcherExists(msg.guild);
        if(!dispatcher){
            await sendErrorEmbed(msg, "Tsubasa - Queue", "This guild does not have a player!");
            throw new Error("No player in this guild!")
        }

        return {
            socket,
            dispatcher
        }
}