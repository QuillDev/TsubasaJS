const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");

class Skip extends TsubasaCommand {
    get name(){
        return "skip";
    }

    get usage(){
        return "skip";
    }

    get description(){
        return "Skips the current track.";
    }


    async run(msg){
        //if the user is not in a voice channel
        if(!msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Skip", "You must be in a voice channel to use this command!"));
        }

        //get the dispatcher using the guild id
        const dispatcher = this.client.queue.get(msg.guild.id);

        //if there is no dispatcher for this guild
        if(!dispatcher){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Skip", "This guild is not playing anything!"));
        }

        //if the playing channel and the users voice channel are different that"s no bueno
        if(dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed(`Tsubasa - Skip`, `You"re not in the same voice channel as the player`));
        }

        //stop the current track otherwise(skip)
        await dispatcher.player.stopTrack();
    }
}

module.exports = Skip;


