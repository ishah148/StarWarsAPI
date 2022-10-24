<template>
  <h2>Something was wrong "("</h2>
  <p v-if="msg">{{ msg }}</p>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ErrorSign',
  props: {
    msg: String
  }
})
</script>
