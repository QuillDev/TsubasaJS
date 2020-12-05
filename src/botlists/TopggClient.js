const DBL = require("dblapi.js");

class TopggClient {
    constructor(client) {
        this.client = client;
        this.dblClient = new DBL(process.env.TOPGG_KEY, client);
    }

    /**
     * Post the guild count to top.gg
     * @returns {Promise<void>}
     */
    async postCount(){
        await this.dblClient.postStats(client.guilds.cache.size);
    }
}

module.exports = TopggClient;