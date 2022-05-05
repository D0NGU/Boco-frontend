<template>
  <v-form ref="loginform" id="LoginForm" @submit.prevent="logInButton" v-model="valid" lazy-validation>
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
          id="password" v-model="password"
          v-on:keyup.enter="logInButton()"
          :type="show ?'text': 'password'"
          @click:append="show=!show"
          label="Passord">
        </v-text-field>
      </div>
    </div>

    <div id="loginButton" class="text-center">
      <v-row justify="center">
        <v-btn id="loginBtn"
          :disabled="!valid"
          dark color="#CFD8DC"
          @click="logInButton()">
          Logg inn
        </v-btn>
        <v-dialog v-model="dialog">
          <v-card>
            <v-card-title class="text-h5" v-if="loginStatus !=='Påloggingen var vellykket'"> Innlogging feilet </v-card-title>
            <v-card-text id="loginStatusLabel"> {{loginStatus}} </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog = false">Lukk</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <div class="text-center">
      <v-btn
        id="regBtn"
        color="grey"
        @click="goToRegisterPage()">
        Opprett ny bruker
      </v-btn>
    </div>
  </v-form>
</template>




<script>
import LoginService from '@/service/LoginService'
import cookies from 'vue-cookie'
import UserAccountService from "@/service/UserAccountService";

export default {
  methods: {
    async logInButton() {
      let status = '';
      let token = '';
      // Check if login-info (email, password) is valid and not empty
      if (this.$refs.loginform.validate()) {
        await LoginService.handleClickSignIn(this.email, this.password).then(async response => {
          status = response.status;
          console.log(response.data);
          token = response.data.access_token;
          await cookies.set('token', response.data.access_token);
        }).catch((error) => {
          if (error.response) {
            console.log("heriweowbg")
            status = error.response.status;
          }
        })
      }
      console.info("Status: " + status)
      // HttpStatus 200 (OK)
      if (status === 200) {
        this.loginStatus = "Påloggingen var vellykket";
        await cookies.set("email", this.email);
        await this.$store.dispatch("login", {token:cookies.get("token"), email:cookies.get("email")});
        await UserAccountService.getUserId(this.email).then(async response => {
          await cookies.set("userId", response.data.id);
          await this.$store.commit("SET_MYUSERID", cookies.get("userId"))
        }).catch((error) =>{
          console.log("earnglrogækeonæigoægo")
          status = error.response.status;
        })

        console.log(cookies.get("email"))
        console.log(cookies.get("token"))
        console.log(cookies.get("userId"))
        console.log(this.$store.getters.myUserId)
        console.log(this.$store.getters.token)
        await this.$router.push('/home');
      }
      // HttpStatus 403 (FORBIDDEN)
      else if (status === 403) {
        this.dialog = true;
        this.loginStatus = "Feil email eller passord";
      }
      // HttpStatus 403 (NOT FOUND)
      else if (status === 404) {
        this.dialog = true;
        this.loginStatus = "Bruker eksisterer ikke!";
      }
      // HttpStatus 500 (INTERNAL SERVER ERROR)
      else if (status === 500) {
        this.dialog = true;
        this.loginStatus = "En feil har oppstått. Prøv igjen";
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
  margin-bottom: 60px;
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
