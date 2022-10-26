<template>
<div class="nav__container">
  <button class="nav__btn" @click="
    () => {
      $router.back()
    }
  ">
    Return
  </button>
  <button class="nav__btn" @click="
  () => {
    $router.push({ path: '/' })
  }
  ">
    Home
  </button>
</div>
</template>
<script lang="ts">
export default {
  name: 'BackButton'
}
</script>

<style lang="scss">
.nav__container{
  display: flex;
  gap: 20px;
}
.nav__btn {
  width: 90px;
  height: 40px;
  display: block;
  border: 2px solid #e0be4f;
  color: #000814;
  background-color: #ffd60a;
  text-decoration: none;
  font-weight: 400;
  line-height: 26px;
  cursor: pointer;
}
</style>