import { Client } from "youtubei";
const youtube = new Client();

export const search = async (query: string) => {
    return await youtube.search(query, { type: "video" });
}

export const searchAndGetFirst = async(query:string) => {
    const results = await search(query);
    if(!results || results.length === 0) return null;
    return results[0];
}

export const getFirstUrl = async(query:string) => {
    const first = await searchAndGetFirst(query);
    if(!first) return null;
    return `https://www.youtube.com/watch?v=${first.id}`;
}