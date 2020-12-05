const {post} = require("got");

class DbotsggClient {

    constructor(client) {
        this.client = client;
    }

    /**
     * Updates count on discord.bots.gg
     * @returns {Promise<void>}
     */
    async postCount(){

        //post our currnet guild count to discord.bots
        const {body} = await post(`https://discord.bots.gg/api/v1/bots/${this.client.user.id}/stats`, {
            headers: {
                "Authorization": process.env.DBGG_KEY,
            },
            json: {
                guildCount: this.client.guilds.cache.size,
            }
        }).catch(err => this.client.logger.error(this.constructor.name, err));
    }
}



module.exports = DbotsggClient;