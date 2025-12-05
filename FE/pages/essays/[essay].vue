<template>
  <div>
    <transition name="page">
      <SingleText v-if="show" :text-obj="essayData[0]" :is-imgs="false" />
    </transition>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
})

// Composables
const route = useRoute()
const config = useRuntimeConfig()

// Reactive state
const show = ref(false)
const slug = route.params.essay

// Fetch essay data
const { data: essayData } = await useFetch(`${config.public.apiUrl}/essays-texts?slug=${slug}`, {
  key: `essay-${slug}`,
  transform: (response) => response.data || []
})

// Head management
useHead({
  title: computed(() => {
    const title = essayData.value[0]?.attributes?.title || 'Essay'
    return `${title}`
  }),
  meta: computed(() => [{ hid: slug, name: 'description', content: 'Meta description' }]),
})

// Show content on mount
onMounted(() => {
  show.value = true
})
</script>
