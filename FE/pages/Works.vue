<template>
  <div>
    <WorksGrid v-if="isDataReady" :works="works" :series="series" />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

const config = useRuntimeConfig()
const route = useRoute()
const { artistName } = useSiteData()
const { works, series, isWorksLoaded, isCatsLoaded } = useWorks()

const isDataReady = computed(() => isWorksLoaded.value && isCatsLoaded.value)

const getCurrentCategory = computed(() => {
  if (!isCatsLoaded.value) return null
  const catSlug = route.query.cat || null
  return catSlug ? series.value.find((c) => c.slug === catSlug) ?? null : null
})

const metaDescription = computed(() => {
  return getCurrentCategory.value
    ? `${getCurrentCategory.value.series_name} by ${artistName.value}`
    : `All works by ${artistName.value}`
})

useSeo({
  title: getCurrentCategory.value?.series_name || 'Works',
  description: metaDescription.value,
})

onMounted(async () => {
  const fetchPromises = []

  if (!isWorksLoaded.value) {
    let query = `${config.public.apiUrl}/works?pagination[pageSize]=200&populate=*`
    if (route.query.cat) query += `&filters[series][slug][$eq]=${route.query.cat}`
    fetchPromises.push(
      $fetch(query).then(res => {
        works.value = res.data
        isWorksLoaded.value = true
      })
    )
  }

  if (!isCatsLoaded.value) {
    fetchPromises.push(
      $fetch(`${config.public.apiUrl}/series-list?pagination[pageSize]=200&populate[single_image]=true&populate[works][populate][single_image]=true`).then(res => {
        series.value = res.data
        isCatsLoaded.value = true
      })
    )
  }

  await Promise.all(fetchPromises)
})

watch(() => route.query.cat, async (newCat) => {
  if (newCat) {
    const res = await $fetch(`${config.public.apiUrl}/works?populate=*&filters[series][slug][$eq]=${newCat}`)
    works.value = res.data
  }
})
</script>
