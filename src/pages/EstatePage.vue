
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
      name: "",
      email: "",
      message: "",
      processing: false,
      loader: false,
      sent: false,
    };
  },
  created() {
    this.callApiEstate();
  },
  mounted() {
    new Swiper("#swiper-2", {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 24,
      pagination: {
        el: ("#swiper-2 .swiper-custom-pagination"),
        clickable: false,
        // renderBullet: function (index, className) {
        // return `<div class=${className}>
        //     <span class="number">${index + 1}</span>
        //     <span class="line"></span>
        //     </div>`;
        // }
      },
      lazyLoading: true,
      loop: true,
      keyboard: {
        enabled: true,
      },
      navigation: {
        nextEl: "#nav-right",
        prevEl: "#nav-left"
      },
      breakpoints: {
        800: {
          slidesPerView: 1.5
        },
        1400: {
          slidesPerView: 1.5
        }
      }
    });


  },
  methods: {
    callApiEstate() {
      const currentSlug = this.$route.params.slug;
      this.loader = false
      axios.get(this.store.backEndURL + "/" + currentSlug).then(resp => {
        if (resp.data.success) {
          this.estate = resp.data.results;
          this.loader = !this.loader;

          const options = {
            guest_ip: this.store.ipAddress,
            estate_id: this.estate.id,
          }
          console.log(this.store.ipAddress);
          const firstTime = localStorage.getItem("first_time");

          // if (!firstTime) {
          axios.post(`${this.store.viewsURL}`, options).then(resp => {
            console.log(resp.data);
          })

          // } else{
          //   console.log("bho");
          // }


        } else {
          this.$router.push({ name: 'Not-Found' })
        }


        this.initializeMap();



      })
    },
    initializeMap() {
      // this.$refs.mapRef.innerHTML = ""
      let center = [];

      if (this.estate) {
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
      markerElement.style.borderRadius = "20px"
      const marker = new tt.Marker({ element: markerElement, anchor: "center" })
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
      customPopUp.innerHTML = `<p> <a href="/estates/${this.estate.slug}"> ${this.estate.title}</a>  </br> ${this.estate.price ? this.estate.price : "Non specificato"} </p>`
      customPopUp.style.color = "black"
      customPopUp.style.width = "150px"

      // const popup = new tt.Popup({ offset: popupOffsets, closeOnMove: true }).setDOMContent(customPopUp)
      const popup = new tt.Popup({ offset: popupOffsets, closeOnMove: true }).setDOMContent(customPopUp)

      marker.setPopup(popup)
      //  });

    },

    sendForm() {
      this.processing = true;
      this.sent = false;

      const data = {
        name: this.name,
        email: this.email,
        message: this.message,
        estate_id: this.estate.id,
      }
      axios.post(`${this.store.leadsURL}`, data).then(resp => {
        this.success = resp.data.success;

        if (this.success) {
          this.name = "",
            this.email = "",
            this.message = ""

        } else {
          this.errors = resp.data.errors
        }

        setTimeout(() => {
          this.processing = false;
        }, 1000);

        this.sent = true;

      })
    },



    // updateViews(){

    // }


  },
  computed: {
    imgPath() {
      if (this.estate.cover_img.includes('cover/')) {
        return `http://127.0.0.1:8000/storage/${this.estate.cover_img}`
      } else {
        return this.estate.cover_img
      }
    }
  }
}
</script>
<template>
  <div class="container">
    <h1>{{ estate.title }}</h1>
    <div class="estate-show-img">
      <section id="slider-2">
        <div class="wide">
          <div class="swiper" id="swiper-2">
            <div class="swiper-wrapper">
              <div v-if="estate.cover_img" class="swiper-slide">
                <figure>

                  <img :src="imgPath">

                </figure>
              </div>
              <div v-show="estate.images" v-for="(img, index) in estate.images" class="swiper-slide">
                <figure>

                  <img :id="index" :src="`http://127.0.0.1:8000/storage/${img.path}`">

                </figure>
              </div>
            </div>
          </div>

        </div>
      </section> <!-- end swiper-wrapper -->

    </div>
    <div class="container-text">
      <div class="estate-show-txt">

        <p> <span>Tipologia:</span> {{ estate.type }}</p>
        <p> <span>Metri Quadri:</span> {{ estate.mq }}&#x33A1;</p>
        <p v-if="estate.price"><span>Prezzo:</span> €{{ estate.price }} a notte</p>
        <p v-if="estate.room_number"><span>Stanze:</span> {{ estate.room_number }}</p>
        <p v-if="estate.bed_number"><span>Camere da letto:</span> {{ estate.bed_number }}</p>
        <p v-if="estate.bathroom_number"><span>Bagni:</span> {{ estate.bathroom_number }}</p>
        <p v-if="estate.description"><span>Descrizione:</span> {{ estate.description }}</p>
        <div v-if="loader">
          <div v-if="estate.services.length > 0">
            <p><span>Servizi:</span></p>
            <ul id="services">
              <li v-for="(service, key) in estate.services" :key="key"> <span><i class="fa-brands fa-airbnb"></i></span>{{
                service.name }}</li>
            </ul>
          </div>
        </div>

      </div>
      <div class="additional">
        <div id='tom-map' ref="mapRef"></div>

        <div class="message-show-box">
          <form @submit.prevent="sendForm()" action="" method="POST">
            <input name="name" id="name" required v-model="name" placeholder="Nome" type="text">
            <!-- <p class="error" v-if="errors.name">
                                          {{ errors.name[0] }}
                                        </p> -->
            <input name="email" id="email" required v-model="email" placeholder="Email" type="text">
            <!-- <p class="error" v-if="errors.email">
                                          {{ errors.email[0] }}
                                        </p> -->
            <textarea name="message" required id="message" v-model="message" placeholder="Messaggio" cols="30"
              rows="10"></textarea>
            <!-- <p class="error" v-if="errors.message">
                                            {{ errors.message[0] }}
                                        </p> -->
            <button class="btn" :class="processing ? 'loading' : ''">
              <i class='fa-solid fa-paper-plane'></i>
              <span class="text">
                Invia Messaggio
              </span>
              <span class="loading-animate"></span>
            </button>
          </form>
          <p  v-show="sent" >Messaggio inviato</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "../styles/partials/_mixins" as *;
