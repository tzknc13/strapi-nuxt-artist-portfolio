<template>
  <div class="relative w-full overflow-hidden" :class="marginClass">
    <img v-if="imageUrl" :src="imageUrl" :alt="block.title || ''" class="w-full object-cover" />
    <div v-if="block.title || block.subtitle" class="mt-4">
      <h2 v-if="block.title" class="heading-font text-4xl">{{ block.title }}</h2>
      <p v-if="block.subtitle" class="text-gray-500 dark:text-gray-400 mt-1">{{ block.subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
import getImageUrl from '~/helpers/formats.js'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const marginMap = {
  none:   'my-0',
  small:  'my-4',
  medium: 'my-8',
  large:  'my-16',
  xlarge: 'my-24',
}

const marginClass = computed(() => marginMap[props.block.margin] ?? marginMap.medium)

const imageUrl = computed(() => {
  if (!props.block.image) return null
  return getImageUrl(null, props.block.image, 'large')
})
</script>
