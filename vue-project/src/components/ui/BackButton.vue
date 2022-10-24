<template>
  <button
    @click="
      () => {
        $router.back()
      }
    "
  >
    Back
  </button>
</template>
<script lang="ts">
export default {
  name: 'BackButton'
}
</script>