@use "../styles/partials/_variables" as *;


.container {

  margin: 2em auto;
  padding-bottom: 8em;
}

// .estate-show-img {
//   display: flex;
//   padding-top: 3rem;


/* Swiper */
.swiper {
  margin-top: 1em;
 
}

figure {
  padding-bottom: 3em;
}

.swiper-wrapper {
  width: 100%;
  position: relative;

}

.swiper-slide img {
  display: block;
  width: 900px;
  height: 25rem;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0px 10px 5px #827b7b;



}

.swiper-slide figure {
  position: relative;
  margin: 0;
  overflow: hidden;
}


.swiper-slide-active figcaption {
  transform: translate3d(-50%, 0, 0);
  opacity: 1;
}

.swiper-slide figcaption img {
  width: auto;
  height: auto;
  object-fit: contain;

}

#swiper-1 .swiper-pagination {
  bottom: 2rem;
}




.swiper-custom-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -10px;
  z-index: 10;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  width: 650px;
}

.swiper-custom-nav svg {
  cursor: pointer;
  opacity: .6;
  transition: all .3s ease-in-out;
}

.swiper-custom-nav svg:hover {
  opacity: 1;
}




.estate-show-txt {
 
  width: 50%;

  p {
    font-weight: 200;
    margin-bottom: .5em;

    span {
      font-weight: 500;
      color: $red;
    }
  }

  #services {
    margin: .3em .5em;
    @include my-flex(column, flex-start);
    height: 200px;
    flex-wrap: wrap;
    align-items: flex-start;

    @media screen and (max-width: 500px) {
      flex-wrap: nowrap;
    }

    li {
      margin-left: .5em !important;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      span {
        margin-right: .3em;
        font-size: .4rem;
       
        
      }
    }

  }
}

