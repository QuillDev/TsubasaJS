const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");

class Seek extends TsubasaCommand {
    get name(){
        return "seek";
    }

    get usage(){
        return "seek [seconds]";
    }

    get description(){
        return "Seeks to a certian point in the song.";
    }


    async run(msg, args) {

        //if there are no arguments
        if (!args[0]) {
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Seek", "You didn't give an time to seek to"));
        }

        //if the arg is not an integer
        if (!Number.isInteger(Number.parseInt(args[0]))) {
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Seek", "The argument you gave was not a number, please enter a number"));
        }

        //if the user is not in a voice channel
        if (!msg.member.voice.channelID) {
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Seek", "You must be in a voice channel to use this command!"));
        }

        //get the dispatcher using the guild id
        const dispatcher = this.client.queue.get(msg.guild.id);

        //if there is no dispatcher for this guild
        if (!dispatcher) {
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Seek", "This guild is not playing anything!"));
        }

        //if the playing channel and the users voice channel are different that"s no bueno
        if (dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID) {
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Seek", "You're not in the same voice channel as the player"));
        }

        //if the current playing song is null
        if (!dispatcher.current) {
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Seek", "No tracks are currently playing"));
        }

        //save the seekpoint and convert it to MS
        const seekPoint = args[0] * 1000;

        if (seekPoint > dispatcher.current.info.length || seekPoint < 0) {
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Seek", `Your chosen position was not in the range of valid input.`));
        }

        //seek to the point
        await dispatcher.player.seekTo(seekPoint)
            .catch(async () => await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Seek", "There was an error when seeking the track.")));

        return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa Seek", `Seeked to ${args[0]} seconds!`));
    }
}

module.exports = Seek;


