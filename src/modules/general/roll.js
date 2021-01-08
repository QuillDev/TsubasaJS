const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");


class Roll extends TsubasaCommand {
    get name(){
        return "roll";
    }

    get usage(){
        return "roll [max | ?min] [?max]";
    }

    get description(){
        return "Roll between a min and max value and return a result";
    }

    async run(msg, args){
        //if args.length is less than 1, return nothing
        if(args.length < 1){
            return;
        }

        //create min and max roll values
        const minMax = (args.length === 2);

        //determine min and max roll values
        const maxRoll =  Number.parseInt(args[minMax ? 1 : 0]);
        const minRoll =  minMax ? Number.parseInt(args[0]) : 0;

        //calculate the result
        const result = Math.floor(Math.random() * (maxRoll - minRoll + 1)) + minRoll;

        //if the number is nan, die
        if(Number.isNaN(result)){
            msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Error", `
            Invalid input, Valid Inputs:
            \`\`t>roll 1 100\`\`
            \`\`t>roll 100\`\`
            `));
            return;
        }

        //print the result to the server
        msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Roll", `**Result: ${result}** :game_die: `));
    }
}

module.exports = Roll;