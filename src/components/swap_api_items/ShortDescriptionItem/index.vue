<template>
  <MyImage v-if="obj?.url" :url="url" />
  <p>{{ name }}</p>
  <p>{{ info }}</p>
  <button
    class="item-button"
    @click="
      $router.push({
        name: 'details',
        path: `/${group}/details/`,
        params: {
          item:
            group === 'films' ? (obj as Films)?.title : (obj as People)?.name
        },
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
import { Films } from '@/models/SwapApi/films'
import { Resources } from '@/models/SwapApi/resources'
export default defineComponent({
  name: 'ShortDescriptionItem',
  props: {
    // group: String as PropType<Resources>,
    obj: Object as PropType<People | Films>
  },
  data () {
    return {
      name: '123',
      info: '123',
      group: 'people',
      url: this.obj?.url
    }
  },
  methods: {
    defineName () {
      console.log('ShortDescriptionItem', this.obj, this.group)
      this.name =
        this.group === 'films'
          ? (this.obj as Films)?.title
          : (this.obj as People)?.name
    }
  },
  mounted () {
    this.defineName()
  },
  components: { MyImage }
})
</script>
