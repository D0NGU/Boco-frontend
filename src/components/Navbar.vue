<!-- Navigasjonsbar som alltid skal vises uavhengig av current view -->

<template>
  <div>
    <div id="navBar">
      <router-link :to="{name: 'Home'}">Home</router-link>|
      <router-link @click="token" :to="{name: 'Account'}">Account</router-link>|
      <router-link @click="logOut" :to="{name: 'Login'}">Log Out</router-link>
    </div>
  </div>
</template>


<script>


import LoginService from '../service/LoginService.js'

export default {

  data() {
    return {
      email: 'oskareid@stud.ntnu.no',
      password: 'password',
      token1: '',
      error: ''
    }
  },


  methods: {
    
    logOut() {
      this.$store.commit('setLogin')
    },

    token() {

 return LoginService.getToken(this.email, this.password).
            then(ans => {
              this.token1 = ans.data
              console.log(ans.data)



            })
            .catch(err => {
              if(err.response) {
                this.error = err.response.data;
              } else {
                this.error = err
              }

              console.log(err.response)

            })

    }

  }

}
</script>

<style>

* {
  --bocoBlue: #004aab
}

#navBar a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

#navBar a.router-link-active {
  color: white;
  background: var(--bocoBlue);
}




</style>