.container-text {
 
  display: flex;
  justify-content: space-between;


  @media screen and (max-width: 500px) {
    flex-wrap: wrap;
  }
}

.additional {
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
    // box-shadow: 0px 5px 5px #827b7b;
    transition: all 200ms;

    &:hover {
      box-shadow: 0px 5px 5px #827b7b;
      transition: all 200ms;

    }
  }

  .message-show-box {
    display: flex;
    flex-direction: column;
    // border: 1px solid $red;
    margin: 3em auto;
    width: 100%;
    border-radius: 20px;
    padding: 1em;
    background-color: $greybg;
    transition: all 200ms;

    p{
      color: green;
      text-align: center;
      margin: .3em auto;
    }

    &:hover {
      box-shadow: 0px 5px 5px #827b7b;
      transition: all 200ms;

    }

    form {
      display: flex;
      flex-direction: column;
      width: 100%;

      &>* {
        margin-bottom: 1em;
        border-radius: 20px;
      }

      input {
        padding: .5em;
        font-size: 1rem;
        font-weight: 400;
        font-family: "Josefin Sans", sans-serif;
        border-radius: 15px;
        color: black !important;

        width: 100%;
        //  text-align: center;
        margin: 0 auto 1em;
        border: none;
        background-color: white;
      }

      textarea {
        border: none;
        font-weight: 400;

        padding: 1em .5em;
        font-family: "Josefin Sans", sans-serif;
        font-size: 1rem;
        background-color: white;
        width: 100%;
        max-width: 100%;
        color: black !important;

      }

      // button {
      //   margin: 0 auto;
      //   text-align: center;
      //   border: 1px solid red;
      //   width: 8em;



      .btn {
        margin: 0 auto;
        text-align: center;
        justify-self: center;
        background: $red;
        border: 0px solid $red;
        border-radius: 35px;
        font-size: .8rem;
        font-weight: 200;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        outline: none;
        transition: all .25s ease;
        width: 80%;
        position: relative;
        height: 50px;
        overflow: hidden;
      }

      .btn:not(.loading):hover {
        box-shadow: 0px 10px 25px 0px #827b7b8a;
      }

      .btn:not(.loading):hover i {
        transform: translate(7px);
      }

      .btn i {

        font-size: 1rem;
        position: absolute;
        left: 20px;
        pointer-events: none;
        z-index: 10;
        background: inherit;
        // width: 60px;
        // height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-radius: 50%;
        transition: all .25s ease;
      }

      .btn .text {
        width: 60%;
        display: block;
        position: relative;
        pointer-events: none;
        transition: all .25s ease;
        position: absolute;
        left: 55px;
      }

      .loading-animate {
        position: absolute;
        width: 30px;
        height: 30px;
        z-index: 100;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        opacity: 0;
        transition: all .25s ease;
      }

      .loading-animate:after {
        content: '';
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-left: 3px solid #fff;
        animation: loading infinite .8s ease .05s;
        position: absolute;
      }

      .loading-animate:before {
        content: '';
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-left: 3px solid #fff;
        animation: loading infinite .8s linear;
        position: absolute;
        opacity: .6;
      }

      .btn.loading {
        width: 60px;
      }

      .btn.loading i {
        // transform: rotate(-30deg);
        padding-bottom: 4px;
        padding-left: 3px;
      }

      .btn.loading .text {
        transform: translate(-140px);
      }

      .btn.loading .loading-animate {
        opacity: 1;
      }

      @keyframes loading {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }




    }


  }

  // }
}
</style>
