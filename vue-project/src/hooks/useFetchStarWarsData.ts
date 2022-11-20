import { Resources, SwapApiData, resources } from "@/models/SwapApi/resources";
import { SwapiApi } from "@/services/api";
import { ref } from "vue";
import { useRoute } from "vue-router";

function useFetchStarWarsData() {
  const route = useRoute();
  const group = route.params.group as Resources;
  const errorMessage = ref("");
  const isError = ref(false);
  const isLoading = ref(false);
  const data = ref<SwapApiData[]>([]);
  const maxPage = ref(1);
  const getData = async (page: number) => {
    if (!resources.includes(group)) {
      errorMessage.value = "Invalid group";
      isError.value = true;
      return;
    }
    isLoading.value = true;
    isError.value = false;
    const res = await SwapiApi.getPeoples(group, page);
    isLoading.value = false;
    data.value = [];
    if (res.status === 200) {
      data.value.push(...res.data.results);
      maxPage.value = Math.ceil(res.data.count / 10);
    } else {
      isError.value = true;
      isLoading.value = false;
      if (res.responce && typeof res.responce === "string")
        errorMessage.value = res.responce;
    }
  };
  return {
    route,
    group,
    errorMessage,
    isError,
    isLoading,
    data,
    maxPage,
    getData,
  };
}
export default useFetchStarWarsData;
