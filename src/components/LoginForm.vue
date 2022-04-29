<!-- Login form -->

<template>
  <v-form ref="loginform" id="LoginForm" @submit.prevent="logInButton"
          v-model="valid"
          lazy-validation>
    <h1 id="loginTitle">Logg inn</h1>

    <div id="inputWrapper">
    <div>
      <v-text-field
          :rules="emailRules"
          id="email"
          v-model="email"
          label="E-postadresse">
      </v-text-field>
    </div>

    <div>
      <v-text-field
          :rules="rulesApplyToAll"
          id="password"
          v-model="password"
          v-on:keyup.enter="logInButton()"
          :type="show ?'text': 'password'"
          @click:append="show=!show"
          label="Passord">
      </v-text-field>
    </div>
    </div>

    <div id="loginButton" class="text-center">
      <v-row justify="center">
        <v-btn
            id="loginBtn"
            :disabled="!valid"
            dark
            color="#CFD8DC"
            @click="logInButton()"
        >Logg inn</v-btn>

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
                Lukk
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
      >Opprett ny bruker</v-btn>
    </div>
  </v-form>

</template>

<script>
import LoginService from '@/service/LoginService'
import UserAccountService from "@/service/UserAccountService";
import cookie from 'vue-cookie'

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
          //userId = response.data.id;
          token = response.data.access_token;
          cookie.set('token', token);
        }).catch((error) => {
          if (error.response) {
            tempStat = error.response.status;
          }
        })
      }

      if (tempStat === 200){
        this.loginStatus = "Successfull login";
        this.$store.dispatch("login", {token: token, email: this.email,});
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
  margin-top: 30px;
}

#inputWrapper {
  width: 350px;
}

label {
  padding-top: 20px;
}

v-btn {
  padding: 10px;
}

h1 {
  margin-bottom: 30px;
}

#loginButton {
  padding: 20px;
}

#loginBtn {
  background-color: var(--bocoBlue) !important;
  color: white !important;
  font-weight: bold;
}

#regBtn {
  background-color: white !important;
  color: var(--bocoBlue) !important;
  font-weight: bold;
}

</style>