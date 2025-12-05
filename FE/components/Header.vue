<template>
  <div class="mt-5 header">
    <div class="flex justify-start md:justify-center mb-5">
      <ul class="md:flex leading-6 heading-font">
        <li class="">
          <h1>
            <nuxt-link to="/">{{ title }}</nuxt-link>
          </h1>
        </li>
        <li class="">
          <nuxt-link to="/essays" class="text-gray-500 hover:text-gray-400 font-light">texts </nuxt-link>
        </li>
        <li class="">
          <nuxt-link to="/readersdiary" class="text-gray-500 hover:text-gray-400 font-light">readers diary</nuxt-link>
        </li>
        <li class="">
          <nuxt-link to="/works" class="text-gray-500 hover:text-gray-400 font-light">works</nuxt-link>
        </li>
        <li class="">
          <nuxt-link to="/cv" class="text-gray-500 hover:text-gray-400 font-light">cv</nuxt-link>
        </li>
        <!-- <li class="">
          <nuxt-link to="/contact" class="text-gray-500 hover:text-gray-400 font-light">contact</nuxt-link>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data: () => ({
    workdata: null
  }),
  computed: {
    title() {
      return this.$store.state.artistName || ' - - '
    }
  },
}
</script>
<style scoped>
.header {
  min-height: 90px;
}
li {
  margin-right: 10px;
  margin-left: 0px;
}
a.nuxt-link-exact-active {
  color: #1f2937;
}

</style>
