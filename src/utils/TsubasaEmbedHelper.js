//Include the discord.js api
const Discord = require('discord.js');


class TsubasaEmbedHelper {
    constructor(client) {
        this.client = client;
    }

    /**
     * Create an embed designed for errors with a custom title and description
     * @param title - The title of the embed.
     * @param description - The description of the embed
     * @returns {module:"discord.js".MessageEmbed} - An embed designed to print errors
     */
    createErrorEmbed(title, description = "") {

        //Add info about bug reporting
        description +="\n\nFound a bug? Report it at!\nhttps://github.com/QuillDev/TsubasaJS/issues !";

        // Create an embed with error data
        return new Discord.MessageEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
            .setColor("#f2433a")
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    }

    /**
     * Create an embed that can take images, etc.
     * @param title - The title of the embed.
     * @param description - The embeds description.
     * @param imageUrl - The url for the embed's image
     * @returns {module:"discord.js".MessageEmbed}
     */
    createEmbed(title, description = "", imageUrl = ""){
        return new Discord.MessageEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
            .setColor(this.client.color)
            .setTitle(title)
            .setDescription(description)
            .setImage(imageUrl)
            .setTimestamp();
    }
}

module.exports = TsubasaEmbedHelper;