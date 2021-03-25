import { Client, DMChannel, Message, MessageEmbed, NewsChannel, TextChannel } from "discord.js";

const notSetEmbed = new MessageEmbed({ title: "Client Not Set" });
let client: Client = null;

/**
 * Return an information type embed for message display
 * @param title of the embed
 * @param description of the embed
 * @param imageUrl of the embed
 * @returns a discord embed with default color scheme
 */
export const createEmbed = (title: string = "", description: string = "", imageUrl: string = "", thmbUrl: string = ""): MessageEmbed => {
    if (!client) return notSetEmbed;
    return new MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setColor("#c375ff")
        .setTitle(title)
        .setThumbnail(thmbUrl)
        .setDescription(description)
        .setImage(imageUrl)
        .setTimestamp();
}

/**
 * Create an error embed with the error color & bug report url.
 * @param title of the error embed
 * @param description of the error
 * @param imageUrl for the error embed
 * @returns a discord error embe
 */
export const createErrorEmbed = (title: string = "", description: string = "", imageUrl: string = "", thmbUrl: string = ""): MessageEmbed => {
    if (!client) return notSetEmbed;

    //Add info about bug reporting
    description += "\n\nFound a bug? Report it at!\nhttps://github.com/QuillDev/TsubasaJS/issues !";

    // Create an embed with error data
    return new MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setColor("#f2433a")
        .setTitle(title)
        .setImage(imageUrl)
        .setThumbnail(thmbUrl)
        .setDescription(description)
        .setTimestamp();
}

export const sendEmbedToChannel = async (channel: TextChannel | DMChannel | NewsChannel, title: string = "", desc: string = "", imgUrl: string = "", thmbUrl = "") => {
    return await channel.send(createEmbed(title, desc, imgUrl, thmbUrl));
}

export const sendErrorEmbedToChannel = async (channel: TextChannel | DMChannel | NewsChannel, title: string = "", desc: string = "", imgUrl: string = "", thmbUrl = "") => {
    return await channel.send(createErrorEmbed(title, desc, imgUrl, thmbUrl));
}

export const sendEmbed = async (msg: Message, title: string = "", desc: string = "", imgUrl: string = "", thmbUrl = "") => {
    return await sendEmbedToChannel(msg.channel, title, desc, imgUrl, thmbUrl);
}

export const sendErrorEmbed = async (msg: Message, title: string = "", desc: string = "", imgUrl: string = "", thmbUrl = "") => {
    return await sendErrorEmbedToChannel(msg.channel, title, desc, imgUrl, thmbUrl);
}

/**
 * Set the client to use for embeds
 * @param newClient to set for embeds
 */
export const setClient = (newClient: Client) => {
    client = newClient;
}