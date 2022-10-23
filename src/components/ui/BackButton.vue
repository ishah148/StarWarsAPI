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
<script>
export default {
  name: 'BackButton'
}
</script>
