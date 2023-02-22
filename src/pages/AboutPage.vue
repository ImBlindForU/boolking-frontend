<script>
export default {
    name: "AboutPage",
    data(){
        return{

        }
    },
    methods: {
        getImgPath(imgName, format){
            return new URL(`../assets/us/${imgName}.${format}`, import.meta.url).href
        },
        animate() {
          const timeline = gsap.timeline({ defaults: { duration: .5, } });
          timeline
            .from("#first", { opacity: 0, x: "-200%", ease: "ease.Out" })
            .from("#second", { opacity: 0, x: "+200%", ease: "ease.Out", stagger: .1 })
            .from("#third", { opacity: 0, x: "+200%", ease: "ease.Out", stagger: .1 })
            .from("#fourth", { opacity: 0, x: "-200%", ease: "ease.Out" })
         }
    },
    mounted(){
        const wrapper = document.getElementById("wrapper");

        this.animate();

                const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

                const uniqueRand = (min, max, prev) => {
                let next = prev;

                while (prev === next) next = rand(min, max);

                return next;
                };

                const combinations = [
                { configuration: 1, roundness: 1 },
                { configuration: 1, roundness: 2 },
                { configuration: 1, roundness: 4 },
                { configuration: 3, roundness: 2 },
                { configuration: 3, roundness: 3 },
                { configuration: 3, roundness: 3 },
                { configuration: 2, roundness: 2 },
                { configuration: 2, roundness: 3 },
                { configuration: 2, roundness: 4 },
                { configuration: 2, roundness: 1 },
                ];

                let prev = 0;

                setInterval(() => {
                const index = uniqueRand(0, combinations.length - 1, prev),
                    combination = combinations[index];

                wrapper.dataset.configuration = combination.configuration;
                wrapper.dataset.roundness = combination.roundness;

                prev = index;
                }, 2000);

                // wrapper.dataset.configuration =2;
                // wrapper.dataset.roundness = 4;
    }
}
</script>
<template>
    <div class="container">
        <h1>About Us</h1>
        <p>Boolking nasce come progetto finale del #team7 della classe #73 di Boolean. L'intento era quello di sviluppare una piattaforma, in chiaro stile Airbnb, che permettesse agli utenti di registrarsi, inserire, sponsorizzare e mettere in mostra le loro proprietà, permettendo agli utenti visitatori di navigare, cercare la soluzione più adatta alle loro esigenze e di contattare i proprietari attraverso un canale di comunicazione privilegiato. Il progetto si articola in due macro sezioni, Front-End e Back-End, ed è stato realizzato attraverso l'uso di tecnologie apprese durante di sei mesi di corso.<br><br> I componenti del team ed i responsabili del progretto sono:</p>
        <div id="wrapper" data-configuration="1" data-roundness="5"> 
      <div  id="first" class="shape"><div class="img">
        <a href="https://github.com/BetterCallAle">
            <img :src="getImgPath('alessio', 'png')" alt="" srcset="">
        </a>
      </div> </div>
      <div id="second"  class="shape"><div class="img">
        <a href="https://github.com/FabrizioMisseri">
            <img :src="getImgPath('fabrizio', 'jpg')" alt="" srcset="">
        </a>
      </div></div>
      <div id="third" class="shape"><div class="img">
        <a href="https://github.com/ImBlindForU">
            <img :src="getImgPath('samuele', 'jpeg')" alt="" srcset="">
        </a>
      </div></div>
      <div  id="fourth" class="shape"><div class="img">
        <a href="https://github.com/reistence">
            <img :src="getImgPath('valerio', 'jpeg')" alt="" srcset="">
        </a>

      </div></div>
     
    </div>

    </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/_mixins" as *;
@use "../styles/partials/_variables" as *;

.container{
  @include my-container;
  height: 80vh;
//   width: 100vw;
  display: grid;
  place-items: center;
  margin: 0px auto 2em;
//   overflow: hidden;
}

h1{
  margin: .5em 0;
}


#wrapper {
  aspect-ratio: 1.618;
  width: 90vmin;
  position: relative;
  margin-top: 1em;
}

#wrapper > .shape {
  height: 30%;
  width: 30%;
  margin: 0 auto;
  background-color: rgb(239, 78, 78);
  position: absolute;
  transition: left, top, height, width, border-radius;
  transition-duration: 750ms;
  transition-timing-function: ease-in-out;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}


