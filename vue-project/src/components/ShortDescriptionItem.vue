<template>
  <div class="item-container">
    <div class="item">
      <MyImage class="image" v-if="obj?.url" :url="url" />
      <div class="item-description">
        <p class="item-name-field">Name:</p>
        <p class="item-name">{{ name }}</p>
      </div>
      <button class="button-primary item-button" @click="redirect">
        Description
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import MyImage from "@/components/MyImage.vue";
import { People } from "@/models/SwapApi/people";
import { Films } from "@/models/SwapApi/films";
import { SwapApiData } from "@/models/SwapApi/resources";
import { defineGroup, defineId, getValidPath } from "@/utils/url_helper";
export default defineComponent({
  name: "ShortDescriptionItem",
  props: {
    obj: Object as PropType<SwapApiData>,
  },
  data() {
    return {
      name: "",
      group: "",
      id: defineId((this.obj as SwapApiData).url),
      routerPath: getValidPath((this.obj as SwapApiData).url),
      url: this.obj?.url,
    };
  },
  methods: {
    defineName() {
      this.group === "films"
        ? (this.name = (this.obj as Films)?.title)
        : (this.name = (this.obj as People)?.name);
    },
    redirect() {
      this.$router.push({
        name: "details",
        path: `${this.routerPath}`,
        params: {
          group: this.group,
          id: this.id,
        },
      });
    },
  },
  mounted() {
    this.group = defineGroup(this.$route.path);
    this.defineName();
  },
  components: { MyImage },
});
</script>

<style lang="scss">
.item-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  .item {
    background-color: rgba(0, 53, 102, 0.3);
    border-radius: 10px;
    width: 350px;
    .image {
      width: 100%;
      img {
        object-fit: contain;
        object-position: top;
        width: 100%;
      }
    }
  }
}
.item-description {
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
}

.item-button {
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
