import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed, sendErrorEmbed } from "../../helper/embedHelper";

export default class Roll extends TsubasaCommand {
    public getName(): string {
        return "roll";
    }

    public getUsage(): string {
        return "roll";
    }

    public getDescription(): string {
        return "rolls a die";
    }

    public async run(msg: Message, args: string[]): Promise<any> {
        let roll = Math.floor(Math.random() * 6) + 1; //default roll value on die

        if (args.length === 1) {
            const max = Number.parseInt(args[0]); //check if args[1] is a valid num

            //if it is then we roll using it
            if (isNaN(max) || max < 0) {
                return await sendErrorEmbed(
                    msg,
                    "Roll",
                    `Invalid arguments, \`\`${args[0]}\`\` is not a valid positive integer`
                );
            }
            roll = Math.floor(Math.random() * max) + 1;
        }
        //if we're using min/max format
        else if (args.length >= 2) {
            const min = Number.parseInt(args[0]);
            const max = Number.parseInt(args[1]);
            if (isNaN(min) || isNaN(max) || max < 0 || min < 0) {
                return await sendErrorEmbed(
                    msg,
                    "Roll",
                    `Invalid arguments, either \`\`${args[0]}\`\` or \`\`${args[1]}\`\` is not a valid positive integer`
                );
            }
            roll = Math.floor(Math.random() * max) + min; //do a min/max roll id we have valid input
        }

        return await sendEmbed(msg, "Roll", `You rolled a :game_die: ${roll}`);
    }

}