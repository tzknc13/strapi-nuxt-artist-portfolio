<template>
  <div class="mt-3">
    <transition name="page">
      <div v-if="cvData" class="cv-content grid grid-cols-6 gap-4 justify-center my-6">
        <div v-if="portraitUrl" class="col-span-6 md:col-span-2 md:col-start-1 flex items-start justify-center">
          <img 
            :src="portraitUrl" 
            :alt="cvData.portrait_photo?.alternativeText || 'Portrait'"
            class="max-w-48 rounded"
          />
        </div>

        <div :class="contentClasses">
          <p v-if="cvData.short_text" class="text-lg text-gray-600 dark:text-gray-400">
            {{ cvData.short_text }}
          </p>
          <div 
            v-for="(block, index) in contentBlocks" 
            :key="index" 
            :class="block.class" 
            v-html="block.html"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { marked } from 'marked'

const config = useRuntimeConfig()

const { data: cvData } = await useFetch(`${config.public.apiUrl}/cv?populate=*`, {
  server: false,
  transform: (res) => res.data,
})

const portraitUrl = computed(() => {
  const photo = cvData.value?.portrait_photo
  if (!photo?.url) return null
  return photo.url.startsWith('http') ? photo.url : `${config.public.baseUrl}${photo.url}`
})

const contentClasses = computed(() => 
  portraitUrl.value 
    ? 'col-span-6 md:col-span-4' 
    : 'col-span-6 md:col-start-2 md:col-end-6'
)

const contentBlocks = computed(() => {
  if (!cvData.value) return []
  
  const blocks = []
  const { block_1, block_2, block_3, contact } = cvData.value
  
  if (block_1) blocks.push({ html: marked(block_1), class: 'mt-8' })
  if (block_2) blocks.push({ html: marked(block_2), class: 'mt-8' })
  if (block_3) blocks.push({ html: marked(block_3), class: 'mt-8' })
  if (contact) blocks.push({ html: marked(contact), class: 'mt-12' })
  
  return blocks
})

useSeo({
  title: 'CV',
  description: 'Curriculum Vitae - exhibitions, education, and professional experience',
})
</script>

<style>
.cv-content ul,
.cv-content ol {
  list-style-type: none;
  padding-left: 0;
  margin: 0.5rem 0;
}

.cv-content li {
  margin: 0.25rem 0;
}

.cv-content a {
  position: relative;
  display: inline-block;
}

.cv-content a::before {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, rgb(249, 249, 249), rgb(228, 137, 40));
  background-size: 10% 3px;
  background-repeat: no-repeat;
  transition: background-size 0.3s ease-in-out;
}

.cv-content a:hover::before {
  background-size: 100% 3px; /* Expand to full width on hover */
}
</style>
