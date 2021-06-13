import {TsubasaClient} from "./src/tsubasa-bot/client/TsubasaClient";
import {container} from "./src/containers/TsubasaIOC";
import {TYPES} from "./types/TsubasaTypes";
import {config as dotenvConfig} from "dotenv";
import {TsubasaManager} from "./src/manager/TsubasaManager";

dotenvConfig(); //Configure dotenv

//Create the client
const manager = container.get<TsubasaManager>(TYPES.ITsubasaManager);
const client = container.get<TsubasaClient>(TYPES.ITsubasaClient);

//Start in an async context
(async () => {
    //Login to discord
    await manager.init();
    await client.login(process.env.DISCORD_SECRET);

})().catch(console.error);