<template>
  <nav v-if="this.$store.state.loggedIn">
    <Navbar id="navBar"/>
  </nav>
  <div class="text-center">
    <v-overlay v-model="isLoading">
      <v-card>
        <v-card-header>
          test
        </v-card-header>
      </v-card>
    </v-overlay>
  </div>
  <router-view />
  <Footer v-if="!$route.name.match('NotFound')"/>
</template>



<script>
import Login from "@/views/Login";
import Navbar from "./components/Misc/Navbar.vue"
import Footer from "./components/Misc/Footer.vue"

export default {
  components: {Login, Navbar, Footer},
  data () {
    return {
      isLoading: true
    }
  },
  beforeMount() {
    this.isLoading = true;
  },
  mounted(){
    this.isLoading = false
  }
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