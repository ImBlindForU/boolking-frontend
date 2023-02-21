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
            404 - Not
            <span class="fancy">Found</span>      
        </h2>
        </div>
        <div id="right-side" class="side">
        <h2 class="title">
            404 - Not
            <span class="fancy">Found</span>     
  </h2>
</div>
</template>
<style lang="css">
    :root {
  --dark: rgb(20, 20, 20);
  
  
  --c1: #ff5a60;
  --c2: rgb(255, 255, 255);
  
  --left-color: var(--c1);
  --right-color: var(--c2);
}

/* body {  
  background-color: var(--dark);
  margin: 0px;
} */

.side {
  display: grid;
  height: 100vh;
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
  background-color: var(--left-color);
  width: 60%;
  z-index: 2;
}

#left-side .title {  
  color: white;  
}

#left-side .fancy {
  color: var(--dark);
}

#right-side {
  background-color: var(--right-color);
}

#right-side .title {
  color: var(--dark);
}

#right-side .fancy {
  color: var(--c1);
}


</style>