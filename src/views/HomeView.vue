<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <ResourcesItemList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderMain from '@/components/HeaderMain.vue'
import SearchBar from '@/components/SearchBar.vue'
import ResourcesItemList from '@/components/ResourcesItemList.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    ResourcesItemList
  },
  mounted () {
    console.log('Main is mounted')
  }
})
</script>
