import { createStore } from 'vuex'
import formatsCheck from '../helpers/formats.js'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  
  // useState transfers values from server to client via the SSR payload,
  // so the client reuses server-fetched data without a second request.
  const generalInfoState = useState('general-info', () => null)
  const homepageDataState = useState('first-page', () => null)

  if (!generalInfoState.value || !homepageDataState.value) {
    try {
      const [generalResponse, homepageResponse] = await Promise.all([
        $fetch(`${config.public.apiUrl}/general-info?populate=*`),
        $fetch(`${config.public.apiUrl}/first-page?populate=*`),
      ])
      generalInfoState.value = generalResponse?.data ?? null
      homepageDataState.value = homepageResponse?.data ?? null
    } catch (error) {
      console.warn('Failed to fetch site data:', error)
    }
  }

  const generalInfo = generalInfoState.value
  const homepageData = homepageDataState.value

  const store = createStore({
    state: () => ({
      artistName: generalInfo?.artist_name || "Artist Name",
      defaultMetaDescription: generalInfo?.default_meta_description || "Artist portfolio showcasing works and exhibitions",
      defaultMetaImage: generalInfo?.website_meta_default_image || null,
      favicon: generalInfo?.favicon || null,
      fullscreenImgUrl: "",
      isWorksLoaded: false,
      isCatsLoaded: false,
      works: [],
      series: [],
      homepageData: homepageData || {}
    }),
    
    getters: {
      artistName(state) {
        return state.artistName
      },
      defaultMetaDescription(state) {
        return state.defaultMetaDescription
      },
      defaultMetaImage(state) {
        return state.defaultMetaImage
      },
      isWorkData(state) {
        return state.isWorksLoaded
      },
      isCatsLoaded(state) {
        return state.isCatsLoaded
      },
      works(state) {
        return state.works
      },
      series(state) {
        return state.series
      },
      homepageBackground(state) {
        // formatsCheck now gets baseUrl from useRuntimeConfig internally
        return state.homepageData.single_image ? formatsCheck(null, state.homepageData.single_image, '') : ''
      }
    },
    
    mutations: {
      loadWorks(state, works) {
        state.works = works
      },
      updateWorksState(state, bool) {
        state.isWorksLoaded = bool
      },
      loadCats(state, series) {
        state.series = series
      },
      updateCatsState(state, bool) {
        state.isCatsLoaded = bool
      },
      setHomepageData(state, data) {
        state.homepageData = data
      }
    }
  })

  // Set dynamic favicon from general-info
  const faviconSource = generalInfo?.favicon || generalInfo?.website_meta_default_image
  if (faviconSource?.url) {
    const faviconUrl = faviconSource.url.startsWith('http')
      ? faviconSource.url
      : `${config.public.baseUrl}${faviconSource.url}`

    useHead({
      link: [
        { rel: 'icon', type: faviconSource.mime || 'image/x-icon', href: faviconUrl }
      ]
    })
  }

  nuxtApp.vueApp.use(store)
  nuxtApp.provide('store', store)
})
