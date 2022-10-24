<template>
  <h1>SP</h1>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchPage',
  methods:{
    getSearchQuery(): string {
      const query = this.$route.query.search
      return (this.$route.query.search) as string
    },
    setRouterQuery(prop: 'search' | 'page', value: string | number) {
      const query = { [prop]: value }
      this.$router.push({ query })
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
if (this.getSearchQuery()) {
  res = await SwapiApi.search(group, this.getSearchQuery())
}