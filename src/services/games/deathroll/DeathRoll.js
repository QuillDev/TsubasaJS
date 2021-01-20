const Player = require("./Player");

class DeathRoll {

    /**
     * We assume that there are more than 1 player(s)
     * @param members
     * @param {Number} max roll value
     */
    constructor(members, max) {

        //create an array to store players in
        this.players = [];

        //start the roll at 10,000
        this.max = max;
        this.roll = this.max;

        //store messages here
        this.messages = [];

        //populate the list with new players
        for (let member of members) {
            this.players.push(new Player(this.roll, member));
        }
    }

    /**
     * Start a game of deathroll
     */
    async play(channel) {

        //while we have more than 1 player (aka we don't have a winner)
        while (this.players.length > 1) {
            for (let player of this.players) {

                let message = await channel.send(`${player.username}'s Turn to Roll!`);
                await message.react("🎲");

                // push the message to the messages array
                this.messages.push(message);

                //filter for controller reactions
                const filter = (reaction, user) => {
                    return ["🎲"].includes(reaction.emoji.name) && user.id === player.member.id;
                };


                //TODO Abstract this in the future
                //wait for players to get into the game
                let ready = await message.awaitReactions(filter, {time: 5000, errors: ['time']})
                    .catch((collector) => {
                        const reactions = collector.first();

                        //if there were no reactions, return false
                        if(reactions == null) {
                            return false;
                        }

                        let users = reactions.users.cache.filter(user => user.bot === false);

                        return users.size === 1;
                    });

                //if they didn't responsd
                if (!ready) {
                    await message.edit("User didn't respond and was automatically eliminated");
                    this.removePlayer(player);
                }

                //have that player roll
                player.roll(this.roll);

                //get the value of their roll
                const roll = player.currentRoll;



                //if the player rolled a 
                if (player.currentRoll === 1) {
                    //set the roll back to max
                    this.roll = this.max;
                    await message.edit(`Player ${player.username} eliminated`);
                    this.removePlayer(player);
                }
                else{
                    //get the index of the player
                    await message.edit(`Player ${player.username} rolled: ${roll}`);
                }

                //if there are only 2 players use that roll
                if (this.players.length === 2) {
                    this.roll = roll;
                }
            }

            //if there is more than 2 players
            if (this.players.length > 2) {
                let sortedList = [...this.players].sort((a, b) => a.currentRoll - b.currentRoll);

                let player = sortedList[0];

                //push this message into the messages array
                this.messages.push(
                    await channel.send(`Eliminated player ${player.username} because they had the lowest roll this round!`)
                );

                 // push the message to the messages array
                this.roll = sortedList[0].currentRoll;
                this.removePlayer(sortedList[0]);
            }
        }
        this.messages.push(await channel.send(`Player ${this.players[0].username} was victorious!`));

        //delete the messages
        let log = "GAME OVER!\n";

        //create the log and delete the messages
        for(const msg of this.messages){
            log += msg.content + "\n";
            msg.delete();
        }

        await channel.send("```" + log + "```"); //log the message
    }

    removePlayer(player){
        this.players.splice(this.getPlayerIndex(player), 1);
    }

    getPlayerIndex(player){
        return this.players.indexOf(player);
    }
}

module.exports = DeathRoll;