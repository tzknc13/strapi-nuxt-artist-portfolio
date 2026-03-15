<template>
  <div class="container-fluid mx-auto bg-cover bg-center" :style="backgroundStyle">
    <div class="container mx-auto px-3 md:px-5">
      <div class="grid grid-cols-4 min-h-screen">
        <Header class="col-span-4" />
        <NuxtPage class="mt-5 mb-4 col-span-4" />
        <Footer class="mt-40 col-span-4 self-end" />
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const { homepageData } = useSiteData()

const backgroundStyle = computed(() => {
  const img = homepageData.value?.single_image
  if (!img?.url) return {}
  const url = img.url.startsWith('http') ? img.url : `${config.public.baseUrl}${img.url}`
  return { backgroundImage: `url(${url})` }
})
</script>
