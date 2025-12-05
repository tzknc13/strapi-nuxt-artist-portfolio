<template>
  <div>
    <transition name="page">
      <TextsGrid v-if="show" :texts="essays" :section-title="'essays'" :dir="'essays'" :is-imgs="false" />
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
const essays = ref([])
const show = ref(false)

// Head management
useHead({
  title: 'Texts',
  meta: [
    { hid: 'texts', name: 'description', content: 'Dominik Adamec | Texts' }
  ]
})

// Fetch data on mount
onMounted(async () => {
  const res = await $fetch(`${config.public.apiUrl}/essays-texts`)
  essays.value = res.data
  show.value = true
})
</script>
