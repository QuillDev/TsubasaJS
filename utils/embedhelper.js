//Include the discord.js api
const Discord = require('discord.js');

/**
 * Create an embed designed for errors with a custom title and description
 * @param title - The title of the embed.
 * @param description - The description of the embed
 * @returns {module:"discord.js".MessageEmbed} - An embed designed to print errors
 */
function createErrorEmbed(title, description = "") {
    const embed = new Discord.MessageEmbed()
        .setColor('#f66464')
        .setTitle(title)
        .setDescription(description)
        .setTimestamp()

    return embed;
}

/**
 * Create an embed that can take images, etc.
 * @param title - The title of the embed.
 * @param description - The embeds description.
 * @param imageUrl - The url for the embed's image
 * @returns {module:"discord.js".MessageEmbed}
 */
function createEmbed(title, description = "", imageUrl = ""){
    const embed = new Discord.MessageEmbed()
        .setColor('#9047ab')
        .setTitle(title)
        .setDescription(description)
        .setImage(imageUrl)
        .setTimestamp()

    return embed;
}

module.exports = {
    createErrorEmbed : createErrorEmbed,
    createEmbed : createEmbed
}