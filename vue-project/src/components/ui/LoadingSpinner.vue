<template>
  <h2>Loading....</h2>
  <section class="main">
    <div class="loader">
      <MySvg class="spaceship" />
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MySvg from '../icons/MySvg.vue';
export default defineComponent({
  name: "LoadingSpinner",
  components: { MySvg }
})
</script>
<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}


.loader {
  width: 80px;
  height: 80px;

  -webkit-animation: spin 2s linear infinite;
  -moz-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.spaceship {
  fill: #883f3f;
  width: 100%;
  height: 100%;
}
</style>