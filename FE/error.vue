<template>
  <div class="container mx-auto px-3 md:px-5">
    <div class="grid grid-cols-4 min-h-screen">
      <Header class="col-span-4" />
      <div class="mt-5 mb-4 col-span-4 mx-auto text-center">
        <h2 class="text-8xl">{{ error.statusCode }}</h2>
        <h2 class="text-1xl">{{ error.statusCode === 404 ? "what you looking for isn't here" : 'An error occurred' }}</h2>
        <nuxt-link to="/" class="text-gray-500 underline mt-4 inline-block">Go back home</nuxt-link>
      </div>
      <Footer class="mt-40 col-span-4 self-end" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

useHead({
  title: `${props.error.statusCode} - Error`,
  meta: [
    { hid: 'error', name: 'description', content: 'Error page' }
  ]
})
</script>
