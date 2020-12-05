const got = require("got");

/**
 *
 * @param {String} query the query to search for!
 * @param {Number} page
 * @returns {Promise<String[]>}
 */
async function search(query, page = 1) {

    //create the url to scrape
    let url = `https://www.youtube.com/results?q=${query}&page=${page}`;

    return await got.get(url)
        .then(res => res.body)
        .then(async function (body) {

            //if body is null, return
            if (!body) {
                return;
            }

            //if the length of the body is zero
            if (body.length === 0) {
                return;
            }

            //try new formatting
            let match = body.match(/ytInitialData[^{]*(.*"adSafetyReason":[^;]*});/s);

            //if there were no matches use old formatting
            if (!match || match.length < 1) {
                match = body.match(/ytInitialData"[^{]*(.*);\s*window\["ytInitialPlayerResponse"\]/s);
            }

            //parse the string to get json
            const json = JSON.parse(match[1]);

            //get the section lists from the json
            let sectionLists = json["contents"]["twoColumnSearchResultsRenderer"]["primaryContents"]["sectionListRenderer"]["contents"];


            //filter the list and get any that contain item section renderers
            let filtered = sectionLists.filter(sectionList => sectionList.hasOwnProperty("itemSectionRenderer"));


            for (let sectionList of filtered) {

                let contents = sectionList["itemSectionRenderer"]["contents"];

                //if the contents are null, continue
                if (contents == null) {
                    continue;
                }


                //get the url
                let urls = [];

                //iterate through all the renderers and get the urls from them
                for (let item of contents) {

                    //if it"s not a video renderer, return
                    if (!item.hasOwnProperty("videoRenderer")) {
                        continue;
                    }

                    //if the videoRenderer has a video id, continue
                    if (!item["videoRenderer"].hasOwnProperty("videoId")) {
                        continue;
                    }


                    urls.push(`https://www.youtube.com/watch?v=${item["videoRenderer"]["videoId"]}`);


                }

                return await Promise.all(urls);
            }
        });
}

/**
 * Search and get the first result
 * @param query
 * @param page
 * @returns {Promise<String|null>}
 */
async function searchAndGetFirst(query, page = 1){
    const urls = await search(query, page);

    //if the data is null, return null
    if(!urls){
        return null;
    }

    //if the length of the data is zero, return null
    if(urls.length === 0){
        return null;
    }

    return urls[0];
}

module.exports = {
    search: search,
    searchAndGetFirst: searchAndGetFirst
}