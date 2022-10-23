<template>
  <div class="container" v-if="Object.keys(obj || {}).length">
    <MyImage :url="obj?.url" />
    <div v-for="(item, index) in strings" :key="item">
      <p :key="item">{{ index }} : {{ item }}</p>
    </div>
    <p>--------------</p>
    <div v-for="(item, index) in urls" :key="item">
      <p :key="item">{{ index }} : {{ item }}</p>
    </div>
    <p>--------------</p>
    <div v-for="(item, index) in arrays" :key="item">
      <p :key="item">{{ index }} : {{ item }}</p>
    </div>
  </div>

  <!-- <div v-for="(item, index) in obj" :key="item.toString()">
    <p v-if="typeof item === 'string'">{{ index }} : {{ item }}</p>
  </div> -->
</template>
<script lang="ts">
import { Films } from '@/models/SwapApi/films'
import { People } from '@/models/SwapApi/people'
import { defineComponent, PropType } from 'vue'
import MyImage from '../MyImage.vue'
export default defineComponent({
  name: 'FullDescriptionItem',
  props: {
    obj: Object as PropType<People | Films>
  },
  data () {
    return {
      urls: {},
      arrays: {},
      strings: {}
    }
  },
  methods: {
    filterData () {
      const filteredArr = Object.entries(this.obj || {}).filter(
        (i) => Array.isArray(i[1]) && i[1].length > 1
      )
      this.arrays = Object.fromEntries(filteredArr)
      const filteredUrls = Object.entries(this.obj || {}).filter((i) => {
        if (typeof i[1] === 'string' && i[1].includes('http')) {
          return true
        } else return false
      })
      this.urls = Object.fromEntries(filteredUrls)
      const filteredStr = Object.entries(this.obj || {}).filter((i) => {
        if (
          typeof i[1] === 'string' &&
          !i[1].includes('http') &&
          i[0] !== 'created' &&
          i[0] !== 'edited'
        ) {
          return true
        } else return false
      })
      this.strings = Object.fromEntries(filteredStr)
    }
  },
  mounted () {
    this.filterData()
  },
  updated () {
    if (
      !Object.keys(this.strings || {}).length ||
      !Object.keys(this.strings || {})
    ) { this.filterData() }
  },
  components: { MyImage }
})
</script>
