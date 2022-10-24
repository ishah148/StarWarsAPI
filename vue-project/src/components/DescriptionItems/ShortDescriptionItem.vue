<template>
  <MyImage v-if="obj?.url" :url="url" />
  <p>{{ name }}</p>
  <button class="item-button" @click="
  $router.push({
    name: 'details',
    path: `/${group}/details/`,
    params: {
      group,
      item:
        group === 'films' ? (obj as Films)?.title : (obj as People)?.name,
    },
    state: { data: JSON.stringify(obj) },
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
import { Resources } from "@/models/SwapApi/resources";
import { defineGroup } from "@/utils/utils";
export default defineComponent({
  name: "ShortDescriptionItem",
  props: {
    obj: Object as PropType<People | Films | undefined>,
  },
  data() {
    return {
      name: "123",
      group: "",
      url: this.obj?.url,
    };
  },
  methods: {
    defineName() {
      console.log("ShortDescriptionItem", this.group);
      this.group === "films"
        ? (this.name = (this.obj as Films)?.title)
        : (this.name = (this.obj as People)?.name);
    },
  },
  mounted() {
    this.group = defineGroup(this.$route.path);
    this.defineName();
    console.log("ShortDescriptionItem gr na", (this.obj as Films)?.title, this.group, this.name);
  },
  components: { MyImage },
});
</script>
