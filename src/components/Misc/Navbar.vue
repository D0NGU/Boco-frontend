<!-- Navigasjonsbar som alltid skal vises uavhengig av current view -->

<template>
  <div>
    <div id="navBar">
      <div class="navItem">
      <router-link :to="{name: 'Home'}">
        <div class="navLink">
          <v-icon>mdi-home</v-icon> <p>Hjem</p>
        </div>
      </router-link>
      </div>
      <div class="navItem">
      <router-link :to="{name: 'Account'}">
        <div>
          <v-icon> mdi-account</v-icon> <p>Profil</p>
        </div>
      </router-link>
      </div>
      <div class="navItem">
        <router-link :to="{name: 'Listing'}">
          <div>
            <v-icon> mdi-plus-circle</v-icon> <p>Ny annonse</p>
          </div>
        </router-link>
      </div>
      <div class="navItem">
      <router-link @click="logOut" :to="{name: 'Login'}">
        <div>
          <v-icon> mdi-logout</v-icon> <p>Logg ut</p>
        </div>
      </router-link>
      </div>
    </div>
  </div>
</template>


<script>


import LoginService from '../../service/LoginService.js'

export default {
  methods: {
    logOut() {
      this.$store.commit('SET_STATUS', false)
    },
  }
}
</script>

<style>

* {
  --bocoBlue: #004aab
}
#navBar {
  display: flex;
  flex-direction: row;
  background-color: #454655;
}
#navBar a {
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

#navBar a.router-link-active {
  color: #2ce7ff;
}

.navItem {
  width: 30%;
  flex-grow: 1;
}

</style>