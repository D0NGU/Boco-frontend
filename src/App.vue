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
  animation-duration: 7s;
}
*:nth-child(3n) {
  animation-duration: 6s;
}
*:nth-child(5n) {
  animation-duration: 10s;
}
*:nth-child(7n) {
  animation-duration: 0.2s;
}
*:nth-child(11n) {
  animation-duration: 15s;
}
.v-card__overlay {
  animation: drop infinite;
  animation-duration: 10s;
}
@keyframes disco {
  0% {
    background-color: #f00;
  }
  16% {
    background-color: #ff0;
  }
  32% {
    background-color: #0f0;
  }
  48% {
    background-color: #0ff;
  }
  64% {
    background-color: #00f;
  }
  80% {
    background-color: #f0f;
  }
  96% {
    background-color: #f00;
  }
}
@keyframes drop {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: #f00;
  }
  55% {
    background-color: #ff0;
  }
  60% {
    background-color: #0f0;
  }
  65% {
    background-color: #0ff;
  }
  70% {
    background-color: #00f;
  }
  75% {
    background-color: #f0f;
  }
  80% {
    background-color: #f00;
  }
  81% {
    background-color: transparent;
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