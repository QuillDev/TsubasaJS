const TsubasaCommand = require('../../tsubasa-abstract/TsubasaCommand');

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
        const sent = await msg.channel.send('....');
        await sent.edit(`Command Delay: **${Math.round(sent.createdTimestamp - msg.createdTimestamp)}ms**\nGateway Ping: **${Math.round(msg.guild.shard.ping)}ms**`);
    }
}
module.exports = Ping;