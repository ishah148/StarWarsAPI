<template>
  <h1>Search</h1>
  <SearchBar />
  <h2>{{ searchQuery }}</h2>
  <div class="pagination">
    <button @click="prevPage" class="prev-button">&laquo;&nbsp;Prev</button>
    <p class="pagination-counter">{{ page }}</p>
    <button @click="nextPage" class="next-button">Next&nbsp;&raquo;</button>
  </div>
  <div class="container">
    <ShortDescriptionItem v-for="(item, index) in data" :key="index" :obj="item" />
  </div>
  <LoadingSpinner v-if="isLoading" />
  <ErrorSign v-if="isError" :msg="errorMessage" />
</template>

<script lang="ts">
import { Resources, resources, SwapApiData } from '@/models/SwapApi/resources'
import { SwapiApi } from '@/services/api'
import { defineComponent } from 'vue'
import ShortDescriptionItem from './DescriptionItems/ShortDescriptionItem.vue'
import ErrorSign from './ui/ErrorSign.vue'
import LoadingSpinner from './ui/LoadingSpinner.vue'
import SearchBar from './ui/SearchBar.vue'
export default defineComponent({
  name: 'SearchPage',
  data() {
    return {
      searchQuery: this.$route.params.name as string,
      errorMessage: '',
      isError: false,
      isLoading: false,
      data: [] as SwapApiData[],
      page: 1,
      maxPage: 1,
    }
  },
  methods: {
    nextPage() {
      if (this.page < this.maxPage) {
        this.page++
        this.getData(this.page)
        this.$router.push({ query: { page: ++this.page } })
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--
        this.getData(this.page)
        this.$router.push({ query: { page: --this.page } })
      }
    },
    async getData(page?: number) {
      if (page) this.page = page
      const group = this.$route.params.group as Resources
      if (!resources.includes(group)) {
        this.errorMessage = "Invalid group"
        this.isError = true
        return
      }
      this.isLoading = true
      this.isError = false
      this.page = +(this.$route.query.page || 1);
      this.data = []
      const res = await SwapiApi.search(group, this.searchQuery, this.page)
      this.isLoading = false
      console.log('', res)
      if (res.status === 200) {
        if (!res.data.count) {
          this.errorMessage = 'Not Found'
          this.isLoading = false
          this.isError = true
          return
        }
        this.data.push(...res.data.results)
        this.maxPage = Math.ceil(res.data.count / 10)
      } else {
        this.isError = true
        this.isLoading = false
        if (res.res && typeof res.res === 'string') this.errorMessage = res.res || ''
      }
    }
  },
  watch: {
    $route() {
      this.searchQuery = this.$route.params.name as string
      this.getData()
    }
  },
  mounted() {
    this.getData()
  },
  components: { SearchBar, ShortDescriptionItem, LoadingSpinner, ErrorSign }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1440px;
  margin: auto;
  justify-content: center;
  gap: 25px;
}
</style>
