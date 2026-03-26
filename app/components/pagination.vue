<template>
  <div class="ui-pagination" v-show="pageNumbers.length > 1">
    <div
      v-for="item in pageNumbers"
      :key="item"
      class="button number"
      :class="{ 'number-active' : currentPage == item }"
      @click="goToPage(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  totalPages: number
}>();

const modelValue = defineModel<number>({ required: true });
const currentPage = ref(modelValue.value);

watch(modelValue, (newVal) => {
  currentPage.value = newVal;
})

watch(currentPage, (newPage) => {
  modelValue.value = newPage;
})

const pageNumbers = computed(() => {
  const { totalPages } = props;
  const current = currentPage.value;
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];

  if (current > 3) pages.push('...');
  
  const start = Math.max(2, current - 2);
  const end = Math.min(totalPages - 1, current + 2);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < totalPages - 2) pages.push('...');
  pages.push(totalPages);

  return pages;
})

const goToPage = (page: number | '...') => {
  if (page == '...') return;
  if (page < 1 || page > props.totalPages) return;
  currentPage.value = page;
}
</script>

<style scoped>

</style>