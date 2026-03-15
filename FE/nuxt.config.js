export default defineNuxtConfig({

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Artist Portfolio',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'artist portfolio' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:1337/api',
      baseUrl: process.env.BASE_URL || 'http://localhost:1337',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    }
  },

  css: ['@/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      // 'Inter': {
      //   wght: [100, 400],
      // },
      'Roboto Mono': {
        wght: [100, 300, 700],
      },
      'Roboto': {
        wght: [100, 300, 700],
      },
      // 'Saira': {
      //   wght: [300],
      // },
    },
    subsets: ['latin', 'latin-ext'],
    prefetch: false,
  },
  devtools: { enabled: false },


  compatibilityDate: '2024-12-05',
})
