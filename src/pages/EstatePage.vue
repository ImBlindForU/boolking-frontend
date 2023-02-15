
<script>
import axios from 'axios';
import { store } from '../store';

export default {
  name: "EstatePage",
  data() {
    return {
      store,
      estate: {},
    };
  },
  created() {
    this.callApiEstate();
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
      })
    }
    },
};
</script>
<template>
  <div class="container">
    <div class="estate-show-img">
            <img  :src="`http://127.0.0.1:8000/storage/${estate.cover_img}`" alt="" srcset="">
            <img  v-show="estate.images" v-for="img in estate.images"  :src="`http://127.0.0.1:8000/storage/${img.path}`" alt="" srcset="">
        </div>
        <div class="container-text">
            <div class="estate-show-txt">
              <div>
                  <h5>{{ estate.title }}</h5>
                  <p>Tipologia: {{ estate.type }}</p>
                  <p>&#x33A1;: {{ estate.mq }}</p>
                  <p>Prezzo: {{ estate.price }}</p>
              </div>
          </div>
          <div class="message-show-box">
            <input placeholder="Inserisci la tua mail" type="text">
            <textarea placeholder="Inserisci le tue domande" name="" id="" cols="30" rows="10"></textarea>
            <a class="our-btn" href="">Invia Email</a>
          </div>
        </div>
        
  </div>
  
</template>
<style lang="scss" scoped>
@use "../styles/partials/_mixins" as *;
@use "../styles/partials/_variables" as *;

.estate-show-img{
  display: flex;
  padding-top: 3rem;
}
.estate-show-txt{
  padding-top: 2rem;
}

.container-text{
  display: flex;
  justify-content: space-around;
}
.message-show-box{
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  textarea{
    margin-top: 1rem;
  }
  a{
    margin-top: 1rem;
    text-align: center;
    border: 1px solid red;
  }
}
</style>
