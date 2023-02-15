<script>
import axios from "axios";
import {store} from "../store"
import { ref } from 'vue'
import tt from '@tomtom-international/web-sdk-maps';

// import AppWelcomeAnimation from"../components/AppWelcomeAnimation.vue"
import EstateCard from "../components/EstateCard.vue"
export default {
  name: "AdvancedSearch",
  components: { EstateCard },
  data() {
    return {
      store,
      allEstates: [],
      filteredServices: [],
      filteredStreet: "",
      filteredCity: '',
      distance: null,
      map: null,
      allCoordinates: [],
      KEY: "e3ENGW4vH2FBakpfksCRV16OTNwyZh0e",
    };
  },
  created() {

      this.getFilteredEstates()
      this.getServices()
      
    },
    mounted(){
        // this.initializeMap()
        // this.addMarker()
    
  },
  methods: {

    getFilteredEstates(){
        // console.log(store.allEstates);


        

      const option = {
                params: {
                  ...this.filteredServices && {services: this.filteredServices}
                }
            }

      if (this.distance) {
        option.params.distance = this.distance
        } else {
          option.params.distance = 20
        }

      if(this.filteredStreet){
        option.params.street = this.filteredStreet
      }

      if(this.filteredCity){
        option.params.city = this.filteredCity
      } else{

        option.params.city = null
      }


      axios.get(this.store.backEndURL, option).then(res => {
        console.log(res.data.results);
        this.store.allEstates = res.data.results;
        this.allEstates = res.data.results;
        this.initializeMap();
        
      })
    },

    getServices(){
        axios.get(this.store.servicesURL).then(res => {
            // console.log(res.data.results);
            this.store.allServices =  res.data.results;
        })
    },

    initializeMap() {
            this.$refs.mapRef.innerHTML = ""
            let center = [];

              if(this.allEstates.length > 0){
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
                markerElement.style.borderRadius= "20px"
               const marker = new tt.Marker({ element: markerElement, anchor: "center"})
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
                   customPopUp.innerHTML = `<p> ${estate.title} </p>`
                   customPopUp.style.color = "black"
                   customPopUp.style.width = "150px"

                   // const popup = new tt.Popup({ offset: popupOffsets, closeOnMove: true }).setDOMContent(customPopUp)
                   const popup = new tt.Popup({offset: popupOffsets, closeOnMove: true}).setDOMContent(customPopUp)

                 marker.setPopup(popup)
             });




        },
  },
};
</script>
<template>
  <div class="my-container-fluid">
      <h1>Ricerca Avanzata</h1>
      <div class="container">
        <form class="search" >
            <div class="addressSearch">
                <input type="text" name="address" v-model="filteredStreet" placeholder="Inserisci un indirizzo">
                <input type="text" name="city" v-model="filteredCity" placeholder="Inserisci una città">
                <input type="number" name="distance" v-model="distance" placeholder="Distanza *" required >
            </div>
            <div class="services">
                <template v-for="service in store.allServices">
                    <div>

                        <input  type="checkbox" :name="service.name" :id="service.id" :value="service.id" v-model="filteredServices">
                        <label>{{ service.name }}</label>
                    </div>
                </template>

            </div>
            <button class="our-btn-header" @click.prevent="getFilteredEstates()" type="submit">Cerca</button>
        </form>
        </div>
        <div id='tom-map' ref="mapRef"></div>
    </div>
    <div class="content-wrapper">

      <div class="cards-container ">
         <EstateCard v-for="estate in store.allEstates" :estate="estate" ></EstateCard>
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

  .search{
        border-radius: 20px;
        background-color: $greybg;
        padding: 1em .5em;
        @include my-flex(column, start);
        transition: all 300ms;


        .addressSearch{
            @include my-flex(row, center);
            flex-wrap: wrap;
            gap: .5em;
            margin-bottom: 1em;

            input{
                padding: .5em 1em;
                border-radius: 20px;
                border: none;

                &:first-child{
                    width: 100%;
                }

                &:focused{
                    border: 1px solid $red;
                }

                &{
                    @media screen and (max-width: 500px) {
                   width: 100%;
                   }

                }
            }
        }
        .services{
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
                align-items: flex-start;
                flex-wrap: nowrap;
            height: fit-content;


                   }

            div{
              align-items: flex-start;
              width: 25%;
              min-width: 50px;
            @include my-flex(row, flex-start);
                gap: .3em;
                font-weight: 100;

            }

        }

        button{
          width: 20vmax;
          font-size: 1.2rem;
          
        }


    }

    #tom-map {
    height: 30em;
    width: 100%;
    border-radius: 10px;
    
    }


}
.cards-container{
  @include my-container;
  @include my-flex(row, start);
  flex-wrap: wrap;
  gap: 1em .5em;
     
 
 }
</style>
