import * as fg from "fast-glob"
import { TextChannel } from "discord.js";
import { TsubasaCommand } from "../abstract/TsubasaCommand";
import { sendErrorEmbed } from "../helper/embedHelper";
import { TsubasaClient } from "../TsubasaClient";

export class MessageHandler {

    client: TsubasaClient;
    commands: Map<string, TsubasaCommand>;
    constructor(client: TsubasaClient) {
        this.client = client;
        this.commands = new Map();

        this.loadCommands();
    }

    init = async () => {
        //attach a message handler to the client
        this.client.on("message", async (msg) => {
            if (msg.author.bot) return; //if the author of the message is a bot
            if (!msg.content.startsWith(process.env.PREFIX)) return; //if the message doesn't start with the prefi
            if (!(msg.content.length > process.env.PREFIX.length)) return; //if the message is just the prefix
            try {
                //setup the args & command.
                const args = msg.content.substring(process.env.PREFIX.length).split(" ");
                const command = args.splice(0, 1).toString();
                const cmd = this.commands.get(command);

                //if there is no matching command, log that we couldn't find one!
                if (!cmd) {
                    return await msg.channel.send(`Command \`\`${command}\`\` not found.`);
                }
                //TODO: Add the ability to just kinda "insert" middleware here... might be cool
                //NSFW filtering for commands
                if (cmd.nsfw) {
                    if (!(msg.channel.type === "dm")) { //if the channel is not a DM channel
                        const channel = <TextChannel>msg.channel; //typecast it to a text channel
                        if (!channel.nsfw) { //if the channel is NOT nsfw, stop execution
                            return await sendErrorEmbed(msg,
                                `Tsubasa - Safety`,
                                `You may not use NSFW commands in SFW channels!
                                For information on how to set up NSFW channels read this
                                https://tinyurl.com/discord-nsfw-creation`)
                        }
                    }
                }
                //run the command
                cmd.run(msg, args);
            }
            catch (err) {
                console.error(err);
                msg.channel.send("An error occured while processing your command.");
            }
        });
    }

    //Load the commands dynamically from the src/commands directory
    loadCommands = async () => {
        const files = await fg(['src/commands/*/*.ts'], { onlyFiles: true });
        for (const file of files) {

            const relpath = file.split("src/commands/")[1];

            import("../commands/" + relpath)
                .then((module) => {
                    const command: TsubasaCommand = new module.default(this.client);
                    this.commands.set(command.getName(), command);
                    console.log(`[Command Handler] Registered command ${command.getName()}`);
                });
        }
    }
}