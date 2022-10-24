<template>
  <MyImage v-if="obj?.url" :url="url" />
  <p>{{ name }}</p>
  <button
    class="item-button"
    @click="
      $router.push({
        name: 'details',
        path: `/${group}/details/`,
        params: {
          group,
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
import { defineGroup } from '@/utils/utils'
export default defineComponent({
  name: 'ShortDescriptionItem',
  props: {
    obj: Object as PropType<People | Films | undefined>
  },
  data () {
    return {
      name: '123',
      group: '',
      url: this.obj?.url
    }
  },
  methods: {
    defineName () {
      // console.log('ShortDescriptionItem', this.obj, this.group)
      this.name =
        this.group === 'films'
          ? (this.obj as Films)?.title
          : (this.obj as People)?.name
    }
  },
  mounted () {
    this.defineName()
    this.group = defineGroup(this.$route.path)
  },
  components: { MyImage }
})
</script>
