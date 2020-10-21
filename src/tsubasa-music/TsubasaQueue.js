const TsubasaDispatcher = require("./TsubasaDispatcher");

class TsubasaQueue extends Map {
    /**
     * Constructor for the queueing system
     * @param {Tsubasa} client
     * @param iterable
     */
    constructor(client, iterable){
        super(iterable);
        this.client = client;
    }

    /**
     * Handle queue for music dispatcher
     * @param {*} node
     * @param {*} track
     * @param {Message} msg the message
     * @return {Promise<TsubasaDispatcher>} returns the dispatcher for the audio channel
     */
    async handle(node, track, msg){

        //check if we have an existing player in the guild
        const existing = this.get(msg.guild.id);

        if(!existing){

            //Create a player and join the voice channel
            const player = await node.joinVoiceChannel( {
                guildID: msg.guild.id,
                voiceChannelID: msg.member.voice.channelID
            });

            //log a debug message that says that we connected to the guild
            this.client.logger.debug(player.constructor.name, `New connection @ guild ${msg.guild.id}`);

            const dispatcher = new TsubasaDispatcher({
                client: this.client,
                guild: msg.guild,
                text: msg.channel,
                player
            });

            //push the dispatcher to the queue
            dispatcher.queue.push(track);

            //create dict entry for this guild and the dispatcher
            this.set(msg.guild.id, dispatcher);
            this.client.logger.debug(dispatcher.constructor.name, `New player dispatcher @ guild ${msg.guild.id}`);

            return dispatcher;
        }

        existing.queue.push(track);
        return null;
    }
}

module.exports = TsubasaQueue;