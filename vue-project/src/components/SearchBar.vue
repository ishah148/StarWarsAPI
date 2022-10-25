<template>
  <form @submit.prevent="log" class="search-form">
    <input type="search" class="search-input" v-model="searchQuery" />
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
      if (!this.searchQuery) return
      this.$router.push({ path: `/${group}/search/&${this.searchQuery}`, query: { page: 1 } })
    },
  },
})
</script>

<style scoped>
.button-primary {
  height: 40px;
  width: 90px;
  cursor: pointer;
}

.search-form {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.search-input {
  width: 50%;
  height: 35px;
  margin-right: 30px;
  padding-left: 10px;
  padding-right: 5px;

  border-radius: 4px;
  background-color: #003566;
  outline: none;
  caret-color: #e0be4f;
  color: #e0be4f;
  font-size: 20px;
}
</style>
