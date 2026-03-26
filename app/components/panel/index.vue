<template>
    <div class="panel">
        <SourceTabs v-model="sourceTab"/>
        <div class="spacer"/>
        <GridTabs v-model="gridTab"/>
    </div>
</template>

<script setup>

    import { onMounted, watch } from 'vue';
    import SourceTabs from './sourceTabs.vue'
    import GridTabs from './gridTabs.vue'
    import { useNewsStore } from '~/store/news';
    import { VisualMode } from '~/types/enums';

    const newsStore = useNewsStore();

    const sourceTab = ref(newsStore.source);
    const gridTab = ref('rows');

    watch(gridTab, (nv, ov) => {
        if (!ov) return;
        if (nv) {
            newsStore.mode = nv;
            localStorage.setItem('mode', nv);
        }
    });

    watch(sourceTab, (nv) => {
        if (nv) {
            newsStore.setSource(nv);
        }
    });

    onMounted(() => {
        gridTab.value = localStorage.getItem('mode') ?? VisualMode.GRID;
    });

</script>

<style scoped>

</style>