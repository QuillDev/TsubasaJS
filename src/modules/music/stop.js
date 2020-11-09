const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const musicHelper = require("../../utils/TsubasaMusicHelper");

class Stop extends TsubasaCommand {
    get name() {
        return "stop";
    }

    get usage(){
        return "stop";
    }

    get description(){
        return "Stops the music player from playing.";
    }


    async run(msg){

        //check if the dispatcher is valid
        const dispatcher = await musicHelper.validDispatcher(this, msg);

        //if the dispatcher exists
        if(dispatcher) {
            //set the length of the queue to zero
            dispatcher.queue.length = 0;

            //send a message that we stopped the queue
            msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Stop", "Stopping the player!"));

            //stop the current track
            await dispatcher.player.stopTrack();
        }

    }
}

module.exports = Stop;