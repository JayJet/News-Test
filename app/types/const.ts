import type { INewsSource } from './news'

export const ALL_SOURCES: INewsSource = {
    title: 'Все',
    link_name: 'all'
}

export const NEWS_SOURCES: INewsSource[] = [ALL_SOURCES].concat([
    {
      title: 'Лента',
      url: 'https://lenta.ru/rss/news',
      link_name: 'lentaru'
    } as INewsSource,

    {
      title: 'Mos.ru',
      url: 'https://mos.ru/rss',
      link_name: 'mosru'
    } as INewsSource,

    {
      title: 'Коммерсант',
      url: 'https://www.kommersant.ru/rss/news.xml',
      link_name: 'commersant'

    } as INewsSource,

    {
      title: 'Риа',
      url: 'https://ria.ru/export/rss2/index.xml',
      link_name: 'ria'

    } as INewsSource,

]);