<template>
  <h1>SP</h1>
  <SearchBar />
  <h2>{{ searchQuery }}</h2>
</template>

<script lang="ts">
import { Resources, resources, SwapApiData } from '@/models/SwapApi/resources'
import { SwapiApi } from '@/services/api'
import { defineComponent } from 'vue'
import SearchBar from './SearchBar.vue'
export default defineComponent({
  name: 'SearchPage',
  data() {
    return {
      searchQuery: this.$route.params.name,
      errorMessage: '',
      isError: false,
      isLoading: false,
      data:[] as SwapApiData[],
      page:'1',
      maxPage:1,
    }
  },
  methods: {
    async getData(page: number) {
      const group = this.$route.params.group as Resources
      if (!resources.includes(group)) {
        this.errorMessage = "Invalid group"
        this.isError = true
        return
      }
      this.isLoading = true
      this.isError = false

      const res = await SwapiApi.search(group, page)
      this.isLoading = false
      this.data = []
      if (res.status === 200) {
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
      this.searchQuery = this.$route.params.name
    }
  },
  components: { SearchBar }
})
</script>

<style scoped>
.button-primary {
  height: 30px;
  width: 60px;
}
</style>
<!-- if (this.getSearchQuery()) {
  res = await SwapiApi.search(group, this.getSearchQuery())
} -->