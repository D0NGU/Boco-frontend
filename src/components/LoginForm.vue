<!-- Login form -->

<template>
  <v-form ref="loginform" id="LoginForm" @submit.prevent="logInButton"
          v-model="valid"
          lazy-validation>
    <h2 id="loginTitle">Login</h2>

    <div>
      <label id="emL">Email:</label>
      <v-text-field
          :rules="emailRules"
          id="email"
          v-model="email">
      </v-text-field>
    </div>

    <div>
      <label id="passL">Password:</label>
      <v-text-field
          :rules="rulesApplyToAll"
          id="password"
          v-model="password"
          :type="show ?'text': 'password'"
          @click:append="show=!show">
      </v-text-field>
    </div>

    <div id="loginButton" class="text-center">
      <v-row justify="center">
        <v-btn
            id="loginBtn"
            :disabled="!valid"
            dark
            color="#CFD8DC"
            @click="logInButton()"
        >Log in</v-btn>

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
          id="regBtn"
          color="grey"
          @click="goToRegisterPage"
      >Register new user</v-btn>
    </div>
  </v-form>

</template>

<script>
import LoginService from '@/service/LoginService'
export default {

  methods: {
    async logInButton() {
      let tempStat = '';
      let userId = '';
      let token = '';
      if (this.$refs.loginform.validate()) {
        console.log("Form is validated")
        await LoginService.handleClickSignIn(this.email, this.password).then(response => {
          tempStat = response.status;
          userId = response.data.id;
          token = response.data.token;
        }).catch((error) => {
          if (error.response) {
            tempStat = error.response.status;
          }
        })
      }

      if (tempStat === 200){
        this.loginStatus = "Successfull login";
        this.$store.dispatch("login", {token: token, userID: userId,});
        await this.$router.push('/Home');
      } else if (tempStat === 403) {
        this.dialog = true
        this.loginStatus = "Wrong password";
      } else if (tempStat === 404) {
        this.dialog = true
        this.loginStatus = "User does not exist";
      }
    },

    goToRegisterPage() {
      this.$router.push('/register');
    }
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