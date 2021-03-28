import get from "got";
import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";
import { parseHTML } from "linkedom";

export default class Kanji extends TsubasaCommand {
    public getName(): string {
        return "kanji";
    }
    public getUsage(): string {
        return "kanji [?JLPT level]";
    }
    public getDescription(): string {
        return "Gets a kanji at the given JLPT level";
    }

    public async run(msg: Message, args: string[]): Promise<any> {

        //TODO: Move this to it's own file?
        //specify a number between 1 and 5 for the level
        let level = Math.floor(Math.random() * 5) + 1;

        //make sure argumnets exist before checking
        if (args && args.length > 0) {

            //parse the level arg from the arguments
            const levelArg = parseInt(args[0]);

            //check if the number is an interger
            if (Number.isInteger(levelArg)) {
                if (levelArg <= 5 && levelArg >= 1) {
                    level = levelArg;
                }
            }
        }

        //get a random kanji @ the given level
        const { body } = await get(`http://kanji.fm4dd.com/kanji-random.php?type=JLPT&level=N${level}`);
        if (!body) { return await sendErrorEmbed(msg, "Tsubasa - Kanji", "Failed to get kanji data page."); }

        const { document } = parseHTML(body);

        // Get data on the given kanji
        const kanji = document.querySelector("td.kanji").textContent;
        const descriptions = document.querySelectorAll("div.description");

        //create the array to store info in
        const info = [];

        //iterate through kanji info and generate the embed data
        for (let index = 0; index < descriptions.length; index++) {
            if (index === 0) {
                info.push("\n**Meaning:**");
            }
            else if (index === 1) {
                info.push("\n**Readings:**");
            }
            info.push(`${descriptions[index].textContent}`);
        }

        //get the stroke image & information url
        const strokeImage = `http://kanji.fm4dd.com/include/stroke.php?kanji=${kanji}`;
        const informationUrl = `https://jisho.org/search/%23kanji${kanji}`;

        //send a message to the channel based on the kanji
        sendEmbed(msg, "Tsubasa - Kanji",
            `**JLPT Level ${level}**\n**Kanji:**\n${kanji}${info.join("")}
                                **Additional Information:**
                                ${informationUrl}
                                `, strokeImage)
    }

}