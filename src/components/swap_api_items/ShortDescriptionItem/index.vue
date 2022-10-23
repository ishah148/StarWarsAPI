<template>
  <MyImage :url="url" />
  <p>{{ name }}</p>
  <p>{{ info }}</p>
  <button
    class="item-button"
    @click="
      $router.push({
        name: 'details',
        path: `/${group}/details/`,
        params: { item: obj?.name },
        state: { data: JSON.stringify(obj) }
      })
    "
  >
    Description
  </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MyImage from '@/components/MyImage.vue'
import { People } from '@/models/SwapApi/people'
// type Props = {
//   name: string
//   info: string
//   url: string
//   obj: People
// }
export default defineComponent({
  name: 'ShortDescriptionItem',
  props: {
    name: String,
    info: String,
    url: String,
    group: String,
    obj: Object as PropType<People>
  },
  components: { MyImage }
})
</script>
