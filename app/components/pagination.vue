<template>
  <div class="ui-pagination" v-show="pageNumbers.length > 1">
    <div
      v-for="item in pageNumbers"
      :key="item"
      class="button number"
      :class="{ 'number-active': String(props.modelValue) == item }"
      @click="goToPage(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">

  import { usePagination } from '~/composables/usePagination';

    const props = defineProps<{
        totalPages: number,
        modelValue: number;
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: number): void;
    }>();

    const { pageNumbers, goToPage } = usePagination(props, emit);

</script>

<style scoped>

</style>