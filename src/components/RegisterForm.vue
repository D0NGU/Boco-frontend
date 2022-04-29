<!-- registrerings komponent -->

<template>
  <v-form ref="form" id="RegisterForm"
          @submit.prevent="submit"
          v-model="valid"
          lazy-validation>
    <h1 id="title">Opprett bruker</h1>

    <div id="test">
      <v-text-field
          id="firstname"
          :rules="rulesApplyToAll"
          v-model="firstname"
          label="Fornavn">
      </v-text-field>

      <v-text-field
          id="lastname"
          :rules="rulesApplyToAll"
          v-model="lastname"
          label="Etternavn">
      </v-text-field>

      <v-text-field
          id="email"
          :rules="emailRules"
          v-model="email"
          label="E-postadresse">
      </v-text-field>

      <v-text-field
          id="password"
          :rules="rulesApplyToAll"
          v-model="password"
          :type="show ?'text': 'password'"
          label="Passord"
          @click:append="show=!show">
      </v-text-field>

    </div>

    <div class="text-center">

      <v-row justify="center">
        <v-btn
            id="rBtn"
            :disabled="!valid"
            type="button"
            color="#CFD8DC"
            dark
            @click.stop="submit"
        >Opprett bruker</v-btn>

        <v-dialog id="popOut" v-model="dialog">
          <v-card>
            <v-card-title class="text-h5" v-if="regisState ==='Registered successfully!'"> Registered! </v-card-title>
            <v-card-title class="text-h5" v-if="regisState !=='Registered successfully!'"> Registering failed </v-card-title>
            <v-card-text> {{regisState}} </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red"
                  text
                  @click=close()
              >
                Lukk
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <div id="back">
      <v-btn
          @click="goToLoginPage"
          id="backToLoginButton"
          class="ma-2"
          color="grey darken-2"
          dark>
        <v-icon dark left>
          mdi-arrow-left
        </v-icon>Logg inn
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import LoginService from '../service/LoginService'
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
      ],
      rulesApplyToAll: [
        value => !!value || 'Required.',
      ],
      show: false,
      regisState: '',
      dialog: false,
      valid: true,
    }
  },

  methods: {
    async submit() {
      let tempStat = '';
      this.dialog = true
      if (this.$refs.form.validate()) {
        console.log("Form is validated")
        await LoginService.handleClickSignUp(this.firstname, this.lastname, this.email, this.password).then(response => {
          tempStat = response.status;
        }).catch((error) => {
          if (error.response) {
            tempStat = error.response.status;
          }
        })
      }

      if (tempStat === 201){
        this.regisState = "Registered successfully!";
      } else if (tempStat === 409) {
        this.regisState = "Email is already in use";
      } else if (tempStat === 500) {
        this.regisState = "An error occurred when registering. Try again";
      }
    },

    close() {
      this.dialog = false
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
      if (this.regisState === "Registered successfully!"){
        this.$router.push("/login")
      }
    },

    goToLoginPage() {
      this.$router.push('/login');
    }

  }
}
</script>

<style scoped>

#RegisterForm {
  display: grid;
  justify-content: center;
  padding: 20px;
  margin-top: 30px;
}

h1 {
  margin-bottom: 30px;
}

#test {
  width: 350px;
}

#back {
  padding: 15px;
}

#rBtn {
  background-color: var(--bocoBlue) !important;
  color: white !important;
  font-weight: bold;
}

#backToLoginButton {
  background-color: white !important;
  color: var(--bocoBlue) !important;
  font-weight: bold;
}

</style>