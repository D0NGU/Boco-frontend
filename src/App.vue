<template>
  <nav v-if="$store.state.loggedIn">
  <Navbar id="navBar"/>
</nav>

  <router-view></router-view>

  <Footer/>
</template>

<style>
body {
  background-color: var(--backgroundBlue);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
<script>
import VueCookie from 'vue-cookie'
import Login from "@/views/Login";
import Navbar from "./components/Misc/Navbar.vue"
import Footer from "./components/Misc/Footer.vue"
export default {
  components: {Login, Navbar, Footer},
}
</script>