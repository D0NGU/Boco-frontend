<template>
  <nav v-if="$store.state.loggedIn">
    <Navbar id="navBar"/>
  </nav>
  <router-view />
  <Footer/>
</template>



<script>
import Login from "@/views/Login";
import Navbar from "./components/Misc/Navbar.vue"
import Footer from "./components/Misc/Footer.vue"

export default {
  components: {Login, Navbar, Footer},
}
</script>



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