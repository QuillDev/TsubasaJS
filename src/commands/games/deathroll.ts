import { Collection, Message, MessageReaction, User } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { createEmbed, sendEmbed } from "../../helper/embedHelper";

interface lowestRoller {
    roll: number;
    user: User;
}

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
        const gameMessage = await sendEmbed(msg, "Tsubasa - Deathroll",
            `Deathroll hosted by ${msg.author.username}
            to join click the '🎮' below!`
        );

        await gameMessage.react('🎮');
        const users = await gameMessage.awaitReactions(joinFilter, { max: 8, time: 5000, errors: ["time"] })
            .then((collected: Collection<string, MessageReaction>) => {
                if (!collected || !collected.first()) return null;
                return collected.first().users.cache.filter((usr) => !usr.bot);
            })
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

        const roll = (max: number) => {
            return Math.floor(Math.random() * max) + 1;
        }

        let maxRoll = 10000;
        let currentRoll = maxRoll;

        const players = users.map((usr) => { return usr; });
        for (; players.length > 1;) {

            const deathMode = players.length === 2;

            // If there are more than 2 players, we're in lowest roll mode
            let lowest: lowestRoller;
            let userToElim: User;
            let reason: string;

            //Loop through the players
            for (const player of players) {
                gameMessage.reactions.removeAll();
                //Require player interaction
                const interacted = await sendInteract(gameMessage, player);
                if (!interacted) {
                    userToElim = player;
                    reason = "they did not roll in time!";
                    break;
                }

                // If we're not in death mode yet, process using normal logic
                if (!deathMode) {
                    let rollRes = roll(currentRoll);
                    //set the lowest roller
                    if (!lowest || lowest.roll > rollRes) {
                        lowest = { roll: rollRes, user: player }
                    }

                    gameMessage.edit(
                        createEmbed(
                            "Tsubasa - Deathroll",
                            `${player.username} rolled a ${rollRes}`
                        ));
                    continue;
                }

                //if we're in death mode
                currentRoll = roll(currentRoll);
                if (currentRoll === 1) {
                    userToElim = player;
                    reason = "they rolled a 1!";
                    break;

                }
                await gameMessage.edit(
                    createEmbed(
                        "Tsubasa - Deathroll",
                        `${player.username} rolled a ${currentRoll}`
                    ));
                await wait();
            }
            
            // Handle lowest mode elimination if we're not in death mode
            if (!deathMode) { userToElim = lowest.user; reason = "they rolled the lowest!" };
            if (userToElim) {
                await gameMessage.edit(createEmbed(`${userToElim.username} was eliminated because ${reason}`));
                players.splice(players.indexOf(userToElim), 1);
                await wait();
            }
        }

        await gameMessage.edit(createEmbed(
            "Tsubasa - Deathroll",
            `${players[0].username} won the deathroll!`
        ));
    }
}
const wait = async () => {
    return new Promise<void>(resolve => setTimeout(() => resolve(), 2250));;
}

// The filter for the join message
const joinFilter = (reaction: MessageReaction, user: User) => {
    return ((reaction.emoji.name === "🎮") && (user.bot === false));
}

// send the interact message for the user to engage in a new roll 
const sendInteract = async (msg: Message, player: User) => {
    await msg.edit(
        createEmbed(
            `${player.username} click the die to roll!`
        ));

    await msg.react('🎲');
    // Filter the reactions to only get ones where the user clicked with the correct emoji
    const filter = (reaction: MessageReaction, user: User) => {
        return ['🎲'].includes(reaction.emoji.name) && user.id === player.id;
    }

    const interacted = await msg.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
        .then(() => true)
        .catch(() => false);
    return interacted;
}