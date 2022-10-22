/* eslint-disable camelcase */
<template>
  <SearchBar />
  <p>Peoples</p>
  <div class="pagination">
    <button @click="nextPage">Next</button>
    <p>{{ page }}</p>
    <button @click="prevPage">Prev</button>
  </div>
  <div class="container">
    <div class="loading" v-if="isLoading">loading...</div>
    <div class="items" v-if="!isLoading && !isError">
      <div class="tst" v-for="item in data" :key="item.birth_year">
        <div class="item-container">
          <div class="item-image">
            <MyImage :msg="item.url" />
          </div>
          <p class="item-name">{{ item.name }}</p>
          <p class="item-year">{{ item.birth_year }}</p>
        </div>
      </div>
    </div>
    <div class="error" v-else-if="isError">Something was wrong :(</div>
  </div>

  <!-- <p>{{ data }}</p> -->
</template>
<script lang="ts">
import { People } from '@/models/SwapApi/people'
import { SwapiApi } from '@/services/api'
import { generate } from '@vue/compiler-core'
import { defineComponent, nextTick } from 'vue'
import MyImage from './MyImage.vue'
import SearchBar from './SearchBar.vue'

export default defineComponent({
  data () {
    return {
      page: 1,
      maxPage: 5,
      data: [] as People[],
      seachedData: [] as People[],
      isError: false,
      isLoading: false
    }
  },
  methods: {
    nextPage () {
      if (this.page < this.maxPage) {
        this.page++
        this.getData(this.page)
        this.$router.push({ params: { page: this.page++ } })
      }
    },
    prevPage () {
      if (this.page > 1) {
        this.page--
        this.getData(this.page)
        this.$router.push({ params: { page: this.page-- } })
      }
    },
    async getData (page: number) {
      this.isLoading = true
      this.isError = false
      const res = await SwapiApi.getPeoples(page)
      this.isLoading = false
      this.data = []
      if (res.status === 200) {
        this.data.push(...res.data.results)
      } else {
        this.isError = true
      }
      return res.data.results
    }
  },
  mounted () {
    this.page = +this.$route.params.page
    // console.log('', this.$route)
    this.getData(this.page)
  },
  watch: {
    $route () {
      this.page = +this.$route.params.page
    }
  },
  // beforeRouteUpdate () {
  //   console.log('beforeRouteUpdate')
  //   this.page = +this.$route.params.page
  //   console.log('new page =', this.page)
  //   this.getData(this.page)
  //   nextTick()
  // },
  components: { MyImage, SearchBar }
})
</script>
<style lang="scss" scoped>
.items {
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
}
</style>
