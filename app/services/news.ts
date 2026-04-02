import type { INewsItem, INewsSource } from "~/types/news";
import { fetchRss } from "~/server/rss";

export const newsService = {

    fetchNewsSource: async (source: INewsSource): Promise<INewsItem[]> => {

        if (!source.url) return [];

        const items: Record<string, any> = await fetchRss(source.url);
        const items_result: INewsItem[] = [];
        items.map((item:Record<string, any>) => {

            let split_link: string[] = item.link.split('/');
            let id: string | undefined | null = null;
            if (split_link.length > 1) id = split_link[split_link.length - 2];

            let text = item.description?.trim();
            if (!text) text = item.content?.trim();
            if (!text) text = item.title;

            const news_item: INewsItem = {
                title: item.title,
                description: text,
                pubDate: item.pubDate,
                link: item.link,
                images: item.enclosure?.url ? [item.enclosure.url] : [],
                source,
                id: `${ source.link_name }_${id ?? new Date().getTime()}`
            };

            items_result.push(news_item);
        });

        return items_result;

    }

}