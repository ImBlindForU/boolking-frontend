import { reactive } from "vue";

export const store = reactive({
  backEndURL: "http://127.0.0.1:8000/api/estates",
  servicesURL: "http://127.0.0.1:8000/api/services",
  leadsURL: "http://127.0.0.1:8000/api/leads",
  viewsURL: "http://127.0.0.1:8000/api/views",
  allServices: [],
  allEstates: [],
  loading: false,
  ipAddress: null,
  startingCity: "",
});
