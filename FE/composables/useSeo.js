/**
 * SEO composable for consistent meta tags across pages
 * 
 * Usage:
 * useSeo({
 *   title: 'Page Title',
 *   description: 'Page description',
 *   image: '/path/to/image.jpg'
 * })
 */
export const useSeo = (options = {}) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const { $store } = useNuxtApp()
  
  // Defaults
  const defaults = {
    siteName: $store?.state?.artistName || 'Artist Portfolio',
    defaultDescription: 'Artist portfolio showcasing works and exhibitions',
    defaultImage: '/og-image.jpg',
    twitterCard: 'summary_large_image',
    locale: 'en_US',
  }

  // Build full URL
  const siteUrl = config.public.siteUrl || 'http://localhost:3000'
  const currentUrl = `${siteUrl}${route.fullPath}`
  
  // Resolve image URL
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

  // Use Nuxt's useSeoMeta for cleaner SEO tag management
  useSeoMeta({
    title: fullTitle,
    description,
    
    // Open Graph
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage: imageUrl,
    ogUrl: currentUrl,
    ogType: type,
    ogSiteName: defaults.siteName,
    ogLocale: defaults.locale,
    
    // Twitter Card
    twitterCard: defaults.twitterCard,
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: imageUrl,
    
    // Robots
    ...(noIndex && { robots: 'noindex, nofollow' }),
  })

  // Additional head config
  useHead({
    htmlAttrs: {
      lang: 'en',
    },
    link: [
      { rel: 'canonical', href: currentUrl },
    ],
  })
}
