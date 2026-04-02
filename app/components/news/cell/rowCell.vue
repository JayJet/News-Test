<template>
    <div class="cell news-rows-cell">
        
        <div class="news-rows-first-block">
            <div class="button" @click="onClick"><Image v-model="imageSrc" /></div>
            
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

    import { useNewsCell } from '~/composables/useNewsCell';
    import type { INewsItem } from '~/types/news';

    import Image from '~/components/ui/image.vue'

    const props = defineProps<{
        item: INewsItem
    }>();

    const { date, domain, imageSrc, onClick } = useNewsCell(props);

</script>

<style scoped>

</style>