import { ref, onMounted, getCurrentInstance, onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";
function usePagination() {
  const router = useRouter();
  const route = useRoute();
  const instance = getCurrentInstance();
  const page = ref(1);
  function nextPage() {
    if (page.value < 5) {
      page.value++;
      router.push({ query: { page: page.value } });
    }
  }
  function prevPage() {
    if (page.value > 1) {
      page.value--;
      router.push({ query: { page: page.value } });
    }
  }
  function updatePageFromRouter() {
    const routerPage = +(route.query.page || 1);
    if (typeof +routerPage === "number" && !isNaN(routerPage)) {
      page.value = +routerPage;
    } else {
      page.value = 1;
    }
  }
  onUpdated(() => {
    console.log("inst", instance);
  });
  return {
    nextPage,
    prevPage,
    updatePageFromRouter,
    page,
  };
}
export default usePagination;
