import "reflect-metadata";
import {Container, decorate, injectable} from "inversify";
import {TsubasaClient} from "../Client/TsubasaClient";
import {TYPES} from "../../types/TsubasaTypes";
import {ITsubasaClient} from "../Client/ITsubasaClient";
import {BaseClient, Client, ClientOptions} from "discord.js";
import EventEmitter = require("events");
import {clientConfig} from "../Options/TsubasaConfig";

// setup the container
export const container = new Container();

//decorate unreachable classes
decorate(injectable(), EventEmitter);
decorate(injectable(), BaseClient);
decorate(injectable(), Client);

//Bind classes
container.bind<ITsubasaClient>(TYPES.ITsubasaClient).to(TsubasaClient).inSingletonScope();
container.bind<ClientOptions>(TYPES.ClientOptions).toConstantValue(clientConfig);
