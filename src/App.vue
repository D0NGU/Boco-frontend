<template>
<meta name="viewport" content="user-scalable=no, width=device-width, height=device-height, minimum-scale=1.0, maximum-scale=1.0" />
  <nav id="nav" v-if="isLoggedIn">
    <Navbar />
  </nav>
  <router-view/>
</template>

<script>

import Navbar from './components/Navbar.vue'

  export default {
    components: {Navbar},

    computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn
    }
  }


}
</script>

<style>



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}


</style>
