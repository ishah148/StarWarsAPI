<template>
  <div class="home-page">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <ResourcesItemList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ResourcesItemList from '@/components/ResourcesItemList.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    ResourcesItemList
  }
})
</script>
<style lang="scss">
.home-page {
  padding: 25px;
}
</style>