<template>
  <figure class="block-image">
    <img v-if="imageUrl" :src="imageUrl" :alt="block.caption || ''" />
    <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
  </figure>
</template>

<script setup>
import getImageUrl from '~/helpers/formats.js'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const imageUrl = computed(() => {
  if (!props.block.image) return null
  return getImageUrl(null, props.block.image)
})
</script>
