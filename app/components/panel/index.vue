<template>
    <div class="panel">
        <SourceTabs v-model="sourceTabLinkName"/>
        <div class="spacer"/>
        <GridTabs v-model="gridTab"/>
    </div>
</template>

<script setup>

    import SourceTabs from './sourceTabs.vue'
    import GridTabs from './gridTabs.vue'
    
    import { usePanelIniter } from '~/composables/usePanelIniter'
    const { mountHandler, init, gridTab, sourceTabLinkName } = usePanelIniter();

    init();

    onMounted(mountHandler);

</script>

<style scoped>

</style>