const { get } = require("got"); //using get from got for our requests

//Enum for search type
const BooruTypes = { SFW: 1, NSFW: 2}

//get domains that work
const nsfwDomains = ["https://gelbooru.com/", "https://rule34.xxx/"];
const sfwDomains = ["https://safebooru.org/"];

//Extra tags to add depending on search type
const sfwTags = ["-underwear"];
const nsfwTags = ["rating:explicit"]

/**
 *
 * @param {String[]} query the query to search for
 * @param {Number} type
 */
async function getImage(query, type) {

    //create array to push tags to
    const searchOptions = await getSearchOptions(query, type);

    //get the body of the website at the given url
    const body = await get(`${searchOptions.domain}index.php?page=dapi&s=post&q=index&json=1&tags=${searchOptions.tags.join(" ")}`)
        .then(res => res.body);

    try {
        //get the json from the site
        const json = JSON.parse(body);

        //get a random post from the thing
        const post = json[Math.floor(Math.random() * json.length)];

        return `${searchOptions.domain}images/${post.directory}/${post.image}`;
    } catch {
        return null;
    }

}

/**
 * Gets the most result matching tag for the given query
 * @param query arguments to be turned into a query
 */
async function getBestTag(query) {
    return get(`https://danbooru.donmai.us/tags.json?search[name_matches]=${query.join(" ")}*&search[order]=count`)
        .then(res => {
            return JSON.parse(res.body)[0].name;
        })
        .catch(() => null);
}


/**
 * Generates options for the search
 * @param {String[]} query the query to search for
 * @param {Number} type the type of search we want to use
 */
async function getSearchOptions(query, type){

    let tags = [];
    let domainList = [];

    //if we found a tag add it
    if (query && query.length > 0) {

        //get the best tag
        const tag = await getBestTag(query);

        //if no tag was found
        if (!tag) {
            throw "No matches found for the given tag";
        }

        //push the tags
        tags.push(tag);
    }

    //change tags and domainlist depending on type
    switch(type){
        case BooruTypes.NSFW: {
            tags = tags.concat(nsfwTags);
            domainList = nsfwDomains;
        } break;

        case BooruTypes.SFW: {
            tags = tags.concat(sfwTags);
            domainList = sfwDomains;
        } break;

        default : {
            domainList = sfwDomains;
        }
    }

    //get the domain
    const domain = domainList[Math.floor(Math.random() * domainList.length)];

    //return the options object with domainlist and tags
    return {
        domain,
        tags
    }
}

module.exports = {
    getImage,
    BooruTypes
}