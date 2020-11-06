const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const musicHelper = require("../../utils/TsubasaMusicHelper");

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

        //check if the dispatcher is valid
        const dispatcher = await musicHelper.validDispatcher(this, msg);

        //if the dispatcher exists
        if(dispatcher){
            //stop the current track otherwise(skip)
            await dispatcher.player.stopTrack();
        }

    }
}

module.exports = Skip;


