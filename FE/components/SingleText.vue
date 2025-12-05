<template>
  <div>
    <div v-if="isImgs" class="mt-3 grid gap-2 grid-cols-6 justify-items-center">
      <img class="p-4 col-span-6 md:col-start-2 col-span-4" :src="urlfix(textObj.attributes)" />
    </div>
    <div class="mt-3 grid gap-2 grid-cols-6">
      <div class="text-gray-500 col-span-6 md:col-start-2 md:col-span-4" v-html="textObj.attributes.content"></div>
    </div>
  </div>
</template>
<script>
import formatsCheck from '../helpers/formats.js'

export default {
  name: 'SingleText',
  props: {
    textObj: {
      type: Object,
      required: true,
    },
    isImgs: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      title: this.textObj.title || 'default',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: this.title,
          name: this.title,
          content: 'metatexts',
        },
      ],
    }
  },
  computed: {},
  mounted() {},
  methods: {
    urlfix(ele) {
      const config = useRuntimeConfig()
      return formatsCheck(config.public.baseUrl, ele.single_image, 'small')
    },
  },
}
</script>
<style>
h2 {
}
</style>
