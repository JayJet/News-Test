import { defineStore } from 'pinia'
import type { INewsItem } from '~/types/news'

export const useNewsStore = defineStore('news', {

    state: () => ({

        _news: [] as INewsItem[],
        _loading: true,
        _error: false

    }),

    actions: {

        setNews(news: INewsItem[]) {
            this._news = news;
        },

        setLoading(loading: boolean) {
            this._loading = loading;
        },
        
        setError(error: boolean) {
            this._error = error;
        }

    },

    getters: {

        news(): INewsItem[] {
            return this._news;
        },

        loading(): boolean {
            return this._loading;
        },

        error(): boolean {
            return this._error;
        }

    }

});