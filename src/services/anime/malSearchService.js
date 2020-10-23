const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/**
 * Search for anime matching the given query.
 * @param {String} query
 * @return {* || null} Returns an object with data about animes based on the search
 */
async function search(query){

    //create the url for the request based on the given query
    const url = `https://myanimelist.net/anime.php?cat=anime&q=${query}`;

    //Request the search data from the url
    const body = await got.get(url)
        .then( res => res.body)
        //if there's an error catch it and ignore it.
        .catch( () => null);

    //if we failed to get the body or the length of the body was null return null
    if(!body || body.length === 0){
        return null;
    }

    //array for storing response data in
    const animeData = [];

    //try to parse data from the response
    try {

        //create a jsdom body
        const dom = new JSDOM(body);

        //get the table
        const parsed = dom.window.document.querySelectorAll("div.js-categories-seasonal table tr");

        //iterate through nodes and make sure they're in the right format
        for(const node of parsed){

            const tableDivisons = node.querySelectorAll(`td`);

            //get the data div
            const descriptionSelection = node.querySelectorAll(`td div.pt4`);
            const imageSelection = node.querySelectorAll("td div.picSurround img");

            //if any of our selections have a length of zero, skip this iteration
            if(imageSelection.length === 0 || descriptionSelection.length === 0){
                continue;
            }

            //get the animes image by parsing the given image string
            const imageUrl = imageSelection[0].getAttribute("data-srcset");
            const delimeter = "/images/anime/";
            const parsedUrl = `https://cdn.myanimelist.net/images/anime/${imageUrl.substring(imageUrl.indexOf(delimeter)+delimeter.length, imageUrl.indexOf("?s="))}`;

            const descriptionDiv = descriptionSelection[0].querySelector("a");

            //if we can't find a description, continue
            if(!descriptionDiv){
                continue;
            }
            //get the animes scription
            const url = descriptionDiv.href;
            const description = descriptionSelection[0].textContent;

            //get the score and regex it into a readable value
            let score = tableDivisons[tableDivisons.length-1].textContent.replace(/[^.0-9]/g, "");

            //return an object with all of the required info
            let data = {
                "image_url": parsedUrl,
                "description": description,
                "mal_url": url,
                "name": imageSelection[0].getAttribute("alt"),
                "rating": score
            }

            //push the data to tha animeData array
            animeData.push(data);

            //Break the loop if the length has gotten to 5
            if(animeData.length === 5){
                break;
            }

        }

        return animeData;
    }
    catch {

        //return null if there's no data
        if(animeData.length === 0){
            return null;
        }

        //return anime data if there's data in the array
        return animeData;
    }
}

module.exports = {
    search: search
}