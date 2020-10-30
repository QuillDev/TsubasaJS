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
        const users = this.client.users.cache;
        //Log the names and ids of the guilds we're in
        guilds.map(function(guild){
            this.client.logger.debug(this.client.user.username, `Name: ${guild.name} |  ID: ${guild.id} | Users: ${guild.memberCount}`);
        }, this);

        //Log the amount of guild's we're in
        this.client.logger.debug(`${this.client.user.username}`, `Ready! Serving ${guilds.size} guild(s) with ${users.size} user(s)`);

        //set the presence of the client
        await this.client.user.setPresence({
            status: "online",
            activity: {
                name: `Serving ${users.size} Users!`,
                type: "LISTENING"
            }
        });
    }
}
module.exports = Ready;