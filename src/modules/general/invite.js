const TsubasaCommand = require("../../tsubasa/TsubasaCommandHandler");

class Invite extends TsubasaCommand {
    get name(){
        return "invite";
    }

    get usage(){
        return "invite";
    }

    get description(){
        return "Get the bots invite url";
    }

    async run(msg){
        return await msg.channel.send(
            new this.client.discord.MessageEmbed()
                .setAuthor("Invite Tsubasa", this.client.user.displayAvatarURL(), "http://tsubasa.quilldev.tech")
                .setColor(this.client.color)
        );
    }
}

module.exports = Invite;