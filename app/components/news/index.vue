<template>
    <div :class="newsContainerClass">
        <component :is="newsComponent" v-for="item in news" :item="item"/>
    </div>

    <div class="not-found-text" v-if="!news?.length">Новостей не найдено.</div>
</template>

<script setup>

    import { onMounted, watch } from 'vue';

    import { useNewsStore } from '~/store/news';
    const newsStore = useNewsStore();
    import { VisualMode } from '~/types/enums';
    import GridCell from './cell/gridCell.vue'
    import RowCell from './cell/rowCell.vue'

    const newsComponent = computed(() => {
        return newsStore.mode == VisualMode.ROWS ? RowCell : GridCell;
    });

    const news = computed(() => {
        return newsStore.currentPageFilteredNews;
    });

    const newsContainerClass = computed(() => {
        return newsStore.mode == VisualMode.ROWS ? 'news-container-column' : 'news-container-grid';
    });

    onMounted(() => {
        
    });

</script>

<style scoped>

</style>