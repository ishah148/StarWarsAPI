import { ref, onMounted, getCurrentInstance, onUpdated, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
function usePagination(maxPage: Ref<number>) {
  const router = useRouter();
  const route = useRoute();
  const instance = getCurrentInstance();
  const page = ref(1);
  console.log("mp", maxPage);
  function nextPage() {
    if (page.value < maxPage.value) {
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
