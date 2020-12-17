const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");

class Vote extends TsubasaCommand {

    get name(){
        return "vote";
    }

    get usage(){
        return "vote";
    }

    get description(){
        return "Gets vote information for Tsubasa's server lists";
    }

    async run(msg){
        return await msg.channel.send(this.client.embedHelper.createEmbed(
            "Tsubasa - Vote",
            `Feeling Awesome? Support Tsubasa by voting on the sites below!
            https://top.gg/bot/753764233484828703/vote
            https://dbots.co/bots/753764233484828703/vote
            `));
    }
}

module.exports = Vote;