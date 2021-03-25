import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";

export default class pfp extends TsubasaCommand {
    public getName(): string {
        return "pfp"
    }
    public getUsage(): string {
        return "pfp [?user]";
    }
    public getDescription(): string {
        return "Gets the profile picture of the user tagged (if specified) or the author";
    }
    
    public async run(msg: Message, _args: string[]): Promise<any> {
        let user = msg.author;
        const target = msg.mentions.users.first();

        //if the target exists set the url to theirs
        if (target) {
            user = target;
        }

        return await sendEmbed(msg, 
            `PFP of ${user.username}`,
            "",
            user.displayAvatarURL()
            );
    }
}