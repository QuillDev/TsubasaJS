const TsubasaCommand = require("../../tsubasa-abstract/TsubasaCommand");

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

        //if the member is not in a voice channel
        if(!msg.member.voice.channelID){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Queue", "You need to be in a voice channel to use this command!"));
        }

        //get the "queue" from the guild
        let res = this.client.queue.get(msg.guild.id);

        //if queue is null
        if(!res){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Queue", `Can"t get the player for ths channel, does it exist?`));
        }

        //if no song is playing then send an error
        if(!res.current){
            return await msg.channel.send(this.client.embedHelper.createErrorEmbed("Tsubasa - Queue", `No track is currently playing.`));
        }

        //if the length of the queue is zero
        if(res.queue.length === 0){
            return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Queue",
                `
                Currently Playing: ${res.current.info.title}\n
                No other songs in queue.
                `
            ));
        }
        else if(res.queue.length < 5) {

            //start the description
            let description = `Currently Playing: ${res.current.info.title}\n`;

            //iterate through the first five songs and add them to the description
            for(let index = 0; index < res.queue.length; index++){
                description += `${index+1}) ${res.queue[index].info.title}\n`;
            }

            //print out the queue
            return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Queue", description));
        }
        else {
            //start the description
            let description = `Currently Playing: ${res.current.info.title}\n`;

            //iterate through the first five songs and add them to the description
            for(let index = 0; index < 5; index++){
                description += `${index+1}) ${res.queue[index].info.title}\n`;
            }
            description += `and ${res.queue.length - 5} others!`;

            //print out the queue
            return await msg.channel.send(this.client.embedHelper.createEmbed("Tsubasa - Queue", description));
        }

    }
}

module.exports = Queue;