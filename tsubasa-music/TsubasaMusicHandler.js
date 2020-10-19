const {Shoukaku} = require('shoukaku');
const LavalinkServers = require('../config/lavalink-servers.json');
const Options = require('../config/lavalink-options.json');


//Wrapper for Shoukaku that handles Tsubasa music stuff
class TsubasaMusicHandler extends Shoukaku {

    /**
     * Constructor for our Shoukaku wrapper that uses our custom client implementation
     * @param {Tsubasa} client 
     */
    constructor(client) {
        super(client, LavalinkServers, Options);

        //when we connect to the lavalink servers
        this.once('ready', (name, resumed) => {
            client.logger.log(`Lavalink Node ${name} is now connected!`)
        });

        //whenever an error occurs
        this.on('error', (name, err) => {
            client.logger.log(err);
        });

        //executes whenever the connectionc closes
        this.on('close', (name, code, reason) => {
            client.logger.log(`Lavalink Node: ${name} closed with code ${code}`, reason || 'No reason')
        });

        //executes whever the lavalink node is disconnected
        this.on('disconnected', (name, reason) => {
            client.logger.log(`Lavalink Node: ${name} disconnected`, reason || 'No reason')
        });
    }
}

module.exports = {
    TsubasaMusicHandler: TsubasaMusicHandler
}