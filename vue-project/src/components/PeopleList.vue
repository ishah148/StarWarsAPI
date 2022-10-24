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
    <div class="items" v-if="!isLoading && !isError">
      <div class="tst">
        <ShortDescriptionItem v-for="(item, index) in data" :key="index" :obj="item" />
      </div>
    </div>
  </div>
  <LoadingSpinner class="loading" v-if="isLoading" />
  <ErrorSign v-if="isError" :msg="errorMessage" />
</template>
<script lang="ts">
import { SwapiApi } from '@/services/api'
import { defineComponent } from 'vue'
import SearchBar from './SearchBar.vue'
import ShortDescriptionItem from './DescriptionItems/ShortDescriptionItem.vue'
import ErrorSign from './ui/ErrorSign.vue'
import LoadingSpinner from './ui/LoadingSpinner.vue'
import { resources, Resources, SwapApiData } from '@/models/SwapApi/resources'
import { AxiosError } from 'axios'
export default defineComponent({
  data() {
    return {
      page: 1,
      maxPage: 5,
      data: [] as SwapApiData[],
      isError: false,
      isLoading: false,
      errorMessage: ''
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
      } else {
        this.page = 1
      }
    },
    async getData(page: number) {
      const group = this.$route.params.group as Resources
      if (!resources.includes(group)) {
        this.errorMessage = "Invalid group"
        this.isError = true
        return
      }
      this.isLoading = true
      this.isError = false

      const res = await SwapiApi.getPeoples(group, page)
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
  mounted() {
    this.updatePageFromRouter()
    this.getData(this.page)
  },
  watch: {
    $route() {
      this.updatePageFromRouter()
    },
  },
  components: { SearchBar, ShortDescriptionItem, ErrorSign, LoadingSpinner }
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
