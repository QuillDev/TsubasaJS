import get from "got";
import { parseHTML } from "linkedom";

export interface Doujin {
    url: string;
    imageUrl: string;
}

/**
 * Get the top 5 or less results for a given hentai query.
 * @param {String} query the query to search for
 */
export const getTop = async (query: string) => {
    //scrape doujins for that query
    const doujins = await scrapePopular(query);

    //if the doujins fucked up return null
    if (!doujins || doujins.length === 0) {
        throw new Error(`No doujins found for the query \`\`${query}\`\`!`)
    }

    //if the doujins length is less than or equal to 5 just return it
    if (doujins.length <= 5) {
        return doujins;
    }

    //return the top 5 doujins from the list
    return doujins.slice(0, 5);
}

/**
 * Gets a random doujin from the query
 * @param {String} query the query to search for
 * @returns {Doujin} a doujin result
 */
export const getRandom = async (query: string): Promise<Doujin> => {
    //if there was no query get a completely random doujin
    if (!query) {
        const { body, url, statusCode } = await get("https://nhentai.net/random/");
        if (statusCode != 200) { throw new Error(`Nhentai error ${statusCode}, is it down?`); }

        const dom = parseHTML(body);
        const image_url = dom.window.document.querySelector("img.lazyload").getAttribute("data-src");
        return {
            url,
            imageUrl: image_url,
        };
    }

    try {
        //if there was a query get a random doujin using that query
        const doujins = await scrapePopular(query);

        //if the doujin fucked up return null;
        if (!doujins || doujins.length === 0) {
            throw new Error(`No doujin could be retrieved for the query \`\`${query}\`\`!`);
        }

        return doujins[Math.floor(Math.random() * doujins.length)];
    }
    catch {
        throw new Error(`Failed to get random doujin for query \`\`${query}\`\``)
    }

}
/**
 * Scrapes n-hentai for doujin data namely the cover image and the url.
 * @param {String} query
 * @returns {Doujin[]} Array of doujin results
 */
export const scrapePopular = async (query: string): Promise<Doujin[]> => {

    //Create the url depending on whether there was a query or not
    let url;
    if (!query) {
        url = "https://nhentai.net/";
    } else {
        url = `https://nhentai.net/search/?q=${query}`;
    }

    const body = await get(url)
        .then((res) => res.body)
        .catch((err) => { throw new Error(err) });

    //if body was null, return null
    if (!body) {
        throw new Error("Failed to retreive page body!")
    }

    //Array for doujin URLS to go into
    const doujins = [];

    try {

        //Create the dom from the body
        const { document } = parseHTML(body);

        //get the doujin container
        const doujinContainers = document.querySelectorAll("div div.container");

        //iterate through the doujin containers
        for (const doujinContainer of doujinContainers) {

            //get the gallery tag which gives us the urls
            const galleries = doujinContainer.querySelectorAll("div.gallery");

            //get all of the urls from the doujins loaded
            for (const gallery of galleries) {

                const url = `https://nhentai.net${gallery.querySelector("a.cover").getAttribute("href")}`;
                const imageUrl = gallery.querySelector("a.cover img").getAttribute("data-src");

                //if the image_url or the url is null, continue
                if (!url || !imageUrl) {
                    continue;
                }

                //push the doujins info into the doujins array
                doujins.push({
                    url,
                    imageUrl,
                });
            }
        }

    }
    //if there was an error return null
    catch {
        throw new Error("There was an error retrieving doujin data!");
    }

    return doujins;
}