import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { createEmbed, sendErrorEmbed } from "../../helper/embedHelper";
import { getSauceData } from "../../helper/sauceHelpter";

export default class Sauce extends TsubasaCommand {
    public getName(): string {
        return "sauce"
    }

    public getUsage(): string {
        return "sauce [imageUrl] OR Image Attachment"
    }

    public getDescription(): string {
        return "Tries to get the sauce for the given image"
    }
    
    //TODO: Go through and clean up
    public async run(msg: Message, args: string[]): Promise<any> {
        //create var for proxyurl
        let proxyUrl;

        //If there's actually attachments then use those
        if (msg.attachments.size > 0) {
            proxyUrl = msg.attachments.first().proxyURL;
        }

        //if the length of the embed is zero
        else if (msg.embeds.length === 0) {
            //if args0 exists
            if (args[0]) {
                //check if it ends with jpg or png for seeing if we should use it
                if (args[0].endsWith(".jpg") || args[0].endsWith(".png")) {
                    proxyUrl = args[0];
                }
            }
        }
        else {
            const embedUrl = msg.embeds[0].thumbnail.url;

            if (embedUrl.includes("?")) {
                //get the proxy url from the message
                proxyUrl = embedUrl.substring(0, embedUrl.indexOf("?"));
            }
            else {
                proxyUrl = msg.embeds[0].thumbnail.proxyURL;
            }
        }
        //if there was no proxyUrl
        if (!proxyUrl) {
            return await sendErrorEmbed(msg, "Tsubasa - Sauce", "Couldn't find the attachment you linked.");
        }

        //get sauce data for the url
        const sauceData = await getSauceData(proxyUrl)
            .catch(() => null);

        //If saucedata came back null say there was an error
        if (!sauceData) {
            return await sendErrorEmbed(msg, "Tsubasa - Sauce", "There was  an error retrieving data for image provided.");
        }

        //get the source from the saucedata
        let url = sauceData.source;

        //check if it's really a url
        try {
            new URL(url);
        }
        catch {
            url = `https://www.google.com/search?&q=${encodeURIComponent(url)}`;
        }

        //create the embed
        const embed = createEmbed()
            .setThumbnail(proxyUrl)
            .setTitle(sauceData.name)
            .setAuthor("Tsubasa - Sauce", this.client.user.displayAvatarURL(), url)
            .addFields(
                { name: "Similarity", value: sauceData.similarity, inline: true },
                { name: "Author", value: sauceData.author, inline: true },

            )
            .setDescription(`**Source Name/URL**\n${url}`)
            .setTimestamp()

        await msg.channel.send(embed);
    }
}