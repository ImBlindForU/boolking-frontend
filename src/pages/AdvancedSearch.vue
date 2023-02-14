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
      this.initializeMap()
    
  },
  methods: {

    getFilteredEstates(){
        // console.log(store.allEstates);

      const option = {
                params: {
                  distance: this.distance,
                  ...this.filteredServices && {services: this.filteredServices}
                }
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
      })
    },

    getServices(){
        axios.get(this.store.servicesURL).then(res => {
            // console.log(res.data.results);
            this.store.allServices =  res.data.results;
        })
    },

    initializeMap() {
            // const mapdiv = document.getElementById('tom-map')

             const map = tt.map({
                key: this.KEY,
                container: this.$refs.mapRef,
                center: [ 12.4964, 41.9028,],
                zoom: 5
            });

            this.store.allEstates.forEach(estate => {
                this.createMarker([estate.address.long, estate.address.lat], "white", estate.title );
                console.log(estate.title);
            });
            console.log(this.store.allEstates);


           

        },
        createMarker(position, color, popupText) {
            var markerElement = document.createElement('div');
            markerElement.className = 'marker';

            var markerContentElement = document.createElement('div');
            markerContentElement.className = 'marker-content';
            markerContentElement.style.backgroundColor = color;
            markerElement.appendChild(markerContentElement);

            var iconElement = document.createElement('div');
            iconElement.className = 'marker-icon';
            iconElement.style.backgroundImage =
                'url(../assets/' + 'marker.png' + ')';
            markerContentElement.appendChild(iconElement);

            var popup = new tt.Popup({offset: 30}).setText(popupText);
            // add marker to map
            new tt.Marker({element: markerElement, anchor: 'bottom'})
                .setLngLat(position)
                .setPopup(popup)
                .addTo(map);
        },
        getAllCoordinates(){

            store.allEstates.forEach(estate => {
                // this.estate.lat 
            });
        }


  },
};
</script>
<template>
  <div class="my-container-fluid">
      <h1>Ricerca Avanzata</h1>
      <div class="container">
        <form class="search" >
            <div class="addressSearch">
                <input type="text" name="address" v-model="filteredStreet" placeholder="Inserisci un indirizzo o una città">
                <input type="text" name="city" v-model="filteredCity" placeholder="Inserisci una città">
                <input type="number" name="distance" v-model="distance" placeholder="Distanza" >
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
     <div class="cards-container ">
        <EstateCard v-for="estate in store.allEstates" :estate="estate" ></EstateCard>
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
            align-items: start;
            width: 100%;
            height: 150px;
            gap: .5em;
            margin-bottom: 1em;

            @media screen and (max-width: 500px) {
                @include my-flex(column, flex-start);
                align-items: flex-start;
                flex-wrap: nowrap;
            height: fit-content;


                   }

            div{
            @include my-flex(row, flex-start);
                gap: .3em;
                align-items: center;
                min-width: 50px;
                font-weight: 100;

            }

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
