const TsubasaEvent = require("../tsubasa-abstract/TsubasaEvent");


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
        //Log the names and ids of the guilds we're in
        guilds.map(function(guild){
            this.client.logger.debug(this.client.user.username, `Name: ${guild.name} |  ID: ${guild.id}`);
        }, this);

        //Log the amount of guild's we're in
        this.client.logger.debug(`${this.client.user.username}`, `Ready! Serving ${guilds.size} guild(s) with ${this.client.users.cache.size} user(s)`);

        //set the presence of the clinet
        await this.client.user.setPresence({
            status: "online",
            activity: {
                name: `Serving ${guilds.size} guilds!`
            }
        });
    }
}
module.exports = Ready;