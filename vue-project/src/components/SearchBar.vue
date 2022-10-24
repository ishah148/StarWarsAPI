<template>
  <form @submit.prevent="log">
    <input type="search" v-model="searchQuery" />
    <button type="submit" class="button-primary">Search</button>
  </form>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      text: '',
      searchQuery: '',
    }
  },
  watch: {},
  methods: {

    log() {
      const group = this.$route.params.group
      if(!this.searchQuery) return
      this.$router.push({ path: `/${group}/search/&${this.searchQuery}`, query: { page: 1 } })
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
