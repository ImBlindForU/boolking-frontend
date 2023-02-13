<script>
import axios from "axios";
import {store} from "../store"
import AppWelcomeAnimation from"../components/AppWelcomeAnimation.vue"
export default {
  name: "AppMainContent",
  components: { AppWelcomeAnimation },
  data() {
    return {
      // BackEndUrl: "http://127.0.0.1:8000/api/estates",
      welcome: true,
      store
    
    };
  },
  created() {

      this.getAllEstates()

  },
  mounted(){
    
  },
  methods: {

    getAllEstates(){
      axios.get(this.store.backEndURL ).then(res => {
        console.log(res.data.results);
        this.store.allEstates = res.data.results;
      })
    }
  },
};
</script>
<template>
    <AppWelcomeAnimation v-if="!welcome"></AppWelcomeAnimation>
  <div class="my-container-fluid">
    <h1>Tutti i nostri alloggi</h1>

    <div class="container">

      <!-- {{-- OPZIONE CARD --}} -->
                <div class="cards-container ">

                   
                        <div v-for="estate in store.allEstates" :key="estate.id" class="estate-card ">
                            <div class="estate-img">
                              
                                <img :src="`http://127.0.0.1:8000/storage/${estate.cover_img}`" alt="" srcset="">
                            </div>
                            <div class="estate-txt">
                                <div>
                                    <h5>{{ estate.title }}</h5>
                                    <p>Tipologia: {{ estate.type }}</p>
                                    <p>&#x33A1;: {{ estate.mq }}</p>
                                    <p>Prezzo: {{ estate.price }}</p>
                                </div>
                                <div class="estate-actions">
                                    <!-- <a class="btn our-btn d-block mb-1 "
                                        href="{{ route('user.estates.show', $estate->slug) }}">
                                      </a> -->
                                      <i class="fa-solid fa-magnifying-glass"></i>
                                    <!-- <a class="btn our-btn d-block  mb-1 "
                                        href="{{ route('user.estates.edit', $estate->slug) }}">
                                      </a> -->
                                      <i class="fa-solid fa-wrench"></i>
                                </div>
                            </div>


                        </div>
                </div>
<!-- 
                {{-- OPZIONE CARD --}} -->


    </div>

 
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


  .cards-container{
    @include my-container;
    @include my-flex(row, center);
    flex-wrap: wrap;
   gap: 1em .5em;
       .estate-card{
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
               img{
               width: 100%;
                   max-width: 100%;
                   object-fit: cover;
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
       
   
   }
}
</style>
