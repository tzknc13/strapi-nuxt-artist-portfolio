<template>
  <div class="mt-3">
    <div class="grid grid-cols-6 gap-4 my-6">
      <div v-for="text in textsByDate" :key="text.id" class="col-span-6 md:col-start-2 md:col-end-6">
        <template v-if="dir === 'readersdiaries'">
          <div class="grid grid-cols-6 gap-2">
            <div class="col-span-6 md:col-span-4">
              <h2 class="text-xl text-gray-500">{{ text.attributes.title }}</h2>
            </div>
            <img v-if="isImgs" class="p-4 col-span-6 md:col-span-4 justify-self-center" :src="urlfix(text.attributes)" />
            <p v-else class="text-l col-span-6 md:col-span-4">{{ text.attributes.short_text }}</p>
          </div>
        </template>
        <template v-else>
          <nuxt-link :to="makeLink(text.attributes)" class="grid grid-cols-6 gap-2">
            <div class="col-span-6 md:col-span-4">
              <h2 class="text-xl text-gray-500 font-normal">{{ text.attributes.title }}</h2>
            </div>
            <img v-if="isImgs" class="p-4 col-span-6 md:col-span-4 justify-self-center" :src="urlfix(text)" />
            <p v-else class="text-l col-span-6 md:col-span-4">{{ text.attributes.short_text }}</p>
          </nuxt-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  texts: {
    type: Array,
    required: true
  },
  sectionTitle: {
    type: String,
    required: true,
    default: ''
  },
  dir: {
    type: String,
    required: true,
    default: ''
  },
  isImgs: {
    type: Boolean,
    required: true,
  }
})

// Composables
const config = useRuntimeConfig()

// Head management
useHead({
  title: props.sectionTitle,
  meta: [
    {
      hid: props.sectionTitle,
      name: props.sectionTitle,
      content: 'metatexts'
    }
  ]
})

// Computed properties
const textsByDate = computed(() => {
  return sortTexts(props.texts)
})

// Methods
const sortTexts = (texts) => {
  return texts.slice().sort((a, b) => {
    const aPos = a.attributes.position_in_view || 1
    const bPos = b.attributes.position_in_view || 1
    return bPos - aPos
  })
}

const makeLink = (ele) => {
  return `/${props.dir}/${ele.slug}`
}

const urlfix = (ele) => {
  const url = ele.single_image ? ele.single_image.url : null
  return url ? `${config.public.baseUrl}${url}` : null
}
</script>

<style>
</style>
