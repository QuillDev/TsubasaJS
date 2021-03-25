import get from "got";

export enum BooruType {
    "SFW" = 1,
    "NSFW" = 2
}

interface BooruSearchOptions {
    domain: string,
    tags: string[]
}

//get domains that work
const nsfwDomains = ["https://gelbooru.com/", "https://rule34.xxx/"];
const sfwDomains = ["https://safebooru.org/"];

//Extra tags to add depending on search type
const sfwTags = ["-underwear"];
const nsfwTags = ["rating:explicit"]

export const getImage = async (query: string[], type: BooruType) => {

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

export const getBestTag = async (query: string[]) => {
    return await get(`https://danbooru.donmai.us/tags.json?search[name_matches]=${query.join(" ")}*&search[order]=count`)
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
export const getSearchOptions = async (query: string[], type: BooruType): Promise<BooruSearchOptions> => {

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
    switch (type) {
        case BooruType.NSFW: {
            tags = tags.concat(nsfwTags);
            domainList = nsfwDomains;
        } break;

        case BooruType.SFW: {
            tags = tags.concat(sfwTags);
            domainList = sfwDomains;
        } break;

        default: {
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