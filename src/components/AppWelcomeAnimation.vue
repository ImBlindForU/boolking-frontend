<script>
import { ref } from 'vue'

export default {
  name: "AppWelcomeAnimation",
  components: {},
  data() {
    return {
      BackEndUrl: "",
      welcomePics: [
        "/1.jpeg",
        "/2.jpeg",
        "/3.jpeg",
        "/4.jpeg",
        "/5.jpeg",
        "/6.jpeg",
        "/7.jpeg",
        "/8.jpeg",
        "/9.jpeg",
        "/10.jpeg",
        "/11.jpeg",
        "/12.jpeg",
      ],
      loading: true,
    };
  },
  created() {


  },
  mounted() {

    // if (this.loading) {
    this.welcome();
    // }



  },
  methods: {
    getImgUrl(name) {
      return new URL(`../assets/img/flags/${name}.png`, import.meta.url).href;
    },
    welcome() {
      const timeline = gsap.timeline({ defaults: { duration: 1, } });
      timeline
        .from("#welcome", { opacity: 1, ease: "ease.Out", stagger: .1 })
        .from("h1", { y: '-100%', ease: "power2.in" })
        .from("#content", { opacity: 0, stagger: .6 })
        .from(".niagara", { y: '-900%', ease: "ease.Out", stagger: .2 })
        .to("#welcome", { alpha: 0, opacity: 1, ease: "ease.Out", delay: 1 })
        .to("#welcome", { display: "none" })
      console.log("fine");
      // setInterval( this.loading = !this.loading && console.log(2), 3000) ;   
      // console.log(timeline);
      // if (timeline) {

      // }
    }

  },
};
</script>
<template>
  <div ref="welcome" id="welcome">
    <div class="container" ref="welcomeElement">

      <div id="content">
        <h1>BoolKing</h1>
        <div>
          <img v-for="pic in welcomePics" :src="`/../src/assets/welcomeImgs${pic}`" alt="" class="niagara">
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "../styles/partials/_mixins" as *;
@use "../styles/partials/_variables" as *;


// welcome animation
#welcome {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  display: block;
  background-color: white;
  z-index: 9999999;

  // .container{
  //   @include my-container
  // }
  // border: 1px solid black;

  #content {
    width: 100vmin;
    height: 400px;
    // border: 1px solid black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include my-flex(row, center);
    align-items: center;

    h1 {
      font-size: 4em;
    }

    div {
      width: 50vmin;
      height: 30vw;
      max-height: 50vmin;
      // border: 1px solid yellow;
    }

    .niagara {
      width: 50vmin;
      height: 20vw;
      max-height: 50vmin;
      // border: 1px solid $red;
      position: absolute;
      object-fit: cover;
      border-radius: 10px;
      top: 50%;
      left: 75%;
      transform: translate(-50%, -50%)
    }

  }

}

//Queries

@media screen and (max-width:700px) {

  #welcome {
    #content {
      left: 60%;

      h1 {
        font-size: 3rem;
      }

      .niagara {
        width: 4em;
        left: 60%;
      }

    }
  }
}

@media screen and (max-width:380px) {

  #welcome {
    #content {
      left: 60%;

      h1 {
        font-size: 3rem;
      }

      .niagara {
        width: 4em;
        left: 70%;
        top: 50%;
      }

    }
  }
}
</style>
