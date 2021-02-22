const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const fetch = require("node-fetch");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

class CSMarket extends TsubasaCommand {

    get name(){
        return "csmarket"
    }

    get usage(){
        return "csmarket {query}"
    }

    get description(){
        return "Searches the market for a CS:GO Item matching the given query"
    }

    async run(msg, args){
        if(args.length < 1){
            return msg.channel.send(this.client.embedHelper.createErrorEmbed("csmarket", "Not enough arguments."));
        }

        const query = args.join("%20");
        const listingData = [];
        const url = `https://steamcommunity.com/market/search?appid=730&q=${query}`;
        await fetch(url,
            { method: "GET"})
            .then( (res) => res.text())
            .then( (body) => {
                const dom = new JSDOM(body);
                const listings = dom.window.document.querySelectorAll("div.market_listing_searchresult");
                const images = dom.window.document.querySelectorAll("img.market_listing_item_img");

                for(let index = 0; index < listings.length; index++){
                    try {
                        const listing = listings[index];
                        const name = listing.attributes["data-hash-name"].textContent;
                        const price = listing.textContent.match("(\\$[0-9]*\\.[0-9][0-9])")[0];
                        const img = images[index].getAttribute("src") + ".png";

                        //Push data to listingData array
                        listingData.push({
                            name,
                            price,
                            img
                        })
                    } catch (ignored){}
                }

                //if the length is zero
                if(listingData.length === 0){
                    return msg.channel.send(this.client.embedHelper.createErrorEmbed("csmarket", `No results for query ${query}.`));
                }

                let fields = [];
                for(let index = 0; index < Math.min(listingData.length, 5); index++){
                    const data = listingData[index];
                    fields.push({
                        name: data.name,
                        value: data.price,
                        inline: false
                    });
                }

                const embed = this.client.embedHelper.createEmbed("CS Market", "");
                embed.setThumbnail(listingData[0].img);
                embed.addFields(fields);
                embed.url = url;
                return msg.channel.send(embed);
            });
    }
}

module.exports = CSMarket;