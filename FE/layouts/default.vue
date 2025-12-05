<template>
  <div class="container mx-auto px-3 md:px-5">
    <div class="grid grid-cols-4 min-h-screen">
      <Header class="col-span-4" />
      <NuxtPage class="mt-5 mb-4 col-span-4" />
      <Footer class="mt-40 col-span-4 self-end" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.page-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
