export const useSeo = (options = {}) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const { artistName, defaultMetaDescription, defaultMetaImageUrl } = useSiteData()

  const defaults = {
    siteName: artistName.value || 'Artist Portfolio',
    defaultDescription: defaultMetaDescription.value || 'Artist portfolio showcasing works and exhibitions',
    defaultImage: defaultMetaImageUrl.value || '/og-image.jpg',
    twitterCard: 'summary_large_image',
    locale: 'en_US',
  }

  const siteUrl = config.public.siteUrl || 'http://localhost:3000'
  const currentUrl = `${siteUrl}${route.fullPath}`

  const resolveImageUrl = (image) => {
    if (!image) return `${siteUrl}${defaults.defaultImage}`
    if (image.startsWith('http')) return image
    if (image.startsWith('/uploads')) return `${config.public.baseUrl}${image}`
    return `${siteUrl}${image}`
  }

  const {
    title,
    description = defaults.defaultDescription,
    image,
    type = 'website',
    noIndex = false,
  } = options

  const fullTitle = title ? `${title} | ${defaults.siteName}` : defaults.siteName
  const imageUrl = resolveImageUrl(image)

  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage: imageUrl,
    ogUrl: currentUrl,
    ogType: type,
    ogSiteName: defaults.siteName,
    ogLocale: defaults.locale,
    twitterCard: defaults.twitterCard,
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: imageUrl,
    ...(noIndex && { robots: 'noindex, nofollow' }),
  })

  useHead({
    htmlAttrs: { lang: 'en' },
    link: [{ rel: 'canonical', href: currentUrl }],
  })
}
