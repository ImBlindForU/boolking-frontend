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
        },
        {
          label: "pages",
          link: "/pages",
        },
        {
          label: "program",
          link: "/programs",
        },
        {
          label: "Home",
          routeName: "/",
          active: false,
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
        {
          label: "Contact us",
          routeName: "/contact-us",
          active: false
        }
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
          <li class="lens">
            <i class="fa-solid fa-magnifying-glass"></i>
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
      li:last-child {
        font-size: 1rem;
        color: $gray;
        transition: 300ms;

        &:hover {
          transform: scale(1.1);
          transition: 300ms;
        }
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
          left: -70px;
          display: flex;
          flex-direction: column;
          background-color: rgba(255, 255, 255, 0.594);
          padding: 1em 0.5em;
          align-items: flex-start;
          border-radius: 5px;
          transition: 500ms;
          backdrop-filter: blur(10px);

          &:hover {
            background-color: $white;
          }
        }
      }
    }
  }
}
</style>
