import get from "got";
import { parseHTML } from "linkedom";

interface MarketData {
    price: string;
    name: string;
    img: string;
}

export const getMarketEntries = async (appId: number, query: string) => {
    const { body } = await get(`https://steamcommunity.com/market/search?appid=${appId}&q=${query}`);
    if (!body) { throw new Error("Failed to get data from steam!"); }

    const { document } = parseHTML(body); // parse the html
    // Select the rows on the market page
    let nodes = document.querySelectorAll("div.market_listing_row.market_recent_listing_row.market_listing_searchresult");
    if (!nodes) { throw new Error("Couldn't get any market data!"); }
    //create a var for storing market data
    const data: MarketData[] = [];

    //generate market data
    nodes.forEach((node) => {
        const price = node.querySelector("span.market_table_value.normal_price span.normal_price").textContent;
        const name = node.querySelector("span.market_listing_item_name").textContent;
        const img = node.querySelector("img.market_listing_item_img").getAttribute("src");
        
        data.push({
            price,
            name,
            img
        });
    });

    if (data.length === 0) { throw new Error(`No market data for query ${query}`); }
    return data;
}