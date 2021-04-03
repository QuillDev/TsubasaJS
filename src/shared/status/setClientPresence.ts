import { Client, PresenceData } from "discord.js";

export const setClientPresence = async (client: Client, presence: PresenceData) => {
    await client.user.setPresence(presence);
}
