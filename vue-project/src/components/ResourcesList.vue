
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
    <ShortDescriptionItem v-for="(item, index) in data" :key="index" :obj="item" />
  </div>
  <LoadingSpinner v-if="isLoading" />
  <ErrorSign v-if="isError" :msg="errorMessage" />
</template>

<script lang="ts">
import { SwapiApi } from "@/services/api";
import { defineComponent } from "vue";
import SearchBar from "./ui/SearchBar.vue";
import ShortDescriptionItem from "./DescriptionItems/ShortDescriptionItem.vue";
import ErrorSign from "./ui/ErrorSign.vue";
import LoadingSpinner from "./ui/LoadingSpinner.vue";
import { resources, Resources, SwapApiData } from "@/models/SwapApi/resources";
import BackButton from "./ui/BackButton.vue";
export default defineComponent({
  data() {
    return {
      page: 1,
      maxPage: 5,
      data: [] as SwapApiData[],
      isError: false,
      isLoading: false,
      errorMessage: "",
    };
  },
  methods: {
    nextPage() {
      if (this.page < this.maxPage) {
        this.page++;
        this.getData(this.page);
        this.$router.push({ query: { page: this.page } });
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.getData(this.page);
        this.$router.push({ query: { page: this.page } });
      }
    },
    updatePageFromRouter() {
      const routerPage = +(this.$route.query.page || 1);
      if (typeof +routerPage === "number" && !isNaN(routerPage)) {
        this.page = +routerPage;
      } else {
        this.page = 1;
      }
    },
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
        if (res.res && typeof res.res === "string")
          this.errorMessage = res.res || "";
      }
    },
  },
  mounted() {
    this.updatePageFromRouter();
    this.getData(this.page);
  },
  watch: {
    $route() {
      this.updatePageFromRouter();
    },
  },
  components: { SearchBar, ShortDescriptionItem, ErrorSign, LoadingSpinner },
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
