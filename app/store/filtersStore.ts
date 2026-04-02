import { defineStore } from 'pinia'
import type { INewsItem, INewsSource } from '~/types/news'
import { NEWS_SOURCES } from '~/types/const'
import { useNewsStore } from './newsStore'

export const useFiltersStore = defineStore('filters', {

    state: () => ({

        _page: 1,
        _count: 4,
        _source: NEWS_SOURCES[0],
        _query: ''

    }),

    actions: {

        setPage(page: number) {
            this._page = page;
        },

        setSource(source: INewsSource) {
            this._source = source;
            if (this.filteredNews.length > 0 && this.currentPageFilteredNews.length == 0) this._page = 1;
        },

        setSourceByLinkName(link_name: string) {
            this._source = NEWS_SOURCES.find(n => n.link_name == link_name) ?? NEWS_SOURCES[0];
            if (this.filteredNews.length > 0 && this.currentPageFilteredNews.length == 0) this._page = 1;
        },

        setQuery(query: string) {
            if (this._query != query) this._page = 1;
            this._query = query;
        },

        reset() {
            this._source = NEWS_SOURCES[0];
            this._page = 1;
            this._query = '';
        }

    },

    getters: {

        page(): number {
            return this._page;
        },
        
        count(): number {
            return this._count;
        },

        query(): string {
            return this._query;
        },

        source(): INewsSource {
            return this._source as INewsSource;
        },

        filteredNews(): INewsItem[] {
            return useNewsStore().news.filter((n: INewsItem) => {
                return (this._source?.title == NEWS_SOURCES[0]?.title || n.source.title == this._source?.title) &&
                (!this._query.trim() || n.title.trim().toLowerCase().includes(this._query?.trim().toLowerCase()))
            });
        },

        currentPageFilteredNews(): INewsItem[] {
            return this.filteredNews.slice((this._page - 1) * this._count, (this._page - 1) * this._count + this._count);
        },

        totalPages() : number {
            let length = this.filteredNews.length;
            if (length % this._count == 0) return Math.ceil(length / this._count);
            return Math.floor(length / this._count) + 1;            
        }
    }

});