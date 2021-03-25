import get from "got";
import { SauceData, SauceEntry, SauceEntryData, SauceResponse } from "../types/sauceTypes";
import { checkUrl } from "./urlHelper";

/**
 * Gets data on the top match for the image given on "Sauce Nao"
 * @param {String} url url to image to search for.
 */
export const getSauceData = async (url: string) => {
    if (!checkUrl(url)) throw new Error("Invalid image url!");
    //search all databases and get a json response
    const sauceData = await get(`https://saucenao.com/search.php?db=999&url=${url}&output_type=2&api_key=${process.env.SAUCE_SECRET}`)
        .then((res) => <SauceResponse>JSON.parse(res.body))
        .catch(function (_err) {
            throw new Error("Failed to get sauce data!");
        });

    //get the first result
    const results = sauceData.results;

    //Check if results were undefined
    if (!results) {
        throw new Error("Results came back undefined");
    }

    //filter for only high quality results
    const filtered = results.filter(result => Number.parseFloat(result.header.similarity) >= 75);

    //ge the first or "best" result
    if (!filtered) {
        throw new Error(`Results came back as null for url ${url}.`);
    }

    //if the length of results was zero
    if (filtered.length === 0) {
        throw new Error(`No results found for url ${url}`);
    }

    //returns data on the object we found
    return parseSauceData(filtered[0])
}

const parseSauceData = (sauceData: SauceEntry):SauceData => {
    const data = sauceData.data;
    const header = sauceData.header;

    //get the similarity of the image
    const similarity = header.similarity || "unknown";

    //get source from the data element
    const source = getSourceFromData(data);
    const name = getNameFromData(data);

    return {
        similarity: similarity,
        source: source,
        name: name,
        image_url: header["thumbnail"] || null,
        author: data["member_name"] || data["creator"][0] || "Unknown"
    }

}

/**
 * Get the name from the data.
 * @param {String} data the json data for the sauce nao data
 */
const getNameFromData = (data: SauceEntryData) => {
    return data.eng_name || data.jp_name || data.title || "Unknown";
}

/**
 * Get the source from the data
 * @param {Object} data the data from a SauceNao Request 
 */
const getSourceFromData = (data: SauceEntryData) => {

    //if the data has a source property, return it
    if ("source" in data) {
        if (data.source.length !== 0) {
            return data.source;
        }
    }

    //if the data has an ext urls property
    if ("ext_urls" in data) {
        if (data.ext_urls.length !== 0) {
            return data.ext_urls[0];
        }
    }

    //return "Unknown" otherwise
    return "Unknown";
}