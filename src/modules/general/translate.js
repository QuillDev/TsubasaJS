const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const translatorService = require("../../services/General/translatorService");

class Translate extends TsubasaCommand {
    get name(){
        return "translate";
    }

    get usage(){
        return "translate [message]"
    }

    get description(){
        return "Translates a message into english"
    }

    async run(msg, args){

        //if we don't have enough args
        if(args.length < 1) {
            return msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Translate", "Did not specify a message to translate"));
        }

        //join the args into a message
        const content = args.join(" ");

        //if the content is longer than the acceptable length, throw an error embed
        if(content.length > 1024){
            return msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Translate", "Cannot translate messages longer than 1024 characters!"));
        }


        try {
            let translation = await translatorService.translateTextToEnglish(content);
            return msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Translate",
                `
                **Detected Language: ${translation.lang}**
                
                ${translation.translation}
                `
            ));
        }
        catch (err){
            return msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Translate", err));
        }
    }
}

module.exports = Translate;