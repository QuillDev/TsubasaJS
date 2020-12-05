const TsubasaEvent = require("../tsubasa-abstract/TsubasaEvent");
const updateLists = require("../botlists/ListManager");

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

        //Update the bots presence and guild counts on the sites every 30 minutes
        setInterval( () => {
            this.client.listManager.updateLists();
            this.setPresence(this.client);
            }, 1800000);
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