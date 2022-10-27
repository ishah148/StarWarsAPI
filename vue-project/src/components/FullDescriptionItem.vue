<template>
  <div class="description__container" v-if="isObjEmpty(obj as SwapApiData)">
    <div class="description__info-container">
      <MyImage class="description__info-image" :url="obj?.url" />
      <div class="description__text-container">
        <p
          class="description__text"
          v-for="(item, index) in strings"
          :key="item"
        >
          {{ index }} : {{ item }}
        </p>
      </div>
    </div>
    <div
      class="description-links__container"
      v-for="(item, index) in arrays"
      :key="index"
    >
      <p class="description-links__group" :key="item">{{ index }}: <br /></p>
      <div
        class="description-links__image-container"
        v-for="(url, index) in item"
        :key="index"
      >
        <router-link
          class="link"
          :to="{
            name: 'details',
            params: { group: getGroupUrl(url), id: getIdUrl(url) },
          }"
        >
          <MyImage class="description-links__image" :url="url" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SwapApiData } from "@/models/SwapApi/resources";
import { defineGroup, defineId, getValidPath } from "@/utils/url_helper";
import { defineComponent, PropType } from "vue";
import MyImage from "./MyImage.vue";
export default defineComponent({
  name: "FullDescriptionItem",
  props: {
    obj: Object as PropType<SwapApiData>,
  },
  data() {
    return {
      urls: {},
      arrays: {},
      strings: {},
    };
  },
  methods: {
    startDataGrouping() {
      this.groupingArray();
      this.groupingUrls();
      this.groupingStrings();
    },
    groupingArray() {
      const filteredArr = Object.entries(this.obj || {}).filter(
        (i) => Array.isArray(i[1]) && i[1].length > 1
      );
      this.arrays = Object.fromEntries(filteredArr);
    },
    groupingUrls() {
      const filteredUrls = Object.entries(this.obj || {}).filter((i) => {
        if (typeof i[1] === "string" && i[1].includes("http")) {
          return true;
        }
        return false;
      });
      this.urls = Object.fromEntries(filteredUrls);
    },
    groupingStrings() {
      const filteredStr = Object.entries(this.obj || {}).filter((i) => {
        const [value, property] = i;
        if (
          typeof property === "string" &&
          !property.includes("http") &&
          value !== "created" &&
          value !== "edited"
        ) {
          return true;
        } else return false;
      });
      this.strings = Object.fromEntries(filteredStr);
    },
    isObjEmpty(obj: Object) {
      return !!Object.keys(obj).length;
    },
    redirect(url: string) {
      const newUrl = getValidPath(url);
      this.$router.push({
        name: "details",
        params: {
          group: defineGroup(newUrl),
          id: defineId(newUrl),
        },
      });
    },
    getGroupUrl(url: string) {
      return defineGroup(url);
    },
    getIdUrl(url: string) {
      return defineId(url);
    },
  },
  mounted() {
    this.startDataGrouping();
  },
  updated() {
    this.startDataGrouping();
  },
  components: { MyImage },
});
</script>

<style lang="scss">
.description__container {
  max-width: 1200px;
  width: 100%;
  margin: auto;
  margin-top: 35px;
  font-weight: normal;
  padding: 25px;

  p {
    margin: 0;
  }
}

.description__info-container {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  .description__info-image {
    width: 300px;
    img {
      border: 2px solid;
      width: 300px;
    }
  }

  .description__text-container {
    .description__text {
      text-align: start;
      font-weight: normal;
      margin-top: 15px;
    }
  }

  .description-links__container {
  }
}

.description-links__container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 3px;
  column-gap: 15px;
  margin-top: 25px;
  justify-content: center;
  .description-links__group {
    width: 100%;
    margin: 5px;
  }
}

.description-links__image {
  width: 50px;
  height: 50px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  img {
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
