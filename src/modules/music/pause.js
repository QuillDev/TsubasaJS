const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");

class Pause extends TsubasaCommand {
    get name(){
        return "pause";
    }

    get usage(){
        return "pause";
    }

    get description(){
        return "Toggles whether the player is paused";
    }


    async run(msg){
        //if the user is not in a voice channel
        if(!msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Pause", "You must be in a voice channel to use this command!"));
        }

        //get the dispatcher using the guild id
        const dispatcher = this.client.queue.get(msg.guild.id);

        //if there is no dispatcher for this guild
        if(!dispatcher){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Pause", "This guild is not playing anything!"));
        }

        //if the playing channel and the users voice channel are different that"s no bueno
        if(dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed(`Tsubasa - Pause`, `You"re not in the same voice channel as the player`));
        }

        const paused = dispatcher.player.paused;

        //invert the pause state of the player
        await dispatcher.player.setPaused(!paused);

        //if the player is paused unpause the player
        if(paused){
            return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Pause", ":arrow_forward: Unpaused the player!"));
        }

        //otherwise pause the player
        return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Pause", ":pause_button:  Paused the player!"));
    }
}

module.exports = Pause;


