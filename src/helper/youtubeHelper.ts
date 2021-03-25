import get from "got";


//TODO: Come and rewrite this a bit smarter at some point
/**
 *
 * @param {String} query the query to search for!
 * @param {Number} page
 * @returns {Promise<String[]>}
 */
export const search = async (query:string, page: number = 1): Promise<string[]> => {

    //create the url to scrape
    let url = `https://www.youtube.com/results?q=${query}&page=${page}`;

    return await get(url)
        .then((res: { body: any; }) => res.body)
        .then(async function (body: string) {

            //if body is null, return
            if (!body) {
                return;
            }

            //if the length of the body is zero
            if (body.length === 0) {
                return;
            }

            //try new formatting
            let match = body.match(/ytInitialData[^{]*(.*?);\s*<\/script>/s);

            //if there were no matches use old formatting
            if (!match || match.length < 1) {
                match = body.match(/ytInitialData"[^{]*(.*);\s*window\["ytInitialPlayerResponse"\]/s);
            }

            //parse the string to get json
            const json = JSON.parse(match[1]);

            //get the section lists from the json
            let sectionLists = json["contents"]["twoColumnSearchResultsRenderer"]["primaryContents"]["sectionListRenderer"]["contents"];


            //filter the list and get any that contain item section renderers
            let filtered = sectionLists.filter((sectionList: { hasOwnProperty: (arg0: string) => any; }) => sectionList.hasOwnProperty("itemSectionRenderer"));


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
export const searchAndGetFirst = async (query: string, page = 1): Promise<string | null> => {
    const urls = await search(query, page);

    //if the data is null, return null
    if (!urls) {
        return null;
    }

    //if the length of the data is zero, return null
    if (urls.length === 0) {
        return null;
    }

    return urls[0];
}


export const getId = (url: string) => {

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