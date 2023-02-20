<script>
import { store } from "./store"

//COMPONENTS

import AppHeader from "./components/AppHeader.vue";
export default {
  components: {
    AppHeader,

  },
  data() {
    return {
      store
    };
  },
  mounted() {
    this.getClientIp().then(ip => {
      this.store.ipAddress = ip;
    }).catch(error => {
      console.error(error);
    });

  },
  methods: {
    getClientIp() {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.ipify.org/?format=json');
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText).ip);
          } else {
            reject('Failed to get IP address');
          }
        };
        xhr.onerror = () => {
          reject('Failed to get IP address');
        };
        xhr.send();
      });
    },
  }
};
</script>

<template>
  <AppHeader></AppHeader>
  <main>

    <router-view></router-view>

  </main>
</template>

<style lang="scss">
@use "./styles/general.scss" as *;
@use "./styles/partials/variables" as *;

main {
  padding: 70px 0 0 0;
  margin-bottom: 2em;
}
</style>
