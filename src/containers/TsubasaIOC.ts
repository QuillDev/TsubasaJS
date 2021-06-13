import "reflect-metadata";
import {Container, decorate, injectable} from "inversify";
import {TsubasaClient} from "../tsubasa-bot/client/TsubasaClient";
import {TYPES} from "../../types/TsubasaTypes";
import {ITsubasaClient} from "../tsubasa-bot/client/ITsubasaClient";
import {BaseClient, Client, ClientOptions} from "discord.js";
import EventEmitter = require("events");
import {clientConfig} from "../tsubasa-bot/config/TsubasaConfig";
import {ITsubasaManager} from "../manager/ITsubasaManager";
import {TsubasaManager} from "../manager/TsubasaManager";
import {CommandManager} from "../tsubasa-bot/components/CommandManager";
import {ICommandManager} from "../tsubasa-bot/components/ICommandManager";

// setup the container
export const container = new Container();

//decorate unreachable classes
decorate(injectable(), EventEmitter);
decorate(injectable(), BaseClient);
decorate(injectable(), Client);

//Bind classes
container.bind<ITsubasaManager>(TYPES.ITsubasaManager).to(TsubasaManager).inSingletonScope();
container.bind<ITsubasaClient>(TYPES.ITsubasaClient).to(TsubasaClient).inSingletonScope();
container.bind<ICommandManager>(TYPES.ICommandManager).to(CommandManager).inSingletonScope();
container.bind<ClientOptions>(TYPES.ClientOptions).toConstantValue(clientConfig);
