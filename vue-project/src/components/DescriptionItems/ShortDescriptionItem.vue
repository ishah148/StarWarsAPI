<template>
  <MyImage v-if="obj?.url" :url="url" />
  <p>{{ name }}</p>
  <p>{{ routerPath }}</p>
  <p>group {{group}}</p>
  <p>id {{id}}</p>
  <button class="item-button" @click="
  $router.push({
    name: 'details',
    path: `${routerPath}`,
    params: {
      group,
      id,
    },
  })
  ">
    Description
  </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import MyImage from "@/components/MyImage.vue";
import { People } from "@/models/SwapApi/people";
import { Films } from "@/models/SwapApi/films";
import { Resources, SwapApiData } from "@/models/SwapApi/resources";
import { defineGroup, defineId, getValidPath } from "@/utils/url_helper";
import { SwapiApi } from "@/services/api";
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
  },
  mounted() {
    this.group = defineGroup(this.$route.path);
    if (!this.obj?.url) throw new Error("no url (pouterPath)"); // TODO delete !
    this.defineName();
  },
  components: { MyImage },
});
</script>