.shape > div{
//   background-color: black;
  width: 5em;
  height: 5em;
  border-radius: 50%;

   a > img{
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}



#wrapper > .shape:nth-child(1) {
  background-color: rgb(239, 78, 78);
  z-index: 2;
}

#wrapper > .shape:nth-child(2) {
  background-color: rgb(239, 78, 78);
  z-index: 2;
}

#wrapper > .shape:nth-child(3) {
  background-color: rgb(239, 78, 78);
  z-index: 1;
}

#wrapper > .shape:nth-child(4) {
  background-color: rgb(239, 78, 78);
  z-index: 2;
}

#wrapper > .shape:nth-child(5) {
  background-color: rgb(239, 78, 78);
  z-index: 2;
}

#wrapper > .shape:nth-child(6) {
  background-color: rgb(239, 78, 78);
  z-index: 2;
}

#wrapper > .shape:nth-child(7) {
  background-color: rgb(239, 78, 78);
  z-index: 2;
}

#wrapper[data-configuration="1"] > .shape:nth-child(1) {
  left: 0%;
  top: 0%;
  height: 50%;
  width: 40%;
}

#wrapper[data-configuration="1"] > .shape:nth-child(2) {
  left: 40%;
  top: 0%;
  height: 50%;
  width: 40%;
}

#wrapper[data-configuration="1"] > .shape:nth-child(3) {
  left: 50%;
  top: 50%;
  height: 50%;
  width: 40%;
}

#wrapper[data-configuration="1"] > .shape:nth-child(4) {
  left: 10%;
  top: 50%;
  height: 50%;
  width: 40%;
}



#wrapper[data-configuration="3"] > .shape:nth-child(1) {
  left: 0%;
  top: 55%;
  height: 50%;
  width: 50%;
}

#wrapper[data-configuration="3"] > .shape:nth-child(2) {
  left: -5%;
  top: 2.7%;
  height: 55%;
  width: 44%;
}

#wrapper[data-configuration="3"] > .shape:nth-child(3) {
  left: 38%;
  top: 5%;
  height: 50%;
  width: 50%;
}

#wrapper[data-configuration="3"] > .shape:nth-child(4) {
  left: 50%;
  top: 55%;
  height: 55%;
  width: 44%;
}
#wrapper[data-configuration="2"] > .shape:nth-child(1) {
  left: 25%;
  top: 0%;
  height: 25%;
  width: 50%;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  gap: 1em;

  @media screen and (max-width: 516px ) {
        
    & > .img {
        width: 3em;
        height: 3em;
    }
  }
}

#wrapper[data-configuration="2"] > .shape:nth-child(2) {
  left: 25%;
  top: 25%;
  height: 25%;
  width: 50%;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  gap: 1em;

  @media screen and (max-width: 516px ) {
        
        & > .img {
            width: 3em;
            height: 3em;
        }
      }
}

#wrapper[data-configuration="2"] > .shape:nth-child(3) {
  left: 25%;
  top: 50%;
  height: 25%;
  width: 50%;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  gap: 1em;

  @media screen and (max-width: 516px ) {
        
        & > .img {
            width: 3em;
            height: 3em;
        }
      }
}

#wrapper[data-configuration="2"] > .shape:nth-child(4) {
  left: 25%;
  top: 75%;
  height: 25%;
  width: 50%;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
  @media screen and (max-width: 516px ) {
        
        & > .img {
            width: 3em;
            height: 3em;
        }
      }
}



#wrapper[data-roundness="1"] > .shape {
  border-radius: 6rem;
}

#wrapper[data-roundness="2"] > .shape {
  border-radius: 0rem;
}

#wrapper[data-roundness="3"] > .shape {
  border-radius: 30rem;
}

#wrapper[data-roundness="4"] > .shape:nth-child(1) {
  border-bottom-left-radius: 10rem;
}

#wrapper[data-roundness="4"] > .shape:nth-child(2) {
  /* border-radius: 20rem; */
  border-top-left-radius: 10rem;

}

#wrapper[data-roundness="4"] > .shape:nth-child(3) {
  border-top-right-radius: 12rem;
}

#wrapper[data-roundness="4"] > .shape:nth-child(4) {
  /* border-top-right-radius: 10rem; */
  border-bottom-right-radius: 10rem;
}







</style>