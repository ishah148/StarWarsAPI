<template>
  <div class="description__container" v-if="Object.keys(obj || {}).length">
    <div class="description__info-container">
      <MyImage class="description__info__image" :url="obj?.url" />
      <div class="description__text-container">
        <p class="description__text" v-for="(item, index) in strings" :key="item">{{ index }} : {{ item }}</p>
      </div>
    </div>
    <p>--------------</p>
    <!-- <div v-for="(item, index) in urls" :key="item">
      <p :key="item">{{ index }} : {{ item }}</p>
    </div> -->
    <p>--------------</p>
    <div v-for="(item, index) in arrays" :key="item">
      <p :key="item">{{ index }} : {{ item }}</p>
      <p v-for="(url, index) in item" :key="index">url{{ url }}
        <MyImage class="test" :url="url" @click="redirect(url)" />
         <!-- <router-link class="link" to="/people/details/1">Vehicles</router-link> -->
      </p>
    </div>
  </div>

</template>
<script lang="ts">
import { SwapApiData } from '@/models/SwapApi/resources'
import { getValidPath } from '@/utils/url_helper'
import { defineComponent, PropType } from 'vue'
import MyImage from '../MyImage.vue'
export default defineComponent({
  name: 'FullDescriptionItem',
  props: {
    obj: Object as PropType<SwapApiData>
  },
  data() {
    return {
      urls: {},
      arrays: {},
      strings: {},
      temp: '',
    }
  },
  methods: {
    filterData() {
      const filteredArr = Object.entries(this.obj || {}).filter(
        (i) => Array.isArray(i[1]) && i[1].length > 1
      )
      filteredArr.forEach(item => {
        // (item[1] as string[]).
      })

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

    },
    redirect(url: string) {
      const newUrl = getValidPath(url)
      // TODO to correct !!!
      this.$router.push({ path: '/' + newUrl })
      this.$router.go(1)
      setTimeout(() => {
        window.history.go()
      }, 10);
    },
    getPathUrl(url: string) {
      return getValidPath(url)
    }
  },
  mounted() {
    this.filterData()
  },
  updated() {
    if (
      !Object.keys(this.strings || {}).length ||
      !Object.keys(this.strings || {})
    ) { this.filterData() }
  },
  components: { MyImage }
})
</script>

<style lang="scss">
  .description__container{
    max-width: 1200px;
    width: 100%;
    margin: auto;
    margin-top: 35px;
    font-weight: normal;
  }
  .description__info-container {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    .description__info__image {
      // flex: 1;
    }
    .description__text-container {
      // flex: 1;
      .description__text {
        text-align: start;
        font-weight: normal;
      }
    }
  }

  .test{
    width: 50px;
    height: 50px;
    img{
      border-radius: 50%;
    }
  }

</style>