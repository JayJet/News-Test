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

import { onMounted } from 'vue';
    import type { INewsItem } from '~/types/news';

    const props = defineProps<{
        item: INewsItem
    }>();

    interface Domain {
        link: string;
        title: string;
    }

    const domain = computed<Domain>(() => {
        try {
            const url = new URL(props.item.link);
            const hostname = url.hostname;
            return {
                link: `https://${hostname}`,
                title: hostname
            };
        } catch (error) {
            return {
                link: '/',
                title: ''
            };
        }
    });

    const date = computed<string>(() => {
        return new Date(props.item.pubDate).toLocaleDateString('ru');
    });

    onMounted(() => {

    });

</script>

<style scoped>

</style>