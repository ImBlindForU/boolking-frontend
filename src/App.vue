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
  <main>

    <router-view></router-view>

  </main>
</template>

<style lang="scss">
@use "./styles/general.scss" as *;
@use "./styles/partials/variables" as *;

main {
  padding: 70px 0 0 0;
  margin-bottom: 2em;
}
</style>
