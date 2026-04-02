<template>
    <div class="tabs-container tabs-source">
        <div class="button tab" v-for="t in sourceTabs" :key="t.key" @click="selectTab(t.key)" :class="{ 'tab-active': modelValue == t.key }">{{ t.title }}</div>
    </div>
</template>

<script setup lang="ts">

    import { useTabs } from '~/composables/useTabs';

    const props = defineProps<{
        modelValue: string;
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void;
    }>();

    const { selectTab, sourceTabs } = useTabs(props, emit);

</script>

<style scoped>

</style>