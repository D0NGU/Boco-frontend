<!-- Login form -->

<template>
  <div id="LoginForm">
  <h2 id="logfail" v-if="fail">Login failed!</h2>
  <h2 id="login" v-else>Login</h2>

  <label>Email:</label>
    <v-text-field v-model="email"></v-text-field>

  <label>Password: </label>
    <v-text-field v-model="password"></v-text-field>

  <v-btn v-on:click="handleClickSignIn(this.username, this.password)">Log in</v-btn>
  <label>{{loginStatus}}</label>
  </div>

  <div v-if="fail">
    <p id="text"> Not registered yet! </p>
  </div>



</template>

<script>
import store from '@/store';

export default {
  methods: {
    async handleClickSignIn (username, password) {
      console.log("Sign in button clicked!")
      const loginRequest = { username: username, password: password };
    },

  },

  data() {
    return {
      email: '',
      password: '',
      loginStatus: '',
    }
  },

  computed: {
    fail() {
      return store.getters.getLoginStatus === "Fail"
    },
  }

}
</script>

<style scoped>


#LoginForm {
  display: grid;
  justify-content: center;
  margin: 40px;
  width: fit-content;
}


label {
  padding-top: 20px;
  width: 100px;
}


</style>