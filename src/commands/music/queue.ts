import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand"
import { sendEmbed } from "../../helper/embedHelper";
import { getMusicComponents } from "../../helper/musicHelper";

export default class Queue extends TsubasaCommand {
    public getName(): string {
        return "queue"
    }
    public getUsage(): string {
        return "queue"
    }
    public getDescription(): string {
        return "Gets the queue for the current player."
    }
    public async run(msg: Message, _args: string[]): Promise<any> {
        const { dispatcher } = await getMusicComponents(msg, this.client);

        const songStrings:string[] = [`Playing: ${dispatcher.current.info.title}`];
        const queue = dispatcher.queue;

        //Iterate through either length or 5 songs, whichever is less
        for(let i = 0; i < Math.min(queue.length, 5); i++){
            songStrings.push(`${i+1}) ${queue[i].info.title || "No title data!"}`);
        }
        
        //if we happen to have a really long queue, say how many songs past the ones we listed are in the queue.
        if(queue.length > 5){
            songStrings.push(`... and ${queue.length -5} more!`);
        }
        return sendEmbed(msg, "Tsubasa - Queue", songStrings.join("\n"));
    }

}