<template>
  <div class="container-fluid mx-auto bg-cover bg-center" :style="`background-image: url(${homepageBackground})`">
  <div class="container mx-auto px-3 md:px-5">
    <div class="grid grid-cols-4 min-h-screen">
      <Header class="col-span-4" />
      <NuxtPage class="mt-5 mb-4 col-span-4" />
      <Footer class="mt-40 col-span-4 self-end" />
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['homepageBackground']),
  }
}
</script>
