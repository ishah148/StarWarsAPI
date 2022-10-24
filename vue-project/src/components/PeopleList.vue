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
      <div class="tst">
        <ShortDescriptionItem
          v-for="(item, index) in data"
          :key="index"
          :obj="item"
        />
      </div>
    </div>
    <div class="error" v-else-if="isError">Something was wrong :(</div>
  </div>
</template>
<script lang="ts">
import { People } from '@/models/SwapApi/people'
import { SwapiApi } from '@/services/api'
import { defineComponent } from 'vue'
import SearchBar from './SearchBar.vue'
import ShortDescriptionItem from './DescriptionItems/ShortDescriptionItem.vue'
import { resources, Resources } from '@/models/SwapApi/resources'
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
    updatePageFromRouter () {
      const routerPage = +this.$route.params.page
      if (typeof +routerPage === 'number' && !isNaN(routerPage)) {
        this.page = +routerPage
      } else {
        this.page = 1
      }
    },
    async getData (page: number) {
      this.isLoading = true
      this.isError = false
      const group = this.$route.params.group as Resources
      if (!resources.includes(group)) {
        this.isError = true
        return
      }
      const res = await SwapiApi.getPeoples(group, page)
      this.isLoading = false
      this.data = []
      if (res.status === 200) {
        this.data.push(...res.data.results)
        this.maxPage = Math.ceil(res.data.count / 10)
      } else {
        this.isError = true
      }
      return res.data.results
    }
  },
  mounted () {
    this.updatePageFromRouter()
    this.getData(this.page)
  },
  watch: {
    $route () {
      this.updatePageFromRouter()
    }
  },
  components: { SearchBar, ShortDescriptionItem }
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
