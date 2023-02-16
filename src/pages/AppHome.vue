<script>
import axios from "axios";
import {store} from "../store"
import AppWelcomeAnimation from"../components/AppWelcomeAnimation.vue"
import EstateCard from "../components/EstateCard.vue"
export default {
  name: "AppMainContent",
  components: { AppWelcomeAnimation, EstateCard },
  data() {
    return {
      welcome: true,
      store,
     city: "",
      services: [],
      street: "",
      
      distance: null
    };
  },
  created() {

      this.getAllEstates()

  },
  mounted(){
    
  },
  methods: {


    goToAdvanced(){
        this.$router.push({name: 'Advanced Search'})

    }, 
    getAllEstates(){

      const option = {
                params: {
                  distance: this.distance,
                  ...this.services && {services: this.services}
                }
            }

      if(this.street){
        option.params.street = this.street
      }

      if(this.city){
        option.params.city = this.city
      }


      axios.get(this.store.backEndURL, option).then(res => {
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
      
          <div class="search">
            <input type="text" name="" id="" v-model="store.startingCity" placeholder="Inserisci una città" @keyup.enter="goToAdvanced()">
              <i @click="goToAdvanced()"  class="fa-solid fa-magnifying-glass"></i>
          </div> 

                <div class="cards-container ">
                    <EstateCard v-for="estate in store.allEstates"
                     :estate="estate" ></EstateCard>
                </div>
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
  height: 100%;
  

  h1 {
    color: $red;
    text-align: center;
  }

  .container {
    @include my-container;
    align-items: center;
    gap: 1.5em;
    margin-top: 2em;
    padding: 1em 0 4em;
    height: 100%;
  }

  .search
  {@include my-flex(row, center);
    margin-bottom: 1em;
    gap: .5em;

    input{
        padding: .5em;
        min-width: 10em;
        width: 70%;
        border-radius: 20px;
        border: none;
      
    }

    i{
      font-size: 1.3rem
    }

    @media screen and (max-width: 500px) {
      @include my-flex(column, center)
                 }
  }


  .cards-container{
    @include my-container;
    @include my-flex(row, start);
    flex-wrap: wrap;
   gap: 1em .5em;
      
       
   
   }
}
</style>
