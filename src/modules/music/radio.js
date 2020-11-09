const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const musicHelper = require("../../utils/TsubasaMusicHelper");

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

    /**
     *
     * @param {Message} msg
     * @returns {Promise<*>}
     */
    async run(msg){
        //check if the dispatcher is valid
        const dispatcher = await musicHelper.validDispatcher(this, msg);

        //if the dispatcher exists
        if(dispatcher){
            //toggle the current radio mode
            dispatcher.radio = !dispatcher.radio;

            //if radio mode is on
            if(dispatcher.radio){
                return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Radio", `Toggled radio mode **ON**! :white_check_mark:`));
            }

            return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Radio", `Toggled radio mode **OFF**! :octagonal_sign:`));
        }


    }
}

module.exports = Radio;


