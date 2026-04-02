<template>
    <div class="cell news-grid-cell">
        <div class="title">{{ item.title }}</div>
        <div class="subtitle">{{ item.description ?? item.title }}</div>
        <div class="spacer"/>
        <div><a :href="item.link" class="more" target="_blank">Подробнее</a></div>
        <div class="bottom">
            <div><a :href="domain.link" class="link" target="_blank">{{ domain.title }}</a></div>
            <div class="spacer spacer-mobile"/>
            <div class="link date">{{ date }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { useNewsCell } from '~/composables/useNewsCell';
    import type { INewsItem } from '~/types/news';

    const props = defineProps<{
        item: INewsItem
    }>();

    const { date, domain } = useNewsCell(props);

</script>

<style scoped>

</style>