<script>
// import { onMounted } from "vue";
import HeaderNav from "./HeaderNav.vue";
export default {
  name: "AppHeader",
  components: {
    HeaderNav,
  },
  data() {
    return {
      navHeaderList: [
        {
          label: "home",
          link: "/home",
          routeName: "/",

        },
        {
          label: "program",
          link: "/programs",
          routeName: "/estates",

        },
        {
          label: "Projects",
          routeName: "/estates",
          active: false,
        },
        {
          label: "About",
          routeName: "/about",
          active: false,
        },
        // {
        //   label: "Login",
        //   routeName: "http://127.0.0.1:8000/login",
        //   active: false
        // },
        // {
        //   label: "Registrati",
        //   routeName: "http://127.0.0.1:8000/register",
        //   active: false
        // }

      ],
      scrollPosition: null,
      hamMenu: false,
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    showMenu() {
      this.hamMenu = !this.hamMenu;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
    console.log(1);
  },
};
</script>
<template>
  <header :class="{ faded: scrollPosition > 50 }">
    <div class="container">
      <div class="logo">
        <img src="../assets/logo.png" alt="Boolking" />
      </div>

      <nav>
        <ul>
          <HeaderNav
            v-for="(item, index) in navHeaderList"
            :key="index"
            :NavItems="item"
            
          >
          </HeaderNav>
          |
          <li class="external">
            <a href="http://127.0.0.1:8000/login">Login</a>
          </li>
          <li class="external">
            <a href="http://127.0.0.1:8000/register">Registrati</a>
          </li>
        </ul>
      </nav>
      <div class="ham-nav">
        <i @click="showMenu" class="fa-solid fa-bars"></i>
        <ul v-show="hamMenu">
          <HeaderNav
            v-for="(item, index) in navHeaderList"
            :key="index"
            :NavItems="item"
          ></HeaderNav>
          <li class="external">
            <a href="http://127.0.0.1:8000/login">Login</a>
          </li>
          <li class="external">
            <a href="http://127.0.0.1:8000/register">Registrati</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

header {
  position: fixed;
  height: 70px;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: $white;
  width: 100%;

  &.faded {
    background-color: rgba(255, 255, 255, 0.594);
    transition: 500ms;
    backdrop-filter: blur(10px);
    height: 40px;
    box-shadow: 1px 1px 5px rgb(193, 185, 185);

    &:hover {
      background-color: $white;
      filter: blur(0);
      height: 70px;
    }

    .container {
      justify-content: space-between;
      padding: 0;
    }
  }
  .container {
    padding: 1em 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .logo {
      width: 2em;
      transition: 500ms;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
        transition: 500ms;
      }
      img {
        max-width: 100%;
        object-fit: contain;
      }
    }

    nav {
      width: 70%;
    }

    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      gap: 1em;
      color: $gray;

      li {
        color: black;
        position: relative;
        cursor: pointer;
      }
      .external {
        // font-size: .9rem;
        color: $gray;
        text-transform: uppercase;
        font-weight: light;
        font-size: 0.7rem;
       
      }
    }
  }

  .ham-nav {
    display: none;
  }
}

@media screen and (max-width: 800px) {
  header {
    .container {
      nav {
        display: none;
      }

      .ham-nav {
        display: block;
        position: relative;
        cursor: pointer;
        background-color: inherit;

        ul {
          position: absolute;
          top: 40px;
          right: -10px;
          width: 50vw;
          min-width: 130px;
          display: flex;
          border-left: 5px solid $red;
          flex-direction: column;
          background-color: rgba(255, 255, 255, 0.594);
          padding: 2em 1em;
          align-items: flex-start;
          border-radius: 5px;
          transition: 200ms;
          backdrop-filter: blur(10px);

          &:hover {
            background-color: $white;
          }
          li{
            transition: all 300ms;

          }
          li:hover{
            transform: translateX(10px);
            transition: all 300ms;
          }
          
        }
      }
    }
  }
}
</style>
