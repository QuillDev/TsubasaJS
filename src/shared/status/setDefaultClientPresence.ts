import { Client } from "discord.js";
import { setClientPresence } from "./setClientPresence";

export const setDefaultStatus = async (client: Client) => {
    return await setClientPresence(client, {
        activity: {
            name: "for t>help",
            type: "WATCHING"
        }, status: "online"
    });

    //console.log("set user presence");
}
