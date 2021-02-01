const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const { get } = require("got");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

class Kanji extends TsubasaCommand{
    get name(){
        return "kanji";
    }

    get usage(){
        return "kanji {level[1-5]}";
    }

    get description(){
        return "Get a random kanj and some information about it";
    }

    async run(msg, args){

        //specify a number between 1 and 5 for the level
        let level = Math.floor(Math.random() * 5) + 1;

        //make sure argumnets exist before checking
        if(args && args.length > 0){

            //parse the level arg from the arguments
            const levelArg = parseInt(args[0]);

            //check if the number is an interger
            if(Number.isInteger(levelArg)){
                if(levelArg <= 5 && levelArg >=1){
                    level = levelArg;
                }
            }
        }

        //get a random kanji @ the given level
        get(`http://kanji.fm4dd.com/kanji-random.php?type=JLPT&level=N${level}`)
            .then(res => res.body)
            .then( (res) => {
                const dom = new JSDOM(res);
                const document = dom.window.document;

                // Get data on the given kanji
                const kanji = document.querySelector("td.kanji").textContent;
                const descriptions = document.querySelectorAll("div.description");

                //create the array to store info in
                const info = [];

                //iterate through kanji info and generate the embed data
                for(let index = 0; index < descriptions.length; index++){
                    if(index === 0){
                        info.push("\n**Meaning:**");
                    }
                    else if (index === 1){
                        info.push("\n**Furigana:**");
                    }
                    info.push(`${descriptions[index].textContent}`);
                }

                //get the stroke image & information url
                const strokeImage = `http://kanji.fm4dd.com/include/stroke.php?kanji=${kanji}`;
                const informationUrl = `https://jisho.org/search/%23kanji${kanji}`;

                //send a message to the channel based on the kanji
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