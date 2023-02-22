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
          label: "Ricerca",
          link: "/advancedSearch",
          routeName: "/advancedSearch",

        },
        // {
        //   label: "Projects",
        //   routeName: "/estates",
        //   active: false,
        // },
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
      this.closeMenu()

    },
    showMenu() {
      this.hamMenu = !this.hamMenu;
    },
    closeMenu() {
      if (this.hamMenu) {
        console.log("chiuso");
        window.addEventListener("click", this.showMenu())
      }
    }
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

      <router-link :to="{ name: 'home' }" class="logo">
        <img src="../assets/logo.png" alt="Boolking" />
        <span>Boolking</span>
      </router-link>


      <nav>
        <ul>
          <HeaderNav v-for="(item, index) in navHeaderList" :key="index" :NavItems="item">
          </HeaderNav>
          |
          <li class="external">
            <a href="http://127.0.0.1:8000/login">Login</a>
          </li>
          <li class="external">
            <a href="http://127.0.0.1:8000/register">Area Riservata</a>
          </li>
        </ul>
      </nav>
      <div class="ham-nav">

        <!-- <i v-if="!hamMenu" @click="showMenu" class="fa-solid fa-bars"></i>
                    <i v-else @click="showMenu" class="fa-solid fa-xmark"></i> -->
        <i class="fa-solid" :class="hamMenu ? 'fa-xmark' : 'fa-bars'" @click="showMenu"></i>
        <ul v-show="hamMenu">
          <HeaderNav v-for="(item, index) in navHeaderList" :key="index" :NavItems="item"></HeaderNav>
          <li class="external">
            <a href="http://127.0.0.1:8000/login">Login</a>
          </li>
          <li class="external">
            <a href="http://127.0.0.1:8000/register">Area Riservata</a>
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

    span {
      display: none;
    }

    &:hover {
      background-color: $white;
      filter: blur(0);
      height: 70px;

      span {
        display: block;
      }
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
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: .5em;

      &:hover {
        transform: scale(1.1);
        transition: 500ms;
      }

      img {
        max-width: 100%;
        object-fit: contain;
      }

      span{
        color: $red;
        font-weight: 500;
        font-size: 1.2rem;
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
        font-size: 0.8rem;

      }
    }
  }

  .ham-nav {
    display: none;
  }
}

@media screen and (max-width: 700px) {
  header {

    .logo {
      span {
        display: none;
      }
    }

    .container {
      nav {
        display: none;
      }

      .ham-nav {
        display: block;
        position: relative;
        cursor: pointer;
        background-color: inherit;
        transition: all 250ms linear;


        i,
        .fa-bars {
          transition: all 250ms linear;

        }

        i,
        .fa-xmark {
          transition: all 250ms linear;
          transform: rotate(360deg) !important;
        }

        ul {
          position: absolute;
          top: 30px;
          right: -10px;
          width: 40vw;
          min-width: 150px;
          display: flex;
          border-left: 3px solid $red;
          flex-direction: column;
          background-color: rgba(255, 255, 255, 0.594);
          padding: 1.5em 1em;
          align-items: flex-start;
          border-radius: 5px;
          transition: 200ms;
          backdrop-filter: blur(10px);

          &:hover {
            background-color: $white;
          }

          li {
            transition: all 300ms;
            font-size: .9rem;
            padding: .5em;


          }

          li:hover {
            transform: translateX(10px);
            transition: all 300ms;
            border-radius: 0 10px;

          }

        }
      }
    }
  }
}
</style>
