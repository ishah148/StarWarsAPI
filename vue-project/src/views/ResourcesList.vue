<!-- eslint-disable vue/no-dupe-keys -->
<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div class="searchbar-wrapper">
    <p class="group-name">Group: {{ $route.params.group }}</p>
    <SearchBar />
  </div>
  <PaginationWrapper
    :page-number="page"
    @next-page="nextPage"
    @prev-page="prevPage"
  />
  <div class="container" v-if="!isLoading && !isError">
    <ShortDescriptionItem
      v-for="(item, index) in data"
      :key="index"
      :obj="item"
    />
  </div>
  <LoadingSpinner v-if="isLoading" />
  <ErrorSign v-if="isError" :msg="errorMessage" />
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from "vue";
import SearchBar from "../components/ui/SearchBar.vue";
import ShortDescriptionItem from "../components/ShortDescriptionItem.vue";
import PaginationWrapper from "@/components/PaginationWrapper.vue";
import ErrorSign from "../components/ui/ErrorSign.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";
import usePagination from "@/hooks/usePagination";
import useFetchStarWarsData from "@/hooks/useFetchStarWarsData";

const { data, errorMessage, getData, isError, isLoading, maxPage } =
  useFetchStarWarsData();
const { nextPage, page, prevPage, updatePageFromRouter } =
  usePagination(maxPage);

onMounted(() => {
  console.log("mounted");
  updatePageFromRouter();
  getData(page.value);
});
</script>

<style lang="scss" scoped>
.searchbar-wrapper {
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1440px;
  margin: auto;
  justify-content: center;
  gap: 25px;
}

.group-name {
  text-transform: uppercase;
}
</style>
