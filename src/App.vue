<template>
  <HeaderMain>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </HeaderMain>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderMain from '@/components/HeaderMain.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    HeaderMain
  },
  mounted () {
    console.log('Main is mounted')
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
