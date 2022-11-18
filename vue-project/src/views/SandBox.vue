<template>
  <h1>SandBox</h1>
  <h2>Test: {{ test }}</h2>
  <button @click="increment">increment</button>
  <button @click="some">some</button>
</template>
<script lang="ts">
import { defineComponent, onUpdated, ref } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const test = ref(3);
    const testObj = ref({ name: "f", age: 2, arr: [1] });
    function increment() {
      test.value += 1;
    }
    function some() {
      testObj.value.age += 1;
      testObj.value.arr.push(1);
    }
    onUpdated(() => {
      console.log(test.value, testObj.value);
    });
    return { test, increment, some, testObj };
  },
  data() {
    return {
      count: 1,
    };
  },
});
</script>
