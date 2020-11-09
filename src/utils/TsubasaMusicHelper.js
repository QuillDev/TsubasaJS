/**
 *
 * @param {TsubasaCommand} command
 * @param msg
 * @returns {Promise<*>}
 */
async function validDispatcher(command, msg){

    //get the command name
    const title = `Tsubasa - ${command.name}`;

    //if the user is not in a voice channel
    if(!msg.member.voice.channelID){
        await msg.channel.send(command.client.embedHelper.createErrorEmbed(title, "You must be in a voice channel to use this command!"));
        return;
    }

    //get the dispatcher using the guild id
    const dispatcher = command.client.queue.get(msg.guild.id);

    //if there is no dispatcher for this guild
    if(!dispatcher){
        await msg.channel.send(command.client.embedHelper.createErrorEmbed(title, "This guild is not playing anything!"));
        return;
    }

    //if the playing channel and the users voice channel are different that"s no bueno
    if(dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID){
        await msg.channel.send(command.client.embedHelper.createErrorEmbed(title, "You're not in the same voice channel as the player"));
        return;
    }

    //if the current playing song is null
    if (!dispatcher.current) {
        return await msg.channel.send(this.client.embedHelper.createErrorEmbed(title, "No tracks are currently playing"));
    }

    return dispatcher;
}

module.exports = {
    validDispatcher: validDispatcher,
}