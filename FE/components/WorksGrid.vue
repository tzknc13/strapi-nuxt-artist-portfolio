<template>
  <div class="mt-3">
    <Transition mode="out-in">
      <div v-if="isCategories && isShow" class="grid gap-3 grid-cols-2 md:grid-cols-5" key="a1">
        <div v-for="category in sortedCategories" :key="category.id" :class="{ 'col-span-2': isHorizontal(getCategoryAlignment(category)) }">
          <button
            class="text-left md:py-1 md:px-2 md:m-2 border-transparent rounded-md border-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            @click="selectCat(category)"
          >
            <img :src="getCategoryImage(category)" />
            <h4 class="sm:inline text-xs text-gray-500 dark:text-gray-400 mt-2">{{ category.series_name }}</h4>
          </button>
        </div>
      </div>
      <div v-else-if="isShow" key="a2">
        <button class="mb-5 text-xs text-gray-500 dark:text-gray-400" @click="changeView()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
        </button>
        <div v-if="showSeriesDescription" class="grid grid-cols-6 gap-4 justify-center my-6 relative series-description">
          <div :class="{ 'max-h-64 overflow-hidden relative': isLimitedHeight }" class="text-gray-500 dark:text-gray-400 col-span-6 md:col-start-2 md:col-end-6 pb-2" v-html="categoryDescription" />
          <div class="absolute bottom-0 left-0 w-full h-3/4 flex flex-col justify-end" :class="{ 'bg-gradient-to-t from-white dark:from-gray-900 to-transparent': isLimitedHeight }"></div>
        </div>
        <div v-if="showSeriesDescription" class="mt-2 mb-16 text-right">
          <button v-if="isLimitedHeight" class="text-xs text-gray-400 dark:text-gray-500" @click="isLimitedHeight = false">Show full text</button>
          <button v-else class="text-xs text-gray-400 dark:text-gray-500" @click="isLimitedHeight = true">Show less</button>
        </div>
        <div class="grid gap-3 grid-cols-2 md:grid-cols-4">
          <div
            v-for="work in filteredWorks"
            :key="work.id"
            :class="{ 'col-span-2': isHorizontal(work.single_image) }"
            class="py-1 px-2 m-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            <nuxt-link :to="workLink(work)" class="h-full w-full">
              <img :src="urlfix(work.single_image)" />
              <div>
                <h4 class="sm:inline text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {{ work.title }}, <span>{{ work.year }}</span>
                </h4>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import formatsCheck from '../helpers/formats.js'

// Props
const props = defineProps({
  works: {
    type: Array,
    required: true,
  },
  series: {
    type: Array,
    required: true,
  },
})

// Composables
const route = useRoute()
const router = useRouter()

// Reactive state - initialize based on route query to avoid hydration mismatch
const selectedCategory = ref(route.query.cat || null)
const isCategories = ref(!route.query.cat)
const isShow = ref(true)
const isLimitedHeight = ref(true)

const sortByPosition = (items) => {
  return items.slice().sort((a, b) => {
    const aPos = a.position_in_view || 1
    const bPos = b.position_in_view || 1
    return bPos - aPos
  })
}

const getCategoryImageOrFallback = (cat) => {
  if (cat.single_image) {
    return cat.single_image
  }
  if (cat.works?.length > 0) {
    return cat.works[0].single_image || ''
  }
  return ''
}

// Computed properties
const sortedCategories = computed(() => sortByPosition(props.series.slice()))

const filteredWorks = computed(() => {
  if (!selectedCategory.value) return props.works

  const filtered = props.works.filter((work) => {
    return work.series?.some((cat) => cat.slug === selectedCategory.value)
  })

  return sortByPosition(filtered)
})

const categoryDescription = computed(() => {
  const cat = props.series.find((c) => c.slug === selectedCategory.value)
  return cat?.description || null
})

const showSeriesDescription = computed(() => {
  const cat = props.series.find((c) => c.slug === selectedCategory.value)
  return cat?.show_description_field && categoryDescription.value
})

// Methods
const changeView = () => {
  isCategories.value = true
  selectedCategory.value = null
  router.push({ path: route.path, query: {} })
}

const getCategoryImage = (cat) => {
  const imageData = getCategoryImageOrFallback(cat)
  return imageData ? formatsCheck(null, imageData, 'medium') : ''
}

const getCategoryAlignment = (cat) => {
  return getCategoryImageOrFallback(cat)
}

const selectCat = (cat) => {
  isCategories.value = false
  selectedCategory.value = cat.slug
  router.push({ path: route.path, query: { cat: cat.slug } })
}

const isHorizontal = (img) => {
  if (!img) return false
  return img.height < img.width
}

const workLink = (work) => {
  return `/portfolio/${work.slug}`
}

const urlfix = (imageObject) => {
  return formatsCheck(null, imageObject, 'medium')
}
</script>

<style>
.v-enter-active {
  transition: all 0.6s ease;
}

.v-leave-active {
  transition: all 0.4s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.v-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
