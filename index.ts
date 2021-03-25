import { TsubasaClient } from "./src/TsubasaClient";

require("dotenv").config();

new TsubasaClient({shardCount: 1})
.login(process.env.DISCORD_SECRET)
.catch((err) => console.error(err));