<template>

    <div class="header">
        <div class="header-head">
            <h2 class="header-title">Список новостей</h2>
            <div class="spacer space-mobile"/>
            <div class="button circle-button" @click="handleRefresh">
                <RefreshIcon/>
            </div>
        </div>
        <div class="spacer"/>
        <div class="input">
            <input 
                type="text" 
                placeholder="Поиск новостей..." 
                v-model="searchQuery"
                @input="handleSearchInput"
            >
            <SearchIcon/>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import RefreshIcon from '~/assets/refresh.vue'
    import SearchIcon from '~/assets/search.vue'
    import { useNewsStore } from '~/store/news';
    const newsStore = useNewsStore();

    const searchQuery = ref(newsStore.query);
    let searchTimeout: ReturnType<typeof setTimeout> | null = null;
    
    const handleSearchInput = () => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        searchTimeout = setTimeout(() => {
            newsStore.setQuery(searchQuery.value);
        }, 500);
    };

    const handleRefresh = () => {
        newsStore.reset();
        searchQuery.value = '';
    };

    onUnmounted(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
    });
</script>

<style scoped>

</style>