export interface SauceIndex {
    status: number;
    parent_id: number;
    id: number;
    results: number;
}

export interface SauceHeader {
    user_id: string;
    account_type: string;
    short_limit: string;
    long_limit: string;
    long_remaining: number;
    short_remaining: number;
    status: number;
    results_requested: string;
    index: SauceIndex[];
    search_depth: string;
    minimum_similarity: number;
    query_image_display: string;
    query_image: string;
    results_returned: number;
}

export interface SauceResponse {
    header: SauceHeader;
    results: SauceEntry[];
}

export interface SauceEntryHeader {
    similarity: string;
    thumbnail: string;
    index_id: number;
    index_name: string;
    dupes: number;
}

export interface SauceEntryData {
    ext_urls?: string[];
    source?:string;
    title: string;
    eng_name?:string;
    jp_name?:string;
    creator?:string[];
    author_name?: string;
    author_url?: string;
    da_id?: string;
    pixiv_id?:number;
    member_name?:string;
    member_id?:number;
}

export interface SauceEntry {
    header: SauceEntryHeader;
    data: SauceEntryData;
}

export interface SauceData {
    similarity: string;
    source: string;
    name: string;
    image_url?:string;
    author: string;
}