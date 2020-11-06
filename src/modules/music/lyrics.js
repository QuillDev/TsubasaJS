const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const youtubeCaptionsService = require("../../services/music/youtubeCaptionsService");
const reactMenu = require("discord.js-reaction-menu");

class Lyrics extends TsubasaCommand {
    get name(){
        return "lyrics";
    }

    get usage(){
        return "lyrics";
    }

    get description(){
        return "Gets the lyrics of the given song if it's from YouTube";
    }


    async run(msg){
        //if the user is not in a voice channel
        if(!msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Lyrics", "You must be in a voice channel to use this command!"));
        }

        //get the dispatcher using the guild id
        const dispatcher = this.client.queue.get(msg.guild.id);

        //if there is no dispatcher for this guild
        if(!dispatcher){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Lyrics", "This guild is not playing anything!"));
        }

        //if the playing channel and the users voice channel are different that"s no bueno
        if(dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed(`Tsubasa - Lyrics`, `You"re not in the same voice channel as the player`));
        }

        //check if the video is from youtube
        const trackUri = dispatcher.current.info.uri;

        //if it's not from youtube
        if(!trackUri.includes("youtube.com") && !trackUri.includes("youtu.be")){
            return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Lyrics", "Videos not played from Youtube currently do not support lyrics!"));
        }

        //get captions from youtube as a string
        const captions = await youtubeCaptionsService(trackUri)
            .catch( async () => {
                return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Lyrics", "An error occured while trying to fetch lyrics! Please try again!"));
            });

        //if no captions were returned
        if(!captions){
            return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Lyrics", "This track does not have lyrics available!"));
        }

        //if they're within the max embed size, just print them
        if(captions.length <= 2048){
            return await msg.channel.send(this.client.embedHelper.createEmbed(`Tsubasa - Lyrics - ${dispatcher.current.info.title}`, captions))
        }

        //split captions into pieces
        let captionFragments = [];


        //calcualate the max pages needed
        let maxPasses = Math.ceil(captions.length / 2048);

        //Slice up the captions into embedable sized bits
        for(let pass = 0; pass < maxPasses; pass++){
            captionFragments.push(captions.slice(pass*2048, (pass === maxPasses) ? captions.length : (pass +1) * 2048));
        }

        //create the pages array by turning fragments into embeds.
        let pages = captionFragments.map(function(frag){

            //get the page number
            const page = captionFragments.indexOf(frag) + 1;

            return this.client.embedHelper.createEmbed(`Tsubasa - Lyrics - ${page}/${captionFragments.length}`, frag);
        }, this);

        new reactMenu.menu({
            channel: msg.channel,
            userID: msg.author.id,
            pages: pages,
            time: 60000
        });
    }


}

module.exports = Lyrics;

