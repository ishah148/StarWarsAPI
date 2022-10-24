<template>
  <HeaderBar>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </HeaderBar>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    HeaderBar
  }
})
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
