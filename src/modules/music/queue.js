const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");
const musicHelper = require("../../utils/TsubasaMusicHelper");

class Queue extends TsubasaCommand {

    get name(){
        return "queue";
    }

    get usage(){
        return "queue";
    }

    get description(){
        return `Get"s the current music queue.`;
    }

    async run(msg){

        //check if the dispatcher is valid
        const dispatcher = await musicHelper.validDispatcher(this, msg);

        //if the dispatcher exists
        if(dispatcher){

            //if the length of the queue is zero
            if(dispatcher.queue.length === 0){
                return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Queue",
                    `
                Currently Playing: ${dispatcher.current.info.title}\n
                No other songs in queue.
                `
                ));
            }
            else if(dispatcher.queue.length < 5) {

                //start the description
                let description = `Currently Playing: ${dispatcher.current.info.title}\n`;

                //iterate through the first five songs and add them to the description
                for(let track of dispatcher.queue){
                    description += `${dispatcher.queue.indexOf(track)+1}) ${track.info.title}\n`;
                }

                //print out the queue
                return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Queue", description));
            }
            else {
                //start the description
                let description = `Currently Playing: ${dispatcher.current.info.title}\n`;

                //iterate through the first five songs and add them to the description
                for(let index = 0; index < 5; index++){
                    description += `${index+1}) ${dispatcher.queue[index].info.title}\n`;
                }
                description += `and ${dispatcher.queue.length - 5} others!`;

                //print out the queue
                return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Queue", description));
            }
        }

    }
}

module.exports = Queue;