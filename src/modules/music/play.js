const TsubasaCommand = require('../../tsubasa-abstract/TsubasaCommand');
const ytscraper = require('../../services/music/youtubeScraperService');

class Play extends TsubasaCommand {
    get name() {
        return 'play';
    }

    get usage(){
        return `play {search/url}`;
    }

    get description(){
        return 'Fetches videos and joins the channel!';
    }

    //Check if the url is valid
    _checkURL(string){
        try {
            new URL(string);
            return true;
        }
        catch (error){
            return false;
        }
    }

    async run(msg, args){
        
        //check if the user is in a voice channel
        if(!msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed('Tsubasa - Play', `You're not in a voice channel.`));
        }

        //if there is no first argument
        if(!args[0]){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed('Tsubasa - Play', 'You did not specify a link or query'));
        }

        //get the music node
        const node = this.client.musicHandler.getNode();

        //join args with a space to get the query
        const query = args.join(' ');

        //if the query is a valid url
        if(this._checkURL(query)){
            const result = await node.rest.resolve(query);

            //if the result was bad or invalid
            if(result == null){
                return await msg.channel.send(this.client.embedHelper.createErrorEmbed('Tsubasa - Play', `Couldn't find anything for the query ${query}`));
            }

            //get data from the result
            const {type, tracks, playlistName} = result;

            //get the first track from the tracks list
            let track = tracks.shift();

            //see if it's a playlist
            const isPlaylist = type === 'PLAYLIST';

            //handle the tracks and get the response
            const res = await this.client.queue.handle(node, track, msg);

            //if it's a playlist
            if(isPlaylist){
                //Add all tracks to queue if it's a playlist
                for(track of tracks) {
                    await this.client.queue.handle(node, track, msg);
                }
            }

            //print messages about adding the song to the queue
            if(isPlaylist){
                await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Play", `Added the playlist **${playlistName}** to the queue!`))
                    .catch(() => null);
            }
            else {
                await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Play", `Added the song **${track.info.title}** to the queue!`))
                    .catch(() => null);
            }

            //await to play tracks
            if(res) await res.play();
            return;
        }

        //search youtube with the given query
        const scraperResult = await ytscraper.searchAndGetFirst(query);
        const searchData = await node.rest.resolve(scraperResult);

        //if there is no search data send an error
        if(!searchData){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed('Tsubasa - Play', `There was an issue when finding songs for your query ${query}, please try again!`))
        }

        //if the tracks came back empty
        if(!searchData.tracks.length){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed('Tsubasa - Play', `Couldn't find any tracks for the query ${query}`));
        }

        //get the first track
        let track = searchData.tracks.shift();

        const res = await this.client.queue.handle(node, track, msg);

        await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Play", `Added the track **${track.info.title}** to the queue!`))
            .catch(() => null);

        if(res) await res.play();
    }
}

module.exports = Play;