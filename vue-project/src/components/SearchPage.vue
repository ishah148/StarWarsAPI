<template>
  <h1>SP</h1>
  <SearchBar />
  <h2>{{ searchQuery }}</h2>
  <ShortDescriptionItem v-for="(item, index) in data" :key="index" :obj="item" />
  <LoadingSpinner v-if="isLoading"/>
  <ErrorSign v-if="isError" :msg="errorMessage"/>
</template>

<script lang="ts">
import { Resources, resources, SwapApiData } from '@/models/SwapApi/resources'
import { SwapiApi } from '@/services/api'
import { defineComponent } from 'vue'
import ShortDescriptionItem from './DescriptionItems/ShortDescriptionItem.vue'
import SearchBar from './SearchBar.vue'
import ErrorSign from './ui/ErrorSign.vue'
import LoadingSpinner from './ui/LoadingSpinner.vue'
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
    async getData(page?: number) {
      const group = this.$route.params.group as Resources
      if (!resources.includes(group)) {
        this.errorMessage = "Invalid group"
        this.isError = true
        return
      }
      this.isLoading = true
      this.isError = false
      this.page = +(this.$route.query.page || 1);
      const res = await SwapiApi.search(group, this.searchQuery, this.page)
      if (!this.searchQuery) this.errorMessage = 'Empty'
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
      this.searchQuery = this.$route.params.name as string
      this.getData()
    }
  },
  components: { SearchBar, ShortDescriptionItem, LoadingSpinner, ErrorSign }
})
</script>

<style scoped>

</style>
<!-- if (this.getSearchQuery()) {
  res = await SwapiApi.search(group, this.getSearchQuery())
} -->