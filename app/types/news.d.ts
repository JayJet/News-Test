// types/news.d.ts
export interface INewsItem {
    id: string;
    title: string;
    description: string;
    link: string;
    pubDate: string;
    source: INewsSource;
    images?: string[];
}

export interface INewsSource {
    title: string;
    url?: string;
    link_name: string;
}