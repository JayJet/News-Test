<template>
    <div class="tabs-container">
        <div class="button" v-for="t in tabs" :key="t.key" @click="selectTab(t.key)">

            <RowsIcon v-if="t.key == 'rows'" :color="modelValue == 'rows' ? activeColor : inactiveColor"/>
            <GridIcon v-if="t.key == 'grid'" :color="modelValue == 'grid' ? activeColor : inactiveColor"/>

        </div>
    </div>
</template>

<script setup lang="ts">

    import { onMounted } from 'vue';
    import RowsIcon from '~/assets/rows.vue'
    import GridIcon from '~/assets/grid.vue'

    const props = defineProps<{
        modelValue: string;
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void;
    }>();   

    interface Tab {
        key: string;
        icon: string;
    }

    const tabs = computed((): Tab[] => {
        
        const rowMode: Tab = { key: 'rows', icon: 'rows' };
        const gridMode: Tab = { key: 'grid', icon: 'grid' };
        
        return [ rowMode, gridMode ];
        
    });

    const selectTab = (tab: string) => {
        emit('update:modelValue', tab);
    };
    
    const activeColor = ref('');
    const inactiveColor = ref('');

    onMounted(() => {

        const root = document.documentElement;
        const styles = getComputedStyle(root);        
        activeColor.value = styles.getPropertyValue('--active-color').trim();
        inactiveColor.value = styles.getPropertyValue('--inactive-color').trim();

    });

</script>

<style scoped>

</style>