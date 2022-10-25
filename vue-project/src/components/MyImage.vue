<template>
  <div>
    <img v-if="src" :src="src" alt="image"
      @error.once="src ='img/placeholder-small.jpg'" class="item-image"/>
  </div>
</template>
<script lang="ts">
import { resources } from '@/models/SwapApi/resources'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MyImage',
  props: {
    url: String
  },
  data() {
    return {
      src: ''
    }
  },
  methods: {
    createSrc() {
      const group = this.defineGroup()
      if (!group) return ''
      return `img/${group}/${this.url?.split('/').slice(-2, -1)[0]}.jpg`
    },
    defineGroup() {
      return this.url?.split('/').filter((i) => resources.includes(i))[0]
    }
  },
  mounted() {
    this.src = this.createSrc()
  }
})
</script>
<style lang="scss">
  .item-image{

  }
  img{
    width: 100%;
    height: 100%;
  }
</style>
