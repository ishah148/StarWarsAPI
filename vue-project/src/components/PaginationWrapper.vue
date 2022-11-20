<template>
  <div class="pagination">
    <button @click="prevPage" class="prev-button">&laquo;&nbsp;Prev</button>
    <p class="pagination-counter">{{ pageNumber }}</p>
    <button @click="nextPage" class="next-button">Next&nbsp;&raquo;</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BackButton from "./ui/BackButton.vue";

export default defineComponent({
  name: "PaginationWrapper",
  components: {},
  props: {
    pageNumber: {
      type: Number,
      required: true,
    },
  },
  emits: ["prevPage", "nextPage"],
  methods: {
    prevPage() {
      console.log("");
      this.$emit("prevPage");
    },
    nextPage() {
      console.log("");
      this.$emit("nextPage");
    },
  },
});
</script>

<style scoped lang="scss"></style>
