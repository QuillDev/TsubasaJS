const got = require("got");
const webvtt = require('node-webvtt')

/**
 * Gets lyrics for the given youtube URL
 * @param {String} url
 */
async function getLyrics(url) {

    //get the video ID from the given url
    const id = getId(url);

    //request the body of the web page
    const body = await got.get(`https://www.youtube.com/watch?v=${id}`)
        .then(res => res.body)
        .catch(err => console.error(err));

    //start and end tags for parsing our subtitle data
    const startTag = `<script >var ytplayer = ytplayer || {};ytplayer.config = `;
    const endTag = "ytplayer.web_player_context_config =";

    const data = body.substring(body.indexOf(startTag) + startTag.length, body.indexOf(endTag) - 1);

    try {
        const jason = JSON.parse(data);

        const playerResponse = jason['args']['player_response'];

        const captions = JSON.parse(playerResponse)["captions"];

        //If there's no captions, return null
        if (!captions) {
            return null;
        }

        //get captionTracks from the captions data
        let captionTracks = captions["playerCaptionsTracklistRenderer"]["captionTracks"];

        //TODO test dif methods and find the fastest one
        //Check if we have english captions
        if (captionTracks.filter(x => x["languageCode"] === 'en').length !== 0) {
            //if we do have english captions make it the only one in the captions array
            captionTracks = captionTracks.filter(function (x) {
                if (x["languageCode"] === 'en') {
                    return x["baseUrl"];
                }
            });
        }

        //create the captions URL
        let captionsUrl = `${captionTracks[0]["baseUrl"]}&format=vtt`;

        //request the raw VTT data for the captions
        let captionsdata = await got.get(captionsUrl)
            .then(res => res.body)
            .catch(err => console.error(err));

        //format header correctly so it doesn't complain about malformed data
        let adjustedData = captionsdata.replace(/^WEBVTT[\s\S]*?\n\n/, "WEBVTT\n\n");

        let tagRegex = new RegExp('</c>');

        //get all of the queues for the webvtt data
        let cues = await webvtt.parse(adjustedData, {
            strict: false
        })["cues"];

        //Regex rules for formatting
        const rules = [
            /<\/c>/g,
            /<c.([\s\S]*)>/g,
            /&nbsp;/g,
            /<\/?.>/g,
            /..<([\s\S]*)>/g
        ];

        let cueText = cues.map(function (cue) {

            let cur = cue["text"];

            for(const rule of rules){
                cur = cur.replace(rule, "");
            }

            return cur;
        });

        for(let index = 1; index < cueText.length-1; index++){
            let cur = cueText[index]
            let next = cueText[index+1]

            if(cur.length < 65 && next.length < 65){

                let replacement = cur.replace("\n"," ") + next.replace("\n"," ");

                cueText[index] = replacement.replace("\n", " ");

                //remove the next element from the array
                cueText.splice(cueText.indexOf(next), 1)
            }
        }

        //return the text of the captions
        return cueText.join("\n");
    } catch (error) {
        return null;
    }
}
/**
 * Gets a youtube ID from a youtube URL
 * @param {String} url
 */
function getId(url) {

    //If it's a youtu.be url
    if (url.includes("youtu.be")) {
        let domain = "youtu.be/";

        //if the url contains no addition arguments
        if (!url.includes("?")) {
            return url.substring(url.indexOf(domain) + domain.length, url.length)
        }

        return url.substring(url.indexOf(domain) + domain.length, url.indexOf("?"));
    }

    //If it's a youtube.com domain
    else if (url.includes("youtube.com")) {

        //if there's no v= in the url
        if (!url.includes("v=")) {
            return null;
        }

        //if there's no additional data tags
        if (!url.includes("&")) {
            return url.substring(url.indexOf("v=") + 2, url.length);
        } else if (url.includes("?v=")) {
            return url.substring(url.indexOf("v=") + 2, url.indexOf("&"));
        }

        return url.substring(url.indexOf("v=") + 2, url.length);
    }

    return null;
}

module.exports = getLyrics;