<template>
<nav v-if="this.$store.state.loggedIn">
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
import axios from "axios";
export default {
  components: {Login, Navbar},
  data() {
    return {
      shopId: '',
  }
  },
  Create () {// page creation lifecycle function
    this.initWebSocket()
  },
  Destroyed: function () {// leave page life cycle function
    this.websocketclose();
  },
  methods: {
    collapse: function(){
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.iconClass = "cebianlanzhankai";
      } else{
        this.iconClass = "cebianlanshouhui";
      }
    },
    initWebSocket: function () {
      // WebSocket is different from ordinary requests in terms of protocol, WS is equivalent to http, WSS is equivalent to HTTPS
      this.websock = new WebSocket("ws://localhost:8046/websocket/DPS007");
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen: function () {
      console.log("WebSocket Connection Successful");
    },
    websocketonerror: function (e) {
      console.log("WebSocket connection error");
    },
    websocketonmessage: function (e) {
      var da = JSON.parse(e.data);
      console.log(da);
      this.message = da;
    },
    websocketclose: function (e) {
      console.log("connection closed (" + e.code + ")");
    },
  },
}
</script>