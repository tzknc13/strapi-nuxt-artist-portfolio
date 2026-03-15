<template>
  <div class="mx-auto flex bg-no-repeat bg-left-top">
    <transition name="slide-fade">
      <div>
        <h2 v-if="isShow" class="m-5 text-6xl self-center">{{ pageData?.text_one || '' }}</h2>
        <h2 v-if="isShow && pageData?.text_two" class="m-5 text-2xl self-center">{{ pageData?.text_two || '' }}</h2>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

// Reactive state
const isShow = ref(false)

// Use homepage data from store (already fetched in vuex plugin)
const pageData = computed(() => store.state.homepageData)

// SEO meta tags
watchEffect(() => {
  useSeo({
    title: pageData.value?.title || 'Home',
    description: pageData.value?.seo_description || 'Welcome to the artist portfolio',
    image: pageData.value?.single_image?.url,
  })
})

// Lifecycle - delay to ensure transition works
onMounted(() => {
  setTimeout(() => {
    isShow.value = true
  }, 100)
})

// Define layout
definePageMeta({
  layout: 'home',
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
