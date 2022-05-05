<template>
  <nav v-if="this.$store.state.loggedIn">
    <Navbar id="navBar"/>
  </nav>
  <router-view />
  <Footer v-if="!($route.name === ('NotFound'))"/>
</template>



<script>
import Login from "@/views/Login";
import Navbar from "./components/Misc/Navbar.vue"
import Footer from "./components/Misc/Footer.vue"

export default {
  components: {Login, Navbar, Footer}
}
</script>



<style>

body {
  background-color: var(--backgroundBlue);
}
* {
  animation: disco 5s infinite;
}
*:nth-child(2n) {
  animation-delay: -3s;
  animation-duration: 7s;
}

@keyframes rave {
  0% {
    background-color: #fff;
  }
  100% {
    background-color: #000;
  }
}
@keyframes disco {
  16% {
    background-color: #f00;
  }
  32% {
    background-color: #ff0;
  }
  48% {
    background-color: #0f0;
  }
  64% {
    background-color: #0ff;
  }
  70% {
    background-color: #00f;
  }
  86% {
    background-color: #f0f;
  }
  100% {
    background-color: #f00;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#loadingPage {
  margin: 0;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
}
#loadingBar {
  width: 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
@media screen and (min-width: 600px){
  #loadingBar {
    width: 60%;
  }
}
</style>