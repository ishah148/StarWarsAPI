<template>
  <form @submit.prevent="log">
    <input type="search" v-model="searchQuery" />
    <button type="submit" class="button-primary" @click="updateText">Search</button>
  </form>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      text: '',
      searchQuery: '',
      test2: {
        name: '2',
        fname: 2
      }
    }
  },
  watch: {},
  methods: {
    updateText() {
      this.test2.fname = 3
    },
    log() {
      this.setRouterQuery('search', this.searchQuery)

    },
    setRouterQuery(prop: 'search' | 'page', value: string | number) {
      const prevQuery = this.$route.query
      // const query = { ...prevQuery, [prop]: value }
      // this.$router.push({ query })
      this.$router.push({path:'/people/search'})
    },
  }
})
</script>

<style scoped>
.button-primary {
  height: 30px;
  width: 60px;
}
</style>
