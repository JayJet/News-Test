import Parser from 'rss-parser';
import { ifetch } from './fetch'

export const fetchRss = async (url: string): Promise<Record<string, any>[]> => {

    let text: string | null = await ifetch(url);
    if (!text) return [];
    
    const parser = new Parser();
    const feed: Record<string, any>[] = (await parser.parseString(text)).items;
    
    return feed;

}