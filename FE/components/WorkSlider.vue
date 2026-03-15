<template>
  <div class="grid grid-cols-6 gap-4 mt-8 md:mt-0">
    <transition name="work-image" mode="out-in">
      <div class="relative col-span-6 flex justify-center flex items-center" :key="currentImage.url">
        <div class="w-8 m-4 hidden md:block">
          <arrow-button v-if="arrowLeft" :direction="'left'" @click="$emit('moveBack')" />
        </div>
        <img class="img-limit" :src="imageUrl(currentImage)" />
        <div class="w-8 m-4 hidden md:block">
          <arrow-button v-if="arrowRight" :direction="'right'" @click="$emit('moveForward')" />
        </div>
      </div>
    </transition>
    <div class="col-span-6 grid md:hidden">
      <arrow-button v-if="arrowLeft" :direction="'left'" @click="$emit('moveBack')" class="justify-self-start" />
      <arrow-button v-if="arrowRight" :direction="'right'" @click="$emit('moveForward')" class="justify-self-end" />
    </div>
  </div>
</template>

<script setup>
import formatsCheck from '../helpers/formats.js'

// Props
const props = defineProps({
  images: {
    default: null,
    type: Array,
  },
  position: {
    default: null,
    type: Number,
  },
})

// Emits
defineEmits(['moveBack', 'moveForward'])

// Computed properties
const currentImage = computed(() => {
  return props.images[props.position]
})

const arrowRight = computed(() => {
  return props.position < props.images.length - 1
})

const arrowLeft = computed(() => {
  return props.position > 0
})

// Methods
const imageUrl = (imageObject) => {
  return formatsCheck(null, imageObject, null)
}
</script>
<style>
.work-image-enter-active {
  transition: all 0.6s ease;
}

.work-image-leave-active {
  transition: all 0.4s ease;
}

.work-image-enter-from {
  opacity: 0;
  transform: translateX(-190px);
}

.work-image-leave-to {
  transform: translateX(190px);
  opacity: 0;
}

.dele {
  border: 1px solid red;
}

.img-limit {
  max-width: 100%;
  max-height: 75vh;
  height: auto;
  width: auto;
  margin: 0 2rem;
}
</style>
