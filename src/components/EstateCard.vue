<script>
// import axios from "axios";
import { store } from "../store";

export default {
  name: "EstateCard",
  props: {
    estate: Object,
  },
  data() {
    return {
      store
    };
  },
  computed: {
    imgPath() {
      if (this.estate.cover_img.includes('cover/')) {
        return `http://127.0.0.1:8000/storage/${this.estate.cover_img}`
      } else {
        return this.estate.cover_img
      }
    }
  },
  methods: {
    getImgPath(imgName) {
      return new URL(`./${imgName}.png`, import.meta.url).href
    }
  },
  mounted() {

    gsap.fromTo(".estate-card", {
      // x: "-800%",
      opacity: 0,
      alpha: 0,
      scale: 0.1,
      duration: .5,
      stagger: .4

    }, {
      duration: .5,
      opacity: 1,
      scale: 1,

      // x: 0,
      stagger: .4
    })
  }
};
</script>

<template>
  <router-link :to="{ name: 'estate-page', params: { slug: estate.slug } }" v-if="estate.is_visible" class="estate-card ">
  <div >
    <div v-show="estate.price" class="price">€{{ Math.trunc(estate.price) }}</div>
    <div class="estate-img">
      <img :src="imgPath" alt="" srcset="">
      <img v-show="estate.images" v-for="img in estate.images" :src="`http://127.0.0.1:8000/storage/${img.path}`"
        draggable="false" alt="" srcset="">

    </div>
    <div class="estate-txt">
      <div>
        <h5>{{ estate.address.city }}, <span>{{ estate.address.country }}</span></h5>
        <p>{{ estate.title }}</p>
        <!-- <p>{{ estate.type }}</p> -->
        <!-- <p>{{ estate.mq }}&#x33A1;</p> -->
        <!-- <p>Prezzo: {{ estate.price }}</p> -->
      </div>
    </div>
  </div>
</router-link>
</template>

<style lang="scss" scoped>
.estate-card {
  position: relative;

  /* width */
  ::-webkit-scrollbar {
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    padding: .3em;
    box-shadow: inset 0 0 5px rgb(179, 177, 177);
    display: none;

  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #cdd0d2;
    transition: all 200ms;
    border-radius: 10px;
    width: 5px;
    // display: none;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #ff5a60;
    transition: all 200ms;

  }


  opacity: 0;
  height: 280px;
  // border: 1px solid #c1baba;
  border-radius: 15px;
  overflow: hidden;
  width: calc(100% / 1 - .25em) !important;
  display: flex;
  flex-direction: column;

  // justify-content: center;
  // align-items: center;

  .price {
    position: absolute;
    top: 0;
    right: -1px;
    width: fit-content;
    background-color: #ff5a60a7;
    text-align: center;
    backdrop-filter: blur(10px);

    border-radius: 0 10px 0 20px;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding: .3em;
  }

  .estate-img {
    width: 100%;
    box-shadow: 20px 20px 60px #b3c9d3,
      -20px -20px 60px #f3ffff;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    // padding: 10px;
    gap: 1px;
    scroll-padding: 10px;

    .estate-img img {
      flex: 0 0 100%;
      scroll-snap-align: start;
      scroll-snap-stop: always;
    }

    img {
      width: 100%;
      min-width: 100%;
      height: 200px;
      max-width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .estate-txt {
    background-color: #fff;
    padding: .5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 180px);


    h5 {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: .5em !important;

      span{
        font-weight: 300;
      }

    }

    p {
      width: 100%;
      margin-bottom: .5em !important;
      font-size: .8rem;

    }

    a,
    .our-btn {
      margin-top: .5em;
      width: 80%;
      text-align: center;
      margin: .5em auto 0;
    }
  }

  transition: all 300ms;

  &:hover {
    transition: all 300ms;
    transform: scale(1.1);
    z-index: 9;
    border-bottom: 3px solid #ff5a60;
    box-shadow: 0px 10px 10px #827b7b;
    z-index: 99;


  }

  @media screen and (min-width: 500px) {
    width: calc(100% / 2 - .5em) !important;
  }

  @media screen and (min-width: 800px) {
    width: calc(100% / 3 - .5em) !important;
  }

  @media screen and (min-width: 1200px) {
    width: calc(100% / 4 - .5em) !important;
  }
}
</style>
