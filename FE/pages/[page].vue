<template>
  <div v-if="pageData" class="grid grid-cols-6 gap-4 mt-6">
    <div class="col-start-2 col-end-6">
      <template v-for="block in pageData.content" :key="block.id">
        <component :is="blockComponent(block.__component)" :block="block" />
      </template>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const slug = route.params.page

const { data: response } = await useFetch(
  `${config.public.apiUrl}/pages?filters[slug][$eq]=${slug}&populate[content][populate]=*`,
  { transform: (res) => res.data }
)

const pageData = computed(() => {
  if (!response.value?.[0]) return null
  return response.value[0].attributes
})

const blockMap = {
  'content.paragraph': resolveComponent('BlocksParagraph'),
  'content.image-block': resolveComponent('BlocksImage'),
  'content.heading': resolveComponent('BlocksHeading'),
}

function blockComponent(type) {
  return blockMap[type] || null
}

useSeo({
  title: pageData.value?.title || '',
  description: pageData.value?.seo_description || '',
})
</script>
