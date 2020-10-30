const ytscraper = require("./youtubeScraperService");
const got = require("got")

/**
 * Translates spotify playlists to youtube urls.
 * @param {String} playlistUrl the spotify playlist url.
 */
async function getFromSpotifyPlaylist(playlistUrl){

    //get the body of the page
    const body = await got.get(playlistUrl)
        .then(res => res.body);

    try {

        //parse out the json data
        const part1 = "Spotify.Entity = "
        const part2 = `</script><script src="https://open.scdn.co/cdn/build/open/open.15499ffc.js"`;
        const split = body.substring(body.indexOf(part1)+part1.length, body.indexOf(part2)-5);

        //parse and get the json from the page
        const json = JSON.parse(split);

        //get items from the tracklist
        const items = json["tracks"]["items"];

        //create an array for queries.
        const urls = [];

        //iterate through the items and get the search name for the track
        for(const item of items){
            //get the current track
            const track = item["track"];

            //get the artist
            const artist = track["artists"][0]["name"] || "";
            const name = track["name"];

            //push it into the urls array
            urls.push(ytscraper.searchAndGetFirst(`${name} - ${artist}`));
        }

        //return the promise array to be handled somewhere else
        return urls;
    }
    catch(err){
        return null;
    }
}

module.exports = {
    getFromSpotifyPlaylist: getFromSpotifyPlaylist
}