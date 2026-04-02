// composables/useHeader.ts
import { useFiltersStore } from '~/store/filtersStore';
import { useConfigUrl } from '#imports';

export const useHeader = () => {

    const filtersStore = useFiltersStore();
    const { configUrl } = useConfigUrl();

    const searchQuery = ref(filtersStore.query);
    let searchTimeout: ReturnType<typeof setTimeout> | null = null;
    
    const handleSearchInput = () => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        searchTimeout = setTimeout(() => {
            filtersStore.setQuery(searchQuery.value);
            configUrl();  
        }, 500);
    };

    const handleRefresh = () => {
        filtersStore.reset();
        searchQuery.value = '';
        configUrl();
    };

    const unmountHandler = () => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
    }

    return {
        handleSearchInput,
        handleRefresh,
        unmountHandler,
        searchQuery
    }

}