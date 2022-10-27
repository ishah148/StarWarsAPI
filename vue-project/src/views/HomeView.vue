<template>
  <div class="home-page">
    <ResourcesItemList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ResourcesItemList from "@/views/ResourcesItemList.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    ResourcesItemList,
  },
});
</script>
<style lang="scss">
.home-page {
  padding: 25px;
}
</style>
