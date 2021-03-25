import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";
import { getMusicComponents } from "../../helper/musicHelper";
import { getId } from "../../helper/youtubeHelper";

export default class Playing extends TsubasaCommand {
    public getName(): string {
        return "playing"
    }
    public getUsage(): string {
        return "playing";
    }
    public getDescription(): string {
        return "Gets the currently playing song."
    }
    public async run(msg: Message, _args: string[]): Promise<any> {

        const {dispatcher} = await getMusicComponents(msg, this.client);

        //create the slider to show song progress
        const hyphenLength = 67;
        const percent_completed = dispatcher.player.position / dispatcher.current.info.length;
        const cursorPosition = Math.round(percent_completed * hyphenLength);

        //var for the progress bar
        let progressBar = "";

        //iterates through all of the hypen indexes and
        for(let index = 0; index < hyphenLength; index++){
            if(index === cursorPosition){
                progressBar += ":blue_circle:";
                continue;
            }
            //append a hypen if we're not at the cursor position
            progressBar += '-';
        }

        //TODO: Add image scrapers for more sites than youtube
        //create the thumbnail url TODO this is likely to break, maybe come up with a custom solution?
        const imageUrl = `https://img.youtube.com/vi/${getId(dispatcher.current.info.uri)}/0.jpg`;

        return await sendEmbed(msg, "Tsubasa - Playing", progressBar, imageUrl);
    }

}