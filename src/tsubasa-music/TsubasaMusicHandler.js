const {Shoukaku} = require("shoukaku");
const LavalinkServers = require("../../config/lavalink-servers.json");
const Options = require("../../config/lavalink-options.json");


//Wrapper for Shoukaku that handles Tsubasa music stuff
class TsubasaMusicHandler extends Shoukaku {

    /**
     * Constructor for our Shoukaku wrapper that uses our custom client implementation
     * @param {Tsubasa} client
     */
    constructor(client) {
        constructor(client)
        {
            super(client, LavalinkServers, Options);
            this.client = client;

            this.on("ready",
                (name, resumed) =>
                    client.logger.log(`LavaLink Node: ${name} is now connected`)
            );
            this.on("error",
                (name, err) =>
                    client.logger.error(this.constructor.name, err)
            );
            this.on("close",
                (name, code) =>
                    client.logger.log(`LavaLink Node: ${name} closed with code ${code}`)
            );
            this.on("disconnected",
                (name) =>
                    client.logger.log(`LavaLink Node: ${name} disconnected`)
            );
        }
    }
}

module.exports = TsubasaMusicHandler;