<template>
  <component :is="block.level || 'h2'" class="block-heading">
    {{ block.text }}
  </component>
</template>

<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})
</script>
