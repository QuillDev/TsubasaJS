const TsubasaCommand = require("../../tsubasa/TsubasaCommandHandler");

class pfp extends TsubasaCommand{

    get name(){
        return "pfp";
    }

    get usage(){
        return "pfp [@user]"
    }

    get description(){
        return "Gets the profile picture of the mentioned user."
    }

    /**
     * Run the pfp command
     * @param msg the msg that was send to the channel
     * @returns {Promise<*>}
     */
    async run(msg){

        //if the length of the arguments is zero, get the authors pfp
        if(msg.mentions.users.size === 0){
            return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - PFP", "", msg.author.displayAvatarURL()));
        }

        //get the tagged users pfp
        return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - PFP", "", msg.mentions.users.first().displayAvatarURL()));
    }
}

module.exports = pfp;