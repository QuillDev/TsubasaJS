const TsubasaCommand = require('../../tsubasa-abstract/TsubasaCommand');

class Stop extends TsubasaCommand {
    get name() {
        return 'stop';
    }

    get usage(){
        return 'stop';
    }

    get description(){
        return 'Stops the music player from playing.'
    }


    async run(msg){

        //if the user is not in a voice channel
        if(!msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed('Tsubasa - Stop', 'You must be in a voice channel to use this command!'));
        }

        //get the dispatcher using the guild id
        const dispatcher = this.client.queue.get(msg.guild.id);

        //if there is no dispatcher for this guild
        if(!dispatcher){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed('Tsubasa - Stop', 'This guild is not playing anything!'));
        }

        //if the playing channel and the users voice channel are different that's no bueno
        if(dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed(`Tsubasa - Stop`, `You're not in the same voice channel as the player`));
        }

        //set the length of the queue to zero
        dispatcher.queue.length = 0;

        //stop the current track
        await dispatcher.player.stopTrack();

        //send a message that we stopped the queue
        return await msg.channel.send(this.client.embedHelper.createEmbed('Tsubasa - Stop', 'Stopping the player!'));
    }
}

module.exports = Stop;