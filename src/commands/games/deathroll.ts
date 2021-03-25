import { Collection, Message, MessageReaction, User } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";

export default class DeathRoll extends TsubasaCommand {
    public getName(): string {
        return "deathroll";
    }
    public getUsage(): string {
        return "deathroll";
    }
    public getDescription(): string {
        return "Starts a new deathroll game.";
    }
    public async run(msg: Message, _args: string[]): Promise<any> {
        const joinMessage = await sendEmbed(msg, "Tsubasa - Deathroll",
            `Deathroll hosted by ${msg.author.username}
            to join click the '🎮' below!`
        );

        await joinMessage.react('🎮');
        const users = await joinMessage.awaitReactions(filter, { max: 8, time: 5000, errors: ["time"] })
            .catch((collected: Collection<string, MessageReaction>) => {
                if (!collected || !collected.first()) return null;
                return collected.first().users.cache.filter((usr) => !usr.bot);
            });
        //if the collector failed
        if (!users) {
            return await sendEmbed(msg,
                "Tsubasa - Deathroll",
                `Was not able to start the game due to an error!`);
        }
        else if (users.size < 2) {
            return await sendEmbed(msg,
                "Tsubasa - Deathroll",
                `Was not able to begin due to a lack of players!
                Only got \`\`${users.size}\`\` players! 
                2 Players are required!`
            );
        }

        sendEmbed(msg, "Tsubasa - Deathroll", "This is where I would start if I was already programmed!");
    }
}

const filter = (reaction: MessageReaction, user: User) => {
    return ((reaction.emoji.name === "🎮") && (user.bot === false));
}