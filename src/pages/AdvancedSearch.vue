<script>

import axios from "axios";
import { store } from "../store"
import { ref } from 'vue'
import tt from '@tomtom-international/web-sdk-maps';
import MagicText from "../components/MagicText.vue";
import EstateCard from "../components/EstateCard.vue"
export default {
  name: "AdvancedSearch",
  components: { EstateCard, MagicText },
  data() {
    return {
      store,
      allEstates: [],
      filteredServices: [],
      filteredStreet: "",
      filteredCity: '',
      distance: 15,
      rooms: null,
      beds: null,
      map: null,
      allCoordinates: [],
      KEY: "e3ENGW4vH2FBakpfksCRV16OTNwyZh0e",
      now: null,
      sponsoredEstates: [],
      unSponsoredEstates: [],
    };
  },
  created() {
    this.now = new Date();
    if (this.store.startingCity) {
      this.filteredCity = this.store.startingCity
    }
    this.getFilteredEstates()
    this.getServices()

  },
  mounted() {
    this.animate()
    // this.initializeMap()
    // this.addMarker()

  },
  methods: {

    getFilteredEstates() {
      this.allEstates = [];
      this.unSponsoredEstates = [];
      this.sponsoredEstates = [];
      const option = {
        params: {
          ...this.filteredServices && { services: this.filteredServices }
        }
      }

      if (this.distance) {
        option.params.distance = this.distance
      } else {
        option.params.distance = 20
      }

      if (this.filteredStreet) {
        option.params.street = this.filteredStreet
      }

      if (this.filteredCity) {
        option.params.city = this.filteredCity
      } else {
        option.params.city = null
      }

      if (this.rooms) {
        option.params.room_number = this.rooms
      } else {
        option.params.room_number = null
      }
      if (this.beds) {
        option.params.bed_number = this.beds
      } else {
        option.params.bed_number = null
      }


      axios.get(this.store.backEndURL, option).then(res => {
        if (res.data.success) {

          this.allEstates = res.data.results;

          for (let i = 0; i < this.allEstates.length; i++) {

            const element = res.data.results[i];

            if (element.sponsors.length > 0) {

              for (let j = 0; j < element.sponsors.length; j++) {
                const sponsoredElement = element.sponsors[j];
                console.log(sponsoredElement);
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

        }
        // else{
        //   this.unSponsoredEstates = [];
        //   this.sponsoredEstates = [];
        // }
        this.initializeMap();
        console.log(this.unSponsoredEstates);
        console.log(this.sponsoredEstates);

      })
    },

    getServices() {
      axios.get(this.store.servicesURL).then(res => {
        // console.log(res.data.results);
        this.store.allServices = res.data.results;
      })
    },

    initializeMap() {
      this.$refs.mapRef.innerHTML = ""
      let center = [];

      if (this.allEstates.length > 0) {
        console.log(this.allEstates.length);
        center = [this.allEstates[0].address.long, this.allEstates[0].address.lat]
      } else {
        center = [12.4964, 41.9028]
      }

      const map = tt.map({
        key: this.KEY,
        container: this.$refs.mapRef,
        center: center,
        zoom: 7
      })
      this.allEstates.forEach(estate => {
        const markerElement = document.createElement("div")
        markerElement.id = "marker"
        const logo = new URL("../assets/marker.png", import.meta.url).href
        markerElement.style.backgroundImage = `url(${logo})`
        markerElement.style.width = "30px"
        markerElement.style.height = "30px"
        markerElement.style.backgroundSize = "cover"
        markerElement.style.borderRadius = "20px"
        const marker = new tt.Marker({ element: markerElement, anchor: "center" })
          .setLngLat([estate.address.long, estate.address.lat])
          .addTo(map);
        const popupOffsets = {
          top: [0, 0],
          bottom: [0, -15],
          "bottom-right": [0, -70],
          "bottom-left": [0, -70],
          left: [25, -35],
          right: [-25, -35],
        }


        //custom popup
        const customPopUp = document.createElement("div")
        customPopUp.id = "my-pop-up"
        customPopUp.innerHTML = `<p> <a href="/estates/${estate.slug}"> ${estate.title}</a>  </br> €${estate.price ? estate.price : "Non specificato"} </p>`
        customPopUp.style.color = "black"
        customPopUp.style.width = "150px"

        // const popup = new tt.Popup({ offset: popupOffsets, closeOnMove: true }).setDOMContent(customPopUp)
        const popup = new tt.Popup({ offset: popupOffsets, closeOnMove: true }).setDOMContent(customPopUp)

        marker.setPopup(popup)
      });




    },

    animate() {
      const timeline = gsap.timeline({ defaults: { duration: .5, } });
      timeline
        .from(".search", { opacity: 0, ease: "ease.Out" })
        .from("input", { opacity: 0, ease: "ease.Out", stagger: .1 })
        .from(".km", { opacity: 0, ease: "ease.Out", stagger: .1 })
        .from(".our-btn-header", { opacity: 0, ease: "ease.Out" })
        .from("#tom-map", { opacity: 0, ease: "power2.in" })
        .from(".cards-container", { opacity: 0 })

      // setInterval( this.loading = !this.loading && console.log(2), 3000) ;   
      // console.log(timeline);
      // if (timeline) {

      // }
    }
  },
};
</script>
<template>
  <div class="my-container-fluid">
    <h1>Ricerca Avanzata</h1>
    <div class="container">
      <form class="search">
        <div class="addressSearch">
          <input type="text" name="address" v-model="filteredStreet" placeholder="Indirizzo">
          <div class="mini-inputs">

            <input type="text" name="city" v-model="filteredCity" placeholder="Città">

            <input type="number" name="room_number" v-model="rooms" placeholder="Stanze" required>
            <input type="number" name="bed_number" v-model="beds" placeholder="Letti" required>
          </div>

          <div class="slidecontainer">
            <input type="range" name="distance" v-model="distance" min="0" max="30" class="slider">
            <span class="km">{{ distance }} km</span>
          </div>

          <!-- <input type="number" name="distance" v-model="distance" placeholder="Distanza *" required > -->


        </div>
        <div class="services">
          <template v-for="service in store.allServices">
            <div class="form-group">
              <input type="checkbox" :name="service.name" :id="service.id" :value="service.id" v-model="filteredServices">
              <label :for="service.id">{{ service.name }}</label>
            </div>
          </template>

        </div>
        <button class="our-btn-header" @click.prevent="getFilteredEstates()" type="submit">Cerca</button>
      </form>
    </div>
    <div id='tom-map' ref="mapRef"></div>
  </div>
  <div class="content-wrapper">

    <MagicText v-if="sponsoredEstates.length > 0"></MagicText>
    <div class="cards-container">
      <EstateCard v-for="estate in sponsoredEstates" :estate="estate"></EstateCard>
    </div>

    <h2 v-if="unSponsoredEstates.length > 0" >Tutti</h2>
    <div class="cards-container ">
      <EstateCard v-for="estate in unSponsoredEstates" :estate="estate"></EstateCard>
      <p v-show="allEstates.length === 0"> La ricerca non ha prodotto risultati</p>
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
  margin-bottom: 4em;


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

  .search {
    border-radius: 20px;
    background-color: $greybg;
    padding: 1em .5em;
    @include my-flex(column, start);
    transition: all 300ms;

    &:hover {
      box-shadow: 0px 10px 10px #827b7b;
      transition: all 200ms;
    }


    .addressSearch {
      @include my-flex(column, center);
      flex-wrap: wrap;
      width: 80%;
      gap: .5em;
      margin-bottom: 1em;

      .mini-inputs {
        @include my-flex(row, space-between);
        width: 100%;
        gap: .5em;

        input {
          width: calc(100% / 3 - .5em) !important;
        }

        @media screen and (max-width: 500px) {
          @include my-flex(column, space-between);

          input {
            width: 100% !important;
          }
        }


      }


      input {
        padding: .5em 1em;
        border-radius: 20px;
        border: none;
        font-size: 1rem;

        &:first-child {
          width: 100%;
        }

        &:focused {
          border: 1px solid $red;
        }

        & {
          @media screen and (max-width: 500px) {
            width: 100%;
          }

        }
      }


      .slidecontainer {
        width: 100%;



        text-align: center;
        /* Specified height */

        &>* {
          margin-bottom: .5em;
        }

        span {
          text-align: center;
          display: block;
          font-weight: 200;
        }
      }

      /* The slider itself */
      .slider {
        -webkit-appearance: none;
        /* Override default CSS styles */
        appearance: none;
        width: 60%;
        min-width: 5em;
        /* Full-width */
        max-width: 25em;
        /* Full-width */
        margin: .5em auto;
        height: 5px;
        background: #d3d3d3;
        /* Grey background */
        outline: none;
        /* Remove outline */
        opacity: 0.7;
        /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: .2s;
        /* 0.2 seconds transition on hover */
        transition: opacity .2s;
        padding: 0;


        input {
          width: 80%;
        }
      }

      /* Mouse-over effects */
      .slider:hover {
        opacity: 1;
        /* Fully shown on mouse-over */
      }

      /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        /* Override default look */
        appearance: none;
        width: 15px;
        /* Set a specific slider handle width */
        height: 15px;
        /* Slider handle height */
        background: $red;
        border-radius: 50%;
        /* Green background */
        cursor: pointer;
        /* Cursor on hover */
      }

      .slider::-moz-range-thumb {
        width: 10px;
        /* Set a specific slider handle width */
        height: 10px;
        /* Slider handle height */
        background: $red;
        /* Green background */
        cursor: pointer;
        /* Cursor on hover */
      }
    }

    .services {
      @include my-flex(column, flex-start);
      flex-wrap: wrap;
      // align-items: start;
      width: 100%;
      height: 170px;
      gap: .5em;
      margin-bottom: 1em;
      align-self: center;
      padding: .5em 2em;

      @media screen and (max-width: 500px) {
        @include my-flex(column, flex-start);
        align-items: center;
        flex-wrap: nowrap;
        height: fit-content;


      }

      .form-group {
        align-items: flex-start;
        width: 30%;
        min-width: 50px;
        @include my-flex(row, center);
        gap: .3em;
        font-weight: 200;



        input {
          padding: 0;
          height: initial;
          width: initial;
          margin-bottom: 0;
          display: none;
          cursor: pointer;
        }

        label {
          position: relative;
          cursor: pointer;
          width: max-content;
          min-width: 170px;
          color: $red;

          @media screen and (max-width: 670px) {
            @include my-flex(row, flex-start);
            align-items: flex-start;
            flex-wrap: nowrap;
            height: fit-content;
            width: max-content;
            min-width: 150px;
          }
        }

        label:before {
          content: '';
          appearance: none;
          -webkit-appearance: none;
          background-color: transparent;
          border: 2px solid $red;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0);
          padding: 5px;
          display: inline-block;
          position: relative;
          vertical-align: middle;
          cursor: pointer;
          margin-right: 5px;
          border-radius: 50%;
        }

        input:checked+label:after {
          content: '';
          display: block;
          position: absolute;
          top: 4px;
          left: 0px;
          bottom: 0px;
          right: 0px;
          width: 10px;
          height: 10px;
          border: solid $red;
          background-color: $red;
          border-radius: 50%;

          @media screen and (max-width: 670px) {
            top: 1px;
            left: 1px;
          }

          @media screen and (min-width: 1200px) {
            // top: 2px;
            left: 1px;
          }
        }

      }

    }

    button {
      width: 20vmax;
      font-size: 1.2rem;
      border: 1px solid red;
    }


  }

  #tom-map {
    margin: 0 auto;
    height: 30em;
    width: 90%;
    border-radius: 20px;
    transition: all 200ms;

    &:hover {
      transition: all 200ms;
      box-shadow: 0px 5px 5px #827b7b;
    }


  }


}

.cards-container {
  @include my-container;
  @include my-flex(row, start);
  flex-wrap: wrap;
  gap: 1em .5em;

  margin-bottom: 2em;




}

h2 {
  margin-left: 2em;
  margin-bottom: 1em;
}
</style>
