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

    import RefreshIcon from '~/assets/refresh.vue'
    import SearchIcon from '~/assets/search.vue'

    import { useHeader } from '~/composables/useHeader'
    const { unmountHandler, handleSearchInput, handleRefresh, searchQuery } = useHeader();

    onUnmounted(unmountHandler);

</script>

<style scoped>

</style>