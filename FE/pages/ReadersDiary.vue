<template>
  <div class="mt-3">
    <transition name="page">
      <TextsGrid v-if="show" :texts="diaries" :section-title="'readers diary'" :dir="'readersdiaries'" :is-imgs="false" />
    </transition>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

// Composables
const config = useRuntimeConfig()

// Reactive state
const diaries = ref([])
const show = ref(false)

// Head management
useHead({
  title: 'Readers Diary',
  meta: [
    { hid: 'readersdiary', name: 'description', content: 'Meta description' }
  ]
})

// Fetch data on mount
onMounted(async () => {
  const res = await $fetch(`${config.public.apiUrl}/readers-diaries`)
  diaries.value = res.data
  show.value = true
})
</script>
