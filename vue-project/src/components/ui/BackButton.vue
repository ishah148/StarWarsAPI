<template>
  <button
    @click="
      () => {
        $router.back()
      }
    "
  >
    Return
  </button>
  <button
    @click="
      () => {
        $router.push({path:'/'})
      }
    "
  >
    Home
  </button>
</template>
<script lang="ts">
export default {
  name: 'BackButton'
}
</script>
