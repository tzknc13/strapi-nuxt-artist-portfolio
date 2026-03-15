<template>
  <div class="flex my-5 justify-between text-gray-500 dark:text-gray-400">
    <div class="bottom-0 p-5 text-xs">
      <span>
        <a class="text-gray-300 dark:text-gray-600" href="https://www.martinec.xyz" title="coded by martinec.xyz"># </a>
        Copyright {{ year }} @ {{ artistName }}
      </span>
    </div>
  </div>
</template>

<script setup>
const { artistName } = useSiteData()
const year = new Date().getFullYear()
</script>
