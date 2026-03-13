<template>
  <div class="flex my-5 justify-between text-gray-500 dark:text-gray-400">
    <div class="bottom-0 p-5 text-xs"><span><a class="text-gray-300 dark:text-gray-600" href="https://www.martinec.xyz" title="coded by martinec.xyz"># </a>Copyright {{ year }} @ {{ getArtistName }}</span></div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data: () => ({}),
  computed: {
    year() {
      return new Date().getFullYear()
    },
    getArtistName() {
      return this.$store.state.artistName
    }
  }
}
</script>
<style></style>
