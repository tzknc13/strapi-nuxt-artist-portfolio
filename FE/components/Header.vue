<template>
  <div class="mt-5 header">
    <div class="flex items-center justify-between md:justify-center mb-5 relative">
      <!-- Title: centered on md+, left on mobile -->
      <div class="flex items-baseline gap-4 md:absolute md:left-1/2 md:-translate-x-1/2">
        <h1 class="heading-font">
          <nuxt-link to="/">{{ title }}</nuxt-link>
        </h1>
        <nuxt-link 
          v-if="hasWorks" 
          to="/works" 
          class="text-gray-400 dark:text-gray-500 font-light text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
        >
          works
        </nuxt-link>
      </div>

      <!-- Hamburger button -->
      <button
        class="ml-auto flex flex-col justify-between w-4 h-3 cursor-pointer z-50 relative"
        :class="{ 'is-open': menuOpen }"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="hamburger-line" :class="{ 'opacity-0': menuOpen }" />
        <span class="hamburger-line" />
      </button>
    </div>

    <!-- Overlay -->
    <transition name="overlay">
      <div
        v-if="menuOpen"
        class="fixed inset-0 bg-white dark:bg-gray-900 z-40 flex items-center justify-center"
        @click.self="menuOpen = false"
      >
        <nav>
          <ul class="flex flex-col items-center gap-6 heading-font text-lg">
            <li v-if="hasWorks">
              <nuxt-link to="/works" class="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 font-light" @click="menuOpen = false">works</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/cv" class="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 font-light" @click="menuOpen = false">cv</nuxt-link>
            </li>
            <li v-for="page in pages" :key="page.slug">
              <nuxt-link :to="`/${page.slug}`" class="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 font-light" @click="menuOpen = false">{{ page.title }}</nuxt-link>
            </li>

            <!-- Dark mode toggle -->
            <li class="mt-4">
              <button
                class="text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 text-sm font-light transition-colors"
                @click="toggle"
              >
                <span v-if="isDark">
                  <svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  light
                </span>
                <span v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  dark
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
const config = useRuntimeConfig()
const menuOpen = ref(false)
const { isDark, toggle } = useColorMode()

const title = computed(() => store.state.artistName || ' - - ')

const { data: pagesData } = await useFetch(
  `${config.public.apiUrl}/pages?fields[0]=title&fields[1]=slug&status=published&pagination[pageSize]=100`,
  { transform: (res) => res.data }
)

const { data: worksCount } = await useFetch(
  `${config.public.apiUrl}/works?pagination[pageSize]=1&pagination[withCount]=true&fields[0]=id`,
  { transform: (res) => res.meta?.pagination?.total ?? 0 }
)

const pages = computed(() => pagesData.value ?? [])

const hasWorks = computed(() => (worksCount.value ?? 0) > 0)
</script>

<style scoped>
.header {
  min-height: 90px;
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #6b7280;
  transition: opacity 0.2s ease;
}

a.router-link-exact-active {
  color: #1f2937;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.25s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
