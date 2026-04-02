<template>
    <div class="wrapper">
        <div class="container">
            <Header/>
            <div class="hr"/>
            <Panel/>
            <News v-if="!loading"/>
            <Pagination v-model="page" :totalPages="totalPages" v-if="!loading"/>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { onMounted } from 'vue';
    import '~/styles/ui.css';
    import '~/styles/news.css';

    import { usePageIniter } from '~/composables/usePageIniter';
    const { mountHandler, prefetchNews, initPage, loading, totalPages, page } = usePageIniter();

    await useAsyncData('get-news', async () => {        
        return await prefetchNews();
    });

    initPage();

    onMounted(mountHandler);

</script>

<style scoped>

</style>