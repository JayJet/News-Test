<template>
    <div class="wrapper">
        <div class="container">
            <Header/>
            <div class="hr"/>
            <Panel/>
            <News v-if="!newsStore.loading"/>
            <Pagination v-model="page" :totalPages="newsStore.totalPages" v-if="!newsStore.loading"/>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { onMounted } from 'vue';
    import { VisualMode, NewsSource, getNewsSourceByKey } from '~/types/enums';
    import { useNewsStore } from '~/store/news';
    import '~/styles/ui.css'
    import '~/styles/news.css'

    import Header from '~/components/header.vue';
    import Panel from '~/components/panel/index.vue';
    import News from '~/components/news/index.vue';
    import Pagination from '~/components/pagination.vue';

    const route = useRoute();
    const newsStore = useNewsStore();

    // Получаем параметры, задаем напрямую
    newsStore.source = getNewsSourceByKey(route.query.source as string) ?? NewsSource.ALL;
    newsStore.page = parseInt(route.params.page as string) ?? 1;
    newsStore.query = route.query.q as string ?? '';
    
    await useAsyncData('get-news', async () => {
        const [resultMosRu, resultLentaRu] = await Promise.all([
            newsStore.fetchMosRuNews(),
            newsStore.fetchLentaRuNews()
        ]);
        
        newsStore.news = [...resultMosRu, ...resultLentaRu];

        if (newsStore.page > 1 && newsStore.currentPageFilteredNews.length == 0) newsStore.setPage(1);
        return newsStore.news;
    });    

    const page = ref(newsStore.page);
    watch(page, (nv) => {
        newsStore.setPage(nv);
    });

    onMounted(async () => {

        let mode = localStorage.getItem('mode');
        if (mode == 'rows') newsStore.mode = VisualMode.ROWS;
        if (mode == 'grid') newsStore.mode = VisualMode.GRID;

        newsStore.loading = false;
        
    });

</script>

<style scoped>

</style>