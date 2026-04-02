// composables/usePanelIniter.ts
import { VisualMode } from '~/types/enums';
import { useFiltersStore } from '~/store/filtersStore';
import { useModeStore } from '~/store/modeStore';

import { useConfigUrl } from '~/composables/useConfigUrl'
    
export const usePanelIniter = () => {

    const { configUrl } = useConfigUrl();
    const filtersStore = useFiltersStore();
    const modeStore = useModeStore();
    const sourceTabLinkName = ref(filtersStore.source.link_name);
    const gridTab = ref('rows');

    const init = () => {

        watch(gridTab, (nv, ov) => {
            if (!ov) return;
            if (nv) {
                modeStore.setMode(nv as VisualMode);
                localStorage.setItem('mode', nv);
            }
        });

        watch(sourceTabLinkName, (nv) => {
            if (nv) {
                filtersStore.setSourceByLinkName(nv);
                configUrl();
            }
        });

        watch(() => filtersStore.source,
            (newValue) => sourceTabLinkName.value = newValue.link_name);
    }

    const mountHandler = () => {
        gridTab.value = localStorage.getItem('mode') ?? VisualMode.GRID;
    };

    return {
        mountHandler,
        init,
        gridTab,
        sourceTabLinkName
    };

};