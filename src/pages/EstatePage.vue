
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
        clickable: true,
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
            slidesPerView: 3
        }
    }
});
  },
  methods: {
    callApiEstate() {
      const currentSlug = this.$route.params.slug;
      axios.get(this.store.backEndURL + "/" + currentSlug).then(resp => {
        if (resp.data.success) {
          this.estate = resp.data.results;
          console.log(this.estate);
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
      customPopUp.innerHTML = `<p> ${this.estate.title} </br> ${this.estate.price ? this.estate.price : "Non specificato"} </p>`
      customPopUp.style.color = "black"
      customPopUp.style.width = "150px"

      // const popup = new tt.Popup({ offset: popupOffsets, closeOnMove: true }).setDOMContent(customPopUp)
      const popup = new tt.Popup({ offset: popupOffsets, closeOnMove: true }).setDOMContent(customPopUp)

      marker.setPopup(popup)
      //  });




    },

    sendForm() {
      this.processing = true;

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



      })
    },


  },
};
</script>
<template>
  <div class="container">
    <h1>{{ estate.title }}</h1>
    <div class="estate-show-img">
      <!-- <img :src="`http://127.0.0.1:8000/storage/${estate.cover_img}`" alt="" srcset="">
      <img v-show="estate.images" v-for="img in estate.images" :src="`http://127.0.0.1:8000/storage/${img.path}`" alt=""
        srcset="">
      <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0"></div> -->
      <section id="slider-2">
        <div class="container wide">
            <div class="swiper" id="swiper-2">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <figure >
                      
                      <img :src="`http://127.0.0.1:8000/storage/${estate.cover_img}`">
                      
                    </figure>
                  </div> 
                  <div  v-for="(img, index) in estate.images" class="swiper-slide" >
                    <figure >
                      
                      <img :id="index" :src="`http://127.0.0.1:8000/storage/${img.path}`">
                      
                    </figure>
                  </div> 
                </div>
              <!-- <div class="swiper-custom-nav">
                  <svg width="64" height="64" viewBox="0 0 64 64" id="nav-left" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M32 2.79753e-06C14.3269 4.34256e-06 -4.34256e-06 14.3269 -2.79753e-06 32C-1.2525e-06 49.6731 14.3269 64 32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 1.2525e-06 32 2.79753e-06ZM28.9334 24.3999C28.6667 24.1333 28.4 23.9999 28 23.9999C27.6 23.9999 27.3334 24.1333 27.0667 24.3999L20.4 31.0666L20.4 31.0667C20.2 31.2667 20.075 31.5041 20.025 31.751C19.9417 32.1624 20.0666 32.6 20.4 32.9333L27.0667 39.6C27.6 40.1333 28.4 40.1333 28.9333 39.6C29.4667 39.0667 29.4667 38.2667 28.9333 37.7333L24.5334 33.3334L42.7222 33.3334C43.4889 33.3334 44 32.8 44 32C44 31.2 43.4889 30.6667 42.7222 30.6667L24.5333 30.6667L28.9334 26.2666C29.4667 25.7333 29.4667 24.9333 28.9334 24.3999Z" fill="white"/>
                  </svg>

                  <svg width="64" height="64" viewBox="0 0 64 64" id="nav-right" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM35.0666 39.6001C35.3333 39.8667 35.6 40.0001 36 40.0001C36.4 40.0001 36.6666 39.8667 36.9333 39.6001L43.6 32.9334L43.6 32.9333C43.8 32.7333 43.925 32.4959 43.975 32.249C44.0583 31.8376 43.9334 31.4 43.6 31.0667L36.9333 24.4C36.4 23.8667 35.6 23.8667 35.0667 24.4C34.5333 24.9333 34.5333 25.7333 35.0667 26.2667L39.4666 30.6666H21.2778C20.5111 30.6666 20 31.2 20 32C20 32.8 20.5111 33.3333 21.2778 33.3333H39.4667L35.0666 37.7334C34.5333 38.2667 34.5333 39.0667 35.0666 39.6001Z" fill="white"/>
                  </svg>
              </div>   -->
              </div>
              
              </div>
            </section> <!-- end swiper-wrapper -->
            
          </div>
          <div class="container-text">
            <div class="estate-show-txt">
      
              <p> <span>Tipologia:</span> {{ estate.type }}</p>
              <p> <span>&#x33A1;:</span> {{ estate.mq }}</p>
              <p><span>Prezzo:</span> {{ estate.price }}</p>
              <p><span>Descrizione:</span> {{ estate.description }}</p>
              <p><span>Servizi:</span></p>
              <ul id="services">
                <li v-for="service in estate.services"> <span><i class="fa-brands fa-airbnb"></i></span>{{ service.name }}</li>
              </ul>
      
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
                  <textarea name="message" id="message"  v-model="message" placeholder="Messaggio" cols="30"
                    rows="10"></textarea>
                  <!-- <p class="error" v-if="errors.message">
                                        {{ errors.message[0] }}
                                    </p> -->
                                    <button class="btn" :class="processing ? 'loading' : ''">
                                  <i class='fa-solid fa-paper-plane'></i>
                                  <span class="text">
                                    Send Message
                                  </span>
                                  <span class="loading-animate"></span>
                                </button>
                                          </form>
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

  .swiper-wrapper{
    width: 100%;
    position: relative;
  }
.swiper-slide img {
    display: block;
    width: 700px;
    height: 20rem;
    object-fit: cover;
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


@media screen and (max-width: 800px) {
    .swiper-slide img {
        height: 20rem;
    }
    .swiper-custom-nav {
        display: none;
    }
}
// }

.estate-show-txt {
  padding-top: 2rem;
  width: 50%;

  p {
    font-weight: 200;

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

      span {
        margin-right: .3em;
      }
    }

  }
}

.container-text {
  margin-top: 2em;
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
        background:$red;
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
        height: 35px;
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
        width: 25px;
        height: 25px;
        z-index: 100;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) ;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        opacity: 0;
        transition: all .25s ease;
    }
    .loading-animate:after {
        content: '';
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-left: 3px solid #fff;
        animation: loading infinite .8s ease .05s;
        position: absolute;
    }
    .loading-animate:before {
        content: '';
        width: 25px;
        height: 25px;
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
