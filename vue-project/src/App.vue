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
import './styles/normalize.css'
import './styles/fonts.css'
import './styles/main.scss'

export default defineComponent({
  name: 'HomeView',
  components: {
    HeaderBar
  }
})
</script>
