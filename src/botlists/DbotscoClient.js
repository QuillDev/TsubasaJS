const {post} = require("got");

class DbotsCo {

    constructor(client) {
        this.client = client;
    }

    /**
     * Updates count on discord.bots.gg
     * @returns {Promise<void>}
     */
    async postCount(){

        //post our currnet guild count to discord.bots
        const {body} = await post(`https://dbots.co/api/v1/bots/${this.client.user.id}/stats`, {
            headers: {
                'Authorization': process.env.DBCO_KEY,
                'Content-Type': 'application/json'
            },
            json: {
                guildCount: this.client.guilds.cache.size,
            }
        }).catch(err => this.client.logger.error(this.constructor.name, err));
    }
}



module.exports = DbotsCo;