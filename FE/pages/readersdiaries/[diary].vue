<template>
  <div>
    <SingleText :text-obj="diaryData[0]" :is-imgs="false" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

// Composables
const route = useRoute()
const config = useRuntimeConfig()

// Get slug from route
const slug = route.params.diary

// Fetch diary data
const { data: diaryData } = await useFetch(`${config.public.apiUrl}/readers-diaries?slug=${slug}`, {
  key: `diary-${slug}`,
  transform: (response) => response.data || []
})

// Head management
useHead({
  title: computed(() => {
    const title = diaryData.value?.[0]?.attributes?.title || slug
    return `${title}`
  }),
  meta: computed(() => [
    { hid: slug, name: 'description', content: 'Meta description' }
  ])
})
</script>
