const got = require("got");

/**
 * Gets the reccomended video for the video URL given!
 * @param {String} id of the video
 */
async function getReccomendedVideoId(url) {
    let body = await got.get(url)
        .then(res => res.body)
        .catch(err => console.error(err));


    try {

        //data on recommended videos
        let recommendedData = body.substring(body.indexOf(`window["ytInitialData"] = `) + 26, body.indexOf(`window["ytInitialPlayerResponse"]`) - 6);

        //parse the JSON data we got
        let json = JSON.parse(recommendedData);

        //get the renderLists of videos in teh recommended
        let renderList = json["contents"]["twoColumnWatchNextResults"]["secondaryResults"]["secondaryResults"]["results"];

        //filter compactVideoRenders for the function
        let videoList = renderList.filter(render => render.hasOwnProperty("compactVideoRenderer"));

        //if the length of the video list is zero, return null
        if(videoList.length === 0){
            return null;
        }

        //return the first videos id
        return videoList[0]["compactVideoRenderer"]["videoId"];
    } catch {
        return null;
    }

}

module.exports = {
    getReccomendedVideoId: getReccomendedVideoId
}