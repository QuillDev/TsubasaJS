const TopggClient = require("./TopggClient");
const DbotsggClient = require("./DbotsggClient");
const DbotscoClient = require("./DbotscoClient");

class ListManager {
    constructor(client) {
        this.topggClient = new TopggClient(client);
        this.dbotsggClient = new DbotsggClient(client);
        this.dbotscoClient = new DbotscoClient(client);
    }

    /**
     * Update all botlists with a current server count
     * @returns {Promise<void>}
     */
    async updateLists(){
        this.topggClient.postCount()
            .then( () => this.client.logger.log("Posted to topgg"))
            .catch(() => this.client.logger.log("Failed to post to topgg"));

        this.dbotsggClient.postCount()
            .then( () => this.client.logger.log("Posted to dbotsgg"))
            .catch(() => this.client.logger.log("Failed to post to dbotsgg"));

        this.dbotscoClient.postCount()
            .then( () => this.client.logger.log("Posted to dbotsco"))
            .catch(() => this.client.logger.log("Failed to post to dbotsco"));
    }
}

module.exports = ListManager;