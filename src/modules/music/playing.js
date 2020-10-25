const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const getId = require("../../services/music/youtubeIdScraper");

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
        //if the user is not in a voice channel
        if(!msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Playing", "You must be in a voice channel to use this command!"));
        }

        //get the dispatcher using the guild id
        const dispatcher = this.client.queue.get(msg.guild.id);

        //if there is no dispatcher for this guild
        if(!dispatcher){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Playing", "This guild is not playing anything!"));
        }

        //if the playing channel and the users voice channel are different that"s no bueno
        if(dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed(`Tsubasa - Playing`, `You"re not in the same voice channel as the player`));
        }

        if(!dispatcher.current){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed(`Tsubasa - Playing`, `No tracks are currently playing`));
        }

        //create the slider to show song progress
        const hyphenLength = 67;
        const percent_completed = dispatcher.player.position / dispatcher.current.info.length;
        const cursorPosition = Math.round(percent_completed * hyphenLength);

        //var for the progress bar
        let progressBar = "";

        //iterates through all of the hypen indexes and
        for(let index = 0; index < hyphenLength; index++){
            if(index == cursorPosition){
                progressBar += ":blue_circle:";
                continue;
            }
            //append a hypen if we're not at the cursor position
            progressBar += '-';
        }


        //create the thumbnail url TODO this is likely to break, mayb come up with a custom solution?
        const imageUrl = `https://img.youtube.com/vi/${getId(dispatcher.current.info.uri)}/0.jpg`;

        //send the video info to the channel
        return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Playing", `Playing track ${dispatcher.current.info.title}\n${progressBar}`, imageUrl));
    }
}

module.exports = Playing;


