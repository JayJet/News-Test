// composables/useTabs.ts
import { computed } from 'vue';
import { NEWS_SOURCES } from '~/types/const';

export const useTabs = (
    props: { modelValue: string },
    emit: {
        (e: 'update:modelValue', value: string): void
    }
) => {

    interface Tab {
        key: string;
        title?: string;
        icon?: string;
    }
    
    const selectTab = (tab: string) => {
        emit('update:modelValue', tab);
    };

    const activeColor = ref('');
    const inactiveColor = ref('');

    const gridTabs = computed((): Tab[] => {
        
        const rowMode: Tab = { key: 'rows', icon: 'rows' };
        const gridMode: Tab = { key: 'grid', icon: 'grid' };
        
        return [ rowMode, gridMode ];
        
    });

    const sourceTabs = computed((): Tab[] => {

        return NEWS_SOURCES.map(s => {
            return { key: s.link_name, title: s.title }
        });
        
    });

    const gridTabsMounted = () => {

        const root = document.documentElement;
        const styles = getComputedStyle(root);        
        activeColor.value = styles.getPropertyValue('--active-color').trim();
        inactiveColor.value = styles.getPropertyValue('--inactive-color').trim();

    };

    return {
        selectTab,
        sourceTabs,
        gridTabs,
        activeColor,
        inactiveColor,
        gridTabsMounted
    };

};