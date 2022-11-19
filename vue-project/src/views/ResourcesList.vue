<!-- eslint-disable vue/no-dupe-keys -->
<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div class="searchbar-wrapper">
    <p class="group-name">Group: {{ $route.params.group }}</p>
    <SearchBar />
  </div>
  <div class="pagination">
    <button @click="prevPage" class="prev-button">&laquo;&nbsp;Prev</button>
    <p class="pagination-counter">{{ page }}</p>
    <button @click="nextPage" class="next-button">Next&nbsp;&raquo;</button>
  </div>
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

<script lang="ts">
import { SwapiApi } from "@/services/api";
import { defineComponent, getCurrentInstance, onUpdated, ref } from "vue";
import SearchBar from "../components/ui/SearchBar.vue";
import ShortDescriptionItem from "../components/ShortDescriptionItem.vue";
import ErrorSign from "../components/ui/ErrorSign.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";
import { resources, Resources, SwapApiData } from "@/models/SwapApi/resources";
import { useRoute, useRouter } from "vue-router";
import usePagination from "@/hooks/usePagination";
export default defineComponent({
  components: { SearchBar, ShortDescriptionItem, ErrorSign, LoadingSpinner },
  setup(props, context) {
    const { nextPage, page, prevPage, updatePageFromRouter } = usePagination();
    return {
      nextPage,
      page,
      prevPage,
      updatePageFromRouter,
    };
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      page: 1,
      maxPage: 5,
      data: [] as SwapApiData[],
      isError: false,
      isLoading: false,
      errorMessage: "",
    };
  },
  mounted() {
    console.log("mounted");
    this.updatePageFromRouter();
    this.getData(this.page);
  },
  methods: {
    async getData(page: number) {
      const group = this.$route.params.group as Resources;
      if (!resources.includes(group)) {
        this.errorMessage = "Invalid group";
        this.isError = true;
        return;
      }
      this.isLoading = true;
      this.isError = false;
      const res = await SwapiApi.getPeoples(group, page);
      this.isLoading = false;
      this.data = [];
      if (res.status === 200) {
        this.data.push(...res.data.results);
        this.maxPage = Math.ceil(res.data.count / 10);
      } else {
        this.isError = true;
        this.isLoading = false;
        if (res.responce && typeof res.responce === "string")
          this.errorMessage = res.responce;
      }
    },
  },
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
