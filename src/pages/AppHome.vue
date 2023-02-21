<script>
import axios from "axios";
import { store } from "../store"
import AppWelcomeAnimation from "../components/AppWelcomeAnimation.vue"
import EstateCard from "../components/EstateCard.vue"
import MagicText from "../components/MagicText.vue";
export default {
  name: "AppMainContent",
  components: { AppWelcomeAnimation, EstateCard, MagicText },
  data() {
    return {
      welcome: true,
      store,
      city: "",
      services: [],
      street: "",
      now: null,
      distance: null,
      sponsoredEstates: [],
      unSponsoredEstates: [],
    };
  },
  created() {

    this.now = new Date();
    this.getAllEstates();

  },
  mounted() {
     
    if(localStorage.getItem('first_time')){
      const firstTime = localStorage.getItem("first_time");
      console.log(firstTime);
      if (!firstTime) {
        this.welcome = false
      }
    } else {
      localStorage.setItem('first_time', 1)
      this.welcome = false
    }


  },
  methods: {


    goToAdvanced() {
      this.$router.push({ name: 'Advanced Search' })

    },
    getAllEstates() {

      const option = {
        params: {
          distance: this.distance,
          ...this.services && { services: this.services }
        }
      }

      if (this.street) {
        option.params.street = this.street
      }

      if (this.city) {
        option.params.city = this.city
      }


      axios.get(this.store.backEndURL, option).then(res => {
        // console.log(res.data.results);
        this.store.allEstates = res.data.results;


        for (let i = 0; i < res.data.results.length; i++) {

          const element = res.data.results[i];

          if (element.sponsors.length > 0) {

            for (let j = 0; j < element.sponsors.length; j++) {
              const sponsoredElement = element.sponsors[j];
              let parsedElement = Date.parse(sponsoredElement.pivot.end_date);

              if (parsedElement > Date.parse(this.now) && !this.sponsoredEstates.includes(element)) {
                this.sponsoredEstates.push(element)
              } else if (!this.unSponsoredEstates.filter(e => e.id === element.id)) {
                this.unSponsoredEstates.push(element);
              } else if (!this.sponsoredEstates.filter(e => e.id === element.id)) {
                this.sponsoredEstates.push(element);
              }

            }
          } else {
            this.unSponsoredEstates.push(element);
          }

        }

        console.log(this.unSponsoredEstates);
        console.log(this.sponsoredEstates);
      })
    },

    // getClientIp(){
    //   return new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.open('GET', 'https://api.ipify.org/?format=json');
    //   xhr.onload = () => {
    //     if (xhr.status === 200) {
    //       resolve(JSON.parse(xhr.responseText).ip);
    //     } else {
    //       reject('Failed to get IP address');
    //     }
    //   };
    //   xhr.onerror = () => {
    //     reject('Failed to get IP address');
    //   };
    //   xhr.send();
    // });
    // },
  },
};
</script>
<template>
  <AppWelcomeAnimation v-if="!welcome"></AppWelcomeAnimation>
  <div class="my-container-fluid">

    <!-- <h1>Tutti i nostri alloggi</h1> -->



    <div class="container">

      <div class="search">
        <input type="text" name="" id="" v-model="store.startingCity" placeholder="Ovunque" @keyup.enter="goToAdvanced()">
        <i @click="goToAdvanced()" class="fa-solid fa-magnifying-glass"></i>
      </div>


      <MagicText></MagicText>
      <div class="cards-container">
        <EstateCard v-for="estate in sponsoredEstates" :estate="estate"></EstateCard>
      </div>
      <h2>Tutti</h2>

      <div class="cards-container ">

        <EstateCard v-for="estate in unSponsoredEstates" :estate="estate"></EstateCard>




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

  h2 {
    margin: 0em 2em 1em
  }

  .container {
    @include my-container;
    align-items: center;
    gap: 1.5em;
    margin-top: 2em;
    padding: 1em 0 4em;
    height: 100%;
  }

  .search {
    @include my-flex(row, center);
    margin: 1em auto 2em;
    gap: .5em;
    border: 2px solid $greybg;

    padding: .5em;
    border-radius: 20px;
    width: 60%;
    min-width: 30vmin;
    transition: all 300ms;

    &:hover {
      transform: scale(1.1);
      transition: all 300ms;
      box-shadow: 10px 10px 20px #b3c9d3;


      i {
        transition: all 200ms;
        color: $red;
        background-color: white;
      }


      //   i{
      //  transition: all 300ms;

      //     color: white;
      //   }
    }


    input {
      padding: .5em;
      min-width: 20vmin;
      width: 15em;
      border-radius: 20px;
      border: none;
      font-size: 1rem;
      font-weight: 100 !important;

      &:focus {
        outline: none;
      }

    }

    i {
      font-size: 1.3rem;
      background-color: $red;
      color: white;
      padding: .4em;
      border-radius: 50%;
      transition: all 200ms;

      &:hover {
        transition: all 200ms;
        color: $red;
        background-color: white;

      }
    }

    // @media screen and (max-width: 500px) {
    //   @include my-flex(column, center)
    //              }
  }


  .cards-container {
    @include my-container;
    @include my-flex(row, start);
    flex-wrap: wrap;
    gap: 1em .5em;
    margin-bottom: 2em;



  }
}
</style>
