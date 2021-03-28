import { TsubasaClient } from "../TsubasaClient";

export class VoiceStateHandler {
    constructor(client: TsubasaClient) {
        client.on("voiceStateUpdate", async (state) => {
            const dispatcher = await client.musicQueue.dispatcherExists(state.guild);
            if (!dispatcher) { return; }
            if (state.channelID !== dispatcher.player.voiceConnection.voiceChannelID) { return; }

            //get the voice channel
            const channel = state.channel;
            if (channel.members.filter((member) => !member.user.bot).size === 0) {
                dispatcher.destroy("No members left in the channel");
            }
        });
    }
}