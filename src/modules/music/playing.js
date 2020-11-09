const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const getId = require("../../services/music/youtubeIdScraper");
const musicHelper = require("../../utils/TsubasaMusicHelper");

class Playing extends TsubasaCommand {
    get name(){
        return "playing";
    }

    get usage(){
        return "playing";
    }

    get description(){
        return "Gets the current track that's playing";
    }


    async run(msg){
        //check if the dispatcher is valid
        const dispatcher = await musicHelper.validDispatcher(this, msg);

        //if the dispatcher exists
        if(dispatcher){

            //create the slider to show song progress
            const hyphenLength = 67;
            const percent_completed = dispatcher.player.position / dispatcher.current.info.length;
            const cursorPosition = Math.round(percent_completed * hyphenLength);

            //var for the progress bar
            let progressBar = "";

            //iterates through all of the hypen indexes and
            for(let index = 0; index < hyphenLength; index++){
                if(index === cursorPosition){
                    progressBar += ":blue_circle:";
                    continue;
                }
                //append a hypen if we're not at the cursor position
                progressBar += '-';
            }


            //create the thumbnail url TODO this is likely to break, maybe come up with a custom solution?
            const imageUrl = `https://img.youtube.com/vi/${getId(dispatcher.current.info.uri)}/0.jpg`;

            //send the video info to the channel
            return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Playing", `Playing track ${dispatcher.current.info.title}\n${progressBar}`, imageUrl));
        }
    }
}

module.exports = Playing;


