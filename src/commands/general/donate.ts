import { Message } from "discord.js";
import { TsubasaCommand } from "../../abstract/TsubasaCommand";
import { sendEmbed } from "../../helper/embedHelper";

export default class Donate extends TsubasaCommand{
    public getName(): string {
        return "donate"
    }
    public getUsage(): string {
        return "donate"
    }
    public getDescription(): string {
        return "Gets donation url for QuillDev!";
    }
    public run(msg: Message, _args: string[]): Promise<any> {
        return sendEmbed(msg, 
            "Donate",
            `Feeling generous? Help Quilldev develop more content like Tsubasa!
            https://ko-fi.com/quilldev#checkoutModal`,
            null,
            "https://storage.ko-fi.com/cdn/useruploads/90b93b74-0a70-4e95-bfce-935f5e52aae2.png"
            )
    }
}