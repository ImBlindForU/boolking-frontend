<script>
import axios from "axios";
import AppWelcomeAnimation from"../components/AppWelcomeAnimation.vue"
export default {
  name: "AppMainContent",
  components: { AppWelcomeAnimation },
  data() {
    return {
      BackEndUrl: "",
      welcome: true,
    
    };
  },
  created() {
  },
  mounted(){
    
  },
  methods: {
  },
};
</script>
<template>
    <AppWelcomeAnimation v-if="!welcome"></AppWelcomeAnimation>
  <div class="my-container-fluid">
    <h1>YO</h1>
 
  </div>
</template>
<style lang="scss" scoped>
@use "../styles/partials/_mixins" as *;
@use "../styles/partials/_variables" as *;

.my-container-fluid {
  @include my-container-fluid;
  padding-top: 1em;
  color: black;
  // background: #000;
  height: 100%;

  h1 {
    color: $red;
    text-align: center;
  }

  .wrapper {
    @include my-flex(column, space-between);
    align-items: center;
    border: 1px solid gray;
    gap: 1.5em;
    margin: 2em 0;
    padding: 1em 0 4em;
    height: 100%;
    background-color: black;
  }
}
</style>
