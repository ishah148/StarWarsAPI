<template>
  <!-- <transition appear :duration="100" name="animate"> -->
  <!-- ... -->
  <div class="container">
    <div class="item">
      <div class="image-container">
        <img :src="'img/people/20.jpg'" alt="" />
      </div>
      <!-- <p class="link">Peoples</p> -->
      <router-link class="link" to="/people/?page=1">Peoples</router-link>
    </div>
    <div class="item">
      <div class="image-container">
        <img :src="'img/planets/9.jpg'" alt="" />
      </div>
      <router-link class="link" to="/planets/?page=1">Planets</router-link>
    </div>
    <div class="item">
      <div class="image-container">
        <img :src="'img/films/1.jpg'" alt="" />
      </div>
      <router-link class="link" to="/films/?page=1">Films</router-link>
    </div>
    <div class="item">
      <div class="image-container">
        <img :src="'img/vehicles/20.jpg'" alt="" />
      </div>
      <router-link class="link" to="/vehicles/?page=1">Vehicles</router-link>
    </div>
    <div class="item">
      <div class="image-container">
        <img :src="'img/starships/40.jpg'" alt="" />
      </div>
      <router-link class="link" to="/starships/?page=1">Starships</router-link>
    </div>
    <div class="item">
      <div class="image-container">
        <img :src="'img/species/79.jpg'" alt="" />
      </div>
      <router-link class="link" to="/species/?page=1">Species</router-link>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import { SwapiApi } from '@/services/api'
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {}
  },
  watch: {},
})
</script>

<style scoped lang="scss">
.button-primary {
  height: 30px;
  width: 50px;
}

.container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
}

.item {
  width: 300px;
  height: 405px;
  border: 3px solid #003566;
  -webkit-box-shadow: 0px 0px 10px 3px #003566;
  -moz-box-shadow: 0px 0px 10px 3px #003566;
  box-shadow: 0px 0px 10px 3px #003566;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .image-container {
    display: block;
    width: 100%;
    height: 330px;

    img {
      // object-fit: cover;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }

    // aspect-ratio: 1/1;
  }
}

.link {
  border: 2px solid #003566;
  width: 145px;
  height: 30px;
  align-self: center;
  color: #e0be4f;
  background-color: #001d3d;
  border-radius: 2px;
  text-decoration: none;
  font-weight: 400;
  line-height: 26px;
  margin-bottom: 20px;

  &:hover {
    transition: 0.5s;
    -webkit-box-shadow: 0px 0px 10px 3px #003566;
    -moz-box-shadow: 0px 0px 10px 3px #003566;
    box-shadow: 0px 0px 10px 3px #003566;
  }
}

.animate-enter-active {
  animation: bounce-in 0.5s ease-out both;
}

.animate-leave-active {
  animation: bounce-in 0.5s reverse ease-in both;
}

@keyframes bounce-in {
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
</style>
