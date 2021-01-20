const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const DeathRoll = require("../../services/games/deathroll/DeathRoll");

class DeathrollStart extends TsubasaCommand {
    get name(){
        return "deathroll";
    }

    get usage(){
        return "deathroll";
    }

    get description(){
        return "Sends an embed to the channel with data on the anime";
    }


    async run(msg){
        let message = await msg.channel.send(`Join Deathroll - Hosted by ${msg.author.username}!`);
        await message.react("🎮");

        //filter for controller reactions
        const filter = (reaction, user) => {
            return ["🎮"].includes(reaction.emoji.name);
        };


        //TODO Abstract this in the future
        //wait for players to get into the game
        let users = await message.awaitReactions(filter, { time: 5000, errors: ['time'] })
            .catch( (collector) => {

                //TODO: Duplicate code, fix plox
                //if the collector was null, return that we don't have enough players
                if(collector == null) {
                    return msg.channel.send(this.client.embedHelper.createErrorEmbed("DeathRoll - Start", "Not enough players to start the death roll!"));
                }

                const reactions = collector.first(); //get the first reaction from the collector
                //filter for only non-bot users
                let users = reactions.users.cache.filter( user => user.bot === false);

                //if the collector is null,
                if(users.size < 1){
                    return msg.channel.send(this.client.embedHelper.createErrorEmbed("DeathRoll - Start", "Not enough players to start the death roll!"));
                }

                return users;
            });

        //create an array for reacting players
        let players = [];

        //iterate through any users
        users.forEach( (member) => {
            players.push(member);
            console.log(member.username);
        });

        //if there are less than 2 players, kill it
        if(players.length < 2){
            return msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Deathroll",
                "Not enough players to start the match!"));
        }

        //start a new deathroll game
        const deathRoll = new DeathRoll(players, 10000); //start a new deathroll game
        await deathRoll.play(msg.channel); //start the deathroll game in the given channel


    }
}

module.exports = DeathrollStart;