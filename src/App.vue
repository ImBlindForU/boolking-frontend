<script>

//COMPONENTS
import AppHeader from "./components/AppHeader.vue";
export default {
  components: {
    AppHeader,
    
  },
  data() {
    return {

    };
  },
};
</script>

<template>
  <AppHeader></AppHeader>
  <main></main>
  yo
</template>

<style lang="scss">
@use "./styles/general.scss" as *;
@use "./styles/partials/variables" as *;
main{
  height: 200vmin;
}
</style>
