const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const musicHelper = require("../../utils/TsubasaMusicHelper");

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

    /**
     * Seek to a given position if possible
     * @param msg the message that was sent
     * @param args arguments in this case should be position
     * @returns {Promise<*>}
     */
    async run(msg, args) {

        //check if the dispatcher is valid
        const dispatcher = await musicHelper.validDispatcher(this, msg);

        //if the dispatcher exists
        if(dispatcher) {
            //save the seekpoint and convert it to MS
            const seekPoint = args[0] * 1000;

            //if the seek point is out of the acceptable range
            if (seekPoint > dispatcher.current.info.length || seekPoint < 0) {
                return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Seek", `Your chosen position was not in the range of valid input.`));
            }

            //seek to the point
            dispatcher.player.seekTo(seekPoint)
                .catch(async () => await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Seek", "There was an error when seeking the track.")));

            //send the message to the channel, don't worry about awaiting it
            msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa Seek", `Seeked to ${args[0]} seconds!`));
        }
    }
}

module.exports = Seek;


