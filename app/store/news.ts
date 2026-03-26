import { defineStore } from 'pinia'
import type { INewsItem } from '~/types/news'
import { VisualMode, NewsSource } from '~/types/enums'
import { useLentaRuFetcher, useMosRuFetcher } from '~/server/fetch'

export const useNewsStore = defineStore('news', {

    state: () => ({

        news: [] as INewsItem[],
        loading: true,
        error: false,

        mode: VisualMode.GRID,

        page: 1,
        count: 4,
        source: NewsSource.ALL,
        query: ''

    }),

    actions: {

        async fetchMosRuNews() {
            return await useMosRuFetcher();
        },

        async fetchLentaRuNews() {
            return await useLentaRuFetcher();
        },

        configUrl() {
            const params = new URLSearchParams();
            if (this.source) {
                params.append('source', this.source);
            }
            
            if (this.query) {
                params.append('q', this.query);
            }
            
            const queryString = params.toString();
            const url = `/${this.page}/${queryString ? `?${queryString}` : ''}`;

            navigateTo(url);
        },

        setPage(page: number) {
            this.page = page;
            this.configUrl();
        },

        setSource(source: NewsSource) {
            this.source = source;
            if (this.currentPageFilteredNews.length == 0) this.page = 1;
            this.configUrl();
        },

        setQuery(query: string) {
            this.query = query;
            this.page = 1;
            this.configUrl();
        },

        reset() {
            this.source = NewsSource.ALL;
            this.page = 1;
            this.query = '';
            this.configUrl();
        }

    },

    getters: {
        filteredNews(): INewsItem[] {

            return this.news.filter((n: INewsItem) => {
                return (this.source == NewsSource.ALL || n.source == this.source) &&
                (!this.query.trim() || n.title.trim().toLowerCase().includes(this.query?.trim().toLowerCase()))
            });

        },

        currentPageFilteredNews(): INewsItem[] {
            return this.filteredNews.slice((this.page - 1) * this.count, (this.page - 1) * this.count + this.count)
        },

        totalPages() : number {
            let length = this.filteredNews.length;
            if (length % this.count == 0) return Math.ceil(length / this.count);
            return Math.floor(length / this.count) + 1;
        }
    }

});