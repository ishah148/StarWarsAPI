<template>
  <h2>Peopde Detatailes</h2>
  <BackButton />
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div v-if="isError && !isLoading">
    <ErrorSign :msg="errorMessage" />
  </div>
  <div v-if="!isError && !isLoading"></div>
  <FullDescriptionItem v-if="data" :obj="(data as SwapApiData)" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BackButton from './ui/BackButton.vue'
import { SwapiApi } from '@/services/api'
import { NotFoundById, Resources, resources, SwapApiData } from '@/models/SwapApi/resources'
import LoadingSpinner from './ui/LoadingSpinner.vue'
import ErrorSign from './ui/ErrorSign.vue'
import FullDescriptionItem from './DescriptionItems/FullDescriptionItem.vue'
import { defineId } from '@/utils/url_helper'
import { isEmptyItem } from '@/utils/utils'
export default defineComponent({
  name: 'PeopleDetails',
  data() {
    return {
      data: null as unknown as SwapApiData | NotFoundById,
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  },
  methods: {
    async showSearchedData(group: Resources) {
      // if (!this.url) throw new Error("46: url undefind"); // delete
      this.isLoading = true
      const id = defineId(this.$route.path as string)
      if (!id) throw new Error("45: id undefind"); // delete
      try {

        const res = await SwapiApi.getItemById(group, id)
        console.log('123123')
        this.isLoading = false
        if (res.status === 200) {
          const data = res.data
          isEmptyItem(data) ? (this.data = data) : this.isError = true
          if (isEmptyItem(data)) this.errorMessage = 'Not Found'
        } else this.isError = true
      }catch(e){
        console.log('',e)
        this.isError = true
        this.isLoading = false
      }
    }
  },
  mounted() {
    const [, group, ,] = this.$route.path.split('/')
    if (resources.includes(group)) {
      this.showSearchedData(group as Resources,)
    } else console.log('this.isError = true 2')
  },
  components: { BackButton, LoadingSpinner, ErrorSign, FullDescriptionItem }
})
</script>

<style scoped>
.button-primary {
  height: 30px;
  width: 50px;
}
</style>
