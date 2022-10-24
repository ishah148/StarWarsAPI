<template>
  <div class="home">
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
