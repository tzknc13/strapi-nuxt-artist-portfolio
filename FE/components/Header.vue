<template>
  <div class="mt-5 header full-width px-3 md:px-5">
    <div class="flex items-center justify-between mb-5 relative">
      <!-- Spacer to balance hamburger on the right -->
      <div class="w-4" />

      <!-- Title: centered -->
      <h1 class="heading-font absolute left-1/2 -translate-x-1/2">
        <nuxt-link to="/">{{ title }}</nuxt-link>
      </h1>

      <!-- Hamburger -->
      <button
        class="flex flex-col justify-between w-4 h-3 cursor-pointer z-50 relative"
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
        <!-- Dark mode toggle: top right -->
        <ClientOnly>
          <button
            class="absolute top-5 left-5 text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 text-sm font-light transition-colors"
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
        </ClientOnly>

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
          </ul>
        </nav>
      </div>
    </transition>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const menuOpen = ref(false)
const { isDark, toggle } = useColorMode()
const { artistName } = useSiteData()

const title = computed(() => artistName.value || ' - - ')

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

.full-width {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
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
