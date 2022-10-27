<template>
  <div class="header__container">
    <h1>Star Wars Wiki</h1>
    <BackButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BackButton from "./ui/BackButton.vue";

export default defineComponent({
  name: "HeaderMain",
  props: {
    msg: String,
  },
  components: { BackButton },
});
</script>

<style scoped lang="scss">
.header__container {
  max-width: 1440px;
  margin: auto;
}
</style>
