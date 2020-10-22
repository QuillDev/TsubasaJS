const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");

class Radio extends TsubasaCommand {
    get name(){
        return "radio";
    }

    get usage(){
        return "radio";
    }

    get description(){
        return "Toggles auto radio play in this channel!";
    }


    async run(msg){
        //if the user is not in a voice channel
        if(!msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Radio", "You must be in a voice channel to use this command!"));
        }

        //get the dispatcher using the guild id
        const dispatcher = this.client.queue.get(msg.guild.id);

        //if there is no dispatcher for this guild
        if(!dispatcher){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Radio", "This guild is not playing anything!"));
        }

        //if the playing channel and the users voice channel are different that"s no bueno
        if(dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed(`Tsubasa - Radio`, `You"re not in the same voice channel as the player`));
        }

        //toggle the current radio mode
        dispatcher.radio = !dispatcher.radio;

        if(dispatcher.radio){
            return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Radio", `Toggled radio mode **ON**! :white_check_mark:`));
        }

        return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Radio", `Toggled radio mode **OFF**! :octagonal_sign:`));

    }
}

module.exports = Radio;


