<template>
  <div class="mx-auto flex bg-no-repeat bg-left-top">
    <transition name="slide-fade">
      <h2 v-if="isShow" class="m-5 text-6xl self-center">{{ pageData?.text_one || '' }}</h2>
    </transition>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

// SSR data fetching with useFetch
const config = useRuntimeConfig()
const store = useStore()

const { data: pageDataResponse } = await useFetch(`${config.public.apiUrl}/first-page?populate=*`, {
  transform: (res) => res.data.attributes
})


// Reactive state
const isShow = ref(false)
const pageData = computed(() => pageDataResponse.value)

// Set homepage data in store
watch(pageData, (newValue) => {
  if (newValue) {
    store.commit('setHomepageData', newValue)
  }
}, { immediate: true })

// Head meta
useHead({
  title: `Homepage | ${store.state.artistName}`,
  meta: [
    { hid: 'homepage', name: 'description', content: 'Meta description' },
  ],
})

// Lifecycle - delay to ensure transition works
onMounted(() => {
  setTimeout(() => {
    isShow.value = true
  }, 100)
})

// Define layout
definePageMeta({
  layout: 'home'
})
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.9s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
