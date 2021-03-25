import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";

const kaomoji = [
	"(*^ω^)",
	"(◕‿◕✿)",
	"(◕ᴥ◕)",
	"ʕ•ᴥ•ʔ",
	"ʕ￫ᴥ￩ʔ",
	"(*^.^*)",
	"owo",
	"OwO",
	"(｡♥‿♥｡)",
	"uwu",
	"UwU",
	"(*￣з￣)",
	">w<",
	"^w^",
	"(つ✧ω✧)つ",
	"(/ =ω=)/",
];

export default class uwu extends TsubasaCommand {
    public getName(): string {
        return "uwu";
    }
    public getUsage(): string {
        return "uwu";
    }
    public getDescription(): string {
        return "It mwakes da commwand gwo uwu (/ =ω=)/!";
    }
    public async run(msg: Message, args: string[]): Promise<any> {
        let str = msg.content.split(" ").slice(1, args.length+1).join(" ");
        str = str.replace(/(?:l|r)/g, "w");
        str = str.replace(/(?:L|R)/g, "W");
        str = str.replace(/n([aeiou])/g, "ny$1");
        str = str.replace(/N([aeiou])|N([AEIOU])/g, "Ny$1");
        str = str.replace(/ove/g, "uv");
        str = str.replace(/nd(?= |$)/g, "ndo");
        str = str.replace(/!+/g, ` ${kaomoji[Math.floor(Math.random() * kaomoji.length)]}`);

        return await sendEmbed(msg, "Tsubasa - uwu", str);
    }

}