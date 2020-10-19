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
        
        });

        //whenever an error occurs
        this.on('error', (name, err) => {

        });
    }
}