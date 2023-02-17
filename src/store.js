import { reactive } from "vue";

export const store = reactive({
  backEndURL: "http://127.0.0.1:8000/api/estates",
  servicesURL: "http://127.0.0.1:8000/api/services",
  leadsURL: "http://127.0.0.1:8000/api/leads",
  allServices: [],
  allEstates: [],
  //   apiSeriesURL: "https://api.themoviedb.org/3/search/tv",
  //   apiKey: "ecefa99d5c01586d7b23c8f2d49a06ae",
  //   apiImgURL: "https://image.tmdb.org/t/p/w342",
  //   searchKey: "",
  //   movies: [],
  //   series: [],
  loading: false,
  startingCity: "",
  //   selectedMovieGenre: "",
  //   selectedTvGenre: "",
  //   filteredMovies: [],
  //   filteredTvSeries: [],
});