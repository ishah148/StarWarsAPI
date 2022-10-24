/* eslint-disable camelcase */
<template>
  <SearchBar />
  <p class="group-name">{{ $route.params.group }}</p>
  <div class="pagination">
    <button @click="nextPage">Next</button>
    <p>{{ page }}</p>
    <button @click="prevPage">Prev</button>
  </div>
  <div class="container">
    <div class="loading" v-if="isLoading">loading...</div>
    <div class="items" v-if="!isLoading && !isError">
      <div class="tst">
        <ShortDescriptionItem v-for="(item, index) in data" :key="index" :obj="item" />
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
import { resources, Resources, SwapApiData } from '@/models/SwapApi/resources'
import { LocationQueryValue } from 'vue-router'
export default defineComponent({
  data() {
    return {
      page: 1,
      maxPage: 5,
      data: [] as SwapApiData[],
      isError: false,
      isLoading: false,
    }
  },
  methods: {
    nextPage() {
      if (this.page < this.maxPage) {
        this.page++
        this.getData(this.page)
        this.$router.push({ query: { page: this.page++ } })
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--
        this.getData(this.page)
        this.$router.push({ query: { page: this.page-- } })
      }
    },
    updatePageFromRouter() {
      const routerPage = +(this.$route.query.page || 1)
      if (typeof +routerPage === 'number' && !isNaN(routerPage)) {
        this.page = +routerPage
        this.setRouterQuery('page', routerPage)
      } else {
        this.page = 1
        this.setRouterQuery('page', 1)
      }
    },
    getSearchQuery(): string {
      const query = this.$route.query.search
      if (!query) this.$router.push({ query: { page: this.page } })
      return (this.$route.query.search) as string
    },
    setRouterQuery(prop: 'search' | 'page', value: string | number) {
      // const prevQuery = this.$route.query
      const query = { [prop]: value }
      this.$router.push({ query })
    },
    async getData(page: number) {
      this.isLoading = true
      this.isError = false
      const group = this.$route.params.group as Resources
      if (!resources.includes(group)) {
        this.isError = true
        return
      }
      let res;
      if (this.getSearchQuery()) {
        res = await SwapiApi.search(group, this.getSearchQuery())
      } else { res = await SwapiApi.getPeoples(group, page) }
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
  mounted() {
    this.updatePageFromRouter()
    this.getData(this.page)
  },
  watch: {
    $route() {
      this.updatePageFromRouter()
    },
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
