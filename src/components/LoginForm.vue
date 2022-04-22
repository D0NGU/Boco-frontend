<!-- Login form -->

<template>
  <v-form ref="loginform" id="LoginForm" @submit.prevent="logInButton"
          v-model="valid"
          lazy-validation>
    <h2 id="login">Login</h2>

    <div>
      <label>Email:</label>
      <v-text-field
          :rules="emailRules"
          id="email"
          v-model="email">
      </v-text-field>
    </div>

    <div>
      <label>Password: </label>
      <v-text-field
          :rules="rulesApplyToAll"
          id="password"
          v-model="password"
          :type="show ?'text': 'password'"
          @click:append="show=!show">
      </v-text-field>
    </div>

    <!--<v-btn @click="getToken"> get token </v-btn>-->

    <div id="loginButton" class="text-center">
      <v-row justify="center">
        <v-btn
            :disabled="!valid"
            dark
            color="green"
            @click="logInButton()"
        >
          Log in
        </v-btn>

        <v-dialog v-model="dialog">
          <v-card>
            <v-card-title class="text-h5" v-if="loginStatus !=='Successfull login'"> Login failed! </v-card-title>
            <v-card-text id="loginStatusLabel"> {{loginStatus}} </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red"
                  text
                  @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <div class="text-center">
      <v-btn
          color="primary"
          onclick="location.href='register'">
        Register new user
      </v-btn>
    </div>
  </v-form>

</template>

<script>
import LoginService from '@/service/LoginService'
export default {

  methods: {
    async logInButton() {
      this.dialog = true
      if (this.$refs.loginform.validate()) {
        console.log("Form is validated")
        await LoginService.handleClickSignIn(this.email, this.password).then(response => {
          this.loginStatus = response.data
        }).catch((error) => {
          if (error.response) {
            this.loginStatus = error.response.data;
          }
        })
      }

      if (this.loginStatus === 'Successfull login'){
        await this.$router.push('/');
      }
    },
  },

  data() {
    return {
      email: '',
      password: '',
      loginStatus: '',
      token1: '',
      error: '',
      rulesApplyToAll: [
        value => !!value || 'Required.',
      ],
      emailRules: [
        v => !!v || 'Required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
      ],
      show: false,
      dialog: false,
      valid: true,
    }
  },

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

#loginButton {
  padding: 20px;
}

</style>