const TsubasaCommand = require('../../tsubasa-abstract/TsubasaCommand');

//TODO rework this to work with embed at some point
class Ping extends TsubasaCommand {
    get name() {
        return 'ping';
    }

    get usage() {
        return 'ping';
    }

    get description() {
        return 'Basic ping and pong command';
    }

    async run(msg) {
        const sent = await msg.channel.send('Pinging...');
        await sent.edit(this.client.embedHelper.createEmbed('Tsubasa - Ping',
            `
            Command Delay: **${Math.round(sent.createdTimestamp - msg.createdTimestamp)}ms**
            Gateway Ping: **${Math.round(msg.guild.shard.ping)}ms**
            `))
    }
}
module.exports = Ping;