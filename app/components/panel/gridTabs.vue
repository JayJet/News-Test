<template>
    <div class="tabs-container">
        <div class="button" v-for="t in gridTabs" :key="t.key" @click="selectTab(t.key)">

            <RowsIcon v-if="t.key == 'rows'" :color="modelValue == 'rows' ? activeColor : inactiveColor"/>
            <GridIcon v-if="t.key == 'grid'" :color="modelValue == 'grid' ? activeColor : inactiveColor"/>

        </div>
    </div>
</template>

<script setup lang="ts">

    import { onMounted } from 'vue';
    import RowsIcon from '~/assets/rows.vue'
    import GridIcon from '~/assets/grid.vue'
    import { useTabs } from '~/composables/useTabs';

    const props = defineProps<{
        modelValue: string;
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void;
    }>();

    const { selectTab, gridTabs, gridTabsMounted, activeColor, inactiveColor } = useTabs(props, emit);

    onMounted(gridTabsMounted);    

</script>

<style scoped>

</style>