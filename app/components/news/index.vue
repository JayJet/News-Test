<template>
    <div :class="newsContainerClass">
        <component :is="newsComponent" v-for="item in news" :item="item"/>
    </div>

    <div class="not-found-text" v-if="!news?.length">Новостей не найдено.</div>
</template>

<script setup>

    import { useNewsList } from '~/composables/useNewsList';
    const { newsComponent, newsContainerClass, news } = useNewsList();

</script>

<style scoped>

</style>