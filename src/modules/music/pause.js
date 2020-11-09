const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const musicHelper = require("../../utils/TsubasaMusicHelper");

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
        //check if the dispatcher is valid
        const dispatcher = await musicHelper.validDispatcher(this, msg);

        //if the dispatcher exists
        if(dispatcher){
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
}

module.exports = Pause;


