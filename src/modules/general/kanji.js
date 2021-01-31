const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const { get } = require("got");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

class Kanji extends TsubasaCommand{
    get name(){
        return "kanji";
    }

    get usage(){
        return "kanji";
    }

    get description(){
        return "Get a random kanj and some information about it";
    }

    async run(msg){


        const level = Math.floor(Math.random() * 5) + 1;
        get(`http://kanji.fm4dd.com/kanji-random.php?type=JLPT&level=${level}`)
            .then(res => res.body)
            .then( (res) => {
                const dom = new JSDOM(res);
                const document = dom.window.document;

                // Get data on the given kanji
                const kanji = document.querySelector("td.kanji").textContent;
                const descriptions = document.querySelectorAll("div.description");

                const info = [];
                for(let index = 0; index < descriptions.length; index++){
                    if(index === 0){
                        info.push("\n**Meaning:**");
                    }
                    else if (index === 1){
                        info.push("\n**Furigana:**");
                    }
                    info.push(`${descriptions[index].textContent}`);
                }
                const strokeImage = `http://kanji.fm4dd.com/include/stroke.php?kanji=${kanji}`;
                const informationUrl = `https://jisho.org/search/%23kanji${kanji}`;

                msg.channel.send(
                    this.client.embedHelper.createEmbed("Tsubasa - Kanji",
                        `**JLPT Level ${level}**\n**Kanji:**\n${kanji}${info.join("")}
                        **Additional Information:**
                        ${informationUrl}
                        `, strokeImage)
                );
            });
    }
}

module.exports = Kanji;