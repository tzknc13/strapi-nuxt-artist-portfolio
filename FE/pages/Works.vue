<template>
  <div>
    <WorksGrid :works="works" :categories="categories" />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

definePageMeta({
  layout: 'default'
})

// Composables
const config = useRuntimeConfig()
const route = useRoute()
const store = useStore()

// Computed properties from store
const isWorkData = computed(() => store.getters.isWorkData)
const works = computed(() => store.getters.works)
const categories = computed(() => store.getters.categories)
const isCatsLoaded = computed(() => store.getters.isCatsLoaded)

const getCurrentCategory = computed(() => {
  if (isCatsLoaded.value) {
    const catSlug = route.query.cat || null
    const cat = catSlug ? categories.value.find((c) => c.slug === catSlug) : null
    return cat || null
  }
  return null
})

const metaDescription = computed(() => {
  const artistName = store.state.artistName
  return getCurrentCategory.value 
    ? `${getCurrentCategory.value.category_name} by ${artistName}` 
    : `All works by ${artistName}`
})

// SEO meta tags
useSeo({
  title: getCurrentCategory.value?.category_name || 'Works',
  description: metaDescription.value,
})

// Fetch data on mount
onMounted(async () => {
  if (!isWorkData.value) {
    // Build the query with optional category filter
    let query = `${config.public.apiUrl}/works?pagination[pageSize]=200&populate=*`

    // If category is specified in route query, add filter
    if (route.query.cat) {
      query += `&filters[categories][slug][$eq]=${route.query.cat}`
    }

    const res = await $fetch(query)
    store.commit('loadWorks', res.data)
    store.commit('updateWorksState', true)
  }
  
  if (!isCatsLoaded.value) {
    const catsRes = await $fetch(`${config.public.apiUrl}/categories?pagination[pageSize]=200&populate=*`)
    store.commit('loadCats', catsRes.data)
    store.commit('updateCatsState', true)
  }
})

// Watch for category changes
watch(() => route.query.cat, async (newCat, oldCat) => {
  if (newCat) {
    let query = `${config.public.apiUrl}/works?populate=*`
    query += `&filters[categories][slug][$eq]=${newCat}`
    const res = await $fetch(query)
    store.commit('loadWorks', res.data)
  } else {
    console.log('no category, load all works')
  }
})
</script>
