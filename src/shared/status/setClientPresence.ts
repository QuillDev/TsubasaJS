import { Client, PresenceData } from "discord.js";

export const setClientPresence = async (client: Client, presence: PresenceData) => {
    return await client.user.setPresence(presence);
}
