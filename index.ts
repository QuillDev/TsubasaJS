import {TsubasaClient} from "./src/Client/TsubasaClient";
import {container} from "./src/Containers/TsubasaIOC";
import {TYPES} from "./types/TsubasaTypes";
import {config as dotenvConfig} from "dotenv";

dotenvConfig(); //Configure dotenv

//Create the client
const client = container.get<TsubasaClient>(TYPES.ITsubasaClient);

//Start in an async context
(async () => {
    //Login to discord
    await client.login(process.env.DISCORD_SECRET);
})().catch(console.error);