<template>
  <h2>Peopde Detatailes</h2>
  <BackButton />
  <div v-if="!isError && isLoading">
    <LoadingSpinner />
  </div>
  <div v-if="isError">
    <ErrorSign :msg="errorMessage" />
  </div>
  <div v-if="!isError && !isLoading">
    <MyImage :msg="data?.url" />
    <div v-for="item in data" :key="item.toString()">
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BackButton from './ui/BackButton.vue'
import MyImage from './MyImage.vue'
import { People } from '@/models/SwapApi/people'
import { SwapiApi } from '@/services/api'
import { Resources, resources } from '@/models/SwapApi/resources'
import LoadingSpinner from './ui/LoadingSpinner.vue'
import ErrorSign from './ui/ErrorSign.vue'

export default defineComponent({
  name: 'PeopleDetails',
  props: {
    descr: String
  },
  data () {
    return {
      data: null as People | null,
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  },
  watch: {},
  methods: {
    async showSearchedData (group: Resources, name: string) {
      this.isLoading = true
      const res = await SwapiApi.search(group, name)
      this.isLoading = false
      if (res.status === 200) {
        const data = res.data.results
        data.length > 0 ? (this.data = data[0]) : (this.isError = true)
        if (data.length === 0) this.errorMessage = 'Not Found'
      } else this.isError = true
    }
  },
  mounted () {
    if (!history.state.data) {
      const [, group, , name] = this.$route.path.split('/')
      if (resources.includes(group)) {
        this.showSearchedData(group as Resources, name)
      } else this.isError = true
    } else this.data = JSON.parse(history.state.data)
  },
  components: { BackButton, MyImage, LoadingSpinner, ErrorSign }
})
</script>

<style scoped>
.button-primary {
  height: 30px;
  width: 50px;
}
</style>
