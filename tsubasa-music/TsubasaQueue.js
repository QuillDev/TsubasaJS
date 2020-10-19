const { Message } = require("discord.js");

class Queue extends Map {
    constructor(client, iterable){
        super(iterable);
        this.client = client;
    }

    /**
     * Handle queue for music dispatcher
     * @param {*} node 
     * @param {*} track
     * @param {Message} msg 
     */
    async handle(node, track, msg){
        //check if we have an existing player in the guild
        const existing  = this.get(msg.guild.id);

        if(!existing){
            const player = await node.joinVoiceChannel
        }

    }
}