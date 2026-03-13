import { createStore } from 'vuex'
import formatsCheck from '../helpers/formats.js'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  
  // Fetch initial site data
  let siteData = null
  try {
    const response = await $fetch(`${config.public.apiUrl}/first-page?populate=*`)
    siteData = response?.data
  } catch (error) {
    console.warn('Failed to fetch site data:', error)
  }

  const store = createStore({
    state: () => ({
      artistName: siteData?.artist_name || "Artist Name",
      fullscreenImgUrl: "",
      isWorksLoaded: false,
      isCatsLoaded: false,
      works: [],
      categories: [],
      homepageData: siteData || {}
    }),
    
    getters: {
      artistName(state) {
        return state.artistName
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
      categories(state) {
        return state.categories
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
      loadCats(state, categories) {
        state.categories = categories
      },
      updateCatsState(state, bool) {
        state.isCatsLoaded = bool
      },
      setHomepageData(state, data) {
        state.homepageData = data
      }
    }
  })

  nuxtApp.vueApp.use(store)
  nuxtApp.provide('store', store)
})
