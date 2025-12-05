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
            <h4 class="sm:inline text-xs text-gray-500">{{ category.category_name }}</h4>
          </button>
        </div>
      </div>
      <div v-else-if="isShow" key="a2">
        <button class="mb-5 text-xs text-gray-500" @click="changeView()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="rgb(156, 163, 175)">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
        </button>
        <div v-if="categoryDescription" class="grid grid-cols-6 gap-4 justify-center my-6 relative">
          <div :class="{ 'max-h-64 overflow-hidden relative': isLimitedHeight }" class="text-gray-500 col-span-6 md:col-start-2 md:col-end-6 pb-2" v-html="categoryDescription" />
          <div class="absolute bottom-0 left-0 w-full h-3/4 flex flex-col justify-end" :class="{ 'bg-gradient-to-t from-white to-transparent': isLimitedHeight }"></div>
        </div>
        <div class="mt-2 mb-16 text-right">
          <button v-if="isLimitedHeight" class="text-xs text-gray-300" @click="isLimitedHeight = false">Show full text</button>
          <button v-else class="text-xs text-gray-300" @click="isLimitedHeight = true">Show less</button>
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
                <h4 class="sm:inline text-xs text-gray-500">
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
  categories: {
    type: Array,
    required: true,
  },
})

// Composables
const route = useRoute()
const router = useRouter()

// Reactive state
const selectedCategory = ref(null)
const isCategories = ref(false)
const isShow = ref(false)
const isLimitedHeight = ref(true)

// Helper functions
const unwrapAttributes = (item) => item?.attributes || item

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
  if (cat.works?.data?.length > 0) {
    return cat.works.data[0].single_image || ''
  }
  return ''
}

// Computed properties
const sortedCategories = computed(() => {
  const unwrapped = props.categories.map(unwrapAttributes)
  return sortByPosition(unwrapped)
})

const filteredWorks = computed(() => {
  if (!selectedCategory.value) return props.works

  const filtered = props.works.filter((work) => {
    return work.attributes.categories.data.some((cat) => cat.attributes.slug === selectedCategory.value)
  })

  const unwrapped = filtered.map(unwrapAttributes)
  return sortByPosition(unwrapped)
})

const categoryDescription = computed(() => {
  const cat = props.categories.find((c) => c.attributes.slug === selectedCategory.value)
  return cat?.attributes.description || null
})

// Methods
const changeView = () => {
  isCategories.value = true
  selectedCategory.value = null
  router.push({ path: route.path, query: {} })
}

const getCategoryImage = (rawCat) => {
  const cat = unwrapAttributes(rawCat)
  const imageData = getCategoryImageOrFallback(cat)
  return imageData ? formatsCheck(null, imageData, 'medium') : ''
}

const getCategoryAlignment = (rawCat) => {
  const cat = unwrapAttributes(rawCat)
  return getCategoryImageOrFallback(cat)
}

const selectCat = (cat) => {
  isCategories.value = false
  selectedCategory.value = cat.slug
  router.push({ path: route.path, query: { cat: cat.slug } })
}

const isHorizontal = (rawImg) => {
  if (!rawImg) return false
  const img = rawImg.data?.attributes || rawImg
  return img ? img.height < img.width : false
}

const workLink = (work) => {
  return `/portfolio/${work.slug}`
}

const urlfix = (imageObject) => {
  return formatsCheck(null, imageObject, 'medium')
}

// Lifecycle
onMounted(() => {
  // read category from router
  if (route.query.cat) {
    selectedCategory.value = route.query.cat
    isCategories.value = false
  } else {
    isCategories.value = true
  }
  isShow.value = true
})
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
