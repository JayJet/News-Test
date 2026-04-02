// composables/useNewsList.ts
import { computed } from 'vue';
import { useFiltersStore } from '~/store/filtersStore';
import { useModeStore } from '~/store/modeStore';
import { VisualMode } from '~/types/enums';
import GridCell from '~/components/news/cell/gridCell.vue'
import RowCell from '~/components/news/cell/rowCell.vue'

export const useNewsList = (
    
) => {

    const filtersStore = useFiltersStore();
    const modeStore = useModeStore();

    const newsComponent = computed(() => {
        return modeStore.mode == VisualMode.ROWS ? RowCell : GridCell;
    });

    const newsContainerClass = computed(() => {
        return modeStore.mode == VisualMode.ROWS ? 'news-container-column' : 'news-container-grid';
    });

    const news = computed(() => {
        return filtersStore.currentPageFilteredNews;
    });

    return {
        newsComponent,
        newsContainerClass,
        news
    };

};