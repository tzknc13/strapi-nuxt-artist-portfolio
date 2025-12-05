<template>
  <div class="mt-3">
    <transition name="page">
      <div v-if="cvData" class="cv-content grid grid-cols-6 gap-4 justify-center my-6">
        <img class="col-start-1 col-end-6 md:col-span-2 px-6" :src="urlfix(cvData)" />
        <div class="col-span-6 md:col-span-4" v-html="cvData.text_1"></div>
        <div class="col-span-6 md:col-start-3 md:col-end-6" v-html="cvData.text_2"></div>
        <div class="col-span-6 md:col-start-3 md:col-end-6" v-html="cvData.text_3"></div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import formatsCheck from '../helpers/formats.js'
import { useStore } from 'vuex'

// SSR data fetching with useFetch
const config = useRuntimeConfig()
const store = useStore()
const show = ref(false)

const { data: cvData } = await useFetch(`${config.public.apiUrl}/cv?populate=*`, {
  transform: (res) => res.data.attributes,
})

// Head meta
useHead({
  title: `CV | ${store.state.artistName}`,
  meta: [{ hid: 'cv', name: 'description', content: 'Meta description' }],
})

// mounted hook
onMounted(() => {
  show.value = true
})

// Helper method
const urlfix = (ele) => {
  return formatsCheck(config.public.baseUrl, ele.portrait_photo, 'large')
}
</script>

<style>
.cv-content a {
  position: relative; /* Parent positioning */
  display: inline-block; /* Or adjust as needed */
}

.cv-content a::before {
  content: '';
  position: absolute;
  bottom: -5px; /* Adjust distance from text */
  left: 0;
  width: 100%;
  height: 1px; /* Height of the underline */
  background: linear-gradient(to right, rgb(249, 249, 249), rgb(228, 137, 40)); /* Your gradient */
  background-size: 10% 3px; /* Start with no width */
  background-repeat: no-repeat;
  transition: background-size 0.3s ease-in-out; /* Smooth animation */
}

.cv-content a:hover::before {
  background-size: 100% 3px; /* Expand to full width on hover */
}
</style>
