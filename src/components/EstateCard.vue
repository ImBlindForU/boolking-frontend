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
  },
  methods: {   
    getImgPath(imgName){
            return new URL(`./${imgName}.png`, import.meta.url).href
        }
  },
  mounted(){

    gsap.fromTo(".estate-card", {
      // x: "-800%",
      opacity: 0,
      alpha: 0,
      scale: 0.1,
      duration: .5, 
      stagger: .4

    },{
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
 <div  v-if="estate.is_visible" class="estate-card ">
        <div class="estate-img">
            <img  :src="`http://127.0.0.1:8000/storage/${estate.cover_img}`" alt="" srcset="">
            <img  v-show="estate.images" v-for="img in estate.images"  :src="`http://127.0.0.1:8000/storage/${img.path}`" alt="" srcset="">

        </div>
        <div class="estate-txt">
            <div>
                <h5>{{ estate.title }}</h5>
                <p>Tipologia: {{ estate.type }}</p>
                <p>&#x33A1;: {{ estate.mq }}</p>
                <p>Prezzo: {{ estate.price }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
 .estate-card{
  opacity: 0;
  height: 300px;
           border: 1px solid #c1baba;
           border-radius: 15px;
           overflow: hidden;
           width: calc(100% / 1 - .25em) !important;
           display: flex;
           flex-direction: column;
           // justify-content: center;
           // align-items: center;
           .estate-img{
               width: 100%;
               box-shadow:  20px 20px 60px #b3c9d3,
              -20px -20px 60px #f3ffff;
              display: flex;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              // padding: 10px;
              gap: 12px;
              scroll-padding: 10px;

             .estate-img img{
              flex: 0 0 100%;
              scroll-snap-align: start;
              scroll-snap-stop: always;
             } 

               img{
               width: 100%;
               min-width: 100%;
               height: 200px;
               max-width: 100%;
               object-fit: cover;
               object-position: center;
               }
           }
   
           .estate-txt
           {
               background-color: #fff;
               padding: .5em;
               display: flex;
               direction: row;
               justify-content: space-between;
   
               p{
                   margin-bottom: .1em !important;
               }
           }
       
           transition: all 300ms;
           &:hover{
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
