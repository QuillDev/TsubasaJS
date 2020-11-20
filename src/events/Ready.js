const TsubasaEvent = require("../tsubasa-abstract/TsubasaEvent");
const got = require("got");


class Ready extends TsubasaEvent {
    get name() {
        return "ready";
    }

    get once() {
        return true;
    }

    async run() {

        //get the guilds cache
        const guilds = this.client.guilds.cache;
        const users = this.client.users.cache;

        //Log the names and ids of the guilds we're in
        guilds.map(function(guild){
            this.client.logger.debug(this.client.user.username, `Name: ${guild.name} |  ID: ${guild.id} | Users: ${guild.memberCount}`);
        }, this);

        //Log the amount of guild's we're in
        this.client.logger.debug(`${this.client.user.username}`, `Ready! Serving ${guilds.size} guild(s) with ${users.size} user(s)`);
        this.client.logger.debug(`${this.client.user.username}`, `Running Version ${this.client.version}!`);

        //set the bots presence
        await setTimeout(this.setPresence, 4000, this.client);

        await this.updateDBGGInfo();
    }

    async updateDBGGInfo(){

        //post our currnet guild count to discord.bots
        const {body} = await got.post(`https://discord.bots.gg/api/v1/bots/${this.client.user.id}/stats`, {
            headers: {
                "Authorization": process.env.DBGG_KEY,
            },
            json: {
                guildCount: this.client.guilds.cache.size,
            }
        }).catch(err => this.client.logger.error(this.constructor.name, err));

        //log the data that we logged
        this.client.logger.debug(this.constructor.name, `Posted data ${body}`);
    }

    /**
     * Set the presence
     * @param client the client to set the presence to
     * @returns {Promise<void>}
     */
    async setPresence(client){

        //set the presence of the client
        await client.user.setPresence({
            status: "online",
            activity: {
                name: `t>help`,
                type: "LISTENING"
            }
        });
    }
}
module.exports = Ready;