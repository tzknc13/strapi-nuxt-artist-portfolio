<template>
  <div class="block-paragraph" v-html="block.text" />
</template>

<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})
</script>
