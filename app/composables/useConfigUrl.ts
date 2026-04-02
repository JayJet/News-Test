// composables/useConfigUrl.ts
import { useFiltersStore } from '~/store/filtersStore';

export const useConfigUrl = () => {
    
    const filtersStore = useFiltersStore();

    const configUrl = () => {
        const params = new URLSearchParams();
        if (filtersStore.source) params.append('source', filtersStore.source.link_name);            
        if (filtersStore.query) params.append('q', filtersStore.query);
        
        const queryString = params.toString();
        const url = `/${filtersStore.page}/${queryString ? `?${queryString}` : ''}`;

        navigateTo(url);
    };

    return {
        configUrl
    };

};