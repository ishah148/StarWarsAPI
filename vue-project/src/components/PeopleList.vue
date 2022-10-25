/* eslint-disable camelcase */
<template>
  <div class="searchbar-wrapper">
    <p class="group-name">Group: {{ $route.params.group }}</p>
    <SearchBar />
  </div>
  <div class="pagination">
    <button @click="prevPage" class="prev-button">&laquo;&nbsp;Prev</button>
    <p class="pagination-counter">{{ page }}</p>
    <button @click="nextPage" class="next-button">Next&nbsp;&raquo;</button>
  </div>
  <div class="container">
    <div class="items" v-if="!isLoading && !isError">
        <ShortDescriptionItem v-for="(item, index) in data" :key="index" :obj="item" />
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

.searchbar-wrapper {
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}
.items {
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding-right: 20px;
}

.pagination-counter {
  font-size: 30px;
  line-height: 30px;
}

.next-button,
.prev-button {
  width: 90px;
  height: 40px;
  display: block;
  border: 2px solid #e0be4f;
  color: #000814;
  background-color: #ffd60a;
  border-radius: 17px;
  text-decoration: none;
  font-weight: 400;
  line-height: 26px;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    -webkit-box-shadow: 0px 0px 10px 3px #e0be4f;
    -moz-box-shadow: 0px 0px 10px 3px #e0be4f;
    box-shadow: 0px 0px 10px 3px #e0be4f;
  }
}

.group-name {
  text-transform: uppercase;
}
</style>
