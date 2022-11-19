<template>
  <HeaderBar>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </HeaderBar>
  <router-view :key="$route.fullPath" />
  <SandBox />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderBar from "@/components/HeaderBar.vue";
import "./styles/normalize.css";
import "./styles/fonts.css";
import "./styles/main.scss";
import SandBox from "./views/SandBox.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HeaderBar,
    SandBox,
  },
});
</script>
