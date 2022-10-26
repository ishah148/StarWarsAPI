<template>
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
import { SwapiApi } from '@/services/api'
import { NotFoundById, Resources, resources, SwapApiData } from '@/models/SwapApi/resources'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import ErrorSign from '../components/ui/ErrorSign.vue'
import FullDescriptionItem from '../components/FullDescriptionItem.vue'
import { defineId } from '@/utils/url_helper'
import { isEmptyItem } from '@/utils/utils'

export default defineComponent({
  name: 'ResourceDetails',
  data() {
    return {
      data: {} as SwapApiData | NotFoundById,
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  },
  methods: {
    async showSearchedData(group: Resources) {
      this.isLoading = true
      const id = defineId(this.$route.path as string)
      if (!id) throw new Error("showSearchedData: 'id' is undefind");
      const res = await SwapiApi.getItemById(group, id)
      this.isLoading = false
      if (res.status === 200) {
        const data = res.data
        isEmptyItem(data) ? (this.data = data) : this.isError = true
        if (isEmptyItem(data)) this.errorMessage = 'Not Found'
      } else {
        this.isError = true;
        this.isLoading = false;
        if (res.res && typeof res.res === 'string') this.errorMessage = res.res || ''
      }
    }
  },
  mounted() {
    const group = this.$route.params.group
    if (resources.includes(group as string)) {
      this.showSearchedData(group as Resources,)
    } else this.isError = true
  },
  components: { LoadingSpinner, ErrorSign, FullDescriptionItem }
})
</script>

<style scoped>
.button-primary {
  height: 30px;
  width: 50px;
}
</style>
