<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect width="8" height="8" :fill="color"/>
        <rect y="10" width="8" height="8" :fill="color"/>
        <rect x="10" width="8" height="8" :fill="color"/>
        <rect x="10" y="10" width="8" height="8" :fill="color"/>
    </svg>
</template>

<script setup>

    import { defineProps } from 'vue';

    const props = defineProps({
    color: {
        type: String,
        default: '#c4c4c4'
    }
    });

</script>