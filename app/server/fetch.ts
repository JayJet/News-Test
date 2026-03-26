import type { INewsItem } from "~/types/news"
import Parser from 'rss-parser';
import { NewsSource } from '~/types/enums'

const fetchRss = async (url: string): Promise<Record<string, any>[]> => {

    let text: string | any = await $fetch(url);
    if (typeof text != 'string') text = await text.text();
    
    const parser = new Parser();
    const feed: Record<string, any>[] = (await parser.parseString(text)).items;
    
    return feed;

}

export const useMosRuFetcher = async (): Promise<INewsItem[]> => {

    const config = useRuntimeConfig();

    const items: Record<string, any> = await fetchRss(config.public.MOSRU_URL as string);
    const items_result: INewsItem[] = [];
    items.map((item:Record<string, any>) => {

        let split_link: string[] = item.link.split('/');
        let id: string | undefined | null = null;
        if (split_link.length > 1) id = split_link[split_link.length - 2];

        const news_item: INewsItem = {
            title: item.title,
            description: item.description ?? item.content,
            pubDate: item.pubDate,
            link: item.link,
            images: item.enclosure?.url ? [item.enclosure.url] : [],
            source: NewsSource.MOS_RU,
            id: `mosru_${id ?? ''}`
        }

        items_result.push(news_item);
    });    

    return items_result;

}

export const useLentaRuFetcher = async (): Promise<INewsItem[]> => {

    const config = useRuntimeConfig()

    const items: Record<string, any> = await fetchRss(config.public.LENTARU_URL as string);
    const items_result: INewsItem[] = [];
    items.map((item:Record<string, any>) => {

        let split_link: string[] = item.link.split('/');
        let id: string | undefined | null = null;
        if (split_link.length > 1) id = split_link[split_link.length - 2];
        
        const news_item: INewsItem = {
            title: item.title,
            description: item.title,
            pubDate: item.pubDate,
            link: item.link,
            images: [item.enclosure.url],
            source: NewsSource.LENTA_RU,
            id: `mosru_${id ?? ''}`
        }

        items_result.push(news_item);
    });
    

    return items_result;

}