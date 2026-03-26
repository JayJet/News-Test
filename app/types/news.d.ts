// types/news.d.ts
export interface INewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  images?: string[];
}