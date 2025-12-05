<template>
  <button
    class="bg-white-300 transition duration-500 ease-in-out hover:bg-gray-100 text-gray-800 font-bold px-2 rounded transform hover:-translate-y-1 hover:scale-105">
    <svg xmlns="http://www.w3.org/2000/svg" :class="{'right':direction ==='right' }" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="rgb(156, 163, 175)">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'Footer',
  props:{
    direction:{
      type:String,
      default: 'right'
    }
  },
  data: () => ({}),
  computed: {

  },
  methods: {
  }
}
</script>

<style scoped>
  .right {
    transform: rotate(180deg);
  }
</style>
