<template>
<nav v-if="this.$store.state.loggedIn">
  <Navbar />
</nav>

  <router-view></router-view>
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
import Login from "@/views/Login";
import Navbar from "./components/Misc/Navbar.vue"
import axios from "axios";
export default {
  components: {Login, Navbar},
}
</script>