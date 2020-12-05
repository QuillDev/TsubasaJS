const TsubasaEvent = require("../tsubasa-abstract/TsubasaEvent");

class VoiceStateUpdate extends TsubasaEvent {

    get name(){
        return "voiceStateUpdate";
    }
    get once(){
        return false;
    }

    async run(oldMember, newMember){

        await this.processMusicSubsystem(oldMember);
    }

    //TODO Move this somewhere more appropriate'
    async processMusicSubsystem(member){

        //get the dispatcher
        const dispatcher = this.client.queue.get(member.guild.id);

        //if there's no player, return
        if(!dispatcher){
            return;
        }

        //if the user and bot were in different voice channels
        if(member.channelID !== dispatcher.player.voiceConnection.voiceChannelID){
            return;
        }

        //get the voice channel
        const channel = member.guild.channels.cache.get(member.channelID);

        //destroy the dispatcher
        if(channel.members.size === 1 && channel.members.get(this.client.user.id)){
            dispatcher.destroy("No members left in the channel!");
        }
    }
}

module.exports = VoiceStateUpdate;