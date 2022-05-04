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
#loadingPage {
  margin: 0;
  position: absolute;
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
</style>