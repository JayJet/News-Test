<template>
    <div class="tabs-container">
        <div class="button tab" v-for="t in tabs" :key="t.key" @click="selectTab(t.key)" :class="{ 'tab-active': modelValue == t.key }">{{ t.title }}</div>
    </div>
</template>

<script setup lang="ts">

    import { onMounted } from 'vue';
    const config = useRuntimeConfig();

    const props = defineProps<{
        modelValue: string;
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void;
    }>();   

    interface Tab {
        key: string;
        title: string;
    }

    const tabs = computed((): Tab[] => {
        
        const allTab: Tab = { key: 'all', title: 'Все' };
        
        const otherTabs = (config.public.SOURCES?.split(',') ?? [])
            .map(t => {
                const urlString = config.public[`${t.toUpperCase()}_URL`] as string | undefined;
                if (!urlString) return null;
                
                try {
                    const url = new URL(urlString);
                    return { key: t, title: url.hostname };
                } catch (error) {
                    return null;
                }
            })
            .filter((tab): tab is Tab => tab !== null);
        
        return [allTab, ...otherTabs];
    });

    const selectTab = (tab: string) => {
        emit('update:modelValue', tab);
    };

    onMounted(() => {

    });

</script>

<style scoped>

</style>