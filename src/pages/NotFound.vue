<script>
export default {
    name: "NotFound",
    data(){
        return{

        }
    },
    mounted(){
        const left = document.getElementById("left-side");

        const handleMove = e => {
        left.style.width = `${e.clientX / window.innerWidth * 100}%`;
        }

        document.onmousemove = e => handleMove(e);

        document.ontouchmove = e => handleMove(e.touches[0]);
            },
    created(){

    }
}
</script>
<template>
   <div id="left-side" class="side">
     <h2 class="title">
          4<i class="fa-brands fa-airbnb"></i>4 - Not
            <span class="fancy">Found</span>      
        </h2>
        </div>
        <div id="right-side" class="side">
          <h2 class="title">
          4<i class=" fa-brands fa-airbnb"></i>4 - Not
            <span class="fancy">Found</span>     
  </h2>
</div>
</template>
<style lang="css" scoped>


.side {
  display: grid;
  height: 95vh;
  overflow: hidden;
  place-items: center;
  position: absolute;
  width: 100%;
}

.side .title {
  /* font-family: "Rubik", sans-serif; */
  font-size: 8vw;
  margin: 0px 10vw;
  width: 80vw;
  text-align: center;
}

.side .fancy {
  font-family: "Lobster", cursive;
  font-size: 1.3em;
  line-height: 0.8em;
}

#left-side {
  background-color: #ff5a60;
  width: 60%;
  z-index: 2;
}

#left-side .title {  
  color: white;  
}

#left-side .fancy {
  color: black;
}

#right-side {
  background-color: white;
}

#right-side .title {
  color: black;
}

#right-side .fancy {
  color: #ff5a60;
}


</style>