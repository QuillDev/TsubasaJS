import {TsubasaCommand} from "../../abstract/TsubasaCommand";
import {Message} from "discord.js";
import * as ytdl from "ytdl-core";
import * as fs from "fs";

export class Play extends TsubasaCommand {
    get name(): string {
        return "play";
    }

    run = async (msg: Message, _args?: string[]): Promise<any> => {
        const member = msg.member;
        if (!member) return;
        const voice = member.voice;
        if (!voice) return;
        const connections = this._client.voice?.connections;
        if (!connections) return;
        if (!connections.has(member.guild.id)) return;

        //Get the connection in that guild
        const connection = connections.get(member.guild.id);
        if (!connection) return;

        //TODO: Work on this later

        const content = ytdl("https://youtu.be/jGRotj8VH8I");
        connection.play(content);
    }

}