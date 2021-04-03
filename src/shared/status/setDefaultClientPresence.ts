import { Client } from "discord.js";
import { setClientPresence } from "./setClientPresence";

export const setDefaultStatus = async (client: Client) => {
    await setClientPresence(client, {
        activity: {
            name: "t>help",
            type: "CUSTOM_STATUS"
        }, status: "online"
    });
}
