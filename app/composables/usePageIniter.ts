// composables/usePageIniter.ts
import { computed } from 'vue';
import { NEWS_SOURCES } from '~/types/const';

import { VisualMode } from '~/types/enums';
import type { INewsItem, INewsSource } from '~/types/news';
import { useFiltersStore } from '~/store/filtersStore';
import { useNewsStore } from '~/store/newsStore';
import { useModeStore } from '~/store/modeStore';
import { newsService } from '~/services/news';

import { useConfigUrl } from '~/composables/useConfigUrl'
    
export const usePageIniter = () => {

    const { configUrl } = useConfigUrl();

    const route = useRoute();
    const filtersStore = useFiltersStore();
    const newsStore = useNewsStore();
    const modeStore = useModeStore();

    let routePage = parseInt(route.params.page as string) ?? 1;
    const page = ref(routePage);

    const prefetchNews = async () => {
        const result: INewsItem[] = (await Promise.all(
            NEWS_SOURCES.filter(s => !!s.url).map(s => newsService.fetchNewsSource(s))
        )).flat() as INewsItem[];
        
        newsStore.setNews(result);

        if (routePage > 1 && filtersStore.currentPageFilteredNews.length == 0) {
            routePage = 1;
            configUrl();
        }

        return newsStore.news;
    };

    const initPage = () => {
        watch(page, (nv) => {
            filtersStore.setPage(nv);
            configUrl();
        });

        // Получаем параметры, задаем напрямую
        filtersStore.setSource(NEWS_SOURCES.find((c: INewsSource) => c.link_name == route.query.source as string) ?? NEWS_SOURCES[0] as INewsSource);
        filtersStore.setPage(routePage);
        filtersStore.setQuery(route.query.q as string ?? '');

    };

    const mountHandler = () => {

        let mode = localStorage.getItem('mode');
        if (mode == 'rows') modeStore.setMode(VisualMode.ROWS);
        if (mode == 'grid') modeStore.setMode(VisualMode.GRID);

        newsStore.setLoading(false);

    }

    const loading = computed(() => {
        return newsStore.loading;
    });

    const totalPages = computed(() => {
        return filtersStore.totalPages;
    });

    return {
        mountHandler,
        prefetchNews,
        initPage,
        loading,
        totalPages,
        page
    };

};