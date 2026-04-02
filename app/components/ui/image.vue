<template>
  <img
    ref="imageRef"
    :src="displaySrc"
    @load="onImageLoad"
    @error="onImageError"
    :style="{ opacity: showImage ? 1 : 0.1, transition: 'opacity 0.15s ease-in-out' }"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import NoPic from '~/assets/no_pic.jpg'

const props = defineProps<{
    modelValue: string
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();

const displaySrc = ref<string | null>(null);
const showImage = ref(false);

watch(
    () => props.modelValue,
    (newSrc) => {
        showImage.value = false;
        displaySrc.value = newSrc || null;
        if (newSrc) showImage.value = false;
        else {
            displaySrc.value = NoPic;
            showImage.value = true;  
        }
    },
    { immediate: true }
);

const onImageLoad = () => {
    showImage.value = true;
};

const onImageError = (event: Event) => {
    displaySrc.value = NoPic;
    showImage.value = true;  
};
</script>