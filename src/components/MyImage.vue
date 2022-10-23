<template>
  <img :src="src" alt="" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyImage',
  props: {
    url: String
  },
  data () {
    return {
      src: ''
    }
  },
  methods: {
    createSrc () {
      console.log(
        'fff',
        `img/people/${this.url?.split('/').slice(-2, -1)[0]}.jpg`
      )
      return `img/people/${this.url?.split('/').slice(-2, -1)[0]}.jpg`
    }
  },
  mounted () {
    this.src = this.createSrc()
  },
  updated () {
    this.src = this.createSrc()
  }
})
</script>
<style scoped lang="scss"></style>
