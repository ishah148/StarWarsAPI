/* eslint-disable camelcase */
<template>
  <p>people list</p>
  <p>page:{{ page }}</p>
  <div class="container">
    <div class="loading" v-if="isLoading">loading...</div>
    <div class="items" v-if="!isLoading && !isError">
      <div class="tst" v-for="item in data" :key="item.birth_year">
        <div class="item-container">
          <div class="item-image">
            <MyImage :msg="item.url" />
          </div>
          <p>
            {{
              `assets/img/peoples/${item.url.split('/').slice(-2, -1)[0]}.jpg`
            }}
          </p>
          <p class="item-name">{{ item.name }}</p>
          <p class="item-year">{{ item.homeworld }}</p>
        </div>
      </div>
    </div>
    <div class="error" v-else-if="isError">Something was wrong :(</div>
  </div>
  <div class="pagination">
    <button @click="nextPage">Next</button>
    <p>{{ page }}</p>
    <button @click="prevPage">Prev</button>
  </div>
  <!-- <p>{{ data }}</p> -->
</template>
<script lang="ts">
import { People } from '@/models/SwapApi/people'
import { SwapiApi } from '@/services/api'
import { generate } from '@vue/compiler-core'
import { defineComponent } from 'vue'
import MyImage from './MyImage.vue'

export default defineComponent({
  data () {
    return {
      page: 1,
      maxPage: 5,
      data: [] as People[],
      isError: false,
      isLoading: false
    }
  },
  methods: {
    nextPage () {
      if (this.page < this.maxPage) {
        this.page++
        this.getData(this.page)
      }
    },
    prevPage () {
      if (this.page > 1) {
        this.page--
        this.getData(this.page)
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
    this.getData(this.page)
  },
  computed: {},
  components: { MyImage }
})
</script>
