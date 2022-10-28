<template>
  <div>
    <img
      v-if="src"
      :src="src"
      alt="image"
      @error.once="src = 'img/placeholder-small.jpg'"
      class="item-image"
    />
  </div>
</template>

<script lang="ts">
import { resources } from "@/models/SwapApi/resources";
import { defineGroup, defineId } from "@/utils/url_helper";
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyImage",
  props: {
    url: String,
  },
  data() {
    return {
      src: "",
    };
  },
  methods: {
    createSrc() {
      const group = defineGroup(this.url);
      const id = defineId(this.url);
      if (!group && !id) return "";
      return `img/${group}/${id}.jpg`;
    },
  },
  mounted() {
    this.src = this.createSrc();
  },
});
</script>

<style lang="scss">
img {
  width: 100%;
  height: 100%;
}
</style>
