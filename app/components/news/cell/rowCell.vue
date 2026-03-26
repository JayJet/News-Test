<template>
    <div class="cell news-rows-cell">
        
        <div class="news-rows-first-block">
            <div class="button" @click="onClick"><img :src="imageSrc"/></div>
            
            <div class="left button" @click="onClick">
                <div class="title">{{ item.title }}</div>
                <div class="subtitle">{{ item.description ?? item.title }}</div>
            </div>
        </div>

        <div class="more"><a :href="item.link" class="more" target="_blank">Подробнее</a></div>

        <div class="news-rows-second-block">
            
            <div><a :href="domain.link" class="link" target="_blank">{{ domain.title }}</a></div>
            <div class="spacer"/>
            <div class="link">{{ date }}</div>

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

    const imageSrc = computed<string>(() => {
        return props.item.images?.[0] || '';
    });

    const date = computed<string>(() => {
        return new Date(props.item.pubDate).toLocaleDateString('ru');
    });

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

    const onClick = () => {
        window.open(props.item.link, '_blank');
    };

    onMounted(() => {

    });

</script>

<style scoped>

</style>