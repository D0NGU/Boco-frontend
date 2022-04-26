<template>
<nav v-if="$store.state.loggedIn">
  <Navbar />
</nav>

  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: white;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import Login from "@/views/Login";
import Navbar from "./components/Misc/Navbar.vue"
export default {
  components: {Login, Navbar}
}
</script>