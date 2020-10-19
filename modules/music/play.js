const embedHelper = require('../../utils/embedbuilder');

//TODO come back here later.
async function run(msg, args) {

    //if the user is not in a voice channel
    if(!msg.member.voice.channelID){
        return embedHelper.createErrorEmbed('Tsubasa - Play', `${msg.author.username} you're not in a voice channel.`);
    }

    //if the first argument does not exist
    if(!args[0]){
        return embedHelper.createEmbed('Tsubasa - Play', `${msg.author.username}, you did not provide a song.`);
    }
}

//Export the command
module.exports = {
    name: 'play',
    description: 'Plays a song based on the query given',
    async execute(msg, args){
        await msg.channel.send(await run(msg, args));
    },
};