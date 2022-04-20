<!-- Login form -->

<template>
  <div id="LoginForm">
    <h2 id="logfail" v-if="fail">Login failed!</h2>
    <h2 id="login" v-else>Login</h2>

    <div>
      <label>Email:</label>
      <v-text-field id="email" v-model="email"></v-text-field>
    </div>

    <div>
      <label>Password: </label>
      <v-text-field v-model="password"></v-text-field>
    </div>

    <div id="log">
      <v-btn v-on:click="handleClickSignIn(this.username, this.password)">Log in</v-btn>
    </div>

    <div>
      <v-btn onclick="location.href = 'register'">Register new user</v-btn>
    </div>
  </div>

</template>

<script>

export default {
  methods: {
    async handleClickSignIn (username, password) {
      console.log("Sign in button clicked!")
      const loginRequest = { username: username, password: password };
    },

    goToRegisterForm() {

    }

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
      return false
    },
  }

}
</script>

<style scoped>


#LoginForm {
  display: grid;
  justify-content: center;
  padding: 20px;

}

label {
  padding-top: 20px;
}

v-btn {
  padding: 10px;
}

h2 {
  margin-bottom: 30px;
}

#log {
  margin-bottom: 20px;
}

</style>