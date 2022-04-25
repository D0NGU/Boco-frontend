<!-- registrerings komponent -->

<template>
  <v-form ref="form" id="RegisterForm"
          @submit.prevent="submit"
          v-model="valid"
          lazy-validation>
    <h1>Register</h1>

    <div id="test">
      <label>First Name:</label>
      <v-text-field
          :rules="rulesApplyToAll"
          v-model="firstname">
      </v-text-field>

      <label>Last Name: </label>
      <v-text-field
          :rules="rulesApplyToAll"
          v-model="lastname">
      </v-text-field>

      <label>Email:</label>
      <v-text-field
          :rules="emailRules"
          v-model="email">
      </v-text-field>

      <label>Password: </label>
      <v-text-field
          :rules="rulesApplyToAll"
          v-model="password"
          :type="show ?'text': 'password'"
          @click:append="show=!show">
      </v-text-field>

    </div>

    <div class="text-center">

      <v-row justify="center">
        <v-btn
            :disabled="!valid"
            type="button"
            color="#CFD8DC"
            dark
            @click.stop="submit"
        >
          Register
        </v-btn>

        <v-dialog v-model="dialog">
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
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

  </v-form>
</template>

<script>
//import axios from "axios";
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
      this.dialog = true
      if (this.$refs.form.validate()) {
        console.log("Form is validated")
        await LoginService.handleClickSignUp(this.firstname, this.lastname, this.email, this.password).then(response => {
          this.regisState = response.data
        }).catch((error) => {
          if (error.response) {
            this.regisState = error.response.data
          }
        })
      }
    },

    close() {
      this.dialog = false
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },

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

#test {
  width: 300px;
}

</style>