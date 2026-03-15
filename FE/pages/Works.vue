<template>
  <div>
    <WorksGrid v-if="isDataReady" :works="works" :series="series" />
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
const series = computed(() => store.getters.series)
const isCatsLoaded = computed(() => store.getters.isCatsLoaded)
const isDataReady = computed(() => isWorkData.value && isCatsLoaded.value)

const getCurrentCategory = computed(() => {
  if (isCatsLoaded.value) {
    const catSlug = route.query.cat || null
    const cat = catSlug ? series.value.find((c) => c.slug === catSlug) : null
    return cat || null
  }
  return null
})

const metaDescription = computed(() => {
  const artistName = store.state.artistName
  return getCurrentCategory.value 
    ? `${getCurrentCategory.value.series_name} by ${artistName}` 
    : `All works by ${artistName}`
})

// SEO meta tags
useSeo({
  title: getCurrentCategory.value?.series_name || 'Works',
  description: metaDescription.value,
})

// Fetch data on client side only
onMounted(async () => {
  const fetchPromises = []
  
  if (!store.getters.isWorkData) {
    let query = `${config.public.apiUrl}/works?pagination[pageSize]=200&populate=*`
    if (route.query.cat) {
      query += `&filters[series][slug][$eq]=${route.query.cat}`
    }
    fetchPromises.push(
      $fetch(query).then(res => {
        store.commit('loadWorks', res.data)
        store.commit('updateWorksState', true)
      })
    )
  }
  
  if (!store.getters.isCatsLoaded) {
    fetchPromises.push(
      $fetch(`${config.public.apiUrl}/series-list?pagination[pageSize]=200&populate[single_image]=true&populate[works][populate][single_image]=true`).then(res => {
        store.commit('loadCats', res.data)
        store.commit('updateCatsState', true)
      })
    )
  }
  
  await Promise.all(fetchPromises)
})

// Watch for category changes
watch(() => route.query.cat, async (newCat, oldCat) => {
  if (newCat) {
    let query = `${config.public.apiUrl}/works?populate=*`
    query += `&filters[series][slug][$eq]=${newCat}`
    const res = await $fetch(query)
    store.commit('loadWorks', res.data)
  } else {
    console.log('no category, load all works')
  }
})
</script>
