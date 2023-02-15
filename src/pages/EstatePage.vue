
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
      images: [],
      currentSlider : 0,
      track: null

    };
  },
  created() {
    this.callApiEstate();
  },
  mounted(){

                  // main
                  const estateImgDiv = document.getElementsByClassName("estate-show-img");
                  //thumbnail
                  // const track = document.getElementById("image-track");
                  // console.log(track);

                  const track = this.$refs.track 

                  const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

                  const handleOnUp = () => {
                    track.dataset.mouseDownAt = "0";
                    track.dataset.prevPercentage = track.dataset.percentage;
                  };

                  const handleOnMove = (e) => {
                    if (track.dataset.mouseDownAt === "0") return;

                    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
                      maxDelta = window.innerWidth / 2;

                    const percentage = (mouseDelta / maxDelta) * -100,
                      nextPercentageUnconstrained =
                        parseFloat(track.dataset.prevPercentage) + percentage,
                      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

                    track.dataset.percentage = nextPercentage;

                    track.animate(
                      {
                        transform: `translate(${nextPercentage}%, -50%)`,
                      },
                      { duration: 1200, fill: "forwards" }
                    );

                    for (const image of track.getElementsByClassName("thumb-image")) {
                      image.animate(
                        {
                          objectPosition: `${100 + nextPercentage}% center`,
                        },
                        { duration: 1200, fill: "forwards" }
                      );
                    }
                  };

                  window.onmousedown = (e) => handleOnDown(e);

                  window.ontouchstart = (e) => handleOnDown(e.touches[0]);

                  window.onmouseup = (e) => handleOnUp(e);

                  window.ontouchend = (e) => handleOnUp(e.touches[0]);

                  window.onmousemove = (e) => handleOnMove(e);

                  window.ontouchmove = (e) => handleOnMove(e.touches[0]);

                  // display images
                  // for (let index = 0; index < this.images.length; index++) {
                  //   const currentImage = imgs[index];

                  //   const element = ` <img
                  //         class="main-image"
                  //         src="${currentImage}"
                  //         draggable="false"
                  //       />`;

                  //   const thumbImage = ` <img
                  //         class="thumb-image"
                  //         src="${currentImage}"
                  //         draggable="false"
                  //       />`;

                  //   estateImgDiv.innerHTML += element;
                  //   track.innerHTML += thumbImage;
                  // }

                  //starting point

                  const mainImages = document.getElementsByClassName("main-image");
                  const thumbImages = document.getElementsByClassName("thumb-image");

                  // mainImages[this.currentIndex].classList.add("active");

                  //Thumbnail imgs nav
                  for (let index = 0; index < thumbImages.length; index++) {
                    const thisThumb = thumbImages[index];

                    // thisThumb.addEventListener("click", function () {
                    //   mainImages[this.currentIndex].classList.remove("active");
                    //   currentIndex = index;
                    //   mainImages[this.currentIndex].classList.add("active");
                    // });
                  }

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
        this.images.push(this.estate.cover_img);

        this.estate.images.forEach(img => {
          
          this.images.push(img.path);
        });
        console.log(this.images);

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
    showNext: function () {
      if (this.currentSlider < this.slides.length - 1) {
        this.currentSlider++;
      } else {
        this.currentSlider = 0;
      }
    },
    showPrev: function () {
      if (this.currentSlider > 0) {
        this.currentSlider--;
      } else {
        this.currentSlider = this.slides.length - 1;
      }
    },
    showThumbImg(clickedImg) {
      this.currentSlider = clickedImg;
    },

    },
};
</script>
<template>
  <div class="container">
    <h1>{{ estate.title }}</h1>
    <div class="estate-show-img">
     

      <div class="main-image" :class="currentSlider ? 'active' : 'active'"  :src="`http://127.0.0.1:8000/storage/${images[currentSlider]}`" draggable="false" ></div>
      
            <div id="image-track" ref="track" data-mouse-down-at="0" data-prev-percentage="0">
              <div class="thumb-image"   v-for="img, key in images" :key="key" :src="`http://127.0.0.1:8000/storage/${img}`" draggable="false"></div>
            
            </div>
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
    position: relative;
    overflow-x: hidden;

      .main-image {
      width: 100%;
      height: 500px;
      object-fit: cover;
      display: none;
      border: 1px solid red;
      overflow-x: hidden;
    }

    .active {
      display: block !important;
    }

    #image-track {
      display: flex;
      gap: 2vmin;
      position: absolute;
      left: 50%;
      bottom: 0%;
      /* original 
      top: 50%; */
      width: 100%;
      border: 1px solid green;
      transform: translate(-50%, -50%);
      transition: all 1500ms;
      user-select: none; /* --  image highlighting -- */
      height: 100px;
      overflow-x: hidden;
      /* border: 1px solid red; */
    }

      // #image-track:hover {
      //   top: 95%;
      // }

      #image-track > .thumb-image {
        /* original
        width: 40vmin;
        height: 56vmin; */
        width: 30vmin;
        height: 35vmin;
        object-fit: cover;
        object-position: 100% center;
        border-radius: 5px;
        box-shadow: 2px 9px 20px black;
      }


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
