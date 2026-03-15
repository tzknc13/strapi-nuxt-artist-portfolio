export default defineNuxtPlugin(async () => {
  // Only fetch on the server — useState serialises values into the SSR payload
  // so the client receives them without making a second request.
  if (!import.meta.server) return

  const config = useRuntimeConfig()
  const { artistName, homepageData, defaultMetaDescription, defaultMetaImageUrl } = useSiteData()

  try {
    const [generalResponse, homepageResponse] = await Promise.all([
      $fetch(`${config.public.apiUrl}/general-info?populate=*`),
      $fetch(`${config.public.apiUrl}/first-page?populate=*`),
    ])
    const generalInfo = generalResponse?.data ?? null
    const homepage = homepageResponse?.data ?? null

    artistName.value = generalInfo?.artist_name || ''
    homepageData.value = homepage || {}
    defaultMetaDescription.value = generalInfo?.default_meta_description || ''

    const metaImg = generalInfo?.website_meta_default_image
    if (metaImg?.url) {
      defaultMetaImageUrl.value = metaImg.url.startsWith('http')
        ? metaImg.url
        : `${config.public.baseUrl}${metaImg.url}`
    }

    const faviconSource = generalInfo?.favicon || metaImg
    if (faviconSource?.url) {
      const faviconUrl = faviconSource.url.startsWith('http')
        ? faviconSource.url
        : `${config.public.baseUrl}${faviconSource.url}`
      useHead({
        link: [{ rel: 'icon', type: faviconSource.mime || 'image/x-icon', href: faviconUrl }],
      })
    }
  } catch (error) {
    console.warn('Failed to fetch site data:', error)
  }
})
