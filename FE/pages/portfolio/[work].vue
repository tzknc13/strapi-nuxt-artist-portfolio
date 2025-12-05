<template>
  <div>
    <transition name="work-page" @afterLeave="closeView()">
      <div v-if="show && workdata">
        <div class="grid grid-cols-6 gap-4">
          <div class="col-start-5 col-span-2 flex justify-end md:justify-end flex items-center my-6 md:my-2">
            <button
              class="bg-white-300 transition duration-500 ease-in-out hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded transform hover:-translate-y-1 hover:scale-105"
              @click="show = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-x-lg" viewBox="0 0 16 16" stroke="rgb(156, 163, 175)">
                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
              </svg>
            </button>
          </div>
        </div>
        <work-slider :position="imagePos" :images="images" @moveForward="moveForward"  @moveBack="moveBack" />
        <div class="grid grid-cols-6 gap-4">
          <div class="col-start-2 col-span-4 md:col-start-3 md:col-span-2 flex justify-center flex items-center mt-2">
            <h4 class="text-sm mx-4 text-gray-400 hover:text-gray-800"> {{ work.title }}, {{ work.year }}, {{ work.medium }}, {{ work.dimensions }}</h4>
          </div>
        </div>
        <div class="grid grid-cols-6 mt-6 pt-6">
          <div class="col-start-2 col-end-6 flex justify-start">
            <p v-html="work.description_1"></p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

// SSR data fetching with useFetch
const route = useRoute()
const config = useRuntimeConfig()
const store = useStore()
const slug = route.params.work

const { data: workdata } = await useFetch(`${config.public.apiUrl}/works?filters[slug][$eq]=${slug}&populate=*`, {
  transform: (res) => res.data
})

// Reactive state
const imagePos = ref(0)
const show = ref(false)

// Computed properties
const work = computed(() => workdata.value && workdata.value[0] ? workdata.value[0].attributes : {})
const images = computed(() => workdata.value && workdata.value[0] ? workdata.value[0].attributes.images.data : [])
const arrowRight = computed(() => workdata.value && imagePos.value < work.value.images.length - 1)
const arrowLeft = computed(() => workdata.value && imagePos.value > 0)

// Head meta
useHead(() => ({
  title: work.value.title ? `${work.value.title} | ${store.state.artistName}` : 'Work',
  meta: [
    {
      hid: work.value.title || 'work',
      name: work.value.title || 'work',
      content: work.value.seo_description || '',
    },
  ],
}))

// Methods
const closeView = () => {
  const router = useRouter()
  router.push({ path: '/works', query: { cat: work.value.categories.data[0].attributes.slug } })
}

const moveForward = () => {
  imagePos.value += 1
}

const moveBack = () => {
  imagePos.value -= 1
}

// Lifecycle
onMounted(() => {
  show.value = true
})
</script>
<style scoped>
.notes {
  position: relative;
  top: -22px;
  right: -5px;
  color: goldenrod;
  font-size: 11px;
}
.work-page-enter-active {
  transition: all 0.4s ease;
}
.work-page-leave-active {
  transition: all 0.5s ease;
}
.work-page-enter-from {
  opacity: 0;
  transform: translateY(-190px);
}
.work-page-leave-to {
  transform: translateX(190px);
  opacity: 0;
}
</style>
