const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const DeathRoll = require("../../services/games/deathroll/DeathRoll");

class DeathrollStart extends TsubasaCommand {
    get name(){
        return "dr-start";
    }

    get usage(){
        return "dr start";
    }

    get description(){
        return "Sends an embed to the channel with data on the anime";
    }


    async run(msg){
        let message = await msg.channel.send("its a test bro");

        await message.react("🎮");

        const filter = (reaction, user) => {
            return ["🎮"].includes(reaction.emoji.name);
        };


        //TODO Abstract this in the future
        //wait for players to get into the game
        let users = await message.awaitReactions(filter, { time: 5000, errors: ['time'] })
            .catch( (collector) => {
                const reactions = collector.first();


                let users = reactions.users.cache.filter( user => user.bot === false);

                //if the collector is null,
                if(users.size < 1){
                    return msg.channel.send(this.client.embedHelper.createEmbed("DeathRoll - Start", "Not enough players to start the death roll!"));
                }

                return users;
            });

        let printmsg = "Players: ";

        console.log(users);

        users.forEach( x => printmsg += `${x.username}, `)

        return msg.channel.send(printmsg);

    }
}

module.exports = DeathrollStart;