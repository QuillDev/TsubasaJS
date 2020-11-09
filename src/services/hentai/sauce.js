const got = require("got");

/**
 * Gets data on the top match for the image given on "Sauce Nao"
 * @param {String} url url to image to search for.
 */
async function getSauceData(url) {

    //check that it's a valid url
    try {
        new URL(url);
    } catch {
        throw "Invalid Url!";
    }

    //search all databases and get a json response
    const sauceData = await got.get(`https://saucenao.com/search.php?db=999&url=${url}&output_type=2&api_key=${process.env.SAUCE_KEY}`)
        .then(res => JSON.parse(res.body))
        .catch(function(err){
            return null;
        });

    try {
        //get the first result
        const results = sauceData["results"];

        //Check if results were undefined
        if(results === "undefined"){
            throw "Results came back undefined";
        }
        //filter for only high quality results
        const filtered = results.filter( (result) => Number.parseFloat(result["header"]["similarity"]) >= 75);

        //ge the first or "best" result
        if (filtered === "undefined") {
            throw `Results came back as null for url ${url}.`;
        }

        //if the length of results was zero
        if (filtered.length === 0) {
            throw `No results found for url ${url}`;
        }

        //returns data on the object we found
        return parseSauceData(filtered[0])
    }
    finally {}
}

function parseSauceData(sauceData) {
    const data = sauceData["data"];
    const header = sauceData["header"];

    //get the similarity of the image
    const similarity = header["similarity"] || "unknown";

    //get source from the data element
    const source = getSourceFromData(data);
    const name = getNameFromData(data);

    return {
        similarity: similarity,
        source: source,
        name: name,
        image_url: header["thumbnail"] || null,
        author: data["member_name"] || data["creator"][0] || "unknown"
    }

}

/**
 * Get the name from the data.
 * @param {String} data the json data for the sauce nao data
 */
function getNameFromData(data){

    //if it has an eng_name return it
    if("eng_name" in data){
        return data["eng_name"];
    }

    //if it has a jp name return it
    if("jp_name" in data){
        return data["jp_name"];
    }

    //if the data has a title return it
    if("title" in data){
        return data["title"];
    }

    //return unknown if we can't find anything
    return "Unknown";
}

/**
 * Get the source from the data
 * @param {Object} data the data from a SauceNao Request 
 */
function getSourceFromData(data){

    //if the data has a source property, return it
    if("source" in data){
        if(data["source"].length !== 0){
            return data["source"];
        }
    }

    //if the data has an ext urls property
    if("ext_urls" in data){
        if(data["ext_urls"].length !== 0){
            return data["ext_urls"][0];
        }
    }

    //return "Unknown" otherwise
    return "Unknown";
}

module.exports = {
    getSauceData: getSauceData
}