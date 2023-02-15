
<script>
import axios from 'axios';
import { store } from '../store';
import tt from '@tomtom-international/web-sdk-maps';


export default {
  name: "EstatePage",
  data() {
    return {
      store,
      estate: {},
      map: null,
      KEY: "e3ENGW4vH2FBakpfksCRV16OTNwyZh0e",

    };
  },
  created() {
    this.callApiEstate();
  },
  mounted(){
      
  },
  methods: {
    callApiEstate(){
      const currentSlug = this.$route.params.slug;
      axios.get(this.store.backEndURL + "/" + currentSlug).then(resp => {
        if (resp.data.success){
          this.estate = resp.data.results;
          console.log(this.estate);
        }else {
          this.$router.push({name:'Not-Found'})
        }

        this.initializeMap();

      })
    },
    initializeMap() {
            // this.$refs.mapRef.innerHTML = ""
            let center = [];

              if(this.estate){
                console.log(this.estate);
                center = [this.estate.address.long, this.estate.address.lat]
              } else {
                center = [12.4964, 41.9028]
              }

              const map = tt.map({
                key: this.KEY,
                container: this.$refs.mapRef,
                center: center,
                zoom: 9
              })


              // this.allEstates.forEach(estate => {
               const markerElement = document.createElement("div")
                markerElement.id = "marker"
                const logo = new URL("../assets/marker.png", import.meta.url).href
                markerElement.style.backgroundImage = `url(${logo})`
                markerElement.style.width = "30px"
                markerElement.style.padding = ".5em"

                markerElement.style.height = "30px"
                markerElement.style.backgroundSize = "cover"
                markerElement.style.borderRadius= "20px"
               const marker = new tt.Marker({ element: markerElement, anchor: "center"})
                   .setLngLat([this.estate.address.long, this.estate.address.lat])
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
                   customPopUp.innerHTML = `<p> ${this.estate.title} </br> ${this.estate.price ? this.estate.price : "Non specificato"} </p>`
                   customPopUp.style.color = "black"
                   customPopUp.style.width = "150px"

                   // const popup = new tt.Popup({ offset: popupOffsets, closeOnMove: true }).setDOMContent(customPopUp)
                   const popup = new tt.Popup({offset: popupOffsets, closeOnMove: true}).setDOMContent(customPopUp)

                 marker.setPopup(popup)
            //  });




        },
    },
};
</script>
<template>
  <div class="container">
    <h1>{{ estate.title }}</h1>
    <div class="estate-show-img">
            <img  :src="`http://127.0.0.1:8000/storage/${estate.cover_img}`" alt="" srcset="">
            <img  v-show="estate.images" v-for="img in estate.images"  :src="`http://127.0.0.1:8000/storage/${img.path}`" alt="" srcset="">
            <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0"></div>
        </div>
        <div class="container-text">
            <div class="estate-show-txt">
             
                  <p> <span>Tipologia:</span> {{ estate.type }}</p>
                  <p> <span>&#x33A1;:</span> {{ estate.mq }}</p>
                  <p><span>Prezzo:</span>  {{ estate.price }}</p>
                  <p><span>Descrizione:</span>  {{ estate.description }}</p>
                  <p><span>Servizi:</span></p>
                  <ul id="services">
                    <li v-for="service in estate.services"> <span><i class="fa-brands fa-airbnb"></i></span>{{ service.name }}</li>
                  </ul>
             
          </div>
          <div class="additional">
            <div id='tom-map' ref="mapRef"></div>

            <div class="message-show-box">
              <input placeholder="Inserisci la tua mail" type="text">
              <textarea placeholder="Inserisci le domande per il proprietario" name="" id="" cols="30" rows="10"></textarea>
              <a class="our-btn" href="">Invia Email</a>
            </div>
          </div>
        </div>
        
  </div>
  
</template>
<style lang="scss" scoped>
@use "../styles/partials/_mixins" as *;
@use "../styles/partials/_variables" as *;


.container{

  margin: 2em auto;
  padding-bottom: 8em;
}
.estate-show-img{
  display: flex;
  padding-top: 3rem;
}
.estate-show-txt{
  padding-top: 2rem;
  width: 50%;

  p{
    font-weight: 200;
     
    span{
      font-weight: 500;
      color: $red;
    }
  }

  #services{
      margin: .3em .5em;
      @include my-flex(column, flex-start);
      height: 200px;
      flex-wrap: wrap;
      align-items: flex-start;
      @media screen and (max-width: 500px) {
                  flex-wrap: nowrap;
                 }
      li{
        margin-left: .5em !important;

        span{
          margin-right: .3em;
        }
      }
    
  }
}

.container-text{
  margin-top: 2em;
  display: flex;
  justify-content: space-between;


  @media screen and (max-width: 500px) {
                  flex-wrap: wrap;
                  }
}

.additional{
  @include my-flex(column, center);
  width: 40%;
  @media screen and (max-width: 500px) {
                  width: 100%;
                  }
#tom-map {
      margin: 0;
      height: 17em;
      width: 100%;
      border-radius: 20px;
      box-shadow: 0px 5px 5px #827b7b;
    
    }
.message-show-box{
  display: flex;
  flex-direction: column;
  // border: 1px solid $red;
  margin: 3em auto;
  width: 100%;
  border-radius: 20px;
  padding: 1em;
  background-color: $greybg;
  box-shadow: 0px 5px 5px #827b7b;


  & > *{
    margin-bottom: 1em;
    border-radius: 20px;
  }
  input{
   padding: .5em;
   font-size: 1rem;
   font-family: "Josefin Sans", sans-serif;

   width: 80%;
   text-align: center;
    margin: 0 auto 1em;
    border: none;
    background-color: white;
  }
  textarea{
   border: none;
   padding: 1em .5em;
   font-family: "Josefin Sans", sans-serif;
   font-size: 1rem;
   background-color: white;
   width: 100%;
   max-width: 100%;

  }
  a{
   margin: 0 auto;
    text-align: center;
    border: 1px solid red;
    width: 8em;
  }
}
}
</style>